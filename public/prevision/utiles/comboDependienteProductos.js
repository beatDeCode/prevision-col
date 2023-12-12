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
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarCobertura','cobertura','Coberturas');
            var divCoberturas=$('div[id="divcoberturas"]');
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
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarSumas','sumas','Monto a Riesgo');
            var divCoberturas=$('div[id="divsumas"]');
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
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarGrupoFamiliar','grupo-familiar','Grupo Familiar');
            var divGrupoFamiliar=$('div[id="divgrupofamiliar"]');
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
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarPlanPago','plan-pago','Planes de Pago');
            var divGrupoFamiliar=$('div[id="divplanpago"]');
            divGrupoFamiliar.html('');
            divGrupoFamiliar.append(botones);
            
        }
    });
});


function fnActivarBotonProducto(producto,nombreProducto){
    var indicadorProducto=$('input[name="indicador-'+nombreProducto+'"]');
    var tarjetaSeleccion=$('div[id="card-'+nombreProducto+'-'+producto+'"]');
    if(indicadorProducto==0){
        tarjetaSeleccion.css('border','solid 3px lightgray');
        tarjetaSeleccion.css('background-color','#e8eff9');
        indicadorProducto.val(producto);
    }
    console.log(producto,tarjetaSeleccion,indicadorProducto);
    if(indicadorProducto.val()==producto){
        tarjetaSeleccion.css('border','solid 3px lightgray');
        tarjetaSeleccion.css('background-color','#e8eff9');
        indicadorProducto.val(producto);
    }else{
        var tarjetaSeleccionada=$('div[id="card-'+nombreProducto+'-'+indicadorProducto.val()+'"]');
        tarjetaSeleccionada.css('border','solid 3px lightgray');
        tarjetaSeleccionada.css('background-color','#fff');
        tarjetaSeleccion.css('border','solid 2px gray');
        tarjetaSeleccion.css('background-color','#e8eff9');
        indicadorProducto.val(producto);
    }
}

function fnDespliegueBotones(opciones,nombreFuncion,nombreTarjeta,nombreTitulo){
    var row='<div class="container-fluid">'+
        '<div class="row">'+
            '<div class="col-md-12" style="margin-top:10px;">'+
                '<div class="badge" style="background-color: #1d4068;color:white;text-align:left;">'+
                nombreTitulo+
                '</div>'+
                '<hr class="hr-none">'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="container-fluid"><div class="row">';
    var botones='';
    for(var a=0;a<opciones.length;a++){
        botones+=
        '<div class="col-sm-'+opciones[a]['columnas']+'">'+
            '<br>'+
            '<div id="card-'+nombreTarjeta+'-'+opciones[a]['value']+'" class="card text-right" style="border-radius:10px;border: 2px solid gray;">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">'+opciones[a]['text']+'</h5>'+
                    '<p class="card-text">'+opciones[a]['de_tarjeta']+' </p>'+
                   '<a href="#" onclick="'+nombreFuncion+'('+opciones[a]['value']+')" class="btn btn-primary">Elegir</a>'+
                '</div>'+
            '</div>'+
               /*' <div id="card-'+nombreTarjeta+'-'+opciones[a]['value']+'" class="card" style="border-radius:10px;border:solid 2px lightgray;">'+
                    '<div class="card-img-top" alt="100%x180" data-holder-rendered="true" style="height: 25px; width: 100%; display: block;">'+
                    '<center><i class="'+opciones[a]['tx_icono']+'" style="font-size:25px;"></i> </center>'+
                    '</div>'+
                    '<div class="card-body" style="padding:0.1rem;">'+
                        '<p class="card-title" style="margin:0px;font-size:13px;"><center>'+
                        '<a href="#" style="color:#1d4068;font-weight:bold;" onclick="'+nombreFuncion+'('+opciones[a]['value']+')">  </i> '+opciones[a]['text']+'</a>' +
                       ' </center></p>'+
                    '</div>'+
                '</div>'+*/
        '</div>';
    }
    var cierreRow='</div><hr class="hr-none"></div>';
    return row+''+botones+''+cierreRow;

}
function fnCambiarProducto(producto){
    $('select[name="cd_producto"]').val(producto).change();
    $('div[id="divproductos"]').hide(850);
    var resumen=$('p[id="resumen-producto"]');
    resumen.html('');
    resumen.append($('select[name="cd_producto"] option:selected').text());
}
function fnCambiarCobertura(cobertura){
    $('select[name="cd_cobertura"]').val(cobertura).change();
    $('div[id="divcoberturas"]').hide(850);
    var resumen=$('p[id="resumen-cobertura"]');
    resumen.html('');
    resumen.append($('select[name="cd_cobertura"] option:selected').text());
}

function fnCambiarSumas(suma){
    $('select[name="mt_suma_asegurada"]').val(suma).change();
    $('div[id="divsumas"]').hide(850);
    var resumen=$('p[id="resumen-suma"]');
    resumen.html('');
    resumen.append($('select[name="mt_suma_asegurada"] option:selected').text());
}
function fnCambiarGrupoFamiliar(grupofamiliar){
    $('select[name="cd_grupo_familiar"]').val(grupofamiliar).change();
    $('div[id="divgrupofamiliar"]').hide(850);
    var resumen=$('p[id="resumen-grupo-familiar"]');
    resumen.html('');
    resumen.append($('select[name="cd_grupo_familiar"] option:selected').text());
}
function fnCambiarPlanPago(planpago){
    $('select[name="cd_plan_pago"]').val(planpago).change();
    var resumen=$('p[id="resumen-plan-pago"]');
    resumen.html('');
    resumen.append($('select[name="cd_plan_pago"] option:selected').text());
    fnActivarBotonProducto(planpago,'plan-pago');
}