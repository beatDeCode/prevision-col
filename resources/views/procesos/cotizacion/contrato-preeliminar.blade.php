<div id="fase3_" style="display:none;">
    <!-- Fase 1-->
    <!-- Declaracion Variables-->
    <?php 
        $botonesWizard3=array(
            '3|1. Producto|active|dribbble|typcn typcn-user-outline',
            '3|2. Beneficiarios|none|dribbble|typcn typcn-credit-card',
            '3|3. Emisión|none|linkedin|typcn typcn-image',
        );
        $formulariosCreate3=array() ;
        $cantidadDeClonacion3=0;
        $formulariosAClonar3=array();
        $nombreFormulario3='formulario-cotizacion';
        $barra3=array('99|success');
    ?>
    <!-- Cierre Declaracion Variables-->

    <!-- Cuerpo Fase I-->
    @include('plantillas.cabeceraWizard',['barra'=>$barra3,'botonesWizard'=>$botonesWizard3])
    <br>
    <div class="container-fluid">
        <div class="row">
            <select name="cd_plan_pago" style="display:none;"></select>
            <div class="col-md-3" id="div-resumen-preliminar">

            </div>
            <div class="col-md-9">
                <div id="divplanpago"></div>
                <br>
                <hr>
                <div id="botones-cotizacion" style="display:none">
                <div class="col-md-12" style="margin-top:10px;"><div class="badge" style="background-color: #1d4068;color:white;text-align:left;">Cotizacion</div><hr class="hr-none"></div>
                <br>    
                <center>
                    <button class="btn btn-sm btn-outline-info btn-icon-text" onclick="fnCrearCotizacion()">
                    <i class="typcn typcn-download-outline"></i> Visualizar </button>
                    <button class="btn btn-sm btn-outline-info btn-icon-text" onclick="
                    fnMostrarGenerarCotizacion()"><i class="typcn typcn-mail"></i> Cotizar Por Correo
                    </button>
                </center>
                </div>
                <!--<div id="preliminar-factura" style="display:none;">
                    <br>
                    <div class="container-fluid">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr style="background-color:#e7eaed">
                                    <th style="font-size:13px;text-align:center;">Parentesco</th>
                                    <th style="font-size:13px;text-align:center;">Documento</th>
                                    <th style="font-size:13px;text-align:center;">Nombre</th>
                                    <th style="font-size:13px;text-align:center;">¿Es Adicional?</th>
                                    <th style="font-size:13px;text-align:center;">Monto Cuota</th>
                                    <th style="font-size:13px;"text-align:center;></th>
                                </tr>
                                </thead>
                                <tbody id="preliminar" style="font-size:12px;">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                -->
                <hr class="hr-none">
                <center>
                    <button type="button" class="btn btn-sm" 
                        style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                        onclick="fnDevolverFase(3)">Volver</button>
                    <button type="button" class="btn btn-sm" 
                    style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                    onclick="fnMoverFase4('formulario-producto')">Siguiente</button>
                </center>
            </div>
        </div>
    </div>
    <!-- Cierre Cuerpo Fase I-->
</div>