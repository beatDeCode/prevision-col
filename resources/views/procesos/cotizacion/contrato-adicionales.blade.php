<div id="fase2" style="display:none;">
    <!-- Fase 2-->
    <!-- Declaracion Variables-->
    <?php 
        $botonesWizard2=array(
            '3|1. Producto|active|dribbble|typcn typcn-user-outline',
            '3|2. Beneficiarios|none|linkedin|typcn typcn-credit-card',
            '3|3. Emisión|none|dribbble|typcn typcn-image',
        );
        $formulariosOcultos2=array(
            'nombre-formulario1|formulario-asegurados',
            'valores-formulario|nm_persona1_asegurado,tp_documento_asegurado,nu_documento_asegurado,fe_nacimiento_asegurado,cd_sexo_asegurado,cd_parentesco_asegurado,boton',
            'valores-formulario-adic|nm_persona1_adicional,tp_documento_adicional,nu_documento_adicional,fe_nacimiento_adicional,cd_sexo_adicional,cd_parentesco_adicional,boton-adic'
        );
        $cantidadDeClonacion2=3;
        $formulariosCreate2=array(
            'nm_persona1|input|text|col-md-2|Nombres|'=>array(),
            'ap_persona1|input|text|col-md-2|Apellidos|'=>array(),
            'tp_documento|select|text|col-md-2|Tipo|'=>$busquedaTipoDocumento,
            'nu_documento|input|text|col-md-2|Documento|'=>array(),
            'fe_nacimiento|input|date|col-md-2|Nacimiento|'=>array(),
            'cd_sexo|select|text|col-md-2|Sexo|'=>$busquedaSexos,
            'cd_estado|select|text|col-md-2|Estado|'=>$busquedaEstados,
            'cd_municipio|select|text|col-md-2|Municipio|'=>array(),
            'cd_parroquia|select|text|col-md-2|Parroquia|'=>array(),
            'de_direccion|input|text|col-md-6|Dirección|'=>array(),
            'nu_area|select|text|col-md-2|Area|'=>$busquedaAreasTelefonicas,
            'nu_telefono|input|text|col-md-2|Número de Teléfono|'=>array(),
            'de_correo|input|text|col-md-3|Correo|'=>array(),
            'de_asegurados|checkbox|check|col-md-2|¿Agregar Familiares Amparados?|'=>array(),
            'de_adicionales|checkbox|check|col-md-2|¿Agregar Familiares Adicionales?|'=>array(),
            'espacion1|div|text|col-md-6|Espacio|'=>array(),
            ) ;
        $nombreFormulario2='formulario-titular';
        $formulariosAClonar2=array();

        $cantidadDeClonacion3=3;
        $formulariosCreate3=array(
            'titulo1|hr|text|col-md-6|Asegurados Amparados|'=>array(),
            'nm_persona1_asegurado|input|text|col-md-2|Nombre Completo|disabled'=>array(),
            'tp_documento_asegurado|select|text|col-md-2|Tipo documento|disabled'=>$busquedaTipoDocumento,
            'nu_documento_asegurado|input|text|col-md-2|Número Documento|disabled'=>array(),
            'fe_nacimiento_asegurado|input|date|col-md-2|Fecha de nacimiento|disabled'=>array(),
            'cd_sexo_asegurado|select|date|col-md-1|Sexo|disabled'=>$busquedaSexos,
            'cd_parentesco_asegurado|select|date|col-md-2|Parenteco|disabled'=>$busquedaParentescos,
        );
        $formulariosAClonar3=array(
            'nm_persona1_asegurado|input|text|col-md-2|Nombre Completo'=>array(),
            'tp_documento_asegurado|select|text|col-md-2|Tipo documento'=>$busquedaTipoDocumento,
            'nu_documento_asegurado|input|text|col-md-2|Número Documento'=>array(),
            'fe_nacimiento_asegurado|input|date|col-md-2|Fecha de nacimiento'=>array(),
            'cd_sexo_asegurado|select|date|col-md-1|Sexo'=>$busquedaSexos,
            'cd_parentesco_asegurado|select|date|col-md-2|Parenteco'=>$busquedaParentescos,
            'boton|button|text|col-md-1|-'=>array(),
        );
        $nombreFormulario3='formulario-asegurados';

        $cantidadDeClonacion4=3;
        $formulariosCreate4=array(
            'titulo1|hr|text|col-md-6|Asegurados Adicionales|'=>array(),
            'nm_persona1_adicional|input|text|col-md-2|Nombre Completo|disabled'=>array(),
            'tp_documento_adicional|select|text|col-md-2|Tipo documento|disabled'=>$busquedaTipoDocumento,
            'nu_documento_adicional|input|text|col-md-2|Número Documento|disabled'=>array(),
            'fe_nacimiento_adicional|input|date|col-md-2|Fecha de nacimiento|disabled'=>array(),
            'cd_sexo_adicional|select|date|col-md-1|Sexo|disabled'=>$busquedaSexos,
            'cd_parentesco_adicional|select|date|col-md-2|Parenteco|disabled'=>$busquedaParentescos,
        );
        $formulariosAClonar4=array(
            'nm_persona1_adicional|input|text|col-md-2|Nombre Completo'=>array(),
            'tp_documento_adicional|select|text|col-md-2|Tipo documento'=>$busquedaTipoDocumento,
            'nu_documento_adicional|input|text|col-md-2|Número Documento'=>array(),
            'fe_nacimiento_adicional|input|date|col-md-2|Fecha de nacimiento'=>array(),
            'cd_sexo_adicional|select|date|col-md-1|Sexo'=>$busquedaSexos,
            'cd_parentesco_adicional|select|date|col-md-2|Parenteco'=>$busquedaParentescos,
            'boton-adic|button|text|col-md-1|-'=>array(),
        );
        $nombreFormulario4='formulario-adicionales';
        
        $barra2=array('66|success');
    ?>
    <!-- Cierre Declaracion Variables-->

    <!-- Cuerpo Fase 2-->
    @include('plantillas.cabeceraWizard',['barra'=>$barra2,'botonesWizard'=>$botonesWizard2])
    <br>
    <div class="container-fluid">
        
        <div class="row">
            <div class="col-md-3" id="div-resumen-adicionales"></div>
            <div class="col-md-9">
            <div class="container-fluid">
                <div class="badge" style="background-color: #7c90a7;color:white;text-align:left;">
                    Benficiario Titular
                </div>
                <hr class="hr-none">
            </div>
            @csrf()
            @include('plantillas.formularioCreate',[
                'formulariosCreate'=>$formulariosCreate2,
                'nombreFormulario'=>$nombreFormulario2,
                'formulariosAClonar'=>$formulariosAClonar2,
                'cantidadDeClonacion'=>$cantidadDeClonacion2 ])

            @include('plantillas.formularioCreate',[
                'formulariosCreate'=>$formulariosCreate3,
                'nombreFormulario'=>$nombreFormulario3,
                'formulariosAClonar'=>$formulariosAClonar3,
                'cantidadDeClonacion'=>$cantidadDeClonacion3 ])
            <div class="col-md-1 offset-md-11" style=" margin-bottom:15px">
                <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;" 
                id="boton-asegurados"
                onclick="fnClonarInputsFaseAsegurados()"><i class="typcn typcn-plus"></i></button>
            </div>

            @include('plantillas.formularioCreate',[
                'formulariosCreate'=>$formulariosCreate4,
                'nombreFormulario'=>$nombreFormulario4,
                'formulariosAClonar'=>$formulariosAClonar4,
                'cantidadDeClonacion'=>$cantidadDeClonacion4 ])
            <div class="col-md-1 offset-md-11" style=" margin-bottom:15px">
                <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;" 
                id="boton-adicionales"
                onclick="fnClonarInputsFaseAdicionales()"><i class="typcn typcn-plus"></i></button>
            </div>
            <input type="hidden" value="0" name="contador-clonacion-asegurados">
            <input type="hidden" value="0" name="contador-clonacion-adicionales">
            <hr class="hr-none">
            <center>
                <button type="button" class="btn btn-sm" 
                    style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                    onclick="fnDevolverFase(2)">Volver</button>
                <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                onclick="fnMoverFase3_('formulario-titular','formulario-asegurados','formulario-adicionales')">Cotizar</button>
            </center>
            </div>
        </div>
           

        
        @include('plantillas.formulariosOcultos',
                ['formulariosOcultos'=>$formulariosOcultos2])
    </div>
    <!-- Cierre Cuerpo Fase 2-->
</div>