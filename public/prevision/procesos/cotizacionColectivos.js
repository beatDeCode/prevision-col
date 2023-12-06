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
    var validacionFase2=fnValidarVacios('formulario-carga');
    try {
        console.log(validacionFase2);
        if(validacionFase2<=0){
            calcularEdad();
            fnValidarTelefono();
            var formulario=[];

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
                            console.log(JSONParse);
                            var contenido=JSONParse.message.content;
                            var validacion=JSONParse.message.validate;
                            var error=JSONParse.error;
                            if(validacion==1){
                                var divFase3=$('div[id="contenido"]');
                                divFase3.html('');
                                var factura=fnDetalleFactura(contenido[0]['mt_cuota'],contenido[0]['mt_cuota_plan'],contenido[0]['nu_temporal']);
                                divFase3.append(
                                '<div class="row">'+
                                    '<input type="hidden" name="nu_temporal" value="'+contenido[0]['nu_temporal']+'" >'+
                                    factura+
                                '</div>');
                                var fase2=$('div[id="fase2"]');
                                fase2.hide(500);
                                var fase3=$('div[id="fase3"]');
                                fase3.fadeIn('slow');
                            }else{
                                var input='';
                                var errores='';
                                if(error==9){
                                    
                                    for(var a=0;a<contenido.length;a++){
                                        errores+='<center><p style="color:red">'+contenido[a]+'</p></center>';
                                    }
                                }else{
                                    input='<input type="hidden" name="nu_temporal" value="'+contenido[0]['nu_temporal']+'" >';
                                    for(var a=0;a<contenido.length;a++){
                                        errores+='<center><p style="color:red">La linea '+contenido[a]['nu_linea']+' Tiene Errores: '+contenido[a]['error']+'</p></center>';
                                    }
                                }
                                
                                var divFase3=$('div[id="contenido"]');
                                divFase3.html('');
                                divFase3.append(
                                '<div class="row">'+
                                    input+
                                    '<div class="col-md-12"><center>'+errores+'<center></div>'+
                                '</div>');
                                var fase2=$('div[id="fase2"]');
                                fase2.hide(500);
                                var fase3=$('div[id="fase3"]');
                                fase3.fadeIn('slow');
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
        }else{

        }
        
        
           
        
    } catch (error) {
        console.log(error);
    }
}

function fnDetalleFactura(montoCuota,montoCuotaPlan,numeroTemporal){
        var nombre=$('input[name="nm_completo"]').val();
        var nu_documento=$('input[name="nu_documento"]').val();
        var tp_documento=$('select[name="tp_documento"] option:selected').val();
        var telefono=$('input[name="nu_telefono"]').val();
        var area=$('select[name="nu_area"] option:selected').text();
        var correo=$('input[name="de_correo"]').val();

        var producto=$('select[name="cd_producto"] option:selected').text();
        var cobertura=$('select[name="cd_cobertura"] option:selected').text();
        var coberturaDetalle=$('select[name="mt_suma_asegurada"] option:selected').text();
        var grupoFamiliar=$('select[name="cd_grupo_familiar"] option:selected').text();
        var planpago=$('select[name="cd_plan_pago"] option:selected').text();
        var cabecera1=
            '<td style="font-size:11px;background-color:#e9ecef;text-align:left;">'+
                '<b>Cliente</b>:'+telefono+' '+tp_documento+'-'+nu_documento+'<br/>'+
                '<b>Telefono</b>: '+area+' '+telefono+'<br/>'+
                '<b>Correo</b>:'+correo+'<br/>'+
            '</td>';
            
        var cabecera2=
            '<td style="font-size:11px;background-color:#e9ecef;text-align:left;">'+
                '<b>Producto</b>: '+producto+'<br />'+
                '<b>Cobertura</b>: '+cobertura+' / <b>Monto a Riesgo</b>:'+coberturaDetalle+'<br/>'+
                '<b>Grupo Familiar</b>:'+grupoFamiliar+'<br/>'+
                '<b>Plan de Pago</b>: '+planpago+'<br/>'+
            '</td>';
            
            var contenidoCabecera=cabecera1+cabecera2;
            var contenidoTitular=
                    '<tr class="details" style="font-size:11px;text-align:center;">'+
                        '<td colspan="2"><center>'+nombre+'</center></td>'+
                        '<td><center>'+tp_documento+'-'+nu_documento+'</center></td>'+
                        '<td><center>'+montoCuota+'</center></td>'+
                        '<td><center>'+montoCuotaPlan+'</center></td>'+
                    '<tr/>';
            var base=parseFloat(montoCuotaPlan);
            var subTotal=base*(0.16);
            var total=base+subTotal;
            var baseConDecimales=base.toFixed(3);
            var subTotalConDecimales=subTotal.toFixed(3);
            var totalConDecimales=total.toFixed(3);
            var contenidoTotal=
            '<tr class="item last">'+
            '<td colspan="3"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Total Prima Base</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+baseConDecimales.replace('.',',')+'</b></td>'+
            '</tr>'+
            '<tr class="item last">'+
            '<td colspan="3"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Sub Total (16%) I.V.A</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+subTotalConDecimales.replace('.',',')+'</b></td>'+
            '</tr>'+
            '<tr class="item last">'+
            '<td colspan="3"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Total</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+ totalConDecimales.replace('.',',')+'</b></td>'+
            '</tr>';
            var detalleFactura=contenidoTitular;
            var tablaFactura=fnArmarFactura(contenidoCabecera,detalleFactura,contenidoTotal,numeroTemporal);
            return tablaFactura;
}


