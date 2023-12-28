<?php

namespace App\Http\Controllers\Querys;

use App\Http\Controllers\Controller;

class NegocioQuery{
    const busquedaInformacionEmpresas="
    select 
        pers.NM_COMPLETO,
        pers.tp_documento||'-'||pers.nu_documento nu_documento,
        pers.FE_REGISTRO,
        empr.CD_ASOPROINFU,
        empr.CD_EMPRESA,
        empr.IN_ASOPROINFU,
        empr.ST_EMPRESA,
        1 updt,
        1 chck,
        1 delt
    from empresas empr,
    personas pers
    where empr.CD_PERSONA = pers.CD_PERSONA
    and
    case when nvl(:nu_documento,'0')='0' then '0' else nu_documento end
    like case when nvl(:nu_documento,'0')='0' then '0' else '%'||:nu_documento||'%' end 
    ";

    const busquedaUpdateEmpresas='
    select 
        pers.cd_persona,
        pers.nm_completo,
        pers.tp_documento,
        pers.nu_documento,
        empr.cd_empresa,
        empr.in_asoproinfu,
        empr.cd_asoproinfu,
        empr.st_empresa,
        pete.nu_area,
        pete.nu_telefono,
        peco.de_correo,
        pedi.cd_estado,
        pedi.cd_municipio,
        pedi.cd_parroquia,
        pedi.de_direccion
        
    from empresas empr,
    personas pers,
    personatelefono pete,
    personacorreo peco,
    personadireccion pedi
    where empr.cd_persona=:cd_empresa
    and empr.CD_PERSONA = pers.CD_PERSONA
    and pete.cd_persona=pers.cd_persona
    and peco.cd_persona=pers.cd_persona
    and pedi.cd_persona=pers.cd_persona
   
    ';

    const busquedaValidacionDocumento=
    "select case when cuenta>0 then 'El documento '||:nu_documento||' ya posee una poliza ' else '0' end text
    from (
    select count(1) cuenta
    from personas
    where nu_documento=:nu_documento)";

