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
        if(contadorErrores==0){
            $('#fase1').hide(); 
            $('#fase2').show();
        }
        
    }
}

function fnDevolverFase(){
    $('#fase1').show(); 
    $('#fase2').hide();
}

function fnMoverFase3(formulario){
    var tokenLaravel=$('input[name="_token"]').val();
    var validacionFase2=fnValidarVacios(formulario);
    try {
        calcularEdad();
        fnValidarTelefono();
        var formulario=[];
        var tipoCalculo=$('select[name="cd_producto"] option:selected').val();
        var producto=$('select[name="cd_tipo_calculo"] option:selected').val();
        var formularioCarga=$('form[name="formulario-carga"]').serializeArray();
        var formularioProducto=$('form[name="formulario-producto"]').serializeArray();
        var solicitud=new FormData();
        
        for(var a=0;a<formularioProducto.length;a++){
            solicitud.append(formularioProducto[a]['name'] , formularioProducto[a]['value']);
        }
        for(var b=0;b<formularioCarga.length;b++){
            solicitud.append(formularioCarga[b]['name'] , formularioCarga[b]['value']);
        }
        var archivoValidacion=$('input[name="carga_colectivo"]');
        var archivo=archivoValidacion[0].files;

        var nombreArchivo="";
        if(archivo.length>0){
            nombreArchivo=archivo[0].name;
            solicitud.append('carga_colectivo',archivo[0]);
            var validacion=nombreArchivo.split('.');
            var div=$('div[id="errorcarga_colectivo"]');
        
            if(validacion.length==2 && validacion[1]=='csv'){
                formulario.push({name:'carga_colectivo',value:archivo});
                div.hide();
                $.ajax({
                    url:'/prevision.procesos.cartera.valida-asegurados-colectivo',
                    type:'POST',
                    contentType:false,
                    processData:false,
                    cache: false,
                    headers: {'X-CSRF-TOKEN': tokenLaravel},
                    data:solicitud
                }).done(function(response){
                    console.log(response);
                    var JSONParse=JSON.parse(response);
                    if(JSONParse.httpResponse==200){
                        var contenido=JSONParse.message.content;
                        var contadorErrores1=0;
                        if(contenido.length>0){
                            for(var a=0;a<contenido.length;a++){
                                if(contenido[a]['cuenta']==1){
                                    contadorErrores1+=1;
                                    var div=$('div[id="error'+contenido[a]['value']+'"]');
                                    div.html('');
                                    div.append(contenido[a]['error']);
                                    div.show();
                                }
                            }
                        }
                        if(contadorErrores1==0){
                            var fase1=$('div[id="fase2"]');
                            fase1.hide(500);
                            var fase2=$('div[id="fase3"]');
                            fase2.fadeIn('slow');
                            fnCrearCotizacion();
                        }
                        
                        
                    }
                }).fail(function(a,b,c){
                    console.log(a,b,c);
                });
            }else{
                div.html('');
                div.append('El archivo debe tener formato <b>CSV</b>');
                div.show();
            }
        }else{
            div.html('');
            div.append('El archivo esta vac&iacute;o <b>CSV</b>');
            div.show();
        }
        
           
        
    } catch (error) {
        console.log(error);
    }
}



