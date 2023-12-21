$('select[name="cd_producto"').on('change',function(){
    var busqueda='busquedaCoberturas';
    var tokenLaravel=$('input[name="_token"]').val();
    var producto=$('select[name="cd_producto"] option:selected').val();
    var selectCobertura=$('select[name="cd_cobertura"]');
    //fnActivarBotonProducto(producto,'producto');
    var formulario=[];
    formulario.push({name:'tp_query',value:1});
    formulario.push({name:'query',value:busqueda});
    formulario.push({name:'cd_producto',value:producto});
    $.ajax({
        url:'/prevision.general.querys',
        type:'POST',
        cache:false,
        headers: {'X-CSRF-TOKEN': tokenLaravel},
        data:formulario
    }).done(function(response){
        selectCobertura.find('option').remove().end();
        selectCobertura.append($('<option>', {value:'', text:''}));
        var JSONParse=JSON.parse(response);
        if(JSONParse.httpResponse==200){
            var valoresOption=JSONParse.message.content;
            for(var a=0;a<valoresOption.length;a++){
                selectCobertura.append($('<option>', {value:valoresOption[a]['value'], text:valoresOption[a]['text']}));
            }
            /*var botones=fnDespliegueBotones(valoresOption,'fnCambiarCobertura','cobertura','Coberturas');
            var divCoberturas=$('div[id="divcoberturas"]');
            divCoberturas.html('');
            divCoberturas.append(botones);
            divCoberturas.show(350);*/
            
        }

    });
});

$('select[name="cd_cobertura"').on('change',function(){
    var busqueda='busquedaSumasAseguradas';
    var tokenLaravel=$('input[name="_token"]').val();
    var cobertura=$('select[name="cd_cobertura"] option:selected').val();
    //fnActivarBotonProducto(cobertura,'cobertura');
    var selectSumasAseguradas=$('select[name="mt_suma_asegurada"]');
    var formulario=[];
    formulario.push({name:'tp_query',value:1});
    formulario.push({name:'query',value:busqueda});
    formulario.push({name:'cd_cobertura',value:cobertura});
    $.ajax({
        url:'/prevision.general.querys',
        type:'POST',
        cache:false,
        headers: {'X-CSRF-TOKEN': tokenLaravel},
        data:formulario
    }).done(function(response){
        selectSumasAseguradas.find('option').remove().end();
        var JSONParse=JSON.parse(response);
        
        if(JSONParse.httpResponse==200){
            var valoresOption=JSONParse.message.content;
            selectSumasAseguradas.append($('<option>', {value:'', text:''}));
            for(var a=0;a<valoresOption.length;a++){
                selectSumasAseguradas.append($('<option>', {value:valoresOption[a]['value'], text:valoresOption[a]['text']}));
            }
            /*var botones=fnDespliegueBotones(valoresOption,'fnCambiarSumas','sumas','Monto a Riesgo');
            var divCoberturas=$('div[id="divsumas"]');
            divCoberturas.html('');
            divCoberturas.append(botones);
            divCoberturas.show(350);*/
            
        }
    });
});
