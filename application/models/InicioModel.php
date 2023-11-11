<?php
class InicioModel extends CI_Model{
	public function __construct(){
		parent::__construct();
    }
  
    public function getImportacionGrupalProducto($arrParams){
        //aqui falta que me envíen ID caso contrario no pueden ingresar aquí
        $query = "SELECT
IGC.ID_Empresa,
IGC.ID_Organizacion,
IGC.ID_Moneda,
'1' AS ID_Pais,
IGC.ID_Importacion_Grupal,
IGC.No_Importacion_Grupal,
IGC.Fe_Inicio,
IGC.Fe_Fin,
IGC.Nu_Estado AS estado_importacion_grupal,
ITEM.ID_Producto,
ITEM.No_Producto,
ITEM.No_Imagen_Item,
ITEM.Nu_Version_Imagen,
MONE.No_Signo,
ITEM.ID_Unidad_Medida,
ITEM.ID_Unidad_Medida_Precio AS ID_Unidad_Medida_2,
UM.No_Unidad_Medida,
ITEM.Qt_Unidad_Medida AS cantidad_item,
ITEM.Ss_Precio_Importacion AS precio_item,
UM2.No_Unidad_Medida AS No_Unidad_Medida_2,
ITEM.Qt_Unidad_Medida_2 AS cantidad_item_2,
ITEM.Ss_Precio_Importacion_2 AS precio_item_2,
ITEM.Nu_Activar_Item_Lae_Shop AS estado_item,
ITEM.Txt_Producto
FROM
importacion_grupal_cabecera AS IGC
JOIN importacion_grupal_detalle AS IGD ON(IGD.ID_Importacion_Grupal = IGC.ID_Importacion_Grupal)
JOIN producto AS ITEM ON(ITEM.ID_Producto = IGD.ID_Producto)
JOIN unidad_medida AS UM ON(UM.ID_Unidad_Medida = ITEM.ID_Unidad_Medida)
JOIN unidad_medida AS UM2 ON(UM2.ID_Unidad_Medida = ITEM.ID_Unidad_Medida_Precio)
JOIN moneda AS MONE ON(MONE.ID_Moneda = IGC.ID_Moneda)
WHERE
IGC.Nu_Estado = 1";

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
}