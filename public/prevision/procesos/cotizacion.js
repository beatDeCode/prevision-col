function fnDevolverFase(fase){
    if(fase==2){
        $('#fase2').hide();
        $('#fase1').show();
        var botonResumen=$('a[id="devolver-pasos"]');
        botonResumen.css('display','block');
    }
    if(fase==3){
        $('#fase3_').hide();
        $('#fase2').show();
    }
    if(fase==4){
        $('#fase3').hide();
        $('#fase3_').show();
    }
    if(fase==5){
        $('#fase4').hide();
        $('#fase3').show();
    }
}
function fnMoverFase2(formulario){
    
    var validacionFase1=fnValidarVacios(formulario);
    if(validacionFase1==0){
        var fase1=$('div[id="fase1"]');
        fase1.toggle(500);
        var fase2=$('div[id="fase2"]');
        fase2.show(500);
        var divResumen=$('div[id="div-resumen-adicionales"]');
        var divResumenAnterior=$('div[id="div-resumen-producto"]').html();
        divResumen.html('');
        divResumen.append(divResumenAnterior);
        var botonResumen=$('a[id="devolver-pasos"]');
        botonResumen.css('display','none');
        
    }
    
}
function fnCrearPreliminar(){
    var tokenLaravel=$('input[name="_token"]').val();
    var contadorDeClonacion=$('input[name="contador-clonacion-asegurados"]').val();
    var contadorDeClonacionAdicionales=$('input[name="contador-clonacion-adicionales"]').val();
    var cedulaTitular=$('input[name="nu_documento"]').val();
    var tipoDocumento=$('select[name="tp_documento"] option:selected').val();
    var nm_persona1=$('input[name="nm_persona1"]').val();
    var ap_persona1=$('input[name="ap_persona1"]').val();
    var mt_suma_asegurada=$('select[name="mt_suma_asegurada"] option:selected').val();
    var cd_producto=$('select[name="cd_producto"] option:selected').val();
    var cd_grupo_familiar=$('select[name="cd_grupo_familiar"] option:selected').val();
    var cd_plan_pago=$('select[name="cd_plan_pago"] option:selected').val();
    var valoresFormulario=$('input[name="valores-formulario"]').val();
    var valoresFormularioAdicionales=$('input[name="valores-formulario-adic"]').val();
    var tipoCalculo=$('select[name="cd_tipo_calculo"] option:selected').val();
    var de_adicionales=$('input[name="de_adicionales"]:checked').val();
    var de_asegurados=$('input[name="de_asegurados"]:checked').val();
    var mt_prima=0;
    if($('input[name="mt_prima"]')){
        mt_prima=$('input[name="mt_prima"]').val();
    }   
    var valoresDesglosados=valoresFormulario.split(',');
    var valoresDesglosadosAdicionales=valoresFormularioAdicionales.split(',');
    var formulario=[];
    
    formulario.push({name:'nu_documento',value:cedulaTitular});
    formulario.push({name:'tp_documento',value:tipoDocumento});
    formulario.push({name:'nm_persona1',value:nm_persona1});
    formulario.push({name:'ap_persona1',value:ap_persona1});
    formulario.push({name:'cd_producto',value:cd_producto});
    formulario.push({name:'mt_suma_asegurada',value:mt_suma_asegurada});
    formulario.push({name:'cd_grupo_familiar',value:cd_grupo_familiar});
    formulario.push({name:'cd_plan_pago',value:cd_plan_pago});
    formulario.push({name:'ca_clonacion',value:contadorDeClonacion});
    formulario.push({name:'ca_clonacion_adicionales',value:contadorDeClonacionAdicionales});
    formulario.push({name:'cd_tipo_calculo',value:tipoCalculo});
    formulario.push({name:'mt_prima',value:mt_prima});
    formulario.push({name:'nu_documento',value:cedulaTitular});
    formulario.push({name:'de_adicionales',value:de_adicionales});
    formulario.push({name:'de_asegurados',value:de_asegurados});
    for(var a=0;a<valoresDesglosados.length;a++){   
        if(valoresDesglosados[a]=='boton'){
            
        }else{
            var select=$('select[name="'+valoresDesglosados[a]+'"]');
            var input=$('input[name="'+valoresDesglosados[a]+'"]');
            if(input.length==1){
                var valorInput=$('input[name="'+valoresDesglosados[a]+'"]').val();
                formulario.push({name:valoresDesglosados[a],value:valorInput});
            }
            if(select.length==1){
                var valorSelect=$('select[name="'+valoresDesglosados[a]+'"] option:selected').val();
                formulario.push({name:valoresDesglosados[a],value:valorSelect});
            }
        }
    }
    for(var a=0;a<valoresDesglosadosAdicionales.length;a++){   
        if(valoresDesglosadosAdicionales[a]=='boton'){
            
        }else{
            var select=$('select[name="'+valoresDesglosadosAdicionales[a]+'"]');
            var input=$('input[name="'+valoresDesglosadosAdicionales[a]+'"]');
            if(input.length==1){
                var valorInput=$('input[name="'+valoresDesglosadosAdicionales[a]+'"]').val();
                formulario.push({name:valoresDesglosadosAdicionales[a],value:valorInput});
            }
            if(select.length==1){
                var valorSelect=$('select[name="'+valoresDesglosadosAdicionales[a]+'"] option:selected').val();
                formulario.push({name:valoresDesglosadosAdicionales[a],value:valorSelect});
            }
        }
    }
    
    for(var b=0;b<contadorDeClonacion;b++){
        formulario.push({name:'nu_asegurado'+b,value:b});
        for(var c=0;c<valoresDesglosados.length;c++){
            if(valoresDesglosados[c]=='boton'){
                
            }else{
                var select=$('select[name="'+valoresDesglosados[c]+''+b+'"]');
                var input=$('input[name="'+valoresDesglosados[c]+'"]');
                if(input.length==1){
                    var valorInput=$('input[name="'+valoresDesglosados[c]+''+b+'"]').val();
                    formulario.push({name:valoresDesglosados[c]+''+b,value:valorInput});
                }
                if(select.length==1){
                    var valorSelect=$('select[name="'+valoresDesglosados[c]+''+b+'"] option:selected').val();
                    formulario.push({name:valoresDesglosados[c]+''+b,value:valorSelect});
                }
            }
        }
    }
    for(var b=0;b<contadorDeClonacionAdicionales;b++){
        formulario.push({name:'nu_adicional'+b,value:b});
        for(var c=0;c<valoresDesglosadosAdicionales.length;c++){
            if(valoresDesglosadosAdicionales[c]=='boton'){
                
            }else{
                var select=$('select[name="'+valoresDesglosadosAdicionales[c]+''+b+'"]');
                var input=$('input[name="'+valoresDesglosadosAdicionales[c]+'"]');
                if(input.length==1){
                    var valorInput=$('input[name="'+valoresDesglosadosAdicionales[c]+''+b+'"]').val();
                    formulario.push({name:valoresDesglosadosAdicionales[c]+''+b,value:valorInput});
                }
                if(select.length==1){
                    var valorSelect=$('select[name="'+valoresDesglosadosAdicionales[c]+''+b+'"] option:selected').val();
                    formulario.push({name:valoresDesglosadosAdicionales[c]+''+b,value:valorSelect});
                }
            }
        }
    }
    fnAlertaDeEsperaTransccion();
    $.ajax({
        url:'/prevision.procesos.cartera.generar-cotizacion',
        type:'POST',
        cache:false,
        headers: {'X-CSRF-TOKEN': tokenLaravel},
        data:formulario
    }).done(function(response){
        console.log(response);
        var JSONParse=JSON.parse(response);
        if(JSONParse.httpResponse==200){
            swal.close();
            var valoresCotizacion=JSONParse.message.content;
            var siglas=valoresCotizacion[0]['siglas_moneda'];
            var contenidoTitular='';
            var contenidoAsegurados='';
            var base=0;
            for(var a=0;a<valoresCotizacion.length;a++){
                base+=parseFloat(valoresCotizacion[a]['mt_prima_plan']);
                if(a==0){
                    var mtPrimaCuotaDecimales=parseFloat(valoresCotizacion[a]['mt_prima_plan']).toFixed(2);
                    var contenidoTitular=
                    '<tr style="font-size:11px;text-align:center;padding: 1px;">'+
                        '<td style="font-size:13px;"><center>'+valoresCotizacion[a]['parentesco']+'</center></td>'+
                        '<td style="font-size:13px;"><center>'+valoresCotizacion[a]['nm_completo']+'</center></td>'+
                        '<td style="font-size:13px;"><center>'+valoresCotizacion[a]['nu_documento']+'</center></td>'+
                        '<td style="font-size:13px;"><center>'+valoresCotizacion[a]['es_adicional']+'</center></td>'+
                        '<td style="font-size:13px;"><center>'+mtPrimaCuotaDecimales+' '+siglas+'</center></td>'+
                        '<td style="font-size:13px;"></td>'+
                    '<tr/>'
                    ;
                }
                if(a>0){
                    var mtPrimaCuotaDecimales=parseFloat(valoresCotizacion[a]['mt_prima_plan']).toFixed(2);
                    contenidoAsegurados+=
                    '<tr style="font-size:11px;text-align:center;padding: 1px;">'+
                        '<td style="font-size:12px;"><center>'+valoresCotizacion[a]['parentesco']+'</center></td>'+
                        '<td style="font-size:12px;"><center>'+valoresCotizacion[a]['nm_completo']+'</center></td>'+
                        '<td style="font-size:12px;"><center>'+valoresCotizacion[a]['nu_documento']+'</center></td>'+
                        '<td style="font-size:12px;"><center>'+valoresCotizacion[a]['es_adicional']+'</center></td>'+
                        '<td style="font-size:12px;"><center>'+mtPrimaCuotaDecimales+''+siglas+'</center> </td>'+
                        '<td style="font-size:12px;padding:1px;"><center><a class="badge" style="background-color: #1d4068;color:white;text-align:left;font-size:12px;" onclick="fnEliminarAsegurado(\''+ valoresCotizacion[a]['nu_asegurado'] + '\') "> <i class="typcn typcn-trash"></i></a> </center></td>'+
                    '</tr>';
                }
            }
            var subTotal=base*(0.16);
            var total=base+subTotal;
            var baseConDecimales=base.toFixed(2);
            var subTotalConDecimales=subTotal.toFixed(2);
            var totalConDecimales=total.toFixed(2);
            var contenidoTotal=
            '<tr >'+
            '<td colspan="3"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Total Prima Base</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+baseConDecimales.replace('.',',')+' '+siglas+'</b></td>'+
            '</tr>'+
            '<tr >'+
            '<td colspan="3"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Sub Total (16%) I.V.A</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+subTotalConDecimales.replace('.',',')+' '+siglas+'</b></td>'+
            '</tr>'+
            '<tr >'+
            '<td colspan="3"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Total</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+ totalConDecimales.replace('.',',')+' '+siglas+'</b></td>'+
            '</tr>';
            var detalleFactura=contenidoTitular+contenidoAsegurados+contenidoTotal;
            var tablaPreliminar=$('tbody[id="preliminar"]');
            var tablaDivPreliminar=$('div[id="preliminar-factura"]');
            tablaPreliminar.html('');
            tablaPreliminar.append(detalleFactura);
            tablaDivPreliminar.show();
            tablaPreliminar.show();
        }
    }).fail(function(a,c,b){
        console.log('Prueba',formulario);
        console.log(a,b,c);
    });
}
function fnCrearCotizacion(){
    var tokenLaravel=$('input[name="_token"]').val();
    var contadorDeClonacion=$('input[name="contador-clonacion-asegurados"]').val();
    var contadorDeClonacionAdicionales=$('input[name="contador-clonacion-adicionales"]').val();
    var cedulaTitular=$('input[name="nu_documento"]').val();
    var tipoDocumento=$('select[name="tp_documento"] option:selected').val();
    var nm_persona1=$('input[name="nm_persona1"]').val();
    var ap_persona1=$('input[name="ap_persona1"]').val();
    var mt_suma_asegurada=$('select[name="mt_suma_asegurada"] option:selected').val();
    var cd_producto=$('select[name="cd_producto"] option:selected').val();
    var cd_grupo_familiar=$('select[name="cd_grupo_familiar"] option:selected').val();
    var cd_plan_pago=$('select[name="cd_plan_pago"] option:selected').val();
    var valoresFormulario=$('input[name="valores-formulario"]').val();
    var valoresFormularioAdicionales=$('input[name="valores-formulario-adic"]').val();
    var tipoCalculo=$('select[name="cd_tipo_calculo"] option:selected').val();
    var de_adicionales=$('input[name="de_adicionales"]:checked').val();
    var de_asegurados=$('input[name="de_asegurados"]:checked').val();
    var mt_prima=0;
    if($('input[name="mt_prima"]')){
        mt_prima=$('input[name="mt_prima"]').val();
    }   
    var valoresDesglosados=valoresFormulario.split(',');
    var valoresDesglosadosAdicionales=valoresFormularioAdicionales.split(',');
    var formulario=[];
    
    formulario.push({name:'nu_documento',value:cedulaTitular});
    formulario.push({name:'tp_documento',value:tipoDocumento});
    formulario.push({name:'nm_persona1',value:nm_persona1});
    formulario.push({name:'ap_persona1',value:ap_persona1});
    formulario.push({name:'cd_producto',value:cd_producto});
    formulario.push({name:'mt_suma_asegurada',value:mt_suma_asegurada});
    formulario.push({name:'cd_grupo_familiar',value:cd_grupo_familiar});
    formulario.push({name:'cd_plan_pago',value:cd_plan_pago});
    formulario.push({name:'ca_clonacion',value:contadorDeClonacion});
    formulario.push({name:'ca_clonacion_adicionales',value:contadorDeClonacionAdicionales});
    formulario.push({name:'cd_tipo_calculo',value:tipoCalculo});
    formulario.push({name:'mt_prima',value:mt_prima});
    formulario.push({name:'nu_documento',value:cedulaTitular});
    formulario.push({name:'de_adicionales',value:de_adicionales});
    formulario.push({name:'de_asegurados',value:de_asegurados});
    console.log();
    for(var a=0;a<valoresDesglosados.length;a++){   
        if(valoresDesglosados[a]=='boton'){
            
        }else{
            var select=$('select[name="'+valoresDesglosados[a]+'"]');
            var input=$('input[name="'+valoresDesglosados[a]+'"]');
            if(input.length==1){
                var valorInput=$('input[name="'+valoresDesglosados[a]+'"]').val();
                formulario.push({name:valoresDesglosados[a],value:valorInput});
            }
            if(select.length==1){
                var valorSelect=$('select[name="'+valoresDesglosados[a]+'"] option:selected').val();
                formulario.push({name:valoresDesglosados[a],value:valorSelect});
            }
        }
    }
    for(var a=0;a<valoresDesglosadosAdicionales.length;a++){   
        if(valoresDesglosadosAdicionales[a]=='boton'){
            
        }else{
            var select=$('select[name="'+valoresDesglosadosAdicionales[a]+'"]');
            var input=$('input[name="'+valoresDesglosadosAdicionales[a]+'"]');
            if(input.length==1){
                var valorInput=$('input[name="'+valoresDesglosadosAdicionales[a]+'"]').val();
                formulario.push({name:valoresDesglosadosAdicionales[a],value:valorInput});
            }
            if(select.length==1){
                var valorSelect=$('select[name="'+valoresDesglosadosAdicionales[a]+'"] option:selected').val();
                formulario.push({name:valoresDesglosadosAdicionales[a],value:valorSelect});
            }
        }
    }
    
    for(var b=0;b<contadorDeClonacion;b++){
        formulario.push({name:'nu_asegurado'+b,value:b});
        for(var c=0;c<valoresDesglosados.length;c++){
            if(valoresDesglosados[c]=='boton'){
                
            }else{
                var select=$('select[name="'+valoresDesglosados[c]+''+b+'"]');
                var input=$('input[name="'+valoresDesglosados[c]+'"]');
                if(input.length==1){
                    var valorInput=$('input[name="'+valoresDesglosados[c]+''+b+'"]').val();
                    formulario.push({name:valoresDesglosados[c]+''+b,value:valorInput});
                }
                if(select.length==1){
                    var valorSelect=$('select[name="'+valoresDesglosados[c]+''+b+'"] option:selected').val();
                    formulario.push({name:valoresDesglosados[c]+''+b,value:valorSelect});
                }
            }
        }
    }
    for(var b=0;b<contadorDeClonacionAdicionales;b++){
        formulario.push({name:'nu_adicional'+b,value:b});
        for(var c=0;c<valoresDesglosadosAdicionales.length;c++){
            if(valoresDesglosadosAdicionales[c]=='boton'){
                
            }else{
                var select=$('select[name="'+valoresDesglosadosAdicionales[c]+''+b+'"]');
                var input=$('input[name="'+valoresDesglosadosAdicionales[c]+'"]');
                if(input.length==1){
                    var valorInput=$('input[name="'+valoresDesglosadosAdicionales[c]+''+b+'"]').val();
                    formulario.push({name:valoresDesglosadosAdicionales[c]+''+b,value:valorInput});
                }
                if(select.length==1){
                    var valorSelect=$('select[name="'+valoresDesglosadosAdicionales[c]+''+b+'"] option:selected').val();
                    formulario.push({name:valoresDesglosadosAdicionales[c]+''+b,value:valorSelect});
                }
            }
        }
    }
    fnAlertaDeEsperaTransccion();
    $.ajax({
        url:'/prevision.procesos.cartera.generar-cotizacion',
        type:'POST',
        cache:false,
        headers: {'X-CSRF-TOKEN': tokenLaravel},
        data:formulario
    }).done(function(response){
        swal.close();
        var JSONParse=JSON.parse(response);
        if(JSONParse.httpResponse==200){
            var valoresCotizacion=JSONParse.message.content;
            var valorArea=$('select[name="nu_area"] option:selected').text();
            var valorTelefono=$('input[name="nu_telefono"]').val();
            var valorCorreo=$('input[name="de_correo"]').val();
            //var tipoCalculo=$('select[name="cd_tipo_calculo"] option:selected').val();
            var cobertura=$('select[name="cd_cobertura"] option:selected').text();
            var planpago=$('select[name="cd_plan_pago"] option:selected').text();
            var siglas=valoresCotizacion[0]['siglas_moneda'];
            var cabecera1=
            '<td style="font-size:11px;background-color:#e9ecef;text-align:left;">'+
                '<b>Cliente</b>:'+valoresCotizacion[0]['nm_completo']+' '+valoresCotizacion[0]['nu_documento']+'<br/>'+
                '<b>Telefono</b>: '+valorArea+valorTelefono+'<br/>'+
                '<b>Correo</b>:'+valorCorreo+'<br/>'+
            '</td>';
            
            var coberturaDetalle=valoresCotizacion[0]['de_cobertura_detalle'];
            var cabecera2=
            '<td style="font-size:11px;background-color:#e9ecef;text-align:left;">'+
                '<b>Producto</b>: '+valoresCotizacion[0]['producto']+'<br />'+
                '<b>Cobertura</b>: '+cobertura+' / <b>Monto a Riesgo</b>:'+coberturaDetalle+'<br/>'+
                '<b>Grupo Familiar</b>:'+valoresCotizacion[0]['grupo_familiar']+'<br/>'+
                '<b>Plan de Pago</b>: '+planpago+'<br/>'+
            '</td>';
            
            var contenidoCabecera=cabecera1+cabecera2;
            var contenidoTitular='';
            var contenidoAsegurados='';
            var base=0;
            for(var a=0;a<valoresCotizacion.length;a++){
                base+=parseFloat(valoresCotizacion[a]['mt_prima_plan']);
                if(a==0){
                    var contenidoTitular=
                    '<tr class="details" style="font-size:11px;text-align:center;">'+
                        '<td><center>'+valoresCotizacion[a]['parentesco']+'</center></td>'+
                        '<td><center>'+valoresCotizacion[a]['nm_completo']+'</center></td>'+
                        '<td><center>'+valoresCotizacion[a]['nu_documento']+'</center></td>'+
                        '<td><center>'+valoresCotizacion[a]['es_adicional']+'</center></td>'+
                        '<td><center>'+valoresCotizacion[a]['mt_prima']+' '+siglas+'</center></td>'+
                        '<td><center>'+valoresCotizacion[a]['mt_prima_plan']+' '+siglas+'</center></td>'+
                    '<tr/>'
                    ;
                }
                if(a>0){
                    var mtPrimaDecimales=parseFloat(valoresCotizacion[a]['mt_prima']).toFixed(2);
                    var mtPrimaCuotaDecimales=parseFloat(valoresCotizacion[a]['mt_prima_plan']).toFixed(2);
                    contenidoAsegurados+=
                    '<tr class="details" style="font-size:11px;text-align:center;">'+
                        '<td><center>'+valoresCotizacion[a]['parentesco']+'</center></td>'+
                        '<td><center>'+valoresCotizacion[a]['nm_completo']+'</center></td>'+
                        '<td><center>'+valoresCotizacion[a]['nu_documento']+'</center></td>'+
                        '<td><center>'+valoresCotizacion[a]['es_adicional']+'</center></td>'+
                        '<td><center>'+mtPrimaDecimales+''+siglas+'</center></td>'+
                        '<td><center>'+mtPrimaCuotaDecimales+''+siglas+'</center></td>'+
                        
                    '</tr>';
                }
            }
            var subTotal=base*(0.16);
            var total=base+subTotal;
            var baseConDecimales=base.toFixed(2);
            var subTotalConDecimales=subTotal.toFixed(2);
            var totalConDecimales=total.toFixed(2);
            var contenidoTotal=
            '<tr>'+
            '<td colspan="4"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Total Prima Base</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+baseConDecimales.replace('.',',')+' '+siglas+'</b></td>'+
            '</tr>'+
            '<tr>'+
            '<td colspan="4"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Sub Total (16%) I.V.A</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+subTotalConDecimales.replace('.',',')+' '+siglas+'</b></td>'+
            '</tr>'+
            '<tr>'+
            '<td colspan="4"></td>'+
            '<td style="text-align:center;font-size:11px;"><b>Total</b></td>'+
            '<td style="text-align:center;font-size:11px;background-color: #e9ecef;"><b>'+ totalConDecimales.replace('.',',')+' '+siglas+'</b></td>'+
            '</tr>';
            var detalleFactura=contenidoTitular+contenidoAsegurados;
            var tablaFactura=fnArmarFactura(contenidoCabecera,detalleFactura,contenidoTotal);
            var div=$('div[id="factura"]');
            div.html('');
            div.append(tablaFactura);
        }
    }).fail(function(a,c,b){
        console.log(a,b,c);
    });

}
function fnArmarFactura(contenidoCabecera,contenidDetalle,total){
    var factura=
    '<div class="invoice-box">'+
	'<table cellpadding="0" cellspacing="0" >'+
		'<tr class="top">'+
			'<td colspan="6">'+
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
			'<td colspan="6" style="font-size:11px;">'+
				'<center><b>Detalle de la Cotización</b><center>'+
			'</td>'+
		'</tr>'+
		'<tr class="heading" style="font-size:11px;text-align:center;">'+
			'<td>Parentesco</td>'+
			'<td>Nombre</td>'+
			'<td>Documento </td>'+
            '<td>¿Es Adicional?</td>'+
			'<td>Cuota </td>'+
            '<td>Cuota Por Plan Pago</td>'+
		'</tr>'+
        contenidDetalle+
        total+
	'</table>'+
	'</div>';
    return factura;
}
function fnArregloBorrarErrores(contadorDeClonacion){
    var limpiarError1=$('div[id="errornu_documento"]');
    var limpiarError2=$('div[id="errornu_documento_asegurado"]');
    limpiarError1.html('');
    limpiarError2.html('');
    for(var b=0;b<contadorDeClonacion;b++){
        var limpiarError3=$('div[id="errornu_documento_asegurado"'+b+']');
        limpiarError3.html('');
    }
}
function fnMoverFase3_(formulario,formulario2,formulario3){
    var tokenLaravel=$('input[name="_token"]').val();
    var validacionFase2=fnValidarVacios(formulario);
    var validacionFase3=fnValidarVacios(formulario2);
    var validacionFase4=fnValidarVacios(formulario3);
    var contadorDeClonacion=$('input[name="contador-clonacion-asegurados"]').val();
    var contadorDeClonacionAdicionales=$('input[name="contador-clonacion-adicionales"]').val();
    var auxiliarValiacionFase2=parseInt(validacionFase2)+parseInt(validacionFase3)+parseInt(validacionFase4);
    try {
        calcularEdad();
        fnValidarTelefono();
        if(auxiliarValiacionFase2<=0){
            var formulario=[];
            var documentoTitular=$('input[name="nu_documento"]').val();
            var producto=$('select[name="cd_producto"] option:selected').val();
            formulario.push({name:'ca_clonacion',value:contadorDeClonacion});
            formulario.push({name:'ca_clonacion-adicionales',value:contadorDeClonacionAdicionales});
            formulario.push({name:'nu_documento',value:documentoTitular});
            formulario.push({name:'cd_producto',value:producto});
            if(contadorDeClonacion>=0){
                var documentoAsegurado=$('input[name="nu_documento_asegurado"]').val();
                formulario.push({name:'nu_documento_asegurado',value:documentoAsegurado});
                if(contadorDeClonacion>0){
                    for(var a=0;a<contadorDeClonacion;a++){
                        var documentoAseguradoExtra=$('input[name="nu_documento_asegurado'+a+'"]').val();
                        formulario.push({name:'nu_documento_asegurado'+a ,value:documentoAseguradoExtra});
                    }
                }
            }
            if(contadorDeClonacionAdicionales>=0){
                var documentoAsegurado=$('input[name="nu_documento_adicional"]').val();
                formulario.push({name:'nu_documento_adicional',value:documentoAsegurado});
                if(contadorDeClonacionAdicionales>0){
                    for(var a=0;a<contadorDeClonacion;a++){
                        var documentoAseguradoExtra=$('input[name="nu_documento_adicional'+a+'"]').val();
                        formulario.push({name:'nu_documento_adicional'+a ,value:documentoAseguradoExtra});
                    }
                }
            }
            $.ajax({
                url:'/prevision.procesos.cartera.valida-asegurados',
                type:'POST',
                cache:false,
                headers: {'X-CSRF-TOKEN': tokenLaravel},
                data:formulario
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
                        var fase2=$('div[id="fase3_"]');
                        fase2.fadeIn('slow');
                        var divResumen=$('div[id="div-resumen-preliminar"]');
                        var divResumenAnterior=$('div[id="div-resumen-adicionales"]').html();
                        divResumen.html('');
                        divResumen.append(divResumenAnterior);
                        //fnCrearPreliminar();
                        //fnCrearCotizacion();
                    }
                    
                    
                }
            }).fail(function(a,b,c){
                console.log(a,b,c);
            });
           
        }
    } catch (error) {
        console.log(error);
    }
}
function fnMoverFase3(formulario){
    var tokenLaravel=$('input[name="_token"]').val();
    var validacionFase2=fnValidarVacios(formulario);
    var contadorDeClonacion=$('input[name="contador-clonacion-asegurados"]').val();
    var auxiliarValiacionFase2=parseInt(validacionFase2) - (36-(parseInt(contadorDeClonacion)*5));
    try {
        calcularEdad();
        fnValidarTelefono();
        if(auxiliarValiacionFase2<=0){
            var formulario=[];
            var documentoTitular=$('input[name="nu_documento"]').val();
            var producto=$('select[name="cd_producto"] option:selected').val();
            formulario.push({name:'ca_clonacion',value:contadorDeClonacion});
            formulario.push({name:'nu_documento',value:documentoTitular});
            formulario.push({name:'cd_producto',value:producto});
            
            if(contadorDeClonacion>=0){
                var documentoAsegurado=$('input[name="nu_documento_asegurado"]').val();
                formulario.push({name:'nu_documento_asegurado',value:documentoAsegurado});
                if(contadorDeClonacion>0){
                    for(var a=0;a<contadorDeClonacion;a++){
                        var documentoAseguradoExtra=$('input[name="nu_documento_asegurado'+a+'"]').val();
                        formulario.push({name:'nu_documento_asegurado'+a ,value:documentoAseguradoExtra});
                    }
                }
            }
            $.ajax({
                url:'/prevision.procesos.cartera.valida-asegurados',
                type:'POST',
                cache:false,
                headers: {'X-CSRF-TOKEN': tokenLaravel},
                data:formulario
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
                        var fase1=$('div[id="fase3_"]');
                        fase1.hide(500);
                        var fase2=$('div[id="fase3"]');
                        fase2.fadeIn('slow');
                        fnCrearCotizacion();
                    }
                    
                    
                }
            }).fail(function(a,b,c){
                console.log(a,b,c);
            });
           
        }
    } catch (error) {
        console.log(error);
    }
}

