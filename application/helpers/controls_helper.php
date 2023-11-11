<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
date_default_timezone_set('America/Lima');

function Select($idSelect, $name_value_Select, $Nombre, $arrData, $select = null, $sinSeleccionar = false, $extraClass){
	if( (!is_object($arrData)) && count($arrData) == 0) return;

	$html = "<select id=\"$idSelect\" name=\"$name_value_Select\" class=\"form-control required $extraClass\">";
	if($sinSeleccionar) $html .= '<option value="" '. (!is_null($select) ? "selected='selected'" : "") .'>- Seleccionar -</option>';
	
	foreach($arrData as $row){
		if($select != null){
			if($select == $row->$name_value_Select)
				$html .= '<option selected="selected" value="' . $row->$name_value_Select . '">' . $row->$Nombre . '</option>';
			else
				$html .= '<option value="' . $row->$name_value_Select . '">' . $row->$Nombre . '</option>';
		}else
			$html .= '<option value="' . $row->$name_value_Select . '">' . $row->$Nombre . '</option>';
	}
	$html .= "</select>";
	return $html;
}

function DateFormat($date, $t){
	$_date = explode('/', $date);

	if(count($_date) > 1) $d = new DateTime($_date[2] . '/' . $_date[1] . '/' . $_date[0]);
	else $d = new DateTime($date);
	
	$dia = DayToSpanish($d->Format('w'), true);
	$mes = MonthToSpanish($d->Format('m'), true);
	
	if($t == 1) return $dia . ' ' . $d->format(" d ");
	if($t == 2) return $mes;
	if($t == 3) return $d->format("Y");
	if($t == 4) return $d->format(" d ") . ' de ' . $mes . ' del ' . $d->format('y');
	if($t == 5) return $d->format(" d ") . ' de ' . $mes . ' del ' . $d->format('y') . ', ' . $d->format('h:i:sa');
	if($t == 6) return $d->format(" d ") . ' de ' . MonthToSpanish($d->Format('m'), false) . ' del ' . $d->format('Y');
}

function DayToSpanish($x, $short = false ){
	$dias = array("Domingo","Lunes", "Mártes", "Miercoles", "Jueves", "Viernes", "Sábado");
	
	if(!$short) return $dias[$x];
	else return substr(QuitarTildes($dias[$x]), 0, 3);
}

