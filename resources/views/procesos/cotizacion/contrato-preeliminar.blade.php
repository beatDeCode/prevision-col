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
            <div class="col-md-3" id="div-resumen-preliminar">

            </div>
            <div class="col-md-9">
                <div id="preliminar-factura">
                    <div class="card">
                        <div class="card-header">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Preliminar de la Cotización del Contrato</h5>
                        </div>
                    </div>
                    <br>
                    <div class="container-fluid">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr style="background-color:#e7eaed">
                                    <th style="font-size:13px;">Parentesco</th>
                                    <th style="font-size:13px;">Documento</th>
                                    <th style="font-size:13px;">Nombre</th>
                                    <th style="font-size:13px;">¿Es Adicional?</th>
                                    <th style="font-size:13px;">Monto Cuota</th>
                                    <th style="font-size:13px;">-</th>
                                </tr>
                                </thead>
                                <tbody id="preliminar" style="font-size:12px;">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <hr class="hr-none">
                <center>
                    <button type="button" class="btn btn-sm" 
                        style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                        onclick="fnDevolverFase(3)">Volver</button>
                    <button type="button" class="btn btn-sm" 
                    style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                    onclick="fnMoverFase3('formulario-producto')">Siguiente</button>
                </center>
            </div>
        </div>
    </div>
    <!-- Cierre Cuerpo Fase I-->
</div>