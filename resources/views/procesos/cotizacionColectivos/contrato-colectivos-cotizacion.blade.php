<div id="fase3" style="display:none;">
    <!-- Fase 1-->
    <!-- Declaracion Variables-->
    <?php 
        $botonesWizard1=array(
            '3|1. Producto|none|linkedin|typcn typcn-user-outline',
            '3|2. Carga Colectivos|none|dribbble|typcn typcn-credit-card',
            '3|3. Emisión|active|dribbble|typcn typcn-image',
        );
        $barra1=array('99|success');
    ?>
    <!-- Cierre Declaracion Variables-->

    <!-- Cuerpo Fase I-->
    @include('plantillas.cabeceraWizard',['barra'=>$barra1,'botonesWizard'=>$botonesWizard1])
    <br>
    <div class="container-fluid">

        <div class="container-fluid">
            <div class="badge" style="background-color: #7c90a7;color:white;text-align:left;">
                Resumen de cotización
            </div>
            <hr class="hr-none">

            <div id="contenido">
                
            </div>
            <hr class="hr-none">
            <center>
                <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                onclick="fnVolverFase2()">Volver </button> 
                <button type="button" class="btn btn-sm" 
                style="background-color: #7c90a7;color: white;margin-bottom:15px;" 
                onclick="fnMoverFase4()">Emision</button>
            </center>
        </div>
        
       
            
            
        
    </div>
    <!-- Cierre Cuerpo Fase I-->
</div>