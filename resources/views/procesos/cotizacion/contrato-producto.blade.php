<div id="fase1" style="display:block;">
    <!-- Fase 1-->
    <!-- Declaracion Variables-->
    <?php 
        $botonesWizard1=array(
            '3|1. Producto|active|linkedin|typcn typcn-user-outline',
            '3|2. Beneficiarios|none|dribbble|typcn typcn-credit-card',
            '3|3. Emisión|none|dribbble|typcn typcn-image',
        );
        $formulariosCreate1=array(
            'cd_producto|select|text|col-md-4|Producto||display:none'=>$busquedaProductos,
            'cd_cobertura|select|text|col-md-4|Cobertura|Empresa||display:none'=>array(),
            'mt_suma_asegurada|select|text|col-md-4|Monto a Riesgo||display:none'=>array(),
            'cd_grupo_familiar|select|text|col-md-4|Grupo Familiar||display:none'=>$busquedaGruposFamiliares,
            //'cd_plan_pago|select|text|col-md-4|Plan de Pago||display:none'=>$busquedaPlanesPago,
            //'cd_tipo_calculo|select|text|col-md-4|Tipo de Cáculo'=>$busquedaTipoCalculoPrima,
            ) ;
        $cantidadDeClonacion1=0;
        $formulariosAClonar1=array();
        $nombreFormulario1='formulario-producto';
        $barra1=array('33|success');
    ?>
    <!-- Cierre Declaracion Variables-->

    <!-- Cuerpo Fase I-->
    @include('plantillas.cabeceraWizard',['barra'=>$barra1,'botonesWizard'=>$botonesWizard1])
    <div class="container-fluid">
            <div style="display:none">
            @include('plantillas.formularioCreate',[
            'formulariosCreate'=>$formulariosCreate1,
            'nombreFormulario'=>$nombreFormulario1,
            'formulariosAClonar'=>$formulariosAClonar1,
            'cantidadDeClonacion'=>$cantidadDeClonacion1 ])
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <br>
                       
                        <div class="card text-left" id="div-resumen-producto">
                        <div class="card-header"></div>
                        <div class="card-body">
                            <h6 class="card-title">Resumen Cotización</h6>
                            <hr style="padding:5px;">
                            
                            <p class="card-subtitle mb-2 " id="p-producto"><i id="i-producto" class="typcn typcn-chevron-right" style="color:red"></i><a style="font-weight:bold;" >Producto:</a></p> 
                            <p class="card-subtitle mb-2 " id="resumen-producto"></p> 

                            <p class="card-subtitle mb-2 " id="p-cobertura"><i id="i-cobertura" class="" style="color:red"></i><a style="font-weight:bold;">Cobertura:</a></p> 
                            <p class="card-subtitle mb-2 " id="resumen-cobertura"></p> 

                            <p class="card-subtitle mb-2 " id="p-suma"><i id="i-suma" class="" style="color:red"></i><a style="font-weight:bold;">Monto a Riesgo:</a></p> 
                            <p class="card-subtitle mb-2 " id="resumen-suma"></p> 

                            <p class="card-subtitle mb-2 " id="p-grupo-familiar"><i id="i-grupo-familiar" class="" style="color:red"></i><a style="font-weight:bold;">Grupo Familiar:</a></p> 
                            <p class="card-subtitle mb-2 " id="resumen-grupo-familiar"></p> 

                            <p class="card-subtitle mb-2 " id="p-plan-pago"><i id="i-plan-pago" class="" style="color:red"></i><a style="font-weight:bold;">Plan de Pago:</a></p> 
                            <p class="card-subtitle mb-2 " id="resumen-plan-pago"></p> 

                            <p class="card-subtitle mb-2 " id="p-adicionales"><i id="i-adicionales" class="" style="color:red"></i><a style="font-weight:bold;">¿Con Adicionales?</a></p> 
                            <p class="card-subtitle mb-2 " id="resumen-adicionales">Sin Adicionales</p>
                            
                            <hr style="padding:5px;">
                            <center><a id="devolver-pasos" class="badge" onclick="fnUbicacionResumen()" class="badge" style="background-color: #1d4068;color:white;display:none;">Devolver</a></center>
                        </div>   
                    </div>
                    <br>
                </div>

                <div class="col-md-9">
                    @include('plantillas.botonesProducto')
                    <div id="divcoberturas"></div>
                    <div id="divsumas"></div>
                    <div id="divgrupofamiliar"></div>
                    <center>
                        <button type="button" class="btn btn-sm" id="boton-fase2"
                        style="background-color: #7c90a7;color: white;margin-bottom:15px;display:none;" 
                        onclick="fnMoverFase2('formulario-producto')">Siguiente</button>
                        
                    </center>
                </div>
            </div>
            
            <!--
            <center>
                <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                onclick="fnGenerarPdf()">pdf</button>
                
            </center>
            -->
            
        
    </div>
    </div>
    <!-- Cierre Cuerpo Fase I-->
</div>