    const busquedaEdadEntreFechas="
        select trunc(months_between(trunc(sysdate),to_date(:fe_nacimiento,'yyyy/mm/dd'))/12) text from dual
    ";
    const procesoCotizacionPorPrima="
    select 
        (select de_cobertura_detalle from coberturadetalle
        where cd_cobertura_detalle=:mt_suma_asegurada
        ) de_cobertura_detalle,
        (select de_parentesco from parentescos
        where cd_parentesco=:cd_parentesco)parentesco,
        tasa_riesgo,
        (select de_plan_pago from planespago
                where cd_plan_pago=:cd_plan_pago) plan_pago,
        case when es_calcuble=1
        then 
            round(to_number(:mt_prima),3)
        else 0 end mt_prima,
        mt_suma_asegurada,
        nvl(case when es_calcuble=1
        then   
            round(to_number(:mt_prima)/
            (select ca_recibos from planpagodetalle
                where cd_plan_pago=:cd_plan_pago),3)
        else 0 end,0) mt_prima_plan,
        siglas_moneda,
        :tp_documento||'-'||:nu_documento nu_documento,
        :nm_persona1 nm_completo,
        (select de_grupo_familiar from gruposfamiliares
        where cd_grupo_familiar=:cd_grupo_familiar)grupo_familiar,
        (select de_producto from productos
        where cd_producto=:cd_producto)producto,
        es_adicional,
        :nu_asegurado nu_asegurado
        from (
            select 
            case when cuenta>0
            then case when :cd_parentesco=1 then 1 else 0 end else 1 end es_calcuble,
            case when cuenta>0
            then 'No' else 'Si' end es_adicional,
            case when cuenta>0
            then
                case when :cd_parentesco=1
                then
                    (select po_tasa_riesgo from productotasariesgo
                    where cd_producto=:cd_producto
                    and cd_grupo_familiar=:cd_grupo_familiar)
                else
                    0
                end
            else
                1.78
            end
            tasa_riesgo,
            (select mt_suma_asegurada from coberturadetalle
            where cd_cobertura_detalle=:mt_suma_asegurada
            )mt_suma_asegurada,
            '$' siglas_moneda
        from (
            select 
                (select count(1) from grupofamiliarparentesco
            where cd_parentesco=:cd_parentesco
            and cd_grupo_familiar=:cd_grupo_familiar) cuenta
            from dual
        )a1
    )a2  
    ";
    const procesoCotizacion="
    select 
        (select de_cobertura_detalle from coberturadetalle
        where cd_cobertura_detalle=:mt_suma_asegurada
        )   de_cobertura_detalle,
        (select de_parentesco from parentescos
        where cd_parentesco=:cd_parentesco)parentesco,
        tasa_riesgo,
        (select de_plan_pago from planespago
                where cd_plan_pago=:cd_plan_pago) plan_pago,
        case when es_calcuble=1
        then 
            round(((tasa_riesgo*mt_suma_asegurada)/100),3)
        else 0 end mt_prima,
        mt_suma_asegurada,
        nvl(case when es_calcuble=1
        then   
            round(((tasa_riesgo*mt_suma_asegurada)/100)/
            (select ca_recibos from planpagodetalle
                where cd_plan_pago=:cd_plan_pago),3)
        else 0 end,0) mt_prima_plan,
        siglas_moneda,
        :tp_documento||'-'||:nu_documento nu_documento,
        :nm_persona1 nm_completo,
        (select de_grupo_familiar from gruposfamiliares
        where cd_grupo_familiar=:cd_grupo_familiar)grupo_familiar,
        (select de_producto from productos
        where cd_producto=:cd_producto)producto,
        es_adicional,
        :mt_prima mt_prima_aux,
        :nu_asegurado nu_asegurado
        from (
            select 
            case when cuenta>0
            then case when :cd_parentesco=1 then 1 else 0 end else 1 end es_calcuble,
            case when cuenta>0
            then 'No' else 'Si' end es_adicional,
            case when cuenta>0
            then
                case when :cd_parentesco=1
                then
                    (select po_tasa_riesgo from productotasariesgo
                    where cd_producto=:cd_producto
                    and cd_grupo_familiar=:cd_grupo_familiar)
                else
                    0
                end
            else
                1.78
            end
            tasa_riesgo,
            (select mt_suma_asegurada from coberturadetalle
            where cd_cobertura_detalle=:mt_suma_asegurada
            )mt_suma_asegurada,
            (select
            (select de_siglas_moneda from moneda where cd_moneda=code.cd_moneda) 
            from coberturadetalle code
            where cd_cobertura_detalle=:mt_suma_asegurada
            )siglas_moneda
        from (
            select 
                (select count(1) from grupofamiliarparentesco
            where cd_parentesco=:cd_parentesco
            and cd_grupo_familiar=:cd_grupo_familiar) cuenta
            from dual
        )a1
    )a2
    ";

    const procesoCotizacionPorPlan="
    select 
    case when es_calcuble=1
    then 
        round(((tasa_riesgo*mt_suma_asegurada)/100),2)
    else 0 end mt_prima,
    mt_suma_asegurada,
    siglas_moneda,
    es_adicional
    from (
        select 
        case when cuenta>0
        then case when :cd_parentesco=1 then 1 else 0 end else 1 end es_calcuble,
        case when cuenta>0
        then 'No' else 'Si' end es_adicional,
        case when cuenta>0
        then
            case when :cd_parentesco=1
            then
                (select po_tasa_riesgo from productotasariesgo
                where cd_producto=:cd_producto
                and cd_grupo_familiar=:cd_grupo_familiar)
            else
                0
            end
        else
            1.78
        end
        tasa_riesgo,
        (select mt_suma_asegurada from coberturadetalle
        where cd_cobertura_detalle=:mt_suma_asegurada
        )mt_suma_asegurada,
        (select
        (select de_siglas_moneda from moneda where cd_moneda=code.cd_moneda) 
        from coberturadetalle code
        where cd_cobertura_detalle=:mt_suma_asegurada
        )siglas_moneda
        from (
            select 
                (select count(1) from grupofamiliarparentesco
            where cd_parentesco=:cd_parentesco
            and cd_grupo_familiar=:cd_grupo_familiar) cuenta
            from dual
        )a1
    )a2";
    const primasPorPlanesPago="
    select 
        round(:mt_prima /ca_recibos,2) ||''|| :de_siglas_moneda mt_prima,
        plan.cd_plan_pago value,
        plan.DE_PLAN_PAGO text,
        4 columnas,
        'Planes de pago ' nombreTitulo,
        de_tarjeta
    from planespago plan,
    planpagodetalle ppde
    where plan.CD_PLAN_PAGO = ppde.CD_PLAN_PAGO
    ";
    

