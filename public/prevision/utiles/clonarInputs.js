function fnClonarInputs(){
    var nombreFormulario=$('input[name="nombre-formulario"]').val();
    var inputContadorClonacion=$('input[name="contador-clonacion"]'); 
    var valorContadorClonacion=inputContadorClonacion.val();
    var formulario=$('form[name="'+nombreFormulario+'"]').serializeArray();
    console.log(formulario);
    for(var a=0;a<formulario.length;a++){
        if(formulario[a]['name']!='_token' && formulario[a]['name']!='cd_persona'){
            var divOculto=$('div[id="'+formulario[a]['name']+''+valorContadorClonacion+'"]');
            divOculto.show();
        }
    }
    $('div[id="boton'+valorContadorClonacion+'"]').show();
    inputContadorClonacion.val(parseInt(valorContadorClonacion)+1);

}

function fnQuitarUltimoForm(fase){
    var explodeFase=fase.split('_');
    var nombreReemplazoContador='adicionales';
    var nombreReempalzoValores='valores-formulario-adic';
    if(explodeFase[0]=='formulario-asegurados'){
        nombreReemplazoContador='asegurados';
        nombreReempalzoValores='valores-formulario';
    }
    
    var inputContadorClonacion=$('input[name="contador-clonacion-'+nombreReemplazoContador+'"]'); 
    var valoresFormulario=$('input[name="'+nombreReempalzoValores+'"]').val();
    var valorContadorClonacion=inputContadorClonacion.val();
    console.log(explodeFase[0],nombreReempalzoValores,valorContadorClonacion);
    var valoresDesglosados=valoresFormulario.split(',');
    for(var a=0;a<valoresDesglosados.length;a++){
        
        var divOculto=$('div[id="'+valoresDesglosados[a]+''+(parseInt(valorContadorClonacion)-1)+'"]');
        divOculto.hide();
        var input=$('input[name="'+valoresDesglosados[a]+''+(parseInt(valorContadorClonacion)-1)+'"]');
        var select=$('select[name="'+valoresDesglosados[a]+''+(parseInt(valorContadorClonacion)-1)+'"]');
        if(input){
            input.val('');
            input.prop('disabled',true);
        }
        if(select){
            select.val('');
            select.prop('disabled',true);
        }
    }
    inputContadorClonacion.val(parseInt(valorContadorClonacion)-1);
}

function fnClonarInputsFaseAsegurados(){
    var nombreFormulario='formulario-asegurados';
    var inputContadorClonacion=$('input[name="contador-clonacion-asegurados"]'); 
    var valorContadorClonacion=inputContadorClonacion.val();
    var formulario=$('form[name="'+nombreFormulario+'"]').serializeArray();
    for(var a=0;a<formulario.length;a++){
        if(formulario[a]['name']!='_token' && formulario[a]['name']!='cd_persona'){
            var divOculto=$('div[id="'+formulario[a]['name']+''+valorContadorClonacion+'"]');
            divOculto.show();
            var input=$('input[name="'+formulario[a]['name']+''+valorContadorClonacion+'"]');
            if(input){
                input.prop('disabled',false);
            }
            var select=$('select[name="'+formulario[a]['name']+''+valorContadorClonacion+'"]');
            if(select){
                select.prop('disabled',false);
            }
        }
    }
    $('div[id="boton'+valorContadorClonacion+'"]').show();
    inputContadorClonacion.val(parseInt(valorContadorClonacion)+1);

}
function fnClonarInputsFaseAdicionales(){
    var nombreFormulario='formulario-adicionales';
    var inputContadorClonacion=$('input[name="contador-clonacion-adicionales"]'); 
    var valorContadorClonacion=inputContadorClonacion.val();
    var formulario=$('form[name="'+nombreFormulario+'"]').serializeArray();
    for(var a=0;a<formulario.length;a++){
        if(formulario[a]['name']!='_token' && formulario[a]['name']!='cd_persona'){
            var divOculto=$('div[id="'+formulario[a]['name']+''+valorContadorClonacion+'"]');
            divOculto.show();
        }
        var input=$('input[name="'+formulario[a]['name']+''+valorContadorClonacion+'"]');
        if(input){
            input.prop('disabled',false);
        }
        var select=$('select[name="'+formulario[a]['name']+''+valorContadorClonacion+'"]');
        if(select){
            select.prop('disabled',false);
        }
    }
    $('div[id="boton-adic'+valorContadorClonacion+'"]').show();
    inputContadorClonacion.val(parseInt(valorContadorClonacion)+1);

}
function fnQuitarUltimoFormFase(fase){
    var inputContadorClonacion=$('input[name="contador-clonacion"]'); 
    var valoresFormulario=$('input[name="valores-formulario'+fase+'"]').val();
    var valorContadorClonacion=inputContadorClonacion.val();
    var valoresDesglosados=valoresFormulario.split(',');
    for(var a=0;a<valoresDesglosados.length;a++){
        var divOculto=$('div[id="'+valoresDesglosados[a]+''+(parseInt(valorContadorClonacion)-1)+'"]');
        divOculto.hide();
        var input=$('input[name="'+valoresDesglosados[a]+''+(parseInt(valorContadorClonacion)-1)+'"]');
        var select=$('select[name="'+valoresDesglosados[a]+''+(parseInt(valorContadorClonacion)-1)+'"]');
        if(input){
            input.val('');
        }
        if(select){
            select.val('');
        }
    }
    inputContadorClonacion.val(parseInt(valorContadorClonacion)-1);
}