function fnEsconderDomicilio(){
    $('div[id="nu_documento_domicilio"]').css('display','none');
    $('div[id="tp_documento_domicilio"]').css('display','none');
    $('div[id="tp_cuenta"]').css('display','none');
    $('div[id="nu_cuenta"]').css('display','none');
    $('div[id="cd_banco"]').css('display','none');
    $('div[id="titulo2"]').css('display','none');
}
fnEsconderDomicilio();
$('select[name="cd_forma_pago"]').on('change',function(){
    var formaPago=$('select[name="cd_forma_pago"] option:selected').val();
    console.log(formaPago);
    if(formaPago){
        if(formaPago==1){
            $('div[id="tp_documento_domicilio"]').css('display','none');
            $('div[id="nu_documento_domicilio"]').css('display','none');
            $('div[id="tp_cuenta"]').css('display','none');
            $('div[id="cd_banco"]').css('display','none');
            $('div[id="nu_cuenta"]').css('display','none');
            $('div[id="titulo2"]').css('display','none');
        }
        if(formaPago==2){
            $('div[id="titulo2"]').css('display','inline');
            $('div[id="nu_documento_domicilio"]').css('display','inline');
            $('div[id="tp_documento_domicilio"]').css('display','inline');
            $('div[id="tp_cuenta"]').css('display','inline');
            $('div[id="cd_banco"]').css('display','inline');
            $('div[id="nu_cuenta"]').css('display','inline');
            
        }
    }
});
function fnMoverFase4(){
    var fase1=$('div[id="fase3"]');
    fase1.hide(500);
    var fase2=$('div[id="fase4"]');
    fase2.fadeIn('slow');
}