    const busquedaDocumentoContrato="
        select :cd_input value, cuenta, 
            case when cuenta>0 then
            'El Documento '|| :nu_documento || ' Posee una póliza vigente.'
            else '' end error from (
            select count(1) cuenta
            from personas pers, contrato cont
            where cd_persona_asegurada=pers.cd_persona
            and pers.nu_documento=:nu_documento
            and cont.cd_producto=:cd_producto
        )
    ";

    const busquedaCodigoVerificadorBanco='select count(1) cuenta from bancos where cd_verificador=substr(:nu_cuenta ,1,4) and cd_banco=:cd_banco';

    const busquedaInformacionContrato='
    select 
        (select ca_recibos from planpagodetalle ppde where ppde.cd_plan_pago=ccen.CD_PLAN_PAGO ) ca_recibo,
        (select nu_meses_recibo from planpagodetalle ppde where ppde.cd_plan_pago=ccen.CD_PLAN_PAGO ) nu_meses_recibo,
        round((select  
        sum(((ta_riesgo) *
        (select mt_suma_asegurada from coberturadetalle where cd_cobertura_detalle=ccen.cd_cobertura_detalle ) )/100) 
        from contratoendosoasegurados cceg
        where cceg.nu_contrato=:cd_contrato
        and cceg.CD_EMPRESA=ccen.cd_empresa
        and cceg.NU_CONTRATO=ccen.nu_contrato
        and cceg.CD_PRODUCTO=ccen.cd_producto
        and cceg.nu_endoso=ccen.nu_endoso
        and cceg.nu_endoso=0)/ (select ca_recibos from planpagodetalle ppde where ppde.cd_plan_pago=ccen.CD_PLAN_PAGO ),2 ) mt_prima_recibo,
        ccer.nu_certificado,
        ccer.cd_producto,
        ccen.nu_endoso,
        ccer.nu_contrato
    from prevision.contrato cont, PREVISION.CONTRATOCERTIFICADO ccer, PREVISION.CONTRATOCERTIFICADOENDOSO ccen
    where cont.nu_contrato=:cd_contrato
    and cont.CD_EMPRESA = ccer.CD_EMPRESA
    and cont.CD_PRODUCTO = ccer.CD_PRODUCTO
    and cont.NU_CONTRATO = ccer.NU_CONTRATO
    and ccer.CD_EMPRESA = ccen.CD_EMPRESA
    and ccer.NU_CERTIFICADO = ccen.NU_CERTIFICADO
    and ccer.NU_CONTRATO = ccen.NU_CONTRATO
    and ccer.NU_ULTIMO_ENDOSO=ccen.NU_ENDOSO';

    const busquedaCotizacionColectivo=
    "select 
        to_number(nu_linea) nu_linea,
        tp_documento_beneficiario||nu_documento_beneficiario nu_documento,
        nombre1||' '||apellido1 nm_persona,
        (select de_parentesco from parentescos where cd_parentesco=temp.cd_parentesco) de_parentesco,
        cd_sexo,
        to_char(fe_nacimiento,'dd/mm/yyyy') fe_nacimiento,
        mt_prima,
        mt_prima_plan,
        error
    from temporalcolectivo temp
    where nu_temporal=:nu_temporal
    order by to_number(nu_linea) asc,nu_documento_beneficiario";
        
    const busquedaMontosCotizacionColectivo=
    "select 
        
        round(sum(mt_prima),2) mt_cuota,
        round(sum(mt_prima_plan),2) mt_cuota_plan,
        'El archivo se cargó exitosamente' mensaje,
        nu_temporal
    from temporalcolectivo temp
    where nu_temporal=:nu_temporal
    group by nu_temporal";
    
    const borrarTemporalColectivo=
    "delete from temporalcolectivo temp
    where nu_temporal=:nu_temporal";
    const borrarTemporalColectivoProducto=
    "delete from temporalcolectivoProducto temp
    where nu_temporal=:nu_temporal";
    const borrarTemporalColectivoTitular=
    "delete from temporalcolectivoTitular temp
    where nu_temporal=:nu_temporal";

