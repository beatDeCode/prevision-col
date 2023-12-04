$('select[name="cd_tipo_calculo"]').on('change',function(){
    var valorSelect=$(this).find(":selected").val();
    var divInputCobertura=$('div[id="cd_cobertura"]');
    var divInputCoberturaDetalle=$('div[id="mt_suma_asegurada"]');
    var selectCobertura=$('select[name="cd_cobertura"]');
    var selectCoberturaDetalle=$('select[name="mt_suma_asegurada"]');
    if(valorSelect==2 || valorSelect==3){
        selectCobertura.attr('disabled',true);
        selectCoberturaDetalle.attr('disabled',true);
        divInputCobertura.hide();
        divInputCoberturaDetalle.hide();
    }
    if(valorSelect==1 ){
        selectCobertura.removeAttr('disabled');
        selectCoberturaDetalle.removeAttr('disabled');
        divInputCobertura.show();
        divInputCoberturaDetalle.show();
    }
});

function fnMoverFase2(formulario){
    var tipoCalculo=$('select[name="cd_tipo_calculo"] option:selected');
    if(tipoCalculo==1){

    }else{
        var contadorErrores=fnValidarVacios(formulario);
        console.log(contadorErrores);
        if(contadorErrores==0){
            
        }
        
    }
}



