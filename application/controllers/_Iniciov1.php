<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->database('default');
		$this->load->library('session');
		$this->load->library('encryption');
		$this->load->model('InicioModel');
	}

	public function index(){
		$arrPaises = $this->InicioModel->getPais();
		$this->load->view('header');
		$this->load->view('menu');
		$this->load->view('inicio',
			array('arrPaises' => $arrPaises)
		);
		$this->load->view('footer_data');
		$this->load->view('footer');
	}

	public function terminos(){
		$this->load->view('header');
		$this->load->view('menu');
		$this->load->view('terminos_y_condiciones');
		$this->load->view('footer_data');
		$this->load->view('footer');
	}
	
	public function setImagenInputFile(){
		echo json_encode(array($_FILES['voucher']));
	}

	public function enviarPedido(){

		//$arrPost = $this->input->post();
		//$arrFiles = $this->input->post();
		//echo json_encode($this->InicioModel->enviarPedido($data, $where));

$addProducto = $this->input->post('addProducto');
//array_debug($addProducto);

		//array_debug($_FILES);
		//array_debug($this->input->post());

		$_FILES['voucher']['name'] = $addProducto[1]['img_name'];
		$_FILES['voucher']['type'] = $addProducto[1]['img_type'];
		$_FILES['voucher']['tmp_name'] = $_FILES['voucher2']['tmp_name'];
		$_FILES['voucher']['error'] = $addProducto[1]['error_img'];
		$_FILES['voucher']['size'] = $addProducto[1]['size_img'];
		

		$path = "assets/images/voucher_deposito/";
		
		array_debug($_FILES);

		$config['upload_path'] = $path;
		$config['allowed_types'] = 'png|jpg|jpeg|webp|PNG|JPG|JPEG|WEBP';
		$config['max_size'] = 2048;//1024 KB = 1 MB
		$config['encrypt_name'] = TRUE;
		$config['max_filename'] = '255';

		$this->load->library('upload', $config);

		if (!$this->upload->do_upload('voucher')){
			array_debug($this->upload->display_errors());
			echo json_encode(array(
				'status' => 'warning',
				'message' => 'No se guardo ' . strip_tags($this->upload->display_errors()) 
			));
		} else {
			echo "bien";
		}
		/*
		$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp' , 'heif', 'webp');
		if(!empty($this->input->post('id_pedido')) && isset($_FILES['voucher'])){
			$img = $_FILES['voucher']['name'];
			$tmp = $_FILES['voucher']['tmp_name'];
			$type = $_FILES['voucher']['type'];
			// get uploaded file's extension
			$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
			// check's valid format
			if(in_array($ext, $valid_extensions)){
				$path = "assets/images/voucher_deposito/";

				$config['upload_path'] = $path;
				$config['allowed_types'] = 'png|jpg|jpeg|webp|PNG|JPG|JPEG|WEBP';
				$config['max_size'] = 1024;//1024 KB = 1 MB
				$config['encrypt_name'] = TRUE;
				$config['max_filename'] = '255';

				$this->load->library('upload', $config);

				if (!$this->upload->do_upload('voucher')){
					echo json_encode(array(
						'status' => 'warning',
						'message' => 'No se guardo ' . strip_tags($this->upload->display_errors()) 
					));
				} else {
					$arrUploadFile = $this->upload->data();
					//array_debug($arrUploadFile);

					//ruta de archivo cloud
					$Txt_Url_Imagen_Deposito = base_url($path . $arrUploadFile['file_name']);

					//echo $Txt_Url_Imagen_Deposito;
					$data = array(
						'Txt_Url_Imagen_Deposito' => $Txt_Url_Imagen_Deposito
					);
					$where = array(
						'ID_Pedido_Cabecera' => $this->input->post('id_pedido')
					);
					echo json_encode($this->PaymentModel->addVoucherPedido($data, $where));
				}
			} else {
				echo json_encode(array(
					'status' => 'warning',
					'message' => 'Extensión inválida ' . $type
				));
			}
		}
		*/
	}
}