    const busquedaCotizacionColectivoConErrores=
    "select 
        to_number(nu_linea) nu_linea,
        tp_documento_beneficiario||nu_documento_beneficiario nu_documento,
        nombre1||' '||apellido1 nm_persona,
        (select de_parentesco from parentescos where cd_parentesco=temp.cd_parentesco) de_parentesco,
        cd_sexo,
        to_char(fe_nacimiento,'dd/mm/yyyy') fe_nacimiento,
        mt_prima,
        mt_prima_plan,
        error,
        nu_temporal
    from temporalcolectivo temp
    where nu_temporal=:nu_temporal
    and error is not null
    order by to_number(nu_linea) asc,nu_documento_beneficiario";   

    const busquedaInformacionEmision="
    select
    (select nm_completo from personas where cd_persona=ccer.cd_persona_asegurada) nm_completo,
    (select tp_documento||'-'||nu_documento from personas where cd_persona=ccer.cd_persona_asegurada) nu_documento,
    (select (select de_sexo from sexos where cd_sexo=pers.cd_sexo) from personas pers where cd_persona=ccer.cd_persona_asegurada) de_sexo,
    (select '01/01/2000' from personas where cd_persona=ccer.cd_persona_asegurada) fe_nacimiento,
    (select  
        (select
            (select de_estado from estados where cd_estado=pedi.cd_estado)
        from personadireccion pedi where cd_persona=ccer.cd_persona_asegurada)
    from personas where cd_persona=ccer.cd_persona_asegurada)||', '||
    (select  
        (select
            (select de_municipio from municipios where cd_municipio=pedi.cd_municipio)
        from personadireccion pedi where cd_persona=ccer.cd_persona_asegurada)
    from personas where cd_persona=ccer.cd_persona_asegurada)||', '||
    (select  
        (select de_direccion from personadireccion where cd_persona=ccer.cd_persona_asegurada)
    from personas where cd_persona=ccer.cd_persona_asegurada) de_direccion,
    (select  
        (select
            (select de_parroquia from parroquias where cd_parroquia=pedi.cd_parroquia)
        from personadireccion pedi where cd_persona=ccer.cd_persona_asegurada)
    from personas where cd_persona=ccer.cd_persona_asegurada) de_parroquia,
    (select de_correo from personacorreo  where cd_persona=ccer.cd_persona_asegurada) de_correo,
    (select nu_area||' '||nu_telefono from personatelefono  where cd_persona=ccer.cd_persona_asegurada) nu_telefono,
    

    ccer.cd_producto,
    (select de_producto from productos where cd_producto=ccer.cd_producto ) de_producto,
    ccer.nu_contrato,
    ccer.nu_certificado,
    ccer.nu_ultimo_endoso,
    'Desde '||to_char(ccer.fe_desde,'dd/mm/yyyy') ||' Hasta '||to_char(ccer.fe_hasta,'dd/mm/yyyy') fe_vigencia,
    (select de_cobertura_detalle from coberturadetalle where cd_cobertura_detalle=ccen.cd_cobertura_detalle)de_cobertura_detalle,
    (select de_grupo_familiar from gruposfamiliares where cd_grupo_familiar=ccen.cd_grupo_familiar)de_grupo_familiar,
    (select de_moneda from moneda where cd_moneda=cont.cd_moneda)de_moneda,
    (select de_plan_pago from planespago where cd_plan_pago=ccen.cd_plan_pago) de_plan_pago,
    (select ca_recibos||' Cuotas' from planpagodetalle where cd_plan_pago=ccen.cd_plan_pago) nu_cuotas,
    (select de_cobertura 
    from coberturas 
    where cd_cobertura in ((select cd_cobertura from coberturadetalle where cd_cobertura_detalle=ccen.cd_cobertura_detalle)))de_cobertura,
    round(((select mt_suma_asegurada from coberturadetalle 
    where cd_cobertura_detalle in (
        (select cd_cobertura_detalle from contratocertificadoendoso where 
        nu_contrato=ccer.nu_contrato
        and cd_producto=ccer.cd_producto
        and nu_certificado=ccer.nu_certificado
        and nu_endoso=ccer.nu_ultimo_endoso) 
    )) * 
    (select sum(ta_riesgo) from contratoendosoasegurados cceg
    where cceg.cd_producto=ccer.cd_producto
    and cceg.CD_EMPRESA=ccer.CD_EMPRESA
    and cceg.NU_CONTRATO=ccer.NU_CONTRATO
    and cceg.nu_certificado=ccer.nu_certificado
    and cceg.nu_endoso=ccer.nu_ultimo_endoso)
    
    ) / 100 , 2) mt_prima ,
    round(
        (
        ((select mt_suma_asegurada from coberturadetalle 
    where cd_cobertura_detalle in (
        (select cd_cobertura_detalle from contratocertificadoendoso where 
        nu_contrato=ccer.nu_contrato
        and cd_producto=ccer.cd_producto
        and nu_certificado=ccer.nu_certificado
        and nu_endoso=ccer.nu_ultimo_endoso) 
    )) * 
    (select sum(ta_riesgo) from contratoendosoasegurados cceg
    where cceg.cd_producto=ccer.cd_producto
    and cceg.CD_EMPRESA=ccer.CD_EMPRESA
    and cceg.NU_CONTRATO=ccer.NU_CONTRATO
    and cceg.nu_certificado=ccer.nu_certificado
    and cceg.nu_endoso=ccer.nu_ultimo_endoso)
    
    ) / 100
    )/(select ca_recibos from planpagodetalle where cd_plan_pago=ccen.cd_plan_pago), 2) mt_prima_plan
    
