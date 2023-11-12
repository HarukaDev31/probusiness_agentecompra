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
      
      <div class="col-12 col-sm-6 col-md-6">
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

    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 mt-5">
        <div class="d-grid gap">
          <button type="button" id="btn-add_item" class="btn btn-outline-primary col" data-bs-toggle="modal" data-bs-target="#modal-items">Agregar artículo</button>
        </div>
      </div>
    </div>
  
    <!-- array_items -->
    <div id="div-arrItems">
    </div>

    <div class="col-12 col-sm-12" style="cursor: pointer">
                <div class="input-group custom-file-voucher2">
                  <label class="input-group-text" for="voucher2">Subir archivo</label>
                  <input class="form-control form-control-lg" id="voucher2" type="file" name="voucher2" placeholder="sin archivo" accept="image/*">
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
  $attributes = array('id' => 'form-modal_item', 'enctype' => 'multipart/form-data');
  echo form_open('', $attributes);
  ?>
  <!-- Modal -->
  <div class="modal fade" id="modal-items" tabindex="-1" aria-labelledby="modal-items" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold">Artículos</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            
            <input type="text" id="hidden-tmp_img" class="form-control" value="">
            <input type="text" id="hidden-size_img" class="form-control" value="">
            <input type="text" id="hidden-error_img" class="form-control" value="">
            <div class="col-12 col-sm-12 mb-3" style="cursor: pointer">
              <div class="col-12 col-sm-12" style="cursor: pointer">
                <div class="input-group custom-file-voucher">
                  <label class="input-group-text" for="voucher">Subir archivo</label>
                  <input class="form-control form-control-lg" id="voucher" type="file" name="voucher" placeholder="sin archivo" accept="image/*">
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
              <label class="fw-bold">Nombre Comercial</label>
              <div class="form-group">
                <input type="text" inputmode="text" id="modal-Txt_Producto" name="Txt_Producto" class="form-control required" placeholder="" maxlength="255" autocomplete="name">
                <span class="help-block text-danger" id="error"></span>
              </div>
            </div>
            
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
              <label class="fw-bold">Características <span class="label-advertencia text-danger"> *</span></label>
              <div class="form-group">
                <textarea class="form-control required" placeholder="" id="modal-Txt_Descripcion" name="Txt_Descripcion" style="height: 100px"></textarea>
                <span class="help-block text-danger" id="error"></span>
              </div>
            </div>
            
            <div class="col-12 col-sm-3 col-md-3 col-lg-2 mb-3">
              <label class="fw-bold">Cantidad <span class="label-advertencia text-danger"> *</span></label>
              <div class="form-group">
                <input type="text" id="modal-Qt_Producto" inputmode="decimal" name="Qt_Producto" class="form-control input-decimal required" placeholder="" value="" autocomplete="off">
                <span class="help-block text-danger" id="error"></span>
              </div>
            </div>

            <div class="col-12 col-sm-9 col-md-9 col-lg-10 mb-3">
              <label class="fw-bold">Link <span class="label-advertencia text-danger"> *</span></label>
              <div class="form-group">
                <input type="text" inputmode="url" id="modal-Txt_Url_Link_Pagina_Producto" name="Txt_Url_Link_Pagina_Producto" class="form-control required" placeholder="" autocomplete="off">
                <span class="help-block text-danger" id="error"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary col" data-bs-dismiss="modal">Salir</button>
          <button type="button" class="btn btn-primary col" id="modal-btn-add_item">Agregar</button>
          <!--<button type="submit" class="btn btn-primary col" id="modal-btn-add_item">Agregar</button>-->
        </div>
      </div>
    </div>
  </div>
  <?php echo form_close(); ?>

  <?php
  $codigo_pais="51";
  $numero_celular="932531441";
  $phone = $codigo_pais . $numero_celular;
  $message_wp = "Hola *ProBusiness*. Me gustaría comprar el producto de tu tienda.";
  $sURLSendMessageWhatsapp = "https://api.whatsapp.com/send?phone=" . $phone . "&text=" . $message_wp;
  ?>
  <a class="flotante-wp" href="<?php echo $sURLSendMessageWhatsapp; ?>" target="_blank" rel="noopener noreferrer"><img class="size-wp" src="<?php echo base_url("assets/images/whatsapp.png?ver=2.0"); ?>" alt="ProBusiness WhastApp"></a>

</main>