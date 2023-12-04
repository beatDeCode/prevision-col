<div id="fase2" style="display:none;">
    <!-- Fase 2-->
    <!-- Declaracion Variables-->
    <?php 
        $botonesWizard2=array(
            '3|1. Producto|none|dribbble|typcn typcn-user-outline',
            '3|2. Carga Colectivos|active|linkedin|typcn typcn-credit-card',
            '3|3. Emisión|none|dribbble|typcn typcn-image',
        );
        $formulariosCreate2=array(
            'nm_completo|input|text|col-md-4|Nombres'=>array(),
            'nm_persona1|input|hidden|col-md-2|Nombres|Contrato'=>array(),
            'ap_persona1|input|hidden|col-md-2|Apellidos|Colectivo'=>array(),
            'tp_documento|select|text|col-md-2|Tipo'=>$busquedaTipoDocumento,
            'nu_documento|input|text|col-md-2|Documento'=>array(),
            'fe_nacimiento|input|date|col-md-2|Nacimiento'=>array(),
            'cd_sexo|select|text|col-md-2|Sexo'=>$busquedaSexos,
            'cd_estado|select|text|col-md-2|Estado'=>$busquedaEstados,
            'cd_municipio|select|text|col-md-2|Municipio'=>array(),
            'cd_parroquia|select|text|col-md-2|Parroquia'=>array(),
            'de_direccion|input|text|col-md-6|Dirección'=>array(),
            'nu_area|select|text|col-md-2|Area'=>$busquedaAreasTelefonicas,
            'nu_telefono|input|text|col-md-2|Número de Teléfono'=>array(),
            'de_correo|input|text|col-md-3|Correo'=>array(),
            'espacion1|div|text|col-md-6|Espacio'=>array(),
            'titulo1|hr|text|col-md-6|Cargar Beneficiarios'=>array(),
            'carga_colectivo|input|file|col-md-3|Cargar Archivo'=>array(),
            
            ) ;
            $cantidadDeClonacion=0;

        $nombreFormulario2='formulario-carga';
        $barra2=array('66|success');
    ?>
    <!-- Cierre Declaracion Variables-->

    <!-- Cuerpo Fase 2-->
    @include('plantillas.cabeceraWizard',['barra'=>$barra2,'botonesWizard'=>$botonesWizard2])
    <br>
    <div class="container-fluid">
        <div class="container-fluid">
            <div class="badge" style="background-color: #7c90a7;color:white;text-align:left;">
                Datos del Colectivo
            </div>
            <hr class="hr-none">
        </div>

        @include('plantillas.formularioCreate',[
            'formulariosCreate'=>$formulariosCreate2,
            'nombreFormulario'=>$nombreFormulario2, ])
        <hr class="hr-none">
        <center>
            <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                onclick="fnDevolverFase(2)">Volver</button>
            <button type="button" class="btn btn-sm" 
            style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
            onclick="fnMoverFase3('formulario-asegurados')">Cotizar</button>
        </center>
           
    </div>
    <!-- Cierre Cuerpo Fase 2-->
</div>