$('select[name="cd_tipo_calculo"]').on('change',function(){
    var valorSeleccionado=$('select[name="cd_tipo_calculo"] option:selected').val();
    var html=
        '<div class="4" id="mt_prima">'+
            '<div class="form-label-group outline" >'+
                '<input type="number" id="mt_prima" name="mt_prima" '+
                'class="form-control shadow-none" placeholder="Colocar Prima" '+
                'style="height:47px;font-size:13px;" />'+

                '<span><label for="mt_prima" id="mt_prima">Monto Prima</label></span>'+
            '</div>'+
            '<div id="errormt_prima" style="font-size:11px;display:none;color:red;"></div>'+
        '</div>';
    var div=$('div[id="div_mt_prima"]');
    
    if(valorSeleccionado==2){
        div.html('');
        div.append(html);
    }else{
        div.html('');
    }
});
function validarFormularioArray(array){
    var contador=0;
    for(var a=0;a<array.length;a++){
        var indice=array[a]['value'];
        var div=$('div[id="error'+indice+'"]')
        if(array[a]['text']){
            div.hide();
        }else{
            div.show();
            div.html('');
            div.append('El campo est&aacute; vac&iacute;o');
            contador+=1;
        }
    }
    return contador;
}
function fnEmitir(){
    var formulario=[];
    var intermediario=$('select[name="cd_intermediario"]').val();
    var formaPago=$('select[name="cd_forma_pago"]').val(); 
    formulario.push({value:'cd_intermediario',text:intermediario});
    formulario.push({value:'cd_forma_pago',text:formaPago});
    
    var cantidadErrores=
    validarFormularioArray(formulario);

    if(cantidadErrores==0){
        contenidoHtml=$('div[id="factura"]').html();
        var sweetAlert=fnAlertDetalleFormulario(contenidoHtml,'Transacción');
        sweetAlert.then((response) =>{
            if(response.isConfirmed){
                if(formaPago==2 ){
                    var tipoDocumentoDomiclio=$('select[name="tp_documento_domicilio"] option:selected').val();
                    var documentoDomiclio=$('input[name="nu_documento_domicilio"]').val();
                    var tipoCuenta=$('select[name="tp_cuenta"] option:selected').val(); 
                    var cdBanco=$('select[name="cd_banco"] option:selected').val(); 
                    var cuenta=$('input[name="nu_cuenta"]').val(); 
                    
                    var div=$('div[id="errornu_cuenta"]');
                    if(cuenta.length!=20){
                        div.show();
                        div.html('');
                        div.append('La cuenta debe poseer 20 d&iacute;gitos.');
                    }else{
                        formulario.push({value:'tp_documento_domicilio',text:tipoDocumentoDomiclio});
                        formulario.push({value:'nu_documento_domicilio',text:documentoDomiclio});
                        formulario.push({value:'tp_cuenta',text:tipoCuenta});
                        formulario.push({value:'cd_banco',text:cdBanco});
                        formulario.push({value:'nu_cuenta',text:cuenta});
                        var formularioRequest=[];
                        var tokenLaravel=$('input[name="_token"]').val();
                        div.hide();
                        busqueda='busquedaCodigoVerificadorBanco';
                        formularioRequest.push({name:'tp_query',value:2});
                        formularioRequest.push({name:'query',value:busqueda});
                        formularioRequest.push({name:'nu_cuenta',value:cuenta});
                        formularioRequest.push({name:'cd_banco',value:cdBanco});
                        $.ajax({
                            url:'/prevision.general.querys',
                            type:'POST',
                            cache:false,
                            headers: {'X-CSRF-TOKEN': tokenLaravel},
                            data:formularioRequest
                        }).done(function(response){
                            var JSONParse=JSON.parse(response);
                            var contenido=JSONParse.message.content;
                            if(contenido[0]['cuenta']==0){
                                var div=$('div[id="errornu_cuenta"]');
                                div.show();
                                div.html('');
                                div.append('La cuenta no pertenece a ning&uacute;n Banco.');  
                            }else{
                                fnGuardarContrato();
                            }
                        }).fail(function(a,b,c){
                            console.log(a,b,c);
                        });
                    }
                }else{
                    fnGuardarContrato();
                }
            }else{
                
            }
        });
        
    }
}
function fnGuardarContrato(){
    var solicitud=[];
    var cantidadDeClonacion=0;
    cantidadDeClonacion=$('input[name="contador-clonacion-asegurados"]').val();
    var cantidadDeClonacionAdicionales=$('input[name="contador-clonacion-adicionales"]').val();
    solicitud.push( {name:'nm_persona1',value: $('input[name="nm_persona1"]').val() });
    solicitud.push( {name:'ap_persona1',value: $('input[name="ap_persona1"]').val() });
    solicitud.push( {name:'tp_documento',value: $('select[name="tp_documento"] option:selected').val() });
    solicitud.push( {name:'nu_documento',value: $('input[name="nu_documento"]').val() });
    solicitud.push( {name:'fe_nacimiento',value: $('input[name="fe_nacimiento"]').val() });
    solicitud.push( {name:'cd_sexo',value: $('select[name="cd_sexo"] option:selected').val() });
    solicitud.push( {name:'cd_estado',value: $('select[name="cd_estado"] option:selected').val() });
    solicitud.push( {name:'cd_municipio',value: $('select[name="cd_municipio"] option:selected').val() });
    solicitud.push( {name:'cd_parroquia',value: $('select[name="cd_parroquia"] option:selected').val() });
    solicitud.push( {name:'de_direccion',value: $('input[name="de_direccion"]').val() });
    solicitud.push( {name:'nu_area',value: $('select[name="nu_area"] option:selected').val() });
    solicitud.push( {name:'nu_telefono',value: $('input[name="nu_telefono"]').val() });
    solicitud.push( {name:'de_correo',value: $('input[name="de_correo"]').val() });
    solicitud.push( {name:'ca_clonacion',value: cantidadDeClonacion });
    solicitud.push( {name:'ca_clonacion-adicionales',value: cantidadDeClonacionAdicionales});

    solicitud.push( {name:'cd_producto',value: $('select[name="cd_producto"] option:selected').val() });
    solicitud.push( {name:'cd_cobertura',value: $('select[name="cd_cobertura"] option:selected').val() });
    solicitud.push( {name:'mt_suma_asegurada',value: $('select[name="mt_suma_asegurada"] option:selected').val() });
    solicitud.push( {name:'cd_plan_pago',value: $('select[name="cd_plan_pago"] option:selected').val() });
    solicitud.push( {name:'cd_grupo_familiar',value: $('select[name="cd_grupo_familiar"] option:selected').val() });
    solicitud.push( {name:'cd_tipo_calculo',value: $('select[name="cd_tipo_calculo"] option:selected').val() });

    var asegurados=$('input[name="de_asegurados"]').is(":checked");
    if(asegurados==true){
        solicitud.push( {name:'nm_persona1_asegurado',value: $('input[name="nm_persona1_asegurado"]').val() });
        solicitud.push( {name:'tp_documento_asegurado',value: $('select[name="tp_documento_asegurado"] option:selected').val() });
        solicitud.push( {name:'nu_documento_asegurado',value: $('input[name="nu_documento_asegurado"]').val() });
        solicitud.push( {name:'cd_sexo_asegurado',value: $('select[name="cd_sexo_asegurado"] option:selected').val() });
        solicitud.push( {name:'fe_nacimiento_asegurado',value: $('input[name="fe_nacimiento_asegurado"]').val() });
        solicitud.push( {name:'cd_parentesco_asegurado',value: $('select[name="cd_parentesco_asegurado"] option:selected').val() });
        if(cantidadDeClonacion>0){
            for(var a=0;a<cantidadDeClonacion;a++){
                solicitud.push( {name:'cd_parentesco_asegurado'+a,value: $('select[name="cd_parentesco_asegurado'+a+'"] option:selected').val() });
                solicitud.push( {name:'nm_persona1_asegurado'+a,value: $('input[name="nm_persona1_asegurado'+a+'"]').val() });
                solicitud.push( {name:'tp_documento_asegurado'+a,value: $('select[name="tp_documento_asegurado'+a+'"] option:selected').val() });
                solicitud.push( {name:'nu_documento_asegurado'+a,value: $('input[name="nu_documento_asegurado'+a+'"]').val() });
                solicitud.push( {name:'cd_sexo_asegurado'+a,value: $('select[name="cd_sexo_asegurado'+a+'"] option:selected').val() });
                solicitud.push( {name:'fe_nacimiento_asegurado'+a,value: $('input[name="fe_nacimiento_asegurado'+a+'"]').val() });
            }
        }
    }
    var adicionales=$('input[name="de_adicionales"]').is(":checked");
    if(adicionales==true){
        solicitud.push( {name:'nm_persona1_adicional',value: $('input[name="nm_persona1_adicional"]').val() });
        solicitud.push( {name:'tp_documento_adicional',value: $('select[name="tp_documento_adicional"] option:selected').val() });
        solicitud.push( {name:'nu_documento_adicional',value: $('input[name="nu_documento_adicional"]').val() });
        solicitud.push( {name:'cd_sexo_adicional',value: $('select[name="cd_sexo_adicional"] option:selected').val() });
        solicitud.push( {name:'fe_nacimiento_adicional',value: $('input[name="fe_nacimiento_adicional"]').val() });
        solicitud.push( {name:'cd_parentesco_adicional',value: $('select[name="cd_parentesco_adicional"] option:selected').val() });
        if(cantidadDeClonacionAdicionales>0){
            for(var a=0;a<cantidadDeClonacionAdicionales;a++){
                solicitud.push( {name:'cd_parentesco_adicional'+a,value: $('select[name="cd_parentesco_adicional'+a+'"] option:selected').val() });
                solicitud.push( {name:'nm_persona1_adicional'+a,value: $('input[name="nm_persona1_adicional'+a+'"]').val() });
                solicitud.push( {name:'tp_documento_adicional'+a,value: $('select[name="tp_documento_adicional'+a+'"] option:selected').val() });
                solicitud.push( {name:'nu_documento_adicional'+a,value: $('input[name="nu_documento_adicional'+a+'"]').val() });
                solicitud.push( {name:'cd_sexo_adicional'+a,value: $('select[name="cd_sexo_adicional'+a+'"] option:selected').val() });
                solicitud.push( {name:'fe_nacimiento_adicional'+a,value: $('input[name="fe_nacimiento_adicional'+a+'"]').val() });
            }
        }
    }

    var tokenLaravel=$('input[name="_token"]').val();
    var de_adicionales=$('input[name="de_adicionales"]:checked').val();
    var de_asegurados=$('input[name="de_asegurados"]:checked').val();
    solicitud.push( {name:'de_asegurados',value:de_asegurados });
    solicitud.push( {name:'de_adicionales',value: de_adicionales });
    var formaPago=$('select[name="cd_forma_pago"] option:selected').val();
    solicitud.push( {name:'cd_forma_pago',value: formaPago});
    solicitud.push( {name:'cd_intermediario',value: $('select[name="cd_intermediario"] option:selected').val() });
    if(formaPago==2){
        solicitud.push( {name:'tp_cuenta',value: $('select[name="tp_cuenta"] option:selected').val() });
        solicitud.push( {name:'nu_cuenta',value: $('input[name="nu_cuenta"]').val() });
        solicitud.push( {name:'nu_documento_domicilio',value: $('input[name="nu_documento_domicilio"]').val() });
        solicitud.push( {name:'tp_documento_domicilio',value: $('select[name="tp_documento_domicilio"] option:selected').val() });
    }
    fnAlertaDeEsperaTransccion();
    $.ajax({
        url:'/prevision.procesos.cartera.emision-contrato',
        type:'POST',
        cache:false,
        headers: {'X-CSRF-TOKEN': tokenLaravel},
        data:solicitud
    }).done(function(response){
        swal.close();
        var JSONParse=JSON.parse(response);
        setTimeout(function(){
            window.location.replace('/prevision.procesos.cartera.vista-emision/'+JSONParse.message.content); 
        },500);
    }).fail(function(a,b,c){
        console.log(a,b,c);
    });
}

