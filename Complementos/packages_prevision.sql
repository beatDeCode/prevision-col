create or replace package prevision.pck_cotizacion_colectivos
    as
    procedure pd_cotizacion_personalizado (p_nu_temporal in number, p_in_procede_cotizacion out number);
    procedure pd_cotizacion_estandar (p_nu_temporal in number, p_in_procede_cotizacion out number);
end pck_cotizacion_colectivos;

---

create or replace package body prevision.pck_cotizacion_colectivos
    as
    procedure pd_cotizacion_personalizado (p_nu_temporal in number, p_in_procede_cotizacion out number)
    is
        v_tipo_calculo number;
        v_calculo_prima number;
        v_tasa_riesgo number;
        v_existe_grupo_familiar number;
        v_error varchar(1000);
    begin
        
        for reg in ( 
            select 
                (select count(1) from personas where nu_documento=nu_documento_beneficiario)existe_en_otra_poliza, 
                case when cd_parentesco=1 
                then 
                     case when trunc(months_between(trunc(sysdate),fe_nacimiento)/12)>18 then 0 else 1 end
                else 0
                end
                valida_edad,
                (select count(1) from temporalcolectivo where nu_temporal=p_nu_temporal and nu_documento_titular=temp.nu_documento_titular and cd_parentesco=1) valida_parenesco,
                (select count(1) from parentescos where cd_parentesco=temp.cd_parentesco) valida_parentesco,
                (select count(1) from temporalcolectivo tmp where temp.nu_documento_beneficiario=tmp.nu_documento_beneficiario and nu_temporal=p_nu_temporal) valida_repetidos_archivo,            temp.mt_suma,
                temp.mt_prima,
                temp.nu_documento_beneficiario,
                temp.nu_linea,
                temp.cd_parentesco,
                (select cd_producto from temporalcolectivoproducto where nu_temporal=temp.nu_temporal) cd_producto,
                (select cd_cobertura_detalle from temporalcolectivoproducto where nu_temporal=temp.nu_temporal) cd_cobertura_detalle,
                (select cd_grupo_familiar from temporalcolectivoproducto where nu_temporal=temp.nu_temporal) cd_grupo_familiar,
                (select (select ca_recibos from planpagodetalle where cd_plan_pago=tmpc.cd_plan_pago) from temporalcolectivoproducto tmpc where nu_temporal=temp.nu_temporal) ca_recibos
                
            from temporalcolectivo temp
            where nu_temporal=p_nu_temporal
        )loop
            --Verificar repeticion en el archivo
            if(reg.valida_repetidos_archivo>1)then
                v_error:='El dato Numero de Documento está repetido en el archivo|';
            end if;
            
            --Verificar si el documento existe
            if(reg.existe_en_otra_poliza>0)then
                 v_error:='El dato Numero de Documento posee una poliza'||'|'||v_error;
            end if;
            
            --Verificar si el Parentesco existe
            if(reg.valida_parentesco=0)then
                v_error:='El dato Parentesco no existe'||'|'||v_error;
            end if;
            
            --Verificar Edad
            if(reg.valida_edad>0)then
                v_error:='El titular debe ser mayor de edad '||v_error;
            end if;
            if(length(v_error)>0) then
                update temporalcolectivo
                set error=v_error
                where nu_linea=reg.nu_linea
                and nu_documento_beneficiario=reg.nu_documento_beneficiario;
                commit;
            else
                update temporalcolectivo
                set error=''
                where nu_linea=reg.nu_linea
                and nu_documento_beneficiario=reg.nu_documento_beneficiario;
                commit;
            end if;
            commit;
            begin
                select count(1) into v_existe_grupo_familiar from grupofamiliarparentesco where
                cd_grupo_familiar=reg.cd_grupo_familiar and cd_parentesco=reg.cd_parentesco;
            end;
            if(v_existe_grupo_familiar=1)then
                begin
                    select po_tasa_riesgo into v_tasa_riesgo from productotasariesgo where cd_producto=reg.cd_producto
                    and cd_grupo_familiar=reg.cd_grupo_familiar;
                end;
            else
                v_tasa_riesgo:=1.48;
            end if;
            
            update temporalcolectivo
            set mt_prima=(mt_suma*v_tasa_riesgo)/100,
            mt_prima_plan=((mt_suma*v_tasa_riesgo)/100)/reg.ca_recibos
            where nu_linea=reg.nu_linea
            and nu_documento_beneficiario=reg.nu_documento_beneficiario;
            commit;
            v_error:='';
        end loop;
        begin
            select count(1) into p_in_procede_cotizacion from temporalcolectivo
            where nu_temporal=p_nu_temporal
            and error is not null;
        end;
        
    end pd_cotizacion_personalizado;
    procedure pd_cotizacion_estandar (p_nu_temporal in number, p_in_procede_cotizacion out number)
    is
        v_tipo_calculo number;
        v_calculo_prima number;
        v_tasa_riesgo number;
        v_existe_grupo_familiar number;
        v_error varchar(1000);
        v_es_adicional varchar(2);
    begin
        for reg in ( 
            select 
                (select count(1) from personas where nu_documento=nu_documento_beneficiario)existe_en_otra_poliza, 
                case when cd_parentesco=1 
                then 
                     case when trunc(months_between(trunc(sysdate),fe_nacimiento)/12)>18 then 0 else 1 end
                else 0
                end
                valida_edad,
                trunc(months_between(trunc(sysdate),fe_nacimiento)/12) edad,
                (select count(1) from temporalcolectivo where nu_temporal=p_nu_temporal and 
                nu_documento_titular=temp.nu_documento_titular and cd_parentesco=1) valida_parenesco,
                (select count(1) from parentescos where cd_parentesco=temp.cd_parentesco) valida_parentesco,
                (select count(1) from temporalcolectivo tmp where temp.nu_documento_beneficiario=tmp.nu_documento_beneficiario 
                and nu_temporal=p_nu_temporal
                ) valida_repetidos_archivo,
                temp.mt_prima,
                temp.nu_documento_beneficiario,
                temp.nu_linea,
                temp.cd_parentesco,
                (select cd_producto from temporalcolectivoproducto where nu_temporal=temp.nu_temporal) cd_producto,
                (select mt_suma_asegurada from  coberturadetalle where cd_cobertura_detalle in (
                (select cd_cobertura_detalle from temporalcolectivoproducto where nu_temporal=temp.nu_temporal))) mt_suma_asegurada,
                (select cd_grupo_familiar from temporalcolectivoproducto where nu_temporal=temp.nu_temporal) cd_grupo_familiar,
                (select (select ca_recibos from planpagodetalle where cd_plan_pago=tmpc.cd_plan_pago) from temporalcolectivoproducto tmpc where nu_temporal=temp.nu_temporal) ca_recibos
                
            from temporalcolectivo temp
            where nu_temporal=p_nu_temporal
        )loop
            --Verificar repeticion en el archivo
            if(reg.valida_repetidos_archivo>1)then
                v_error:='El dato Numero de Documento está repetido en el archivo|';
            end if;
            
            --Verificar si el documento existe
            if(reg.existe_en_otra_poliza>0)then
                 v_error:='El dato Numero de Documento posee una poliza'||'|'||v_error;
            end if;
            
            --Verificar si el Parentesco existe
            if(reg.valida_parentesco=0)then
                v_error:='El dato Parentesco no existe'||'|'||v_error;
            end if;
            
            --Verificar Edad
            if(reg.valida_edad>0)then
                v_error:='El titular debe ser mayor de edad '||v_error;
            end if;
            
            if(length(v_error)>0) then
                update temporalcolectivo
                set error=v_error
                where nu_linea=reg.nu_linea
                and nu_documento_beneficiario=reg.nu_documento_beneficiario
                and nu_temporal=p_nu_temporal;
                commit;
            else
                update temporalcolectivo
                set error=''
                where nu_linea=reg.nu_linea
                and nu_documento_beneficiario=reg.nu_documento_beneficiario
                 and nu_temporal=p_nu_temporal;
                commit;
            end if;
            
            begin
                select count(1) into v_existe_grupo_familiar from grupofamiliarparentesco where
                cd_grupo_familiar=reg.cd_grupo_familiar and cd_parentesco=reg.cd_parentesco;
            end;
            
            if(v_existe_grupo_familiar=1)then
                if(reg.cd_parentesco=1)then
                    begin
                        select po_tasa_riesgo into v_tasa_riesgo from productotasariesgo where cd_producto=reg.cd_producto
                        and cd_grupo_familiar=reg.cd_grupo_familiar;
                    end;
                    v_es_adicional:='NO';
                else
                   v_es_adicional:='NO';
                    v_tasa_riesgo:=0; 
                end if;
                else
                    v_es_adicional:='SI';
                    v_tasa_riesgo:=1.48;
            end if;
            
            /*if(v_existe_grupo_familiar=1)then
                if(reg.cd_parentesco=1)then
                    begin
                        select po_tasa_riesgo into v_tasa_riesgo from productotasariesgo where cd_producto=reg.cd_producto
                        and cd_grupo_familiar=reg.cd_grupo_familiar;
                    end;
                    v_es_adicional:='NO';
                else
                    if(reg.cd_parentesco=3)then
                        if(reg.edad>18)then
                             v_tasa_riesgo:=1.48;
                             v_es_adicional:='SI';
                        else
                            v_es_adicional:='NO';
                            v_tasa_riesgo:=0;
                        end if;
                        
                    end if;
                    v_es_adicional:='NO';
                    v_tasa_riesgo:=0;
                end if;
            else
                    v_tasa_riesgo:=1.48;
                    v_es_adicional:='SI';
            end if;*/
            
            update temporalcolectivo
            set mt_prima=round((reg.mt_suma_asegurada*v_tasa_riesgo),2)/100,
            mt_prima_plan=round(((reg.mt_suma_asegurada*v_tasa_riesgo)/100)/reg.ca_recibos , 2),
            mt_suma=reg.mt_suma_asegurada,
            es_adicional=v_es_adicional
            where nu_linea=reg.nu_linea
            and nu_documento_beneficiario=reg.nu_documento_beneficiario
            and nu_temporal=p_nu_temporal;
            commit;
            v_error:='';
        end loop;
        begin
            select count(1) into p_in_procede_cotizacion from temporalcolectivo
            where nu_temporal=p_nu_temporal
            and error is not null;
        end;
    end pd_cotizacion_estandar;
end pck_cotizacion_colectivos;