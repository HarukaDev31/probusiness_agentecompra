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
		$arrParams = array();

		$this->load->view('header');
		$this->load->view('menu');
		$this->load->view('inicio');
		$this->load->view('footer_data');
		$this->load->view('footer');
	}

	public function terminos(){
		$arrParams = array();
		$arrImportacionGrupalProducto = $this->InicioModel->getImportacionGrupalProducto($arrParams);
		$this->load->view('header');
		$this->load->view('menu', array('arrImportacionGrupalProducto' => $arrImportacionGrupalProducto));
		$this->load->view('terminos_y_condiciones');
		$this->load->view('footer_data');
		$this->load->view('footer');
	}
}
