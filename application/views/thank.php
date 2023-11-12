<main>
<br><br>
<!--
<br><br>
-->
<?php

//array_debug($arrResponsePedido);
//array_debug($arrCabecera);
//array_debug($arrDetalle);
//array_debug($arrMedioPago);
//echo base_url();

//$phone = "51" . $arrCabecera['cliente']['Nu_Celular_Entidad'];
$codigo_pais="51";
$numero_celular="913656663";
$phone = $codigo_pais . $numero_celular;

//Preparar array para envío de data de pedido para la aplicación
$message = "*¡Hola ProBusiness*! 😁";
$message .= "\n🚢 Acabo de realizar el siguiente pedido Nro. " . $id;

$message = urlencode($message);

$sURLSendMessageWhatsapp = "https://api.whatsapp.com/send?phone=" . $phone . "&text=" . $message;
?>
  <div class="container mt-5">
    <h2 class="text-center mb-4 pt-3 text-success"><i class="fa-solid fa-circle-check fa-3x text-green"></i></h2>
    <h2 class="text-center mb-4">Nro. Pedido <?php echo $id; ?> creado</h2>
    <a class="btn btn-outline-success btn-lg btn-block mb-4 shadow" style="width:100%" href="<?php echo $sURLSendMessageWhatsapp; ?>" target="_blank" rel="noopener noreferrer">Enviar whatsApp</a>
    <a class="btn btn-secondary btn-lg btn-block mb-4 shadow" style="width:100%" href="../" rel="noopener noreferrer">Regresar</a>
  </div>
</main>
<script>
  /*
  setTimeout(function () {
    window.open("<?php echo $sURLSendMessageWhatsapp; ?>", "_blank");
    //window.location = '<?php echo $sURLSendMessageWhatsapp; ?>';
  }, 2100);
  */
</script>
