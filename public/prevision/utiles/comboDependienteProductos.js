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
            divCoberturas.show(350);
            
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
            divCoberturas.show(350);
            
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
            divGrupoFamiliar.show(350);
            
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
            divGrupoFamiliar.show(350);
            
        }
    });
});


function fnActivarBotonProducto(producto,nombreProducto){
    var indicadorProducto=$('input[name="indicador-'+nombreProducto+'"]');
    var tarjetaSeleccion=$('div[id="card-'+nombreProducto+'-'+producto+'"]');
    if(indicadorProducto==0){
        tarjetaSeleccion.css('border','solid 2px gray');
        tarjetaSeleccion.css('background-color','#e8eff9');
        indicadorProducto.val(producto);
    }
    if(indicadorProducto.val()==producto){
        tarjetaSeleccion.css('border','solid 2px gray');
        tarjetaSeleccion.css('background-color','#e8eff9');
        indicadorProducto.val(producto);
    }else{
        var tarjetaSeleccionada=$('div[id="card-'+nombreProducto+'-'+indicadorProducto.val()+'"]');
        tarjetaSeleccionada.css('border','solid 2px lightgray');
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
            '<div id="card-'+nombreTarjeta+'-'+opciones[a]['value']+'" class="card text-right" style="border-radius:10px;border: 2px solid lightgray;">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">'+opciones[a]['text']+'</h5>'+
                    '<p class="card-text">'+opciones[a]['de_tarjeta']+' </p>'+
                   '<a href="#" onclick="'+nombreFuncion+'('+opciones[a]['value']+')" class="btn btn-primary btn-sm">Elegir</a>'+
                '</div>'+
            '</div>'+
        '</div>';
    }
    var cierreRow='</div><hr class="hr-none"></div>';
    return row+''+botones+''+cierreRow;

}
function fnCambiarProducto(producto){
    
    $('select[name="cd_producto"]').val(producto).change();
    $('div[id="divproductos"]').hide(350);
    var resumen=$('p[id="resumen-producto"]');
    resumen.html('');
    resumen.append($('select[name="cd_producto"] option:selected').text());
    var elementoIProducto=$('i[id="i-producto"]');
    elementoIProducto.removeClass('typcn typcn-chevron-right');
    var elementoICobertura=$('i[id="i-cobertura"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    inputLocalizacion.val(2);
    $('button[id="devolver-pasos"]').show();
}
function fnCambiarCobertura(cobertura){
    
    $('select[name="cd_cobertura"]').val(cobertura).change();
    $('div[id="divcoberturas"]').hide(350);
    var resumen=$('p[id="resumen-cobertura"]');
    resumen.html('');
    resumen.append($('select[name="cd_cobertura"] option:selected').text());
    var elementoIProducto=$('i[id="i-cobertura"]');
    elementoIProducto.removeClass('typcn typcn-chevron-right');
    var elementoICobertura=$('i[id="i-suma"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    inputLocalizacion.val(3);
}

function fnCambiarSumas(suma){
    
    $('select[name="mt_suma_asegurada"]').val(suma).change();
    $('div[id="divsumas"]').hide(350);
    var resumen=$('p[id="resumen-suma"]');
    resumen.html('');
    resumen.append($('select[name="mt_suma_asegurada"] option:selected').text());
    var elementoIProducto=$('i[id="i-suma"]');
    elementoIProducto.removeClass('typcn typcn-chevron-right');
    var elementoICobertura=$('i[id="i-grupo-familiar"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    inputLocalizacion.val(4);
    
}
function fnCambiarGrupoFamiliar(grupofamiliar){
    
    $('select[name="cd_grupo_familiar"]').val(grupofamiliar).change();
    $('div[id="divgrupofamiliar"]').hide(350);
    var resumen=$('p[id="resumen-grupo-familiar"]');
    resumen.html('');
    resumen.append($('select[name="cd_grupo_familiar"] option:selected').text());
    var elementoIProducto=$('i[id="i-grupo-familiar"]');
    elementoIProducto.removeClass('typcn typcn-chevron-right');
    var elementoICobertura=$('i[id="i-plan-pago"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    inputLocalizacion.val(5);
    $('button[id="boton-fase2"]').show();
}
function fnCambiarPlanPago(planpago){

    $('select[name="cd_plan_pago"]').val(planpago).change();
    var resumen=$('p[id="resumen-plan-pago"]');
    resumen.html('');
    resumen.append($('select[name="cd_plan_pago"] option:selected').text());
    fnActivarBotonProducto(planpago,'plan-pago');
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
}

function fnUbicacionResumen(){
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    var valorLocalizacion=inputLocalizacion.val();
    inputLocalizacion.val(valorLocalizacion-1);
    if(valorLocalizacion==5){
        $('div[id="divplanpago"]').hide(350);
        $('div[id="divgrupofamiliar"]').show(350);
        var elementoIProducto=$('i[id="i-plan-pago"]');
        elementoIProducto.removeClass('typcn typcn-chevron-right');
        var elementoICobertura=$('i[id="i-grupo-familiar"]');
        elementoICobertura.addClass('typcn typcn-chevron-right');
    }
    if(valorLocalizacion==4){
        $('div[id="divgrupofamiliar"]').hide(350);
        $('div[id="divsumas"]').show(350);
        var elementoIProducto=$('i[id="i-grupo-familiar"]');
        elementoIProducto.removeClass('typcn typcn-chevron-right');
        var elementoICobertura=$('i[id="i-suma"]');
        elementoICobertura.addClass('typcn typcn-chevron-right');
    }
    if(valorLocalizacion==3){
        $('div[id="divsumas"]').hide(350);
        $('div[id="divcoberturas"]').show(350);
        var elementoIProducto=$('i[id="i-suma"]');
        elementoIProducto.removeClass('typcn typcn-chevron-right');
        var elementoICobertura=$('i[id="i-cobertura"]');
        elementoICobertura.addClass('typcn typcn-chevron-right');
    }
    if(valorLocalizacion==2){
        $('div[id="divcoberturas"]').hide(350);
        $('div[id="divproductos"]').show(350);
        var elementoIProducto=$('i[id="i-cobertura"]');
        elementoIProducto.removeClass('typcn typcn-chevron-right');
        var elementoICobertura=$('i[id="i-producto"]');
        elementoICobertura.addClass('typcn typcn-chevron-right');
    }
    if(valorLocalizacion==1){
        $('button[id="devolver-pasos"]').hide();
    }
    
    
    if(valorLocalizacion<=5){
        $('button[id="boton-fase2"]').hide();
    }
}