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

  $(document).on('click', '#modal-btn-add_item', function (e) {
    e.preventDefault();

    /*
    var preview = document.getElementById('preview');
    var input = document.getElementById('voucher');
    var file = input.files[0];
    var fr = new FileReader();
    fr.onload = function(e) {
      preview.setAttribute('src', e.target.result);
    }
    fr.readAsDataURL(file);
    */

    var arrParams = {
      'img_producto' : document.getElementById('voucher'),
      'tmp_img' : $('#hidden-tmp_img').val(),
      'size_img' : $('#hidden-size_img').val(),
      'error_img' : $('#hidden-error_img').val(),
      'nombre_comercial' : $('#modal-Txt_Producto').val(),
      'caracteristicas' : $('#modal-Txt_Descripcion').val(),
      'cantidad' : $('#modal-Qt_Producto').val(),
      'link' : $('#modal-Txt_Url_Link_Pagina_Producto').val(),
    };
    addItems(arrParams);
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
      /*
      if(response.status=='success'){
        alert(response.message);
      } else {
        alert(response.message);
      }
      */
    });
  });
});

function addItems(arrParams){
  div_items = '';

  arrParams.caracteristicas = arrParams.caracteristicas.replace(/\r?\n/g, "<br>");
  $('#info-caracteristicas').html(arrParams.caracteristicas);

  var nombre_comercial = (arrParams.nombre_comercial != '' && arrParams.nombre_comercial !== undefined && arrParams.nombre_comercial != null ? arrParams.nombre_comercial : 'Artículo ' + iCounter);

  //visible para mostrar a publico
  div_items += '<div class="card border-0 rounded shadow mt-3">';
    div_items += '<div class="row g-0">';
      div_items += '<div class="col-sm-3 position-relative text-center">';
        div_items += '<img id="img_producto-preview' + iCounter + '" src="" class="cart-size-img img-thumbnail border-0 rounded" alt="">';
      div_items += '</div>';
      div_items += '<div class="col-sm-9">';
        div_items += '<div class="card-body">';
          div_items += '<h2 class="fw-bold card-title mb-3">';
          div_items += '<span id="info-nombre_comercial' + iCounter + '">' + nombre_comercial + '</span>';
          div_items += '</h2>';
          div_items += '<h6 class="card-title mb-3">';
          div_items += '<span class="fw-bold">Cantidad: </span><span id="info-cantidad' + iCounter + '">' + arrParams.cantidad + '</span>';
          div_items += '</h6>';
          div_items += '<h6 class="card-title mb-1">';
          div_items += '<span class="fw-bold">Características:</span>';
          div_items += '</h6>';
          div_items += '<div class="div-caracteristica">';
            div_items += '<p class="card-text p-caracteristica" id="info-caracteristicas' + iCounter + '">';
            div_items += arrParams.caracteristicas;
            div_items += '</p>';
          div_items += '</div>';
          div_items += '<p class="card-text mt-2 text-left">';
            div_items += '<span class="fw-bold">Link: </span><a id="info-link' + iCounter + '" class="btn btn-link p-0 mb-1 text-left" style="text-decoration: none !important;" href="' + arrParams.link + '" target="_blank" rel="noopener noreferrer" role="button">' + arrParams.link + '</a>';
          div_items += '</p>';
        div_items += '</div>';
      div_items += '</div>';
    div_items += '</div>';
  div_items += '</div>';

  //mostrar imagen
  var file = arrParams.img_producto.files[0];

  //oculto para enviar data y guardar
  div_items += '<input type="file" name="addProducto[' + iCounter + '][file_img]">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][id_item]" value="' + iCounter + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][tmp_img]" value="' + arrParams.tmp_img + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][size_img]" value="' + arrParams.size_img + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][error_img]" value="' + arrParams.error_img + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][img_name]" value="' + file.name + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][img_type]" value="' + file.type + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][nombre_comercial]" value="' + nombre_comercial + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][caracteristicas]" value="' + arrParams.caracteristicas + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][cantidad]" value="' + arrParams.cantidad + '">';
  div_items += '<input type="hidden" name="addProducto[' + iCounter + '][link]" value="' + arrParams.link + '">';
  $( '#div-arrItems' ).append(div_items);

  var preview = document.getElementById('img_producto-preview' + iCounter);
  var fr = new FileReader();
  fr.onload = function(e) {
    preview.setAttribute('src', e.target.result);
  }
  fr.readAsDataURL(file);
  
  var preview = document.getElementById('img_producto-preview' + iCounter);
  var fr = new FileReader();
  fr.onload = function(e) {
    preview.setAttribute('src', e.target.result);
  }
  fr.readAsDataURL(file);

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