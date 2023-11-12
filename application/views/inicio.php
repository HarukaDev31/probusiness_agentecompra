<main><br><br>
  <div class="container mt-5">
  <?php
  $attributes = array('id' => 'form-arrItems', 'enctype' => 'multipart/form-data');
  echo form_open('', $attributes);
  ?>
    <div class="row">
      <div class="col-12 col-sm-6 col-md-6">
        <div class="col-12 col-sm-12 col-md-12">
          <h2 class="text-left mb-3 fw-bold">Datos de Cliente</h2>
          <div class="card" style="border: none;">
            <div class="card-body shadow p-3 bg-body rounded">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">Nombres y Apellidos <span class="label-advertencia text-danger"> *</span></label>
                  <div class="form-group">
                    <input type="text" inputmode="text" id="payment-nombre_cliente" name="name" class="form-control required" placeholder="Ingresar" maxlength="100" autocomplete="name">
                    <span class="help-block text-danger" id="error"></span>
                  </div>
                </div>
                
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">Celular <span class="label-advertencia text-danger"> *</span></label>
                  <div class="form-group">
                    <input type="tel" inputmode="tel" id="payment-celular_cliente" name="tel" class="form-control required input-number" placeholder="Ingresar" maxlength="9" autocomplete="tel">
                    <span class="help-block text-danger" id="error"></span>
                  </div>
                </div>
                
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">Email <span class="label-advertencia text-danger"> *</span></label>
                  <div class="form-group">
                    <input type="text" id="payment-email" inputmode="email" name="email" class="form-control required" placeholder="Ingresar" maxlength="100" autocomplete="email" autocapitalize="none">
                    <span class="help-block text-danger" id="error"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!--col left-->
      
      <div class="col-12 col-sm-6 col-md-6 mt-3 mt-sm-0">
        <div class="col-12 col-sm-12 col-md-12">
          <h2 class="text-left mb-3 fw-bold">Datos de Empresa</h2>
          <div class="card" style="border: none;">
            <div class="card-body shadow p-3 bg-body rounded">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">País <span class="label-advertencia text-danger"> *</span></label>
                  <div class="form-group">
                    <select  id="cbo-departamento" name="ID_Pais" class="form-select">
                      <option value="0" selected="selected">- Seleccionar -</option>
                      <?php foreach ($arrPaises['result'] as $row) { ?>
                        <option value="<?php echo $row->ID_Pais; ?>"><?php echo $row->No_Pais; ?></option>
                      <?php } ?>
                    </select>
                  </div>
                  <span class="help-block text-danger" id="error"></span>
                </div>

                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">Empresa <span class="label-advertencia text-danger"> *</span></label>
                  <div class="form-group">
                    <input type="text" inputmode="text" id="payment-nombre_empresa" name="No_Entidad" class="form-control required" placeholder="Ingresar" maxlength="100" autocomplete="on">
                    <span class="help-block text-danger" id="error"></span>
                  </div>
                </div>
                
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">RUC <span class="label-advertencia text-danger"> *</span></label>
                  <div class="form-group">
                    <input type="text" inputmode="numeric" id="payment-numero_documento_identidad_empresa" name="Nu_Documento_Identidad" class="form-control required input-number_letter" placeholder="Ingresar" maxlength="16" autocomplete="on">
                    <span class="help-block text-danger" id="error"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!--col left-->
    </div><!--row-->
  
    <!-- array_items -->
    <div>
      <h2 class="text-center mt-3 fw-bold">Artículos</h2>
      <div id="div-arrItems">
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 mt-2" id="div-button-add_item">
        <div class="d-grid gap">
          <!--<button type="button" id="btn-add_item" class="btn btn-outline-primary col" data-bs-toggle="modal" data-bs-target="#modal-items">Agregar artículo</button>-->
          <button type="button" id="btn-add_item" class="btn btn-secondary col">Agregar artículo</button>
        </div>
      </div>
    </div>

    <div id="div-footer-cart" class="fixed-bottom mt-auto py-3 bg-white footer-cart-shadow" data-bs-toggle="modal" data-bs-target="#modal_cart_shop">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="d-grid">
              <button type="submit" id="btn-enviar_pedido" class="btn btn-primary btn-lg col">Enviar pedido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <?php echo form_close(); ?>
  </div><!--div-->

  <?php
  $codigo_pais="51";
  $numero_celular="932531441";
  $phone = $codigo_pais . $numero_celular;
  $message_wp = "Hola *ProBusiness*. Me gustaría comprar el producto de tu tienda.";
  $sURLSendMessageWhatsapp = "https://api.whatsapp.com/send?phone=" . $phone . "&text=" . $message_wp;
  ?>
  <a class="flotante-wp" href="<?php echo $sURLSendMessageWhatsapp; ?>" target="_blank" rel="noopener noreferrer"><img class="size-wp" src="<?php echo base_url("assets/images/whatsapp.png?ver=2.0"); ?>" alt="ProBusiness WhastApp"></a>

</main>