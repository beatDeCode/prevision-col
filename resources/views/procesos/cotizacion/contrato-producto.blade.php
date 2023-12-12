<div id="fase1">
    <!-- Fase 1-->
    <!-- Declaracion Variables-->
    <?php 
        $botonesWizard1=array(
            '3|1. Producto|active|linkedin|typcn typcn-user-outline',
            '3|2. Asegurados|none|dribbble|typcn typcn-credit-card',
            '3|3. Emisión|none|dribbble|typcn typcn-image',
        );
        $formulariosCreate1=array(
            'cd_producto|select|text|col-md-4|Producto||display:none'=>$busquedaProductos,
            'cd_cobertura|select|text|col-md-4|Cobertura|Empresa||display:none'=>array(),
            'mt_suma_asegurada|select|text|col-md-4|Monto a Riesgo||display:none'=>array(),
            'cd_grupo_familiar|select|text|col-md-4|Grupo Familiar||display:none'=>$busquedaGruposFamiliares,
            'cd_plan_pago|select|text|col-md-4|Plan de Pago||display:none'=>$busquedaPlanesPago,
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
            @include('plantillas.botonesProducto')
            <div id="coberturas"></div>
            <div id="sumas"></div>
            <div id="grupo-familiar"></div>
            <div id="plan-pago"></div>
        <hr class="hr-none">
            <center>
                <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                onclick="fnMoverFase2('formulario-producto')">Siguiente</button>
                
            </center>
            <!--
            <center>
                <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                onclick="fnGenerarPdf()">pdf</button>
                
            </center>
            -->
            
        
    </div>
    <!-- Cierre Cuerpo Fase I-->
</div>