function MonthToSpanish($x, $short = false ) {
	$meses = array("", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
	$x = (int)$x;
	
	if(!$short) return $meses[$x];
	else return substr($meses[$x], 0, 3);
}

function QuitarTildes($cadena){
	$no_permitidas= array("á","é","í","ó","ú","Á","É","Í","Ó","Ú","ñ","À","Ã","Ì","Ò","Ù","Ã™","Ã ","Ã¨","Ã¬","Ã²","Ã¹","ç","Ç","Ã¢","ê","Ã®","Ã´","Ã»","Ã‚","ÃŠ","ÃŽ","Ã”","Ã›","ü","Ã¶","Ã–","Ã¯","Ã¤","«","Ò","Ã","Ã„","Ã‹");
	$permitidas= array("a","e","i","o","u","A","E","I","O","U","n","N","A","E","I","O","U","a","e","i","o","u","c","C","a","e","i","o","u","A","E","I","O","U","u","o","O","i","a","e","U","I","A","E");
	$texto = str_replace($no_permitidas, $permitidas ,$cadena);
	return $texto;
}

function ToDate($date){
	$d = explode('/', $date);
	return $d[2] . '-' . $d[1] . '-' . $d[0];
}

function ToDateBD($date){
	$d = explode('-', $date);
	return $d[2] . '/' . $d[1] . '/' . $d[0];
}

function ToDateBDNubefactPSE($date){
	$d = explode('-', $date);
	return $d[2] . '-' . $d[1] . '-' . $d[0];
}

function ToMonth($date){
	$d = explode('-', $date);
	return $d[1];
}

function ToYear($date){
	$d = explode('-', $date);
	return $d[0];
}

function ToYearDMY($date){
	$d = explode('/', $date);
	return $d[2];
}

function ToMonthDMY($date){
	$d = explode('/', $date);
	return $d[1];
}

function numberFormat($Ss_Value, $Nu_Decimal, $Ss_Punto, $Ss_Coma){
	return number_format($Ss_Value, $Nu_Decimal, $Ss_Punto, $Ss_Coma);
}

function MonthsString(){
	return (object)array(
		(object)array(
			'mes'   => 'Enero',
			'valor' => '01'
		),
		(object)array(
			'mes'   => 'Febrero',
			'valor' => '02'
		),
		(object)array(
			'mes'   => 'Marzo',
			'valor' => '03'
		),
		(object)array(
			'mes'   => 'Abril',
			'valor' => '04'
		),
		(object)array(
			'mes'   => 'Mayo',
			'valor' => '05'
		),
		(object)array(
			'mes'   => 'Junio',
			'valor' => '06'
		),
		(object)array(
			'mes'   => 'Julio',
			'valor' => '07'
		),
		(object)array(
			'mes'   => 'Agosto',
			'valor' => '08'
		),
		(object)array(
			'mes'   => 'Setiembre',
			'valor' => '09'
		),
		(object)array(
			'mes'   => 'Octubre',
			'valor' => '10'
		),
		(object)array(
			'mes'   => 'Noviembre',
			'valor' => '11'
		),
		(object)array(
			'mes'   => 'Diciembre',
			'valor' => '12'
		),	
	);
}

function Months(){
	return (object)array(
		(object)array(
			'mes'   => 'Enero',
			'valor' => 1
		),
		(object)array(
			'mes'   => 'Febrero',
			'valor' => 2
		),
		(object)array(
			'mes'   => 'Marzo',
			'valor' => 3
		),
		(object)array(
			'mes'   => 'Abril',
			'valor' => 4
		),
		(object)array(
			'mes'   => 'Mayo',
			'valor' => 5
		),
		(object)array(
			'mes'   => 'Junio',
			'valor' => 6
		),
		(object)array(
			'mes'   => 'Julio',
			'valor' => 7
		),
		(object)array(
			'mes'   => 'Agosto',
			'valor' => 8
		),
		(object)array(
			'mes'   => 'Setiembre',
			'valor' => 9
		),
		(object)array(
			'mes'   => 'Octubre',
			'valor' => 10
		),
		(object)array(
			'mes'   => 'Noviembre',
			'valor' => 11
		),
		(object)array(
			'mes'   => 'Diciembre',
			'valor' => 12
		),	
	);
}

function Years($y){
	$years = array();
	
	for($i = $y; $i <= date('Y'); $i++){
		$years[] = (object)array(
			'year' => $i
		);
	}
	
	return (object)$years;
}

function YearsYMD($Fe_Sistema){
	$years = array();
	$y = explode('-', $Fe_Sistema);
	$y = $y[0];
	
	for($i = $y; $i <= date('Y'); $i++){
		$years[] = (object)array(
			'year' => $i
		);
	}
	
	return (object)$years;
}

function autocompletarConCeros($str_help, $str, $numCaracter, $valueCaracter, $tipo){
	if ($str_help == "-")
		return $str_help . str_pad($str, $numCaracter, $valueCaracter, $tipo);
	return str_pad($str, $numCaracter, $valueCaracter, $tipo);
}

function dateNow($sTypeDate){
	$arrFecha = localtime(time(),true);

	$iYear = (1900 + $arrFecha['tm_year']);
	$iMonth = (strlen(1 + $arrFecha['tm_mon']) > 1 ? (1 + $arrFecha['tm_mon']) : '0' . (1 + $arrFecha['tm_mon']));
	$iDay = (strlen($arrFecha['tm_mday']) > 1 ? $arrFecha['tm_mday'] : '0' . $arrFecha['tm_mday']);
	
	$iHour = $arrFecha['tm_hour'];
	$iMinute = $arrFecha['tm_min'];
	$iSecond = $arrFecha['tm_sec'];
	
	if ($sTypeDate == 'dia')//Solo dia
		$dHoy_Hour = $iDay;
	else if ($sTypeDate == 'mes')//Solo mes
		$dHoy_Hour = $iMonth;
	else if ($sTypeDate == 'año')//Solo año
		$dHoy_Hour = $iYear;
	else if ($sTypeDate == 'fecha')//Solo fecha
		$dHoy_Hour = $iYear . '-' . $iMonth . '-' . $iDay;
	else if ($sTypeDate == 'fecha_hora')//Solo fecha y hora
		$dHoy_Hour = $iYear . '-' . $iMonth . '-' . $iDay . ' ' . $iHour . ':' . $iMinute . ':' . $iSecond;
	else if ($sTypeDate == 'hora')//Solo hora
		$dHoy_Hour = $iHour . ':' . $iMinute . ':' . $iSecond;
	else if ($sTypeDate == 'prev_date_ini'){//Solo fecha de mes anterior
		if ( $iMonth == 1 ) {
			$iMonth = 12;
			$iYear = ($iYear - 1);
		} else {
			$iMonth = ($iMonth - 1);
		}
		$iPrevDate=$iMonth;
		$dHoy_Hour = $iYear . '-' . (strlen($iPrevDate) == 1 ? '0' . $iPrevDate : $iPrevDate) . '-01';
	} else if ($sTypeDate == 'prev_date_end'){//Solo fecha de mes anterior
		
		if ( $iMonth == 1 ) {
			$iMonth = 12;
			$iYear = ($iYear - 1);
		} else {
			$iMonth = ($iMonth - 1);
		}
		$iPrevDate=$iMonth;		
		//$iPrevDate=($iMonth == 1 ? 12 : ($iMonth - 1));
		$dHoy_Hour = $iYear . '-' . (strlen($iPrevDate) == 1 ? '0' . $iPrevDate : $iPrevDate) . '-' . $iDay;
		$dHoy_Hour = date("Y-m-t", strtotime($dHoy_Hour));
	} else if ($sTypeDate == 'month_date_ini_report'){//
		$dHoy_Hour = '01/' . $iMonth . '/' . $iYear;
	} else if ($sTypeDate == 'month_date_report_crud'){//
		$dHoy_Hour = $iDay . '/' . $iMonth . '/' . $iYear;
	} else if ($sTypeDate == 'serie_ymd'){//
		$dHoy_Hour = $iYear . '' . $iMonth . '' . $iDay;
	} else if ($sTypeDate == 'numero_ymdhms'){//
		$dHoy_Hour = $iYear . '' . $iMonth . '' . $iDay . '' . $iHour . '' . $iMinute . '' . $iSecond;
	}
	return $dHoy_Hour;
}

function getNameMonth($x) {
	$meses = array("", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
	$x = (int)$x;
	return $meses[$x];
}

function allTypeDate($date, $character, $type){
	if ($type == 0){
		$d = explode($character, $date);
		$h = explode(" ", $d[2]);
		return $h[0] . '/' . $d[1] . '/' . $d[0] . ' ' . $h[1];
	} else if ($type == 1){
		$d = explode($character, $date);
		return $d[2] . '/' . $d[1] . '/' . $d[0];
	} else if ($type == 2){//YYYY-MM-DD H24:MM:Ss obtener YYYY-MM-DD
		$d = explode($character, $date);
		return $d[0];
	} else if ($type == 3){//YYYY-MM-DD H24:MM:Ss obtener H24:MM:Ss
		$d = explode($character, $date);
		return $d[1];
	}
}

function days_elapsed($fecha_i, $fecha_f){
	$dias = (strtotime($fecha_i) - strtotime($fecha_f)) / 86400;
	$dias = abs($dias);
	$dias = floor($dias);		
	return $dias;
}

function diferenciaFechasMultipleFormato($fecha_i, $fecha_f, $sTipoFormato){
	$date1 = new DateTime($fecha_i);
	$date2 = new DateTime($fecha_f);
	$diff = $date1->diff($date2);
	
	if ( $sTipoFormato == 'year' ) {
		return $diff->y;
	}

	if ( $sTipoFormato == 'mes' ) {
		return $diff->m;
	}

	if ( $sTipoFormato == 'dias' ) {
		return $diff->days;
	}

	if ( $sTipoFormato == 'horas' ) {
		return $diff->h;
	}

	if ( $sTipoFormato == 'minutos' ) {
		return $diff->i;
	}

	if ( $sTipoFormato == 'segundos' ) {
		return $diff->s;
	}
}

function quitarCaracteresEspeciales($cadena) {
	$no_permitidas= array("<br>", '"', "'", "*", "'", '"', "%20", "º", "ü", "¶", "µ", "°","±", "²", "³", "´", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "%2F");
	$permitidas= array("", "", "", "", "\'", "", ".", "u", "", "", "", "", "", "A", "A", "A", "A", "A", "A", "A", "/");
	$texto = str_replace($no_permitidas, $permitidas, $cadena);
	return $texto;
}

function cambiarCaracteresEspeciales($cadena) {
	$no_permitidas= array("<br>", '"', "'", "/", "%20");
	$permitidas= array("", "", "", "", " ");
	$texto = str_replace($no_permitidas, $permitidas, $cadena);
	return $texto;
}

function cambiarCaracteresEspecialesImagen($cadena) {
	$no_permitidas= array("<br>", '"', "'", "%20", " ", "'", '"', "#", ".");
	$permitidas= array("", "", "", "", "_", "_", "", "", "", "_");
	$texto = str_replace($no_permitidas, $permitidas, $cadena);
	return $texto;
}

function limpiarCaracteresEspeciales($cadena) {
	$no_permitidas= array("<br>", '"', "'", "'");
	$permitidas= array("", "", "", "", "''");
	$texto = str_replace($no_permitidas, $permitidas, $cadena);
	return $texto;
}

function quitarCaracteresEspecialesListadoReportes($cadena) {
	$no_permitidas= array("<br>", '"', "'", "*", "'", '"', "%20", "º", "ü", "¶", "µ", "°","±", "²", "³", "´", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "%2F", "&");
	$permitidas= array("", "", "", "", "", "", ".", "u", "", "", "", "", "", "A", "A", "A", "A", "A", "A", "A", "", "");
	$texto = str_replace($no_permitidas, $permitidas, $cadena);
	return $texto;
}

function countBooks($array) {
    $qty = 0;
    foreach ($array as $key => $data) {
        $qty += $data['cantidad_item'];
    }
    return $qty;
}

function amountBooks($array) {
    $total = 0;
    foreach ($array as $key => $data) {
        $total += $data['total_item'];
    }
    return $total;
}

function searchForIdItem($array, $id_item) {
	$data = array('key' => '', 'id_item' => '', 'cantidad_item' => '');
	if(!empty($array)) {
		foreach ($array as $key => $val) {
			if ($val['id_item'] == $id_item) {
				$data['key'] = $key;
				$data['id_item'] = $id_item;
				$data['cantidad_item'] = $val['cantidad_item'];
				return $data;
			}
		}
	}
	return null;
}

function ToDateHourBD($date){
    $d = explode('-', $date);
    $h = explode(" ", $d[2]);
    return $h[0] . '/' . $d[1] . '/' . $d[0] . ' ' . $h[1];
}