function fnArmarFactura(contenidoCabecera,contenidDetalle,total,numeroTemporal){
    var factura=
    '<div class="invoice-box" style="width:800px">'+
	'<table cellpadding="0" cellspacing="0" >'+
		'<tr class="top">'+
			'<td colspan="5">'+
				'<table>'+
				'<tr>'+
                    '<td class="title" style="font-size:11px;">'+
                        '<img src="/images/prevision-loginv1.png"style="width: 100%; max-width: 150px"/>'+
                    '</td>'+

                    '<td style="font-size:11px;">'+
                        'Caracas, 10/11/2023 <br />'+
                        'Prevision Funeraria (ASOPROINFU)<br/>'+
                    '</td>'+
				'</tr>'+
			    '<tr>'+
                    contenidoCabecera+
				'</tr>'+
				'</table>'+
			'</td>'+
		'</tr>'+
		'<tr class="information" >'+
			'<td colspan="5" style="font-size:11px;">'+
				'<center><b>Detalle de la Cotización</b><center>'+
			'</td>'+
		'</tr>'+
		'<tr class="heading" style="font-size:11px;text-align:center;">'+
			'<td colspan="2">Nombre</td>'+
			'<td>Documento </td>'+
			'<td>Cuota </td>'+
            '<td>Cuota Por Plan Pago</td>'+
		'</tr>'+
        contenidDetalle+
        total+
        '<tr class="heading" style="font-size:11px;text-align:center;">'+
			'<td colspan="5"> <button onclick="fnDescargarCotizacion('+numeroTemporal+')">Ver Cotizacion</button></td>'+
		'</tr>'+
	'</table>'+
	'</div>';
    return factura;
    
}

function fnDescargarCotizacion(numeroTemporal){
    window.location.replace('http://10.10.0.202:9003/sgd.reportes-xlsx/COTIZACION_COLECTIVO_PDF/NU_TEMPORAL-'+numeroTemporal);
    /*setInterval(function(){
        window.location.replace('/prevision.procesos.cartera.cotizacion');
    },3000);*/
}

function fnVolverFase2(){
    var numeroTemporal=$('input[name="nu_temporal"]').val();
    if(numeroTemporal){
        $.ajax({
            url:'/prevision.procesos.cartera.borrarTemporal-colectivo/'+numeroTemporal,
            type:'GET',
        }).done(function(){
            $('#fase2').show(); 
            $('#fase3').hide();
        })
    }else{
        $('#fase2').show(); 
        $('#fase3').hide();
    }
    
}

