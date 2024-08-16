var div_items = '', iCounter = 1;
let maxContentSize = 1024 * 1024 * 200; // 2MB
$(document).ready(function () {
  $("#cbo-pais").select2({
    placeholder: '- Elegir -',
    allowClear: true
  });

  $('.input-number').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  $( '.input-number_letter' ).on('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g,'');
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

  $("#voucher").change(function() {
    var postData = new FormData($("#form-modal_item")[0]);
    console.log(postData);
    $.ajax({
      url: base_url + 'Inicio/setImagenInputFile',
      type: "POST",
      dataType: "JSON",
      data: postData,
      processData: false,
      contentType: false
    })
    .done(function(response) {
      //$('#btn-file_voucher').prop('disabled', false);
      //$('#btn-file_voucher').html('Enviar');

      console.log(response);
      //console.log(response[0]);
      if(response.length > 0){
        //console.log('opaso');
        $('#hidden-tmp_img').val(response[0].tmp_name);
        $('#hidden-size_img').val(response[0].size);
        $('#hidden-error_img').val(response[0].error);
      } else {
        alert('Problemas al cargar imagen');
      }
      /*
      if(response.status=='success'){
        alert(response.message);
      } else {
        alert(response.message);
      }
      */
    });
  });

  $(document).on('click', '#btn-add_item', function (e) {
    e.preventDefault();
    addItems();

    $('#div-button-add_item').removeClass('mt-2');
    $('#div-button-add_item').addClass('mt-4');
  })

  $("#form-arrItems").on('submit',function(e){
    
    e.preventDefault();

    $('.help-block').empty();
    $('.form-group').removeClass('has-error');

    if ($("#payment-nombre_cliente").val().trim().length < 3) {
      $('#payment-nombre_cliente').closest('.form-group').find('.help-block').html('Ingresar Nombre');
      $('#payment-nombre_cliente').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#payment-nombre_cliente'));
    } else if ($("#payment-celular_cliente").val().trim().length < 9) {
      $('#payment-celular_cliente').closest('.form-group').find('.help-block').html('Ingresar WhatsApp');
      $('#payment-celular_cliente').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#payment-celular_cliente'));
    } else if (!checkEmail($('#payment-email').val())) {
      $('#payment-email').closest('.form-group').find('.help-block').html('Email inválido');
      $('#payment-email').closest('.form-group').addClass('has-success').removeClass('has-error');

      scrollToError($("html, body"), $('#payment-email'));
    } else if ($("#cbo-pais").val().trim() == 0) {
      $('#cbo-pais').closest('.form-group').find('.help-block').html('Elegeir País');
      $('#cbo-pais').closest('.form-group').removeClass('has-success').addClass('has-error');

      scrollToError($("html, body"), $('#cbo-pais'));
    } else {
      //validacion de articulos
      var sEstadoArticulos = true;
      $("#form-arrItems").find(':input').each(function () {
        var elemento = this;
        console.log(' id > ' + elemento.id);
        console.log('elemento > ');
        console.log(elemento);

        //if ( $("#modal-nombre_comercial1").length > 0 ) {
          if (elemento.classList[0]=='arrProducto'){
            if(elemento.type=='file'){
              if( document.getElementById(elemento.id).files.length == 0 ){
                $('#' + elemento.id).closest('.form-group').find('.help-block').html('Subir foto');
                $('#' + elemento.id).closest('.form-group').removeClass('has-success').addClass('has-error');

                scrollToError($("html, body"), $('#card' + elemento.dataset.id));
                sEstadoArticulos = false;
                return false;
              }
            }

            if(elemento.type=='textarea' || elemento.type=='text'){
              if (elemento.classList[2]=='required'){
                if(elemento.classList[3]=='caracteristicas'){
                  if ($('#' + elemento.id).val().trim().length < 5) {
                    $('#' + elemento.id).closest('.form-group').find('.help-block').html('Ingresar características');
                    $('#' + elemento.id).closest('.form-group').removeClass('has-success').addClass('has-error');
        
                    scrollToError($("html, body"), $('#' + elemento.id));
                    sEstadoArticulos = false;
                    return false;
                  }
                }
                
                /*
                if(elemento.classList[3]=='cantidad'){
                  if ($('#' + elemento.id).val().trim() < 1) {
                    $('#' + elemento.id).closest('.form-group').find('.help-block').html('Falta cantidad');
                    $('#' + elemento.id).closest('.form-group').removeClass('has-success').addClass('has-error');
        
                    scrollToError($("html, body"), $('#' + elemento.id));
                    sEstadoArticulos = false;
                    return false;
                  }
                }
                
                if(elemento.classList[3]=='link'){
                  if ($('#' + elemento.id).val().trim() < 20) {
                    $('#' + elemento.id).closest('.form-group').find('.help-block').html('Ingresar link');
                    $('#' + elemento.id).closest('.form-group').removeClass('has-success').addClass('has-error');
        
                    scrollToError($("html, body"), $('#' + elemento.id));
                    sEstadoArticulos = false;
                    return false;
                  }
                }
                */
              }
            }
          }
          /*
        } else {
          alert('Agregar artículos');
          sEstadoArticulos = false;
          return false;
        }
        */
      });
      //validacion de articulos
      
      if(sEstadoArticulos==true) {
   

        var postData = new FormData($("#form-arrItems")[0]);
        //check if post data size is less than maxContentSize
        if (getFormDataSize(postData) > maxContentSize) {
          //show sweet alert error
          alert('El tamaño de los archivos no debe superar los ' + (maxContentSize/1024/1024) + 'MB'+
          'Intente enviarlo en pedidos separados'
        );

          return false;
        }
        $('#btn-enviar_pedido').prop('disabled', true);
        $('#btn-enviar_pedido').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando');
        $.ajax({
          url: base_url + 'Inicio/enviarPedido',
          type: "POST",
          dataType: "JSON",
          data: postData,
          processData: false,
          contentType: false
        })
        .done(function(response) {
          $('#btn-enviar_pedido').prop('disabled', false);
          $('#btn-enviar_pedido').html('Enviar pedido');

          console.log(response);
          if(response.status=='success'){
            //alert(response.message);

            window.location = base_url + "Inicio/thank/" + response.result.id;
          } else {
            alert(response.message);
          }
        });
      }
    }
  });

  $(document).on('click', '.btn-quitar_item', function (e) {
    e.preventDefault();
    //alert($(this).data('id'));
    $('#card' + $(this).data('id')).remove();
	})
});

function addItems(){
  div_items = '';

  //visible para mostrar a publico
  div_items += '<div id="card' + iCounter + '" class="card border-0 rounded shadow mt-3">';
    div_items += '<div class="row">';
      div_items += '<div class="col-sm-4 position-relative text-center ps-4 pe-3 pe-sm-0">';
        div_items += '<div class="col-sm-12">';
          div_items += '<h6 class="text-left card-title mb-2 pt-3" style="text-align: left;">';
            div_items += '<span class="fw-bold">Imagen</span>';
          div_items += '</h6>';
          div_items += '<div class="form-group">';
            div_items += '<label class="btn btn btn-outline-secondary" for="voucher' + iCounter + '" style="width: 100%;">';
              div_items += '<input class="arrProducto form-control voucher" id="voucher' + iCounter + '" type="file" style="display:none" name="voucher[]" data-id="' + iCounter + '" onchange="loadFile(event, ' + iCounter + ')" placeholder="sin archivo" accept="image/*">Agregar foto';
            div_items += '</label>';
            div_items += '<span class="help-block text-danger" id="error"></span>';
          div_items += '</div>';
        div_items += '</div>';
        div_items += '<img id="img_producto-preview' + iCounter + '" src="" class="arrProducto img-thumbnail border-0 rounded" alt="">'; //cart-size-img
      div_items += '</div>';
    
      div_items += '<div class="col-sm-8">';
        div_items += '<div class="card-body">';
          div_items += '<div class="row">';
            div_items += '<div class="col-sm-12 mb-3">';
              div_items += '<h6 class="card-title">';
                div_items += '<span class="fw-bold">Nombre Comercial</span>';
              div_items += '</h6>';
              div_items += '<input type="text" inputmode="text" data-id="' + iCounter + '" id="modal-nombre_comercial' + iCounter + '" name="addProducto[' + iCounter + '][nombre_comercial]" class="arrProducto form-control" placeholder="" maxlength="255" autocomplete="off">';
            div_items += '</div>';
            
            div_items += '<div class="col-sm-12 mb-3">';
              div_items += '<h6 class="card-title">';
                div_items += '<span class="fw-bold">Características</span>';
              div_items += '</h6>';
              div_items += '<div class="form-group">';
                div_items += '<textarea class="arrProducto form-control required caracteristicas" placeholder="" data-id="' + iCounter + '" id="modal-caracteristicas' + iCounter + '" name="addProducto[' + iCounter + '][caracteristicas]" style="height: 100px"></textarea>';
                div_items += '<span class="help-block text-danger" id="error"></span>';
              div_items += '</div>';
            div_items += '</div>';
            
            div_items += '<div class="col-12 col-sm-3 col-md-3 col-lg-2 mb-3">';
              div_items += '<h6 class="card-title">';
                div_items += '<span class="fw-bold">Cantidad</span>';
              div_items += '</h6>';
              div_items += '<div class="form-group">';
                div_items += '<input type="text" id="modal-cantidad' + iCounter + '" inputmode="decimal" data-id="' + iCounter + '" name="addProducto[' + iCounter + '][cantidad]" class="arrProducto form-control cantidad input-decimal" placeholder="" value="" autocomplete="off">';
                div_items += '<span class="help-block text-danger" id="error"></span>';
              div_items += '</div>';
            div_items += '</div>';
            
            div_items += '<div class="col-12 col-sm-9 col-md-9 col-lg-10 mb-1">';
              div_items += '<h6 class="card-title">';
                div_items += '<span class="fw-bold">Link</span>';
              div_items += '</h6>';
              div_items += '<div class="form-group">';
                div_items += '<input type="text" inputmode="url" id="modal-link' + iCounter + '" data-id="' + iCounter + '" name="addProducto[' + iCounter + '][link]" class="arrProducto form-control link" placeholder="" autocomplete="off" autocapitalize="none">';
                div_items += '<span class="help-block text-danger" id="error"></span>';
              div_items += '</div>';
            div_items += '</div>';
          div_items += '</div>';
        div_items += '</div>';
      div_items += '</div>';

      div_items += '<div class="col-sm-12 ps-4 mb-3 pe-4">';
        div_items += '<div class="d-grid gap">';
          div_items += '<button type="button" id="btn-quitar_item_'+iCounter+'" class="btn btn-outline-danger btn-quitar_item col" data-id="'+iCounter+'">Quitar</button>';
        div_items += '</div>';
      div_items += '</div>';
    div_items += '</div>';
  div_items += '</div>';

  $( '#div-arrItems' ).append(div_items);
  
  validateNumberLetter();
  validateDecimal();

  ++iCounter;
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

function scrollToErrorHTML( $sMetodo, $IdElemento ){
  $sMetodo.animate({
    scrollTop: $IdElemento.offset().top + 450
  }, 'slow');
}

function scrollToIOS( $sMetodo, $IdElemento ){
  $sMetodo.animate({
    scrollTop: $IdElemento.offset().top
  }, 'slow');
}

function loadFile(event, id){
  var output = document.getElementById('img_producto-preview' + id);
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }

  window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  //if(iOS==true && window.mobileCheck()==true){
  if(window.mobileCheck()==true){
    scrollToIOS($("html, body"), $('#modal-nombre_comercial' + id));
  }

  $('#modal-nombre_comercial' + id).focus();
  $('#modal-nombre_comercial' + id).select();
}

function validateNumberLetter(){
  $( '.input-number_letter' ).unbind();
  $( '.input-number_letter' ).on('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g,'');
  });
}

function validateDecimal(){
  $( '.input-decimal' ).unbind();
  $( '.input-decimal' ).on('input', function () {
    numero = parseFloat(this.value);
    if(!isNaN(numero)){
      this.value = this.value.replace(/[^0-9\.]/g,'');
      if (numero < 0)
        this.value = '';
    } else
      this.value = this.value.replace(/[^0-9\.]/g,'');
  });
}

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
function getFormDataSize(formData) {
 let totalSize = 0;

  // Iterar sobre todos los pares clave/valor en el FormData
  for (let pair of formData.entries()) {
      // Si el valor es un archivo, obtener su tamaño
      if (pair[1] instanceof File) {
          totalSize += pair[1].size;
      } else {
          // De lo contrario, contar la longitud del valor como cadena
          totalSize += new Blob([pair[1]]).size;
      }
  }

  return totalSize;
}

