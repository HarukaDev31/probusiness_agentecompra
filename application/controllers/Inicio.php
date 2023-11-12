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
		$arrPost = $this->input->post();
		$arrFiles = $_FILES;
		echo json_encode($this->InicioModel->enviarPedido($arrPost, $arrFiles));
	}

	public function thank($id=0){
		if($id==0){
			redirect('Inicio');
		}

		$this->load->view('header');
		$this->load->view('menu');
		$this->load->view('thank', array(
			'id' => $id,
		));
		$this->load->view('footer_data');
		$this->load->view('footer');
	}
}