function fnGenerarPDFContrato(contrato){
    window.location.replace('http://10.10.0.200:8081/sgd.reportes/JRTE0001_1/NU_CONTRATO-'+contrato);
}
function fnEnviarCorreoPDF(contrato,documento,nombre,correo){
    /*$.ajax({
        url:'http://10.10.0.200:8081/sgd.correo/JRTE0001_1/'+contrato+'/'+documento+'/'+nombre+'/'+correo,
        type:'GET',
        crossDomain: true,
    }).done(function(response){
        console.log(response,'http://10.10.0.200:8081/sgd.correo/JRTE0001_1/'+contrato+'/'+documento+'/'+nombreAux+'/'+correo);
    });*/
    window.open('http://10.10.0.200:8081/sgd.correo/JRTE0001_1/'+contrato+'/'+documento+'/'+nombre+'/'+correo, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
}

$('input[name="de_adicionales"]' ).change( "click", function(){
    fnCambiarSelectParentesco('busquedaParentescoPorGrupoFamiliarAdicionales','cd_parentesco_adicional');
    for(var a=0;a<3;a++){
        fnCambiarSelectParentesco('busquedaParentescoPorGrupoFamiliarAdicionales','cd_parentesco_adicional'+a);
    }
    var divAducionales=$('div[id="formulario-adicionales"]');
    var botonAdicionales=$('button[id="boton-adicionales"]');
    var adicionales=$('input[name="de_adicionales"]').is(":checked");
    var nm_persona=$('input[name="nm_persona1_adicional"]');
    var nu_documento=$('input[name="nu_documento_adicional"]');
    var tp_documento=$('select[name="tp_documento_adicional"]');
    var fe_nacimiento=$('input[name="fe_nacimiento_adicional"]');
    var cd_sexo=$('select[name="cd_sexo_adicional"]');
    var cd_parentesco=$('select[name="cd_parentesco_adicional"]');
    var resumen=$('p[id="resumen-adicionales"]');
    resumen.html('');
     if(adicionales==true){
        nm_persona.prop('disabled',false);
        nu_documento.prop('disabled',false);
        tp_documento.prop('disabled',false);
        fe_nacimiento.prop('disabled',false);
        cd_sexo.prop('disabled',false);
        cd_parentesco.prop('disabled',false);
        resumen.append('Con Adicionales');
        divAducionales.show();
        botonAdicionales.show();
     }else{
        nm_persona.prop('disabled',true);
        nu_documento.prop('disabled',true);
        tp_documento.prop('disabled',true);
        fe_nacimiento.prop('disabled',true);
        cd_sexo.prop('disabled',true);
        cd_parentesco.prop('disabled',true);
        resumen.append('Sin Adicionales');
        divAducionales.hide();
        botonAdicionales.hide();
     }
});

$('input[name="de_asegurados"]' ).change( "click", function(){
    fnCambiarSelectParentesco('busquedaParentescoPorGrupoFamiliarAsegurados','cd_parentesco_asegurado');
    for(var a=0;a<3;a++){
        fnCambiarSelectParentesco('busquedaParentescoPorGrupoFamiliarAsegurados','cd_parentesco_asegurado'+a);
    }
    var divAsegurados=$('div[id="formulario-asegurados"]');
    var botonAsegurados=$('button[id="boton-asegurados"]');
    var adicionales=$('input[name="de_asegurados"]').is(":checked");
    var nm_persona=$('input[name="nm_persona1_asegurado"]');
    var nu_documento=$('input[name="nu_documento_asegurado"]');
    var tp_documento=$('select[name="tp_documento_asegurado"]');
    var fe_nacimiento=$('input[name="fe_nacimiento_asegurado"]');
    var cd_sexo=$('select[name="cd_sexo_asegurado"]');
    var cd_parentesco=$('select[name="cd_parentesco_asegurado"]');
    var resumen=$('p[id="resumen-adicionales"]');
    resumen.html('');
     if(adicionales==true){
        nm_persona.prop('disabled',false);
        nu_documento.prop('disabled',false);
        tp_documento.prop('disabled',false);
        fe_nacimiento.prop('disabled',false);
        cd_sexo.prop('disabled',false);
        cd_parentesco.prop('disabled',false);
        resumen.append('Con Adicionales');
        divAsegurados.show();
        botonAsegurados.show();
     }else{
        nm_persona.prop('disabled',true);
        nu_documento.prop('disabled',true);
        tp_documento.prop('disabled',true);
        fe_nacimiento.prop('disabled',true);
        cd_sexo.prop('disabled',true);
        cd_parentesco.prop('disabled',true);
        resumen.append('Sin Adicionales');
        divAsegurados.hide();
        botonAsegurados.hide();
     }
});


function fnEliminarAsegurado(codigoFormulario){
    var explodeInput=codigoFormulario.split('_');
    var nombreFormulario='';
    var nombreChecked='';
    var contarDesglose=explodeInput.length;
    console.log(contarDesglose);
    if(contarDesglose>1){
        
    }
    /*if(explodeInput.length>1){
        if(explodeInput[0]=='as'){
            nombreFormulario='asegurado'+explodeInput[1];
            nombreChecked='asegurados';
        }
        if(explodeInput[0]=='ad'){
            nombreFormulario='adicional'+explodeInput[1];
            nombreChecked='adicionales';
        }
    }else{
        if(explodeInput=='as'){
            nombreFormulario='asegurado';
            nombreChecked='asegurados';
        }else{
            nombreFormulario='adicional';
            nombreChecked='adicionales';
        }
    }
    
    var nm_completo=$('input[name="nm_persona1_'+nombreFormulario+'"]');
    var tp_documento=$('select[name="tp_documento_'+nombreFormulario+'"]');
    var nu_documento=$('input[name="nu_documento_'+nombreFormulario+'"]');
    var cd_sexo=$('select[name="cd_sexo_'+nombreFormulario+'"]');
    var fe_nacimiento=$('input[name="fe_nacimiento_'+nombreFormulario+'"]');
    var cd_parentesco=$('select[name="cd_parentesco_'+nombreFormulario+'"]');
    var boton=$('button[id="boton-'+nombreChecked+'"]');
    var contadorDeClonacion=$('input[name="contador-clonacion-'+nombreChecked+'"]');
    contadorDeClonacion.val(parseInt(contadorDeClonacion.val())-1);
    if(contadorDeClonacion.val()>=1){
        nm_completo.css('display','none');
        tp_documento.css('display','none');
        nu_documento.css('display','none');
        cd_sexo.css('display','none');
        fe_nacimiento.css('display','none');
        cd_parentesco.css('display','none');
        boton.css('display','none');

        nm_completo.prop('disabled',true);
        tp_documento.prop('disabled',true);
        nu_documento.prop('disabled',true);
        cd_sexo.prop('disabled',true);
        fe_nacimiento.prop('disabled',true);
        cd_parentesco.prop('disabled',true);
    }else{

        nm_completo.prop('disabled',true);
        tp_documento.prop('disabled',true);
        nu_documento.prop('disabled',true);
        cd_sexo.prop('disabled',true);
        fe_nacimiento.prop('disabled',true);
        cd_parentesco.prop('disabled',true);

        var divFormulario=$('div[id="formulario-'+nombreChecked+'"]');
        divFormulario.hide();
        var de_adicionales=$('input[name="de_'+nombreChecked+'"]');
        de_adicionales.prop('checked',false);
    }
    nm_completo.val('');
    tp_documento.val('');
    nu_documento.val('');
    cd_sexo.val('');
    fe_nacimiento.val('');
    cd_parentesco.val('');
    fnCrearPreliminar();
    */
}



function fnEsconderFormsAdicionales(){
    var divAsegurados=$('div[id="formulario-asegurados"]');
    var divAdicionales=$('div[id="formulario-adicionales"]');
    var botonAsegurados=$('button[id="boton-asegurados"]');
    var botonAdicionales=$('button[id="boton-adicionales"]');
    divAsegurados.hide();
    divAdicionales.hide();
    botonAsegurados.hide();
    botonAdicionales.hide();
}
fnEsconderFormsAdicionales();


function fnCambiarSelectParentesco(busqueda,select){

    var tokenLaravel=$('input[name="_token"]').val();
    var grupoFamiliar=$('select[name="cd_grupo_familiar"] option:selected').val();
    var selectParentesco=$('select[name="'+select+'"]');
    var formulario=[];
    formulario.push({name:'tp_query',value:1});
    formulario.push({name:'query',value:busqueda});
    formulario.push({name:'cd_grupo_familiar',value:grupoFamiliar});
    $.ajax({
        url:'/prevision.general.querys',
        type:'POST',
        cache:false,
        headers: {'X-CSRF-TOKEN': tokenLaravel},
        data:formulario
    }).done(function(response){
        selectParentesco.find('option').remove().end();
        selectParentesco.append($('<option>', {value:'', text:''}));
        var JSONParse=JSON.parse(response);
        if(JSONParse.httpResponse==200){
            var valoresOption=JSONParse.message.content;
            for(var a=0;a<valoresOption.length;a++){
                selectParentesco.append($('<option>', {value:valoresOption[a]['value'], text:valoresOption[a]['text']}));
            }
            
        }
    });
}

