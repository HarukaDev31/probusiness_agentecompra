<main>
  <?php
  echo phpinfo();
  ?>
  <div class="container mt-4">
  <?php
  $attributes = array('id' => 'form-arrItems', 'enctype' => 'multipart/form-data');
  echo form_open('', $attributes);
  ?>
    <div class="row">
      <div class="col-12 col-sm-6 col-md-6">
        <div class="col-12 col-sm-12 col-md-12">
          <h2 class="text-left mb-3 fw-bold">Cliente</h2>
          <div class="card" style="border: none;">
            <div class="card-body shadow-sm p-3 bg-body rounded">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">Nombres y Apellidos <span class="label-advertencia text-danger"> *</span></label>
                  <div class="form-group">
                    <input type="text" inputmode="text" id="payment-nombre_cliente" name="name" class="form-control required" placeholder="Ingresar" maxlength="100" autocomplete="name">
                    <span class="help-block text-danger" id="error"></span>
                  </div>
                </div>
                
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">WhatsApp <span class="label-advertencia text-danger"> *</span></label>
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
          <h2 class="text-left mb-3 fw-bold">Empresa</h2>
          <div class="card" style="border: none;">
            <div class="card-body shadow-sm p-3 bg-body rounded">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">País <span class="label-advertencia text-danger"> *</span></label>
                  <div class="form-group">
                    <select  id="cbo-pais" name="ID_Pais" class="form-control form-select-lg" style="width:100%;"><!-- form-select -->
                      <option value="0" selected="selected">- Elegir -</option>
                      <?php foreach ($arrPaises['result'] as $row) { ?>
                        <option value="<?php echo $row->ID_Pais; ?>"><?php echo $row->No_Pais; ?></option>
                      <?php } ?>
                    </select>
                    <span class="help-block text-danger" id="error"></span>
                  </div>
                </div>
                
                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">RUC</label>
                  <div class="form-group">
                    <input type="text" inputmode="text" id="payment-numero_documento_identidad_empresa" name="Nu_Documento_Identidad" class="form-control input-number_letter" placeholder="Opcional" maxlength="16" autocomplete="on">
                    <span class="help-block text-danger" id="error"></span>
                  </div>
                </div>

                <div class="col-12 col-sm-12 col-md-12 mb-3">
                  <label class="fw-bold">Empresa</label>
                  <div class="form-group">
                    <input type="text" inputmode="text" id="payment-nombre_empresa" name="No_Entidad" class="form-control" placeholder="Opcional" maxlength="100" autocomplete="on">
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
      <h2 class="text-center mt-3 fw-bold">Productos</h2>
      <div id="div-arrItems">
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 mt-2" id="div-button-add_item">
        <div class="d-grid gap">
          <button type="button" id="btn-add_item" class="btn btn-danger btn-lg col">Agregar</button>
        </div>
      </div>
    </div>

    <div id="div-footer-cart" class="fixed-bottom mt-auto py-3 bg-white footer-cart-shadow">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="d-grid">
              <button type="submit" id="btn-enviar_pedido" class="btn btn-success btn-lg col">Enviar pedido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <?php echo form_close(); ?>
  </div><!--div-->

  <?php
  $codigo_pais="51";
  $numero_celular="913656663";
  $phone = $codigo_pais . $numero_celular;
  $message_wp = "Hola 😀 *ProBusiness* estuve en la web deseo más información del *Agente de Compras* 🔎";
  $sURLSendMessageWhatsapp = "https://api.whatsapp.com/send?phone=" . $phone . "&text=" . $message_wp;
  ?>
  <a class="flotante-wp" href="<?php echo $sURLSendMessageWhatsapp; ?>" target="_blank" rel="noopener noreferrer"><img class="size-wp" src="<?php echo base_url("assets/images/whatsapp.png?ver=2.0"); ?>" alt="ProBusiness WhastApp"></a>

</main>