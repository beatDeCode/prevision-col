function fnValidarInputVacio(formulario){
    var contador=0;
    var retorno=false;
    for(var a=0;a<formulario.length;a++){
        if(formulario[a]['value']){
            contador=+1;
        }
    }
    if(contador>0){
        retorno=true;
    }
    return contador;
}

function fnValidarFormularioUpdate(){
    var nombreFormulario=$('input[name="nombre-formulario"]').val();
    var transicion=$('input[name="transicion"]');
    var urlPrincipal=$('input[name="url-principal"]').val();
    var formularioUpdate=$('form[name="'+nombreFormulario+'"]').serializeArray();
    var urlValidacionUpdate=$('input[name="url-validacion"]').val();
    var tokenLaravel=$('input[name="_token"]').val();
    var contenidoHtml=fnSweetAlertParaValidar(formularioUpdate);
    var sweetAlert=fnAlertDetalleFormulario(contenidoHtml,'Transacción');
    sweetAlert.then((response) =>{
        if(response.isConfirmed){
            if(formularioUpdate.length>0){
                fnAlertaDeEsperaTransccion();
                $.ajax({
                    url:urlValidacionUpdate,
                    type:'POST',
                    data:formularioUpdate,
                    cache:false,
                    headers: {'X-CSRF-TOKEN': tokenLaravel}

                }).done(function(response){
                    
                    var JSONParse=JSON.parse(response);
                    if(JSONParse.httpResponse==200){
                        swal.close();
                        if(transicion){
                            setInterval(function(){
                                window.location.replace(urlPrincipal+'/'+JSONParse.message.content),
                                1000
                            });
                        }else{
                            fnTransaccionConfirmada('Transaccion',JSONParse.message.content);
                            setInterval(function(){
                                window.location.replace(urlPrincipal),
                                1000
                            });
                        }
                        
                    }else{
                        for(var c=0;c<formularioUpdate.length;c++){
                            $('div[id="error'+formularioUpdate[c]['name']+'"]').hide();
                            var divMensje=$('div[id="error'+formularioUpdate[c]['name']+'"]');
                            divMensje.html('');
                        }
                        swal.close();
                        var erroresResponse=JSONParse.message.content;
                        var clavesPrincipalesErrores=Object.keys(erroresResponse);
                        for(var a=0;a<clavesPrincipalesErrores.length;a++){
                            var indiceError=clavesPrincipalesErrores[a];
                            var mensajesError=erroresResponse[indiceError];                            
                            for(var b=0;b<mensajesError.length;b++){
                                console.log(indiceError);
                                $('div[id="error'+indiceError+'"]').css('display','flex');
                                var divMensje=$('div[id="error'+indiceError+'"]');
                                divMensje.html('');
                                divMensje.append(mensajesError[b]);
                            }
                        }

                    }
                }).fail(function(a,b,c){
                    console.log(a,b,c);
                });
            }
        }
    });
    
}

function fnValidarVacios(formulario){
    var contadorErrores=0;
    var valoresFormulario=$('form[name="'+formulario+'"]').serializeArray();
    if(valoresFormulario.length>0){
        for(var a=0;a<valoresFormulario.length;a++){
            var select=$('select[name="'+valoresFormulario[a]['name']+'"]');
            var input=$('input[name="'+valoresFormulario[a]['name']+'"]');
            if(select.length==1){
                var valorSelect=$('select[name="'+valoresFormulario[a]['name']+'"] option:selected');
                var div=$('div[id="error'+valoresFormulario[a]['name']+'"]');
                if(valorSelect.val()){
                    div.hide();
                }else{
                    div.show();
                    div.html('');
                    div.append('El campo está vacío.');
                    contadorErrores+=1;
                }
            }
            if(input.length==1){
                var valorInput=$('input[name="'+valoresFormulario[a]['name']+'"]');
                var div=$('div[id="error'+valoresFormulario[a]['name']+'"]');
                if(valorInput.val()){
                    div.hide();
                }else{
                    div.show();
                    div.html('');
                    div.append('El campo está vacío.');
                    contadorErrores+=1;
                    
                }
            }
        }
    }
    return contadorErrores;
}

function fnValidarTelefono(){
    var documento=$('input[name="nu_telefono"]').val();
    var div=$('div[id="errornu_telefono"]');
    if(documento.length==7){
        div.hide();
    }else{
        div.show();
        div.html('');
        div.append('El número debe posee solo 7 caracteres');
        throw "Error Telefono";
    }
}
function calcularEdad(){
    var feNacimiento=$('input[name="fe_nacimiento"]').val();
    var formatoFecha = new Date(feNacimiento);
    var diferenciaFechas = Date.now() - formatoFecha.getTime();
    var formatoDiferenciaFechas = new Date(diferenciaFechas); 
    var anio = formatoDiferenciaFechas.getUTCFullYear();
    var edad = Math.abs(anio - 1970);
    var div=$('div[id="errorfe_nacimiento"]');
    if(edad > 18){
        div.hide();
    }else{
        div.show();
        div.html('');
        div.append('El titular no puede ser menor de edad.');
        throw "Error Edad";
    }
}

function fnValidarDocumento(){
    var tokenLaravel=$('input[name="_token"]').val();
    var documento=$('input[name="nu_documento"]').val();;
    var busqueda='busquedaValidacionDocumento';
    var formulario=[];
    formulario.push({name:'tp_query',value:2});
    formulario.push({name:'query',value:busqueda});
    formulario.push({name:'nu_documento',value:documento});
    if(documento){
        $.ajax({
            url:'/prevision.general.querys',
            type:'POST',
            cache:false,
            headers: {'X-CSRF-TOKEN': tokenLaravel},
            data:formulario
        }).done(function(response){
            console.log(response);
            var JSONParse=JSON.parse(response);
            if(JSONParse.httpResponse==200){
                var div=$('div[id="errornu_documento"]');
                if(JSONParse.message.content[0].text=='0'){
                    div.hide();
                }else{
                    div.show();
                    div.html('');
                    div.append(JSONParse.message.content[0].text);
                    throw "Error Documento";
                }
                
            }
        }).fail(function(a,c,b){
            console.log(a,b,c);
        });
    }
    
}

function fnValidarVacios(formulario){
    var contadorErrores=0;
    var valoresFormulario=$('form[name="'+formulario+'"]').serializeArray();
    //console.log(valoresFormulario);
    if(valoresFormulario.length>0){
        for(var a=0;a<valoresFormulario.length;a++){
            var select=$('select[name="'+valoresFormulario[a]['name']+'"]');
            var input=$('input[name="'+valoresFormulario[a]['name']+'"]');
            if(select.length==1){
                var valorSelect=$('select[name="'+valoresFormulario[a]['name']+'"] option:selected');
                var div=$('div[id="error'+valoresFormulario[a]['name']+'"]');
                if(valorSelect.val()){
                    div.hide();
                }else{
                    div.show();
                    div.html('');
                    div.append('El campo está vacío.');
                    contadorErrores+=1;
                }
            }
            if(input.length==1){
                var valorInput=$('input[name="'+valoresFormulario[a]['name']+'"]');
                var div=$('div[id="error'+valoresFormulario[a]['name']+'"]');
                if(valorInput.val()){
                    div.hide();
                }else{
                    div.show();
                    div.html('');
                    div.append('El campo está vacío.');
                    contadorErrores+=1;
                    
                }
            }
        }
    }
    return contadorErrores;
}
