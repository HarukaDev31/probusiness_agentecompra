var signo_moneda='S/';
$(document).ready(function () {
  $('#div-footer-cart').hide();

  //console.log($('#div-delivery_extra_provincia'));

  $('#div-delivery_extra_provincia').hide();
  
  signo_moneda = $('#hidden-global-signo_moneda').val();

  $('.input-number').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  $('.input-decimal').on('input', function () {
    numero = parseFloat(this.value);
    if (!isNaN(numero)) {
      this.value = this.value.replace(/[^0-9\.]/g, '');
      if (numero < 0)
          this.value = '';
    } else {
      this.value = this.value.replace(/[^0-9\.]/g, '');
    }
  });

  $(document).on('click', '.btn-agregar_item', function (e) {
    e.preventDefault();
    const type_action = 'add';
    const id_item = $( this ).data('id_item');
    const id_item_bd = $( this ).data('id_item_bd');
    const id_unidad_medida = $( this ).data('id_unidad_medida');
    const id_unidad_medida_2 = $( this ).data('id_unidad_medida_2');
    const nombre_item = $( this ).data('nombre_item');
    const url_imagen_item = $( this ).data('url_imagen_item');
    const cantidad_item = parseFloat($( this ).data('cantidad_item'));
    const precio_item = parseFloat($( this ).data('precio_item'));
    const total_item = (cantidad_item * precio_item);

    $('#btn-agregar_item-' + id_item).prop('disabled', true);
    $('#btn-agregar_item-' + id_item).html('<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>');

    var arrParams = {
      type_action : type_action,
      id_item_bd : id_item_bd,
      id_item : id_item,
      id_unidad_medida : id_unidad_medida,
      id_unidad_medida_2 : id_unidad_medida_2,
      url_imagen_item : url_imagen_item,
      nombre_item : nombre_item,
      cantidad_item : cantidad_item,
      precio_item : precio_item,
      total_item : total_item
    };
    requestAddCart(arrParams);
  });
  
  $(document).on('click', '.btn-quitar_item', function (e) {
    e.preventDefault();
    const type_action = 'remove';
    const id_item = $(this).attr('data-id_item');
    const id_item_bd = $( this ).data('id_item_bd');
    const id_unidad_medida = $( this ).data('id_unidad_medida');
    const id_unidad_medida_2 = $( this ).data('id_unidad_medida_2');
    const nombre_item = $( this ).data('nombre_item');
    const url_imagen_item = $( this ).data('url_imagen_item');
    const cantidad_item = parseFloat($( this ).data('cantidad_item'));
    const precio_item = parseFloat($( this ).data('precio_item'));
    const total_item = (cantidad_item * precio_item);

    $('#btn-quitar_item-' + id_item).prop('disabled', true);
    $('#btn-quitar_item-' + id_item).html('<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>');

    var arrParams = {
      type_action : type_action,
      id_item_bd : id_item_bd,
      id_item : id_item,
      id_unidad_medida : id_unidad_medida,
      id_unidad_medida_2 : id_unidad_medida_2,
      url_imagen_item : url_imagen_item,
      nombre_item : nombre_item,
      cantidad_item : cantidad_item,
      precio_item : precio_item,
      total_item : total_item
    };
    requestRemoveCart(arrParams);
    
  });

  $(document).on('click', '#btn-ver-cart_shop', function (e) {
    e.preventDefault();
    modalCartShop();
  });
  
  $(document).on('click', '#icon-ver-cart_shop', function (e) {
    e.preventDefault();
    modalCartShop();
  });
  
  $(document).on('change', '#cbo-departamento', function () {
    var id = $(this).val(), sTextoDepartamento = $("#cbo-departamento option:selected").text(), response = '';
    $('#cbo-provincia').html('<option value="0" selected="selected">- Cargando -</option>');
    if (id > 0) {
      $.post(base_url + 'Payment/searchForIdProvincia', { ID_Departamento: id }, function (response) {
        //console.log(response);
        if(response.status=='success'){
          $('#cbo-provincia').html('<option value="0" selected="selected">- Seleccionar -</option>');
          response = response.result;
          for (var i = 0; i < response.length; i++){
            $('#cbo-provincia').append('<option value="' + response[i].ID_Provincia + '">' + response[i].No_Provincia + '</option>');
          }
        } else {
          $('#cbo-provincia').html('<option value="0" selected="selected">- Sin provincia -</option>');

          alert(response.message);
        }
      }, 'JSON');
    }

    //mostrar delivery
    $('#div-delivery_extra_provincia').hide();
    if(sTextoDepartamento!='LIMA')
      $('#div-delivery_extra_provincia').show();
  });

  //Direccion modal usuario primera vez
  $(document).on('change', '#cbo-provincia', function () {
    var id = $(this).val(), response = '';
    $('#cbo-distrito').html('<option value="0" selected="selected">- Cargando -</option>');
    if (id > 0) {
      $.post(base_url + 'Payment/searchForIdDistrito', { ID_Provincia: id }, function (response) {
        //console.log(response);
        if(response.status=='success'){
          $('#cbo-distrito').html('<option value="0" selected="selected">- Seleccionar -</option>');
          response = response.result;
          for (var i = 0; i < response.length; i++){
            $('#cbo-distrito').append('<option value="' + response[i].ID_Distrito + '">' + response[i].No_Distrito + '</option>');
          }
        } else {
          $('#cbo-distrito').html('<option value="0" selected="selected">- Sin distrito -</option>');

          alert(response.message);
        }
      }, 'JSON');
    }
  });

  $(document).on('click', '.btn-completar_pedido', function (e) {
    e.preventDefault();

    $('.help-block').empty();
    $('.form-group').removeClass('has-error');

    const sMedioPago = $("input[name='arrMedioPago']:checked").val();
    const iIdMedioPago = $("input[name='arrMedioPago']:checked").data('id');

    if ($("#payment-documento_identidad").val().trim().length < 6) {
      $('#payment-documento_identidad').closest('.form-group').find('.help-block').html('Ingresar número');
      $('#payment-documento_identidad').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#payment-documento_identidad'));
    } else if ($("#payment-nombre_cliente").val().trim().length < 3) {
      $('#payment-nombre_cliente').closest('.form-group').find('.help-block').html('Mínimo 3 caracteres');
      $('#payment-nombre_cliente').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#payment-nombre_cliente'));
    } else if ($("#payment-celular_cliente").val().trim().length < 9) {
      $('#payment-celular_cliente').closest('.form-group').find('.help-block').html('9 dígitos');
      $('#payment-celular_cliente').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#payment-celular_cliente'));
    } else if ($("#payment-email").val().trim().length < 1) {
      $('#payment-email').closest('.form-group').find('.help-block').html('Ingresar Email');
      $('#payment-email').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#payment-documento_identidad'));
    } else if (!checkEmail($('#payment-email').val())) {
      $('#payment-email').closest('.form-group').find('.help-block').html('Email inválido');
      $('#payment-email').closest('.form-group').addClass('has-success').removeClass('has-error');

      scrollToError($("html, body"), $('#payment-email'));
    } else if ($("#cbo-departamento").val() == 0) {
      $('#cbo-departamento').closest('.form-group').find('.help-block').html('Elegir departamento');
      $('#cbo-departamento').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#cbo-departamento'));
    } else if ($("#cbo-provincia").val() == 0) {
      $('#cbo-provincia').closest('.form-group').find('.help-block').html('Elegir provincia');
      $('#cbo-provincia').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#cbo-provincia'));
    } else if ($("#cbo-distrito").val() == 0) {
      $('#cbo-distrito').closest('.form-group').find('.help-block').html('Elegir distrito');
      $('#cbo-distrito').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#cbo-distrito'));
    } else if ($("#payment-direccion").val().trim().length < 10) {
      $('#payment-direccion').closest('.form-group').find('.help-block').html('Mínimo 10 caracteres');
      $('#payment-direccion').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#payment-direccion'));
    } else if (sMedioPago===undefined || sMedioPago==0 || sMedioPago=='') {
      alert('Elegir medio de pago');
    } else if($('#check-terminos').prop('checked') == false) {
      alert('Deebs aceptar términos y condiciones');
    } else {
      var arrParams = {
        'id_importacion_grupal' : $( '#hidden-global-id_importacion_grupal' ).val(),
        'id_empresa' : $( '#hidden-global-id_empresa' ).val(),
        'id_organizacion' : $( '#hidden-global-id_organizacion' ).val(),
        'id_pais' : $( '#hidden-global-id_pais' ).val(),
        'id_moneda' : $( '#hidden-global-id_moneda' ).val(),
        'signo_moneda' : $( '#hidden-global-signo_moneda' ).val(),
        'cantidad_total' : $( '#hidden-cart_shop-cantidad_total' ).val(),
        'importe_total' : $( '#hidden-cart_shop-importe_total' ).val(),
        'Nu_Documento_Identidad' : $('#payment-documento_identidad').val(),
        'No_Entidad' : $('#payment-nombre_cliente').val(),
        'Nu_Celular_Entidad' : $('#payment-celular_cliente').val(),
        'Txt_Email_Entidad' : $('#payment-email').val(),
        'id_departamento' : $( '#cbo-departamento' ).val(),
        'id_provincia' : $( '#cbo-provincia' ).val(),
        'id_distrito' : $( '#cbo-distrito' ).val(),
        'Txt_Direccion' : $('#payment-direccion').val(),
        'id_medio_pago' : iIdMedioPago,
      };
      addPedido(arrParams);
    }
  })

  //subir archivo
  $("#attachform").on('submit',function(e){
    e.preventDefault();
    
    $('#btn-file_voucher').prop('disabled', true);
    $('#btn-file_voucher').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando');

    var postData = new FormData($("#attachform")[0]);
    console.log(postData);
    $.ajax({
      url: base_url + 'Payment/enviarArchivo',
      type: "POST",
      dataType: "JSON",
      data: postData,
      processData: false,
      contentType: false
    })
    .done(function(response) {
      $('#btn-file_voucher').prop('disabled', false);
      $('#btn-file_voucher').html('Enviar');

      console.log(response);
      if(response.status=='success'){
        alert(response.message);
      } else {
        alert(response.message);
      }
      //$('#myAttachModal').modal('hide');
    });
  });
});

