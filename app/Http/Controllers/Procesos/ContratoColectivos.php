<?php

namespace App\Http\Controllers\Procesos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Auditoria;
use App\Models\TemporalColectivoModel;
use App\Models\TemporalColectivoProductoModel;
use App\Models\TemporalColectivoTitularModel;
use Illuminate\Support\Facades\Storage;
use File;
use DB;


class ContratoColectivos extends Controller{
    public function fnCotizacion(){
        $menu=5;
        $submenu=7;
        //<!-- desglose columas|nombre|active/none|linkedin/dribbble|icono-->
        $scripts=array(
            '/prevision/utiles/validacionFormulario.js',
            '/prevision/utiles/sweetAlertsPersonalizados.js',
            '/prevision/utiles/comboDependienteProductos.js',
            '/prevision/utiles/comboDependienteEstados.js',
            '/prevision/procesos/cotizacionColectivos.js',
            '/prevision/utiles/clonarInputs.js');
        
        $tarjeta=array('cotizacion-producto|Cotización de Colectivos');
        
        $instanciaAuditoria=new Auditoria;
        $busquedaProductos=$instanciaAuditoria->fnBusquedaParametrizada(
                'busquedaProductos',
                array(),
                1
        );
        $busquedaAreasTelefonicas=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaAreasTelefono',
            array(),
            1
        );
        $busquedaGruposFamiliares=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaGruposFamiliares',
            array(),
            1
        );
        $busquedaTipoDocumento=$instanciaAuditoria->fnBusquedaParametrizada(
                'busquedaTipoDocumento',
                array(),
                1
        );
        $busquedaParentescos=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaParentescos',
            array(),
            1
        );
        $busquedaSexos=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaSexos',
            array(),
            1
        );
        $busquedaEstados=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaEstados',
            array(),
            1
        );
        $busquedaPlanesPago=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaPlanesPago',
            array(),
            1
        );
        $busquedaTipoCuenta=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaTipoCuenta',
            array(),
            1
        );
        $busquedaIntermediarios=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaIntermediarios',
            array(),
            1
        );

        $busquedaFormasPago=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaFormasPago',
            array(),
            1
        );

        $busquedaBancos=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaBancos',
            array(),
            1
        );
        $busquedaTipoCalculoPrima=$instanciaAuditoria->fnBusquedaParametrizada(
            'busquedaTipoCalculoPrimaColectivo',
            array(),
            1
        );
        
        return view('procesos.cotizacionColectivos.contrato-colectivos-principal',compact('menu','submenu','scripts','tarjeta',
        'busquedaProductos','busquedaGruposFamiliares','busquedaTipoDocumento','busquedaSexos','busquedaParentescos',
        'busquedaEstados','busquedaAreasTelefonicas','busquedaPlanesPago','busquedaTipoCuenta','busquedaIntermediarios',
        'busquedaFormasPago','busquedaBancos','busquedaTipoCalculoPrima'
        ));
    }
    //

    public function fnValidarCarga(Request $request ){
        $retorno=array();
        try {
            $archivo = $request->file('carga_colectivo'); // Retrieve the uploaded file from the request
            $nombreArchivo = $archivo->getClientOriginalName(); // Retrieve the original filename
            $archive=Storage::disk('local')->put('entrada/'.$nombreArchivo, file_get_contents($archivo));
            $contenido = storage::disk('local')->get('entrada/'.$nombreArchivo);
            $contador=1;
            $desglosePorLinea = explode("\n", $contenido);
            $procedureName = 'prevision.pck_cotizacion.pd_valida_cotizacion_colectivo';
            $arrayInsercion=[];
            $instanciaAuditoria= new Auditoria;
            $secuenciaTemporalColectivo=$instanciaAuditoria->fnBuscarSecuenciaCatalogo('busquedaSecuenciaTemporalColectivo',array())[0]['secuencia'];
            $arrayErrores=[];
            foreach($desglosePorLinea as $linea){
                $errorLinea='';
                $desgloseCSV=explode(',',$linea);
                //Validacion de columnas con formato
                $patronNumerico='/^[0-9]+$/';
                $patronAlfabetico="/^[a-zA-Z]+$/";
                $patronFecha='/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/';
                //V1,23695018,V,23695018,Yorman,Medina,1994/10/04,M,1,0,1200,0,

                if(preg_match($patronAlfabetico, $desgloseCSV[0])==0){
                        $errorLinea.='\n Error en la Linea '.$contador.', Columna 1, El campo debe ser una Letra.';
                }
                if(preg_match($patronNumerico, $desgloseCSV[1])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 2, El campo debe ser un numero.'.$desgloseCSV[1];
                }
                if(preg_match($patronAlfabetico, $desgloseCSV[2])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 3, El campo debe ser una Letra.';
                }
                if(preg_match($patronNumerico, $desgloseCSV[3])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 4, El campo debe ser un numero.';
                }
                if(preg_match($patronAlfabetico, $desgloseCSV[4])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 5, El campo debe ser alfabetico.';
                }
                if(preg_match($patronAlfabetico, $desgloseCSV[5])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 6, El campo debe ser alfabetico.';
                }
                if(preg_match($patronFecha, $desgloseCSV[6])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 7, El campo no cumple con formato yyyy/mm/dd.';
                }
                if(preg_match($patronAlfabetico, $desgloseCSV[7])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 8, El campo debe ser alfabetico.';
                }
                if(preg_match($patronNumerico, $desgloseCSV[8])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 9,  El campo debe ser un numero.';
                }
                if(preg_match($patronNumerico, $desgloseCSV[9])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 10,  El campo debe ser un numero.';
                }
                if(preg_match($patronNumerico, $desgloseCSV[10])==0){
                    $errorLinea.='\n Error en la Linea '.$contador.', Columna 11,  El campo debe ser un numero.';
                }
                
                
                if($errorLinea){
                    array_push($arrayErrores,$errorLinea);
                }
                $arrayInsercion=
                [
                    "tp_documento_titular"=>$desgloseCSV[0],
                    "nu_documento_titular"=>$desgloseCSV[1],
                    "tp_documento_beneficiario"=>$desgloseCSV[2],
                    "nu_documento_beneficiario"=>$desgloseCSV[3],
                    "nombre1"=>$desgloseCSV[4],
                    "apellido1"=>$desgloseCSV[5],
                    "fe_nacimiento"=>$desgloseCSV[6],
                    "cd_sexo"=>$desgloseCSV[7],
                    "cd_parentesco"=>$desgloseCSV[8],
                    "mt_suma"=>$desgloseCSV[9],
                    "mt_prima"=>$desgloseCSV[10],
                    "nu_linea"=>$contador,
                    "nu_temporal"=>$secuenciaTemporalColectivo,
                    "error"=>$errorLinea
                ];
                $arrayFinalInsercion[$contador]=$arrayInsercion;
                $contador+=1;
            }
            if(sizeof($arrayErrores)==0){
                $arrayColectivoTitular=[
                    "de_correo"=>$request->post('de_correo'),
                    "nu_telefono"=>$request->post('nu_area'),
                    "de_direccion"=>$request->post('de_direccion'),
                    "cd_parroquia"=>$request->post('cd_parroquia'),
                    "cd_municipio"=>$request->post('cd_municipio'),
                    "cd_estado"=>$request->post('cd_estado'),
                    "cd_sexo"=>$request->post('cd_sexo'),
                    "fe_nacimiento"=>$request->post('fe_nacimiento'),
                    "nm_completo"=>$request->post('nm_completo'),
                    "nu_documento"=>$request->post('nu_documento'),
                    "tp_documento"=>$request->post('tp_documento'),
                    "nu_temporal"=>$secuenciaTemporalColectivo];
                
                $arrayColectivoProducto=[
                "cd_plan_pago"=>$request->post('cd_plan_pago'),
                "tp_calculo"=>$request->post('cd_tipo_calculo'),
                "cd_cobertura_detalle"=>$request->post('mt_suma_asegurada'),
                "cd_grupo_familiar"=>$request->post('cd_grupo_familiar'),
                "cd_cobertura"=>$request->post('cd_cobertura'),
                "cd_producto"=>$request->post('cd_producto'),
                "nu_temporal"=>$secuenciaTemporalColectivo
                ];

                $instanciaTemporalColectivoTitular= new TemporalColectivoTitularModel;
                $instanciaTemporalColectivoTitular->fnCreate($arrayColectivoTitular);

                $instanciaTemporalColectivoProducto= new TemporalColectivoProductoModel;
                $instanciaTemporalColectivoProducto->fnCreate($arrayColectivoProducto);

                
                    
                foreach($arrayFinalInsercion as $array){
                    $instanciaTemporalColectivo= new TemporalColectivoModel;
                    $instanciaTemporalColectivo->fnCreate($array);
                }
                $tipoCalculo=$request->post('cd_tipo_calculo');
                if($tipoCalculo==1){
                    $prodecimientoPLSQL='prevision.pck_cotizacion_colectivos.pd_cotizacion_estandar';
                }
                if($tipoCalculo==2){
                    $prodecimientoPLSQL='prevision.pck_cotizacion_colectivos.pd_cotizacion_personalizado';
                }
                $indicadorCotizacion = null;
                $parametros = [
                    'p_nu_temporal'  => $secuenciaTemporalColectivo,
                    'p_in_cotizacion' => [
                        'value' => &$indicadorCotizacion,
                        'length' => 1000,
                    ],
                ];
                DB::executeProcedure($prodecimientoPLSQL, $parametros);
                $busquedaCotizacionColectivo='';
                if($indicadorCotizacion==0){
                    $busquedaMontosCotizacionColectivo=$instanciaAuditoria->fnBusquedaParametrizada(
                        'busquedaMontosCotizacionColectivo',
                        array('nu_temporal'=>$secuenciaTemporalColectivo),
                        2
                    );
                    $retorno=array(
                        'httpResponse'=>200,
                        'message'=>array(
                            'validate'=>1,
                            'content'=>$busquedaMontosCotizacionColectivo,
                            'object'=>array(),
                        ),
                        'error'=>0
                    );
                }else{
                    $busquedaCotizacionColectivoConErrores=$instanciaAuditoria->fnBusquedaParametrizada(
                        'busquedaCotizacionColectivoConErrores',
                        array('nu_temporal'=>$secuenciaTemporalColectivo),
                        2
                    );
                    $retorno=array(
                        'httpResponse'=>200,
                        'message'=>array(
                            'validate'=>0,
                            'content'=>$busquedaCotizacionColectivoConErrores,
                            'object'=>array(),
                        ),
                        'error'=>1
                    );
                }
                
                
               
            }else{
                $retorno=array(
                    'httpResponse'=>200,
                    'message'=>array(
                        'validate'=>0,
                        'content'=>$arrayErrores,
                        'object'=>array(),
                    ),
                    'error'=>9
                );
            }
            
           
        } catch (Exception $th) {
            print_r($th);
        }
        return json_encode($retorno);
        
    }
    public function fnBorrarTemporal($numeroTemporal){
        try {
            $instanciaTemporalColectivoTitular=new TemporalColectivoTitularModel;
            $instanciaTemporalColectivoProducto=new TemporalColectivoProductoModel;
            $instanciaTemporalColectivo=new TemporalColectivoModel;
            $instanciaTemporalColectivo::where('nu_temporal','=',$numeroTemporal)->delete();
            $instanciaTemporalColectivoProducto::where('nu_temporal','=',$numeroTemporal)->delete();
            $instanciaTemporalColectivoTitular::where('nu_temporal','=',$numeroTemporal)->delete();
        } catch (Exception $th) {
            print_r($th);
        }
    }
}
