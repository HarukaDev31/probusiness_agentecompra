<?php
class InicioModel extends CI_Model{
	public function __construct(){
		parent::__construct();
    }
  
    public function getPais(){
        //aqui falta que me envíen ID caso contrario no pueden ingresar aquí
        $query = "SELECT * FROM pais WHERE Nu_Estado=1 ORDER BY ID_Pais";

        if ( !$this->db->simple_query($query) ){
            $error = $this->db->error();
            return array(
                'status' => 'danger',
                'message' => 'Problemas al obtener datos',
                'code_sql' => $error['code'],
                'message_sql' => $error['message']
            );
        }
        $arrResponseSQL = $this->db->query($query);
        if ( $arrResponseSQL->num_rows() > 0 ){
            return array(
                'status' => 'success',
                'message' => 'Si hay registros',
                'result' => $arrResponseSQL->result()
            );
        }
        
        return array(
            'status' => 'warning',
            'message' => 'No hay registros'
        );
    }
  
    public function enviarPedido($arrPost, $arrFiles){

		$this->db->trans_begin();

        //crear cliente si no existe
        $sNombreEntidad = trim($arrPost['No_Entidad']);
        $sNumeroDocumentoIdentidad = trim($arrPost['Nu_Documento_Identidad']);
        $iTipoDocumentoIdentidad = '4';//4=RUC
        $sTipoDocumentoIdentidad = 'RUC';
        if ( strlen($sNumeroDocumentoIdentidad) != 11 ) {
            $iTipoDocumentoIdentidad = '1';//1=OTROS
            $sTipoDocumentoIdentidad = 'OTROS';
        }
        
        $query = "SELECT ID_Entidad FROM entidad WHERE ID_Empresa = 1 AND Nu_Tipo_Entidad = 0 AND ID_Tipo_Documento_Identidad = " . $iTipoDocumentoIdentidad . " AND Nu_Documento_Identidad = '" . $sNumeroDocumentoIdentidad . "' AND No_Entidad = '" . limpiarCaracteresEspeciales($sNombreEntidad) . "' LIMIT 1";
        $objVerificarCliente = $this->db->query($query)->row();
        if (is_object($objVerificarCliente)){
            $ID_Entidad = $objVerificarCliente->ID_Entidad;
        } else {
            $arrCliente = array(
                'ID_Empresa' => 1,
                'ID_Organizacion' => 1,
                'Nu_Tipo_Entidad' => 0,//0=Cliente
                'ID_Tipo_Documento_Identidad' => $iTipoDocumentoIdentidad,
                'Nu_Documento_Identidad' => $sNumeroDocumentoIdentidad,
                'No_Entidad' => $sNombreEntidad,
                'Nu_Estado' => 1,
                'ID_Pais' => $arrPost['ID_Pais'],
                'Nu_Celular_Entidad' => $arrPost['tel'],
                'Txt_Email_Entidad'	=> $arrPost['email'],
                'No_Contacto'	=> $arrPost['name'],
                'Nu_Celular_Contacto' => $arrPost['tel'],
                'Txt_Email_Contacto' => $arrPost['email'],
            );

            if ($this->db->insert('entidad', $arrCliente) > 0) {
                $ID_Entidad = $this->db->insert_id();
            } else {
                $this->db->trans_rollback();
                return array(
                    'status' => 'error',
                    'message' => 'No registro cliente'
                );
            }
        }
        //caso contrario ubicar id

        $dEmision = dateNow('fecha');
        $dRegistroHora = dateNow('fecha_hora');

		$arrSaleOrder = array(
            'ID_Empresa' => 1,
            'ID_Organizacion' => 1,
			'Fe_Emision' => dateNow('fecha'),
            'ID_Entidad' => $ID_Entidad,
			'ID_Pais' => $arrPost['ID_Pais'],//1=PERU
            'Nu_Estado' => 1,//1=Pendiente, 2=Confirmado y 3=Finalizado
            'Fe_Registro' => $dRegistroHora
		);
		
		$this->db->insert('agente_compra_pedido_cabecera', $arrSaleOrder);
		$iIdHeader = $this->db->insert_id();

        $path = "assets/images/productos/";
        $iCounter=0;
        $_FILES['tmp_voucher'] = $_FILES['voucher'];
		foreach($arrPost['addProducto'] as $row) {
            //SET IMAGEN
            $_FILES['voucher']['name'] = $_FILES['tmp_voucher']['name'][$iCounter];
            $_FILES['voucher']['type'] = $_FILES['tmp_voucher']['type'][$iCounter];
            $_FILES['voucher']['tmp_name'] = $_FILES['tmp_voucher']['tmp_name'][$iCounter];
            $_FILES['voucher']['error'] = $_FILES['tmp_voucher']['error'][$iCounter];
            $_FILES['voucher']['size'] = $_FILES['tmp_voucher']['size'][$iCounter];

            $config['upload_path'] = $path;
            $config['allowed_types'] = 'png|jpg|jpeg|webp|PNG|JPG|JPEG|WEBP';
            $config['max_size'] = 3096;//1024 KB = 1 MB
            $config['encrypt_name'] = TRUE;
            $config['max_filename'] = '255';
    
            $this->load->library('upload', $config);

            if (!$this->upload->do_upload('voucher')){
                $this->db->trans_rollback();
                return array(
                    'status' => 'error',
                    'message' => 'No se cargo imagen ' . $row['nombre_comercial'] . ' ' . strip_tags($this->upload->display_errors()),
                );
            } else {
                $arrUploadFile = $this->upload->data();
                $Txt_Url_Imagen_Producto = base_url($path . $arrUploadFile['file_name']);
            }

			$arrSaleOrderDetail[] = array(
                'ID_Empresa' => 1,
                'ID_Organizacion' => 1,
				'ID_Pedido_Cabecera' => $iIdHeader,
                'Txt_Producto' => $row['nombre_comercial'],
                'Txt_Descripcion' => $row['caracteristicas'],
				'Qt_Producto' => $row['cantidad'],
                'Txt_Url_Imagen_Producto' => $Txt_Url_Imagen_Producto,
                'Txt_Url_Link_Pagina_Producto' => $row['link'],
			);
            ++$iCounter;
		}
		$this->db->insert_batch('agente_compra_pedido_detalle', $arrSaleOrderDetail);

		if ($this->db->trans_status() === FALSE) {
			$this->db->trans_rollback();
			return array(
				'status' => 'error',
				'message' => '¡Oops! Algo salió mal. Inténtalo mas tarde detalle'
			);
		} else {
			$this->db->trans_commit();

            unset($_FILES);

			return array(
				'status' => 'success',
				'message' => 'Pedido creado',
			);
		}
    }
}