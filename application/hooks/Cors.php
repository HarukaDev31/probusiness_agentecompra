<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
class Cors {
    public function allow() {
        $ci =& get_instance();
        $ci->output
           ->set_header('Access-Control-Allow-Origin: *')
           ->set_header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE')
           ->set_header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
}
