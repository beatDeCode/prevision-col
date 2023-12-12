$('select[name="cd_producto"').on('change',function(){
    var busqueda='busquedaCoberturas';
    var tokenLaravel=$('input[name="_token"]').val();
    var producto=$('select[name="cd_producto"] option:selected').val();
    var selectCobertura=$('select[name="cd_cobertura"]');
    fnActivarBotonProducto(producto,'producto');
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
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarCobertura','cobertura');
            var divCoberturas=$('div[id="coberturas"]');
            divCoberturas.html('');
            divCoberturas.append(botones);
            
        }

    });
});

$('select[name="cd_cobertura"').on('change',function(){
    var busqueda='busquedaSumasAseguradas';
    var tokenLaravel=$('input[name="_token"]').val();
    var cobertura=$('select[name="cd_cobertura"] option:selected').val();
    fnActivarBotonProducto(cobertura,'cobertura');
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
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarSumas','sumas');
            var divCoberturas=$('div[id="sumas"]');
            divCoberturas.html('');
            divCoberturas.append(botones);
            
        }
    });
});

$('select[name="mt_suma_asegurada"').on('change',function(){
    var busqueda='busquedaGruposFamiliares';
    var tokenLaravel=$('input[name="_token"]').val();
    var suma=$('select[name="mt_suma_asegurada"] option:selected').val();
    fnActivarBotonProducto(suma,'sumas');
    var busquedaGruposFamiliares=$('select[name="cd_grupo_familiar"]');
    var formulario=[];
    formulario.push({name:'tp_query',value:1});
    formulario.push({name:'query',value:busqueda});
    $.ajax({
        url:'/prevision.general.querys',
        type:'POST',
        cache:false,
        headers: {'X-CSRF-TOKEN': tokenLaravel},
        data:formulario
    }).done(function(response){
        busquedaGruposFamiliares.find('option').remove().end();
        var JSONParse=JSON.parse(response);
        
        if(JSONParse.httpResponse==200){
            var valoresOption=JSONParse.message.content;
            busquedaGruposFamiliares.append($('<option>', {value:'', text:''}));
            for(var a=0;a<valoresOption.length;a++){
                busquedaGruposFamiliares.append($('<option>', {value:valoresOption[a]['value'], text:valoresOption[a]['text']}));
            }
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarGrupoFamiliar','grupo-familiar');
            var divGrupoFamiliar=$('div[id="grupo-familiar"]');
            divGrupoFamiliar.html('');
            divGrupoFamiliar.append(botones);
            
        }
    });
});

$('select[name="cd_grupo_familiar"').on('change',function(){
    var busqueda='busquedaPlanesPago';
    var tokenLaravel=$('input[name="_token"]').val();
    var grupofamiliar=$('select[name="cd_grupo_familiar"] option:selected').val();
    fnActivarBotonProducto(grupofamiliar,'grupo-familiar');
    var planesPago=$('select[name="cd_plan_pago"]');
    var formulario=[];
    formulario.push({name:'tp_query',value:1});
    formulario.push({name:'query',value:busqueda});
    $.ajax({
        url:'/prevision.general.querys',
        type:'POST',
        cache:false,
        headers: {'X-CSRF-TOKEN': tokenLaravel},
        data:formulario
    }).done(function(response){
        planesPago.find('option').remove().end();
        var JSONParse=JSON.parse(response);
        
        if(JSONParse.httpResponse==200){
            var valoresOption=JSONParse.message.content;
            planesPago.append($('<option>', {value:'', text:''}));
            for(var a=0;a<valoresOption.length;a++){
                planesPago.append($('<option>', {value:valoresOption[a]['value'], text:valoresOption[a]['text']}));
            }
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarPlanPago','plan-pago');
            var divGrupoFamiliar=$('div[id="plan-pago"]');
            divGrupoFamiliar.html('');
            divGrupoFamiliar.append(botones);
            
        }
    });
});

function fnCambiarProducto(producto){
    $('select[name="cd_producto"]').val(producto).change();
}
function fnActivarBotonProducto(producto,nombreProducto){
    var indicadorProducto=$('input[name="indicador-'+nombreProducto+'"]');
    var tarjetaSeleccion=$('div[id="card-'+nombreProducto+'-'+producto+'"]');
    if(indicadorProducto==0){
        tarjetaSeleccion.css('border','solid 2px gray');
        tarjetaSeleccion.css('background-color','#a3ffd0');
        indicadorProducto.val(producto);
    }
    console.log(producto,tarjetaSeleccion,indicadorProducto);
    if(indicadorProducto.val()==producto){
        tarjetaSeleccion.css('border','solid 2px gray');
        tarjetaSeleccion.css('background-color','#a3ffd0');
        indicadorProducto.val(producto);
    }else{
        var tarjetaSeleccionada=$('div[id="card-'+nombreProducto+'-'+indicadorProducto.val()+'"]');
        tarjetaSeleccionada.css('border','solid 2px lightgray');
        tarjetaSeleccionada.css('background-color','#fff');
        tarjetaSeleccion.css('border','solid 2px gray');
        tarjetaSeleccion.css('background-color','#a3ffd0');
        indicadorProducto.val(producto);
    }
}

function fnDespliegueBotones(opciones,nombreFuncion,nombreTarjeta){
    var row='<div class="container-fluid"><div class="row">';
    var botones='';
    for(var a=0;a<opciones.length;a++){
        botones+=
        '<div class="col-sm-'+opciones[a]['columnas']+'">'+
            '<br>'+
               ' <div id="card-'+nombreTarjeta+'-'+opciones[a]['value']+'" class="card" style="border-radius:10px;border:solid 2px lightgray;">'+
                    '<div class="card-img-top" alt="100%x180" data-holder-rendered="true" style="height: 25px; width: 100%; display: block;">'+
                    '<center><i class="'+opciones[a]['tx_icono']+'" style="font-size:25px;"></i> </center>'+
                    '</div>'+
                    '<div class="card-body" style="padding:0.1rem;">'+
                        '<p class="card-title" style="margin:0px;font-size:13px;"><center>'+
                        '<a href="#" style="color:#1d4068;font-weight:bold;" onclick="'+nombreFuncion+'('+opciones[a]['value']+')">  </i> '+opciones[a]['text']+'</a>' +
                       ' </center></p>'+
                    '</div>'+
                '</div>'+
           ' </div>';
    }
    var cierreRow='</div></div>';
    return row+''+botones+''+cierreRow;

}
function fnCambiarCobertura(cobertura){
    $('select[name="cd_cobertura"]').val(cobertura).change();
}

function fnCambiarSumas(suma){
    $('select[name="mt_suma_asegurada"]').val(suma).change();
}
function fnCambiarGrupoFamiliar(grupofamiliar){
    $('select[name="cd_grupo_familiar"]').val(grupofamiliar).change();
}
function fnCambiarPlanPago(planpago){
    $('select[name="cd_plan_pago"]').val(planpago).change();
}