function requestAddCart(arrParams) {
  //console.log(arrParams);
  $.post(base_url + 'Inicio/agregarItem', {arrParams}, function(response) {
    console.log(response);

    $('#btn-agregar_item-' + arrParams.id_item).prop('disabled', false);
    if( response.status == 'success' ){
      const sCaracterPalabra = (response.count > 1 ? 's' : '');
      
      $('#span-cart-global_cantidad').html(response.count);
      $('#div-cart_items').html(response.count + ' producto' + sCaracterPalabra);
      $('#div-cart_total').html(signo_moneda + ' ' + response.total_item);

      $('#div-footer-cart').show();
  
      const count_item = (response.count_item != null ? response.count_item : 0);

      if(count_item>0){
        $('#btn-agregar_item-' + arrParams.id_item).html('Agregar <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">' + count_item + '</span>');
      } else {
        $('#btn-agregar_item-' + arrParams.id_item).html('Agregar');
      }
    } else {
      alert(response.message);
    }
  },'json');
}

function requestRemoveCart(arrParams) {
  //console.log(arrParams);
  const id_item_temporal = arrParams.id_item;

  $.post(base_url + 'Inicio/quitarItem', {arrParams}, function(response) {
    //console.log('item temporal : ' + id_item_temporal);
    console.log(response);

    $('#btn-quitar_item-' + arrParams.id_item).prop('disabled', false);
    if( response.status == 'success' ){
      $('#modal-cart_shop-id_item' + id_item_temporal).remove();

      const sCaracterPalabra = (response.count > 1 ? 's' : '');
      
      $('#span-cart-global_cantidad').html(response.count);
      $('#div-cart_items').html(response.count + ' producto' + sCaracterPalabra);
      $('#div-cart_total').html(signo_moneda + ' ' + response.total_item);

      $('#div-footer-cart').show();

      const count_item = (response.count_item != null ? response.count_item : 0);

      if(count_item>0){
        $('#btn-agregar_item-' + arrParams.id_item).html('Agregar <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">' + count_item + '</span>');
      } else {
        $('#btn-agregar_item-' + arrParams.id_item).html('Agregar');
      }

      if(response.count==0){//ocultar footer porque ya no hay registros  
        $('#div-footer-cart').hide();
      }
      modalCartShop();
    } else {
      alert(response.message);
    }
  },'json');
}