    from contrato cont,
    contratocertificado ccer,
    contratocertificadoendoso ccen
    where cont.cd_producto=ccer.cd_producto
    and cont.nu_contrato=ccer.nu_contrato
    and ccer.cd_producto=ccen.cd_producto
    and ccer.nu_contrato=ccen.nu_contrato
    and ccer.nu_ultimo_endoso=ccen.nu_endoso
    and cont.nu_contrato=:cd_contrato
    ";

    const busquedaInformacionAsegurados=
    "select 
    (SELECT TP_DOCUMENTO||'-'||NU_DOCUMENTO FROM PERSONAS WHERE CD_PERSONA=CCEG.CD_PERSONA) NU_DOCUMENTO,
    (SELECT NM_COMPLETO FROM PERSONAS WHERE CD_PERSONA=CCEG.CD_PERSONA) NM_COMPLETO,
    (SELECT DE_PARENTESCO FROM PARENTESCOS WHERE CD_PARENTESCO=CCEG.CD_PARENTESCO) de_parentesco,
    (SELECT '01/01/2020' FROM PERSONAS WHERE CD_PERSONA=CCEG.CD_PERSONA) fe_nacimiento,
    round(((select mt_suma_asegurada from coberturadetalle 
    where cd_cobertura_detalle in (
        (select cd_cobertura_detalle from contratocertificadoendoso where 
        nu_contrato=cceg.nu_contrato
        and cd_producto=cceg.cd_producto
        and nu_certificado=cceg.nu_certificado
        and nu_endoso=cceg.nu_endoso) 
    )) * cceg.ta_riesgo) / 100 , 2) mt_prima ,
    round(
    (
        ((select mt_suma_asegurada from coberturadetalle 
        where cd_cobertura_detalle in (
            (select cd_cobertura_detalle from contratocertificadoendoso where 
            nu_contrato=cceg.nu_contrato
            and cd_producto=cceg.cd_producto
            and nu_certificado=cceg.nu_certificado
            and nu_endoso=cceg.nu_endoso) 
        )) * cceg.ta_riesgo) / 100 
    )/ 
    (select ca_recibos from planpagodetalle where cd_plan_pago in(
    (select  cd_plan_pago from contratocertificadoendoso 
    where nu_contrato=ccer.nu_contrato
    and cd_producto=ccer.cd_producto
    and cd_empresa=ccer.cd_empresa
    and nu_certificado=ccer.nu_certificado
    and nu_endoso=ccer.nu_ultimo_endoso)))
    ,2) mt_prima_plan
    
    from contratoendosoasegurados cceg, contratocertificado ccer
    where cceg.cd_producto=ccer.cd_producto
    and cceg.CD_EMPRESA=ccer.CD_EMPRESA
    and cceg.NU_CONTRATO=ccer.NU_CONTRATO
    and cceg.nu_certificado=ccer.nu_certificado
    and cceg.nu_endoso=ccer.nu_ultimo_endoso
    and cceg.nu_contrato=:cd_contrato";

    const busquedainformacionRecibos="
    select 
    case when st_recibo=1 then 'Pendiente' else 'Cobrado' end st_recibo,
    cd_recibo,
    to_char(fe_desde,'dd/mm/yyyy') fe_desde,
    to_char(fe_hasta,'dd/mm/yyyy')fe_hasta,
    mt_recibo
    from recibos
    where nu_contrato= :cd_contrato 
    and st_recibo in (1,4)
    order by cd_recibo desc";

}
