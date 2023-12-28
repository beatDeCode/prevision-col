$('select[name="cd_producto"').on('change',function(){
    var busqueda='busquedaSumasAseguradas';
    var tokenLaravel=$('input[name="_token"]').val();
    var producto=$('select[name="cd_producto"] option:selected').val();
    var selectCobertura=$('select[name="mt_suma_asegurada"]');
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
            /*var botones=fnDespliegueBotones(valoresOption,'fnCambiarCobertura','cobertura','Coberturas');
            var divCoberturas=$('div[id="divcoberturas"]');
            divCoberturas.html('');
            divCoberturas.append(botones);
            divCoberturas.show(350);*/
            var botones=fnDespliegueBotones(valoresOption,'fnCambiarSumas','sumas','Monto a Riesgo',1);
            var divCoberturas=$('div[id="divsumas"]');
            divCoberturas.html('');
            divCoberturas.append(botones);
            divCoberturas.show();
            
        }

    });
});
/*
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
*/
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

function fnDespliegueBotones(opciones,nombreFuncion,nombreTarjeta,nombreTitulo,inMuestraPrima){
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
    var botonesPrima='';
    var botonesPrimaAdicional='';
    var pixelesTarjetas=215;
    var costos='';
    for(var a=0;a<opciones.length;a++){
        if(inMuestraPrima==1){
            costos='<p class="card-text" style="text-align:left !important;" >Costos: </p>';
            pixelesTarjetas=350;
            var prima=(opciones[a]['prima']).split('|');
            for(var b=0;b<prima.length;b++){
                var valores=(prima[b]).split('-');
                botonesPrima+='<a class="badge col-md-5 " style="background-color:'+valores[0]+';color:white;margin:5px;">'+valores[1]+' '+valores[2]+'</a> ';
            }
            botonesPrimaAdicional=
            '<a class="badge col-md-6" style="background-color:#f2125e;color:white;margin:5px;">ADICIONAL '+(opciones[a]['prima_adicional'])+'</a>';
            ;
        }
        if(inMuestraPrima==2){
            costos='<p class="card-text" style="text-align:left !important;" >Costos: </p>';
            pixelesTarjetas=300;
            botonesPrima+='<p class="badge col-md-10 offset-md-1" style="font-size:23px;color:white;text-align:center;background-color:#48d17fd4;">'+opciones[a]['mt_prima']+'</p>';
            
        }
        botones+=
        '<div class="col-sm-'+opciones[a]['columnas']+'">'+
            '<br>'+
            '<div id="card-'+nombreTarjeta+'-'+opciones[a]['value']+'" class="card text-right" style="height:'+pixelesTarjetas+'px;border-radius:15px;border: 2px solid lightgray;">'+
                '<div class="card-body">'+
                    costos+
                    '<div class="row">'+botonesPrima+botonesPrimaAdicional+'</div>'+
                    '<br>'+
                    '<h5 class="card-title">'+opciones[a]['text']+'</h5>'+
                    '<p class="card-text">'+opciones[a]['de_tarjeta']+' </p>'+
                    
                '</div>'+
                '<div class="card-footer">'+
                   '<a  onclick="'+nombreFuncion+'('+opciones[a]['value']+')" class="badge" style="background-color: #1d4068;color:white;text-align:left;">Elegir</a>'+
                '</div>'+
            '</div>'+
        '</div>';
        botonesPrima='';
    }
    var cierreRow='</div></div>';
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
    var elementoICobertura=$('i[id="i-suma"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    inputLocalizacion.val(2);
    $('a[id="devolver-pasos"]').show();
}
/*
function fnCambiarCobertura(cobertura){
    
    $('select[name="cd_cobertura"]').val(cobertura).change();
    $('div[id="divcoberturas"]').hide();
    var resumen=$('p[id="resumen-cobertura"]');
    resumen.html('');
    resumen.append($('select[name="cd_cobertura"] option:selected').text());
    var elementoIProducto=$('i[id="i-cobertura"]');
    elementoIProducto.removeClass('typcn typcn-chevron-right');
    var elementoICobertura=$('i[id="i-suma"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    inputLocalizacion.val(2);
}*/

function fnCambiarSumas(suma){
    console.log(suma);
    $('select[name="mt_suma_asegurada"]').val(suma).change();
    $('div[id="divsumas"]').hide(350);
    var resumen=$('p[id="resumen-suma"]');
    resumen.html('');
    resumen.append($('select[name="mt_suma_asegurada"] option:selected').text());
    console.log($('select[name="mt_suma_asegurada"] option:selected').text());
    var elementoIProducto=$('i[id="i-suma"]');
    elementoIProducto.removeClass('typcn typcn-chevron-right');
    var elementoICobertura=$('i[id="i-grupo-familiar"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    inputLocalizacion.val(3);
    $('button[id="boton-fase2"]').show();
    
}
function fnCambiarGrupoFamiliar(grupofamiliar){
    
    $('select[name="cd_grupo_familiar"]').val(grupofamiliar).change();
    //$('div[id="divgrupofamiliar"]').hide(350);
    var resumen=$('p[id="resumen-grupo-familiar"]');
    resumen.html('');
    resumen.append($('select[name="cd_grupo_familiar"] option:selected').text());
    var elementoIProducto=$('i[id="i-grupo-familiar"]');
    elementoIProducto.removeClass('typcn typcn-chevron-right');
    var elementoICobertura=$('i[id="i-plan-pago"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    //var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    //inputLocalizacion.val(5);
    
}
function fnCambiarPlanPago(planpago){

    $('select[name="cd_plan_pago"]').val(planpago).change();
    var resumen=$('p[id="resumen-plan-pago"]');
    resumen.html('');
    resumen.append($('select[name="cd_plan_pago"] option:selected').text());
    var elementoIProducto=$('i[id="i-plan-pago"]');
    elementoIProducto.removeClass('typcn typcn-chevron-right');
    var elementoICobertura=$('i[id="i-adicionales"]');
    elementoICobertura.addClass('typcn typcn-chevron-right');
    fnActivarBotonProducto(planpago,'plan-pago');

}   
function fnUbicacionResumen(){
    var inputLocalizacion=$('input[name="indicador-ubicacion-resumen"]');
    var valorLocalizacion=inputLocalizacion.val();
    inputLocalizacion.val(valorLocalizacion-1);
    var valorGeneral=valorLocalizacion-1;
    if(valorGeneral==2){
        $('div[id="divgrupofamiliar"]').hide(350);
        $('div[id="divsumas"]').show(350);
        var elementoIProducto=$('i[id="i-plan-pago"]');
        elementoIProducto.removeClass('typcn typcn-chevron-right');
        var elementoIProducto=$('i[id="i-grupo-familiar"]');
        elementoIProducto.removeClass('typcn typcn-chevron-right');
        var elementoICobertura=$('i[id="i-suma"]');
        elementoICobertura.addClass('typcn typcn-chevron-right');
    }
    if(valorGeneral==1){
        $('div[id="divsumas"]').hide(350);
        $('div[id="divproductos"]').show(350);
        var elementoIProducto=$('i[id="i-suma"]');
        elementoIProducto.removeClass('typcn typcn-chevron-right');
        var elementoICobertura=$('i[id="i-producto"]');
        elementoICobertura.addClass('typcn typcn-chevron-right');
        $('a[id="devolver-pasos"]').hide();
    }    

    if(valorLocalizacion<=3){
        $('button[id="boton-fase2"]').hide();
    }
}

$('select[name="cd_plan_pago"').on('change',function(){
    var divBotonesCotizacion=$('div[id="botones-cotizacion"]');
    divBotonesCotizacion.show(350);
    
    /*var divResumen=$('div[id="div-resumen-preliminar"]');
    var divResumenAnterior=$('div[id="div-resumen-adicionales"]').html();
    divResumen.html('');
    divResumen.append(divResumenAnterior);*/
    //fnCrearPreliminar();
});