function modalCartShop(){
  var sHmtlModalCartShopSinItem = '';
  $.ajax({
    url: base_url + 'Inicio/modalCartShop',
    type: "POST",
    dataType: 'json',
    data: {},
    success: function (response) {
      console.log(response);
      if(response.status=='success'){
        if(parseInt(response.count) > 0) {
          $('.modal-cart_shop-footer').removeClass('d-none');
          $('#modal-cart-items').html('');
          for(i in response.result){
            var row = response.result[i];
            console.log(row);

            sHmtlModalCartShopSinItem += '<div class="row div-line pb-2" id="modal-cart_shop-id_item' + row.id_item + '">';
              sHmtlModalCartShopSinItem += '<div class="col-12">';
                sHmtlModalCartShopSinItem += '<div class="modal-cart_shop-div_item" id="">';
                  sHmtlModalCartShopSinItem += '<a href="#" class="modal-cart_shop-img_item">';
                    sHmtlModalCartShopSinItem += '<img src="' + row.url_imagen_item + '" class="shadow-sm bg-body rounded">';
                  sHmtlModalCartShopSinItem += '</a>';
                  sHmtlModalCartShopSinItem += '<div class="modal-cart_shop-body_item ps-3">';
                    sHmtlModalCartShopSinItem += '<h3 class="modal-cart_shop-title_item text-dark">' + row.nombre_item + '</h3>';
                    sHmtlModalCartShopSinItem += '<div class="modal-cart_shop-div-precio_item">';
                      sHmtlModalCartShopSinItem += '<span class="fw-bold">';
                      sHmtlModalCartShopSinItem += 'S/ <span data-total_item="" data-id_item="">' + row.total_item + '</span>';
                      sHmtlModalCartShopSinItem += '</span>';
                    sHmtlModalCartShopSinItem += '</div>';
                    
                    sHmtlModalCartShopSinItem += '<div class="row">';
                      sHmtlModalCartShopSinItem += '<div class="col-6">';
                        sHmtlModalCartShopSinItem += '<div class="modal-cart_shop-cantidad_item" style="float: left;">';
                          sHmtlModalCartShopSinItem += '<p class="fs-6 mt-1 mb-1">Cant: ' + row.cantidad_item +  '</p>';
                        sHmtlModalCartShopSinItem += '</div>';
                      sHmtlModalCartShopSinItem += '</div>';

                      sHmtlModalCartShopSinItem += '<div class="col-6">';
                        sHmtlModalCartShopSinItem += '<div class="modal-cart_shop-div-eliminar_item">';
                          sHmtlModalCartShopSinItem += '<button class="btn btn-default text-danger btn-quitar_item" id="btn-quitar_item-' + row.id_item + '" data-id_unidad_medida_2="' + row.id_unidad_medida_2 + '" data-id_unidad_medida="' + row.id_unidad_medida + '" data-id_item="' + row.id_item + '" data-cantidad_item="' + row.cantidad_item + '" data-precio_item="' + row.precio_item + '" data-nombre_item="' + row.nombre_item + '" data-url_imagen_item="' + row.url_imagen_item + '">';
                          sHmtlModalCartShopSinItem += '<i aria-hidden="true" class="fas fa-trash-alt text-danger"></i> Eliminar';
                          sHmtlModalCartShopSinItem += '</button>';
                        sHmtlModalCartShopSinItem += '</div>';
                      sHmtlModalCartShopSinItem += '</div>';
                  sHmtlModalCartShopSinItem += '</div>';
                  sHmtlModalCartShopSinItem += '</div>';
                sHmtlModalCartShopSinItem += '</div>';
              sHmtlModalCartShopSinItem += '</div>';
            sHmtlModalCartShopSinItem += '</div>';
          }

          $('#modal-cart-items').html(sHmtlModalCartShopSinItem);
          
          sHmtlModalCartShopSinItem='';
          sHmtlModalCartShopSinItem += '<div class="container">';
            sHmtlModalCartShopSinItem += '<div class="row">';
              sHmtlModalCartShopSinItem += '<div class="col">';
                sHmtlModalCartShopSinItem += '<span id="modal-total_cantidad-cart_shop" class="fw-bold">Cantidad: <label id="label-total_cantidad">' + response.count + '</label></span>';
              sHmtlModalCartShopSinItem += '</div>';
              sHmtlModalCartShopSinItem += '<div class="col" style="text-align: right;">';
                sHmtlModalCartShopSinItem += '<span id="modal-total_importe-cart_shop" class="fw-bold">Total: <label id="label-total_importe">' + $('#hidden-global-signo_moneda').val() + ' ' + response.total_item + '</label></span>';
              sHmtlModalCartShopSinItem += '</div>';
            sHmtlModalCartShopSinItem += '</div>';
          sHmtlModalCartShopSinItem += '</div>';

          $('#modal-footer_total').html(sHmtlModalCartShopSinItem);
        } else {
          $('.modal-cart_shop-footer').addClass('d-none');

          $('#modal-footer_total').html('');
  
          sHmtlModalCartShopSinItem += '<div class="container py-5 px-5 text-center">';
            sHmtlModalCartShopSinItem += '<i class="mb-3 fa-solid fa-cart-shopping fa-3x"></i><br>';
            sHmtlModalCartShopSinItem += '<h6><span class="fw-semibold">Tu carrito de compras está vacío</span></h6>';
            sHmtlModalCartShopSinItem += '<a type="button" href="' + base_url + '" rel="noopener noreferrer" class="mt-3 btn btn-primary">Seguir a comprando</a>';
          sHmtlModalCartShopSinItem += '</div>';
        
          $('#modal-cart-items').html(sHmtlModalCartShopSinItem);
        }
      } else {
        $('.modal-cart_shop-footer').addClass('d-none');

        $('#modal-footer_total').html('');

        sHmtlModalCartShopSinItem += '<div class="container py-5 px-5 text-center">';
          sHmtlModalCartShopSinItem += '<i class="mb-3 fa-solid fa-cart-shopping fa-3x"></i><br>';
          sHmtlModalCartShopSinItem += '<h6><span class="fw-semibold">Tu carrito de compras está vacío</span></h6>';
          sHmtlModalCartShopSinItem += '<a type="button" href="' + base_url + '" rel="noopener noreferrer" class="mt-3 btn btn-primary">Seguir a comprando</a>';
        sHmtlModalCartShopSinItem += '</div>';
      
        $('#modal-cart-items').html(sHmtlModalCartShopSinItem);

        console.log(response.message);
      }
    }
  })
}

function addPedido(arrParams){
  $( '.btn-completar_pedido' ).text('');
  $( '.btn-completar_pedido' ).attr('disabled', true);
  $( '.btn-completar_pedido' ).append( 'Guardando <i class="fa fa-refresh fa-spin fa-lg fa-fw"></i>' );

  //console.log(arrParams);
  $.ajax({
    url: base_url + 'Payment/addPedido',
    type: "POST",
    dataType: 'json',
    data: {
      arrParams
    },
    success: function (response) {
      //console.log(response);

      if( response.status == 'success' ){
        //alert(response.message);
        //setTimeout(function () {
        //window.location = base_url + "Payment/thank";
        //}, 1200);

        window.location = base_url + "Payment/thank/" + response.result.id_pedido;
      } else {
        alert(response.message);
      }

      $( '.btn-completar_pedido' ).text('');
      $( '.btn-completar_pedido' ).append( 'Finalizar pedido' );
      $( '.btn-completar_pedido' ).attr('disabled', false);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('Problemas al registrar. Intentar más tarde.')
      
      //Message for developer
      console.log(jqXHR.responseText);
      
      $( '.btn-completar_pedido' ).text('');
      $( '.btn-completar_pedido' ).append( 'Finalizar pedido' );
      $( '.btn-completar_pedido' ).attr('disabled', false);
    }
  });
}

function checkEmail(email){
  var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
  if (caract.test(email) == false){
    $( '#txt-email' ).closest('.form-group').find('.help-block').html('Email inválido');
    $( '#txt-email' ).closest('.form-group').addClass('has-success').removeClass('has-error');
    $( '#txt-email' ).closest('.form-group').find('.help-block').removeClass('interno-span-primary');
    return false;
  }else{
    $( '#txt-email' ).closest('.form-group').find('.help-block').html('Email válido');
    $( '#txt-email' ).closest('.form-group').removeClass('has-success').addClass('has-error');
    $( '#txt-email' ).closest('.form-group').find('.help-block').addClass('interno-span-primary');
    return true;
  }
}

function scrollToError( $sMetodo, $IdElemento ){
  $sMetodo.animate({
    scrollTop: $IdElemento.offset().top - 100
  }, 'slow');
}