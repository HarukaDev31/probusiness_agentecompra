var div_items = '', iCounter = 1;
$(document).ready(function () {
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

    //$('#btn-file_voucher').prop('disabled', true);
    //$('#btn-file_voucher').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando');

    var postData = new FormData($("#form-arrItems")[0]);
    console.log(postData);
    $.ajax({
      url: base_url + 'Inicio/enviarPedido',
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
      if(response.status=='success'){
        alert(response.message);
      } else {
        alert(response.message);
      }
    });
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
          //div_items += '<div class="input-group custom-file-voucher pt-2">';
            //div_items += '<input class="form-control voucher " id="voucher' + iCounter + '" type="file" name="voucher[]" data-id="' + iCounter + '" onchange="loadFile(event, ' + iCounter + ')" placeholder="sin archivo" accept="image/*">';
            div_items += '<label class="btn btn btn-outline-secondary" for="voucher' + iCounter + '" style="width: 100%;">';
              div_items += '<input class="form-control voucher " id="voucher' + iCounter + '" type="file" style="display:none" name="voucher[]" data-id="' + iCounter + '" onchange="loadFile(event, ' + iCounter + ')" placeholder="sin archivo" accept="image/*">Agregar foto';
            div_items += '</label>';
          //div_items += '</div>';
        div_items += '</div>';
        div_items += '<img id="img_producto-preview' + iCounter + '" src="" class=" img-thumbnail border-0 rounded" alt="">'; //cart-size-img
      div_items += '</div>';
    
      div_items += '<div class="col-sm-8">';
        div_items += '<div class="card-body">';
          div_items += '<div class="row">';
            div_items += '<div class="col-sm-12 mb-3">';
              div_items += '<h6 class="card-title">';
                div_items += '<span class="fw-bold">Nombre Comercial</span>';
              div_items += '</h6>';
              div_items += '<input type="text" inputmode="text" id="modal-nombre_comercial' + iCounter + '" name="addProducto[' + iCounter + '][nombre_comercial]" class="form-control required" placeholder="" maxlength="255" autocomplete="off">';
            div_items += '</div>';
            
            div_items += '<div class="col-sm-12 mb-3">';
              div_items += '<h6 class="card-title">';
                div_items += '<span class="fw-bold">Características</span>';
              div_items += '</h6>';
              div_items += '<textarea class="form-control required" placeholder="" id="modal-caracteristicas' + iCounter + '" name="addProducto[' + iCounter + '][caracteristicas]" style="height: 100px"></textarea>';
            div_items += '</div>';
            
            div_items += '<div class="col-12 col-sm-3 col-md-3 col-lg-2 mb-3">';
              div_items += '<h6 class="card-title">';
                div_items += '<span class="fw-bold">Cantidad</span>';
              div_items += '</h6>';
              div_items += '<input type="text" id="modal-cantidad' + iCounter + '" inputmode="decimal" name="addProducto[' + iCounter + '][cantidad]" class="form-control input-decimal required" placeholder="" value="" autocomplete="off">';
            div_items += '</div>';
            
            div_items += '<div class="col-12 col-sm-9 col-md-9 col-lg-10 mb-1">';
              div_items += '<h6 class="card-title">';
                div_items += '<span class="fw-bold">Link</span>';
              div_items += '</h6>';
              div_items += '<input type="text" inputmode="url" id="modal-link' + iCounter + '" name="addProducto[' + iCounter + '][link]" class="form-control required" placeholder="" autocomplete="off">';
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
    scrollTop: $IdElemento.offset().top
  }, 'slow');
}

function loadFile(event, id){
  var output = document.getElementById('img_producto-preview' + id);
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }

  scrollToError($("html, body"), $('#modal-nombre_comercial' + id));
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