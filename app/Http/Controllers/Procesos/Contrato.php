<?php

namespace App\Http\Controllers\Procesos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Auditoria;
use App\Models\PersonasModel;
use App\Models\ContratoModel;
use App\Models\ContratoCertificadoModel;
use App\Models\ContratoCertificadoEndosoModel;
use App\Models\RecibosModel;
use App\Models\TempCotizacionModel; 

class Contrato extends Controller{
    public function fnPrueba(){
        $menu=5;
        $submenu=6;
        $scripts=array(
            '/prevision/utiles/validacionFormulario.js',
            '/prevision/utiles/sweetAlertsPersonalizados.js',
            '/prevision/utiles/comboDependienteProductos.js',
            '/prevision/utiles/comboDependienteEstados.js',
            '/prevision/procesos/cotizacion.js',
            '/prevision/utiles/clonarInputs.js');
        
        $tarjeta=array('cotizacion-producto|Cotizacion');
        return view('prueba-steps',compact('scripts','tarjeta','menu','submenu'));
    }
    
    public function fnCotizacion(Request $request){
        $menu=5;
        $submenu=6;
        //<!-- desglose columas|nombre|active/none|linkedin/dribbble|icono-->
        $scripts=array(
            '/prevision/utiles/validacionFormulario.js',
            '/prevision/utiles/sweetAlertsPersonalizados.js',
            '/prevision/utiles/comboDependienteProductos.js',
            '/prevision/utiles/comboDependienteEstados.js',
            '/prevision/procesos/cotizacion.js',
            '/prevision/utiles/clonarInputs.js');
        
        $tarjeta=array('cotizacion-producto|Cotizacion');
        
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
            'busquedaTipoCalculoPrima',
            array(),
            1
        );
        
        return view('procesos.cotizacion.contrato-principal',compact('menu','submenu','scripts','tarjeta',
        'busquedaProductos','busquedaGruposFamiliares','busquedaTipoDocumento','busquedaSexos','busquedaParentescos',
        'busquedaEstados','busquedaAreasTelefonicas','busquedaPlanesPago','busquedaTipoCuenta','busquedaIntermediarios',
        'busquedaFormasPago','busquedaBancos','busquedaTipoCalculoPrima'
        ));
    }
    public function fnGenerarCotizacionaa(Request $request){
        print_r($request->all());
    }
    function fnGenerarCotizacion(Request $request){
        $busquedaCotizacionTitular='procesoCotizacion';
        try {
            /**Declaracion de indices de adicionales */
            $retornoAsegurados=array();
            $cotizacionTitular=array();
            $cotizacionPrimerAsegurado=array();
            $cotizacionOtrosAsegurado=array();
            $cotizacionPrimerAdicional=array();
            $cotizacionOtrosAdicionales=array();
            
            $arrayInputsAsegurados=array(
                'tp_documento_asegurado',
                'nu_documento_asegurado',
                'cd_parentesco_asegurado',
                'nm_persona1_asegurado',
            );
            $arrayInputsAdicionales=array(
                'tp_documento_adicional',
                'nu_documento_adicional',
                'cd_parentesco_adicional',
                'nm_persona1_adicional',
            );
            /**Llenar valores del titular */
            $arrayTitular=array(
                'tp_documento'=>$request->post('tp_documento'),
                'nu_documento'=>$request->post('nu_documento'),
                'nm_persona1'=>$request->post('nm_persona1'),
                'cd_producto'=>$request->post('cd_producto'),
                'cd_grupo_familiar'=>$request->post('cd_grupo_familiar'),
                'mt_suma_asegurada'=>$request->post('mt_suma_asegurada'),
                'cd_plan_pago'=>$request->post('cd_plan_pago'),
                'cd_parentesco'=>1,
                'mt_prima'=>$request->post('mt_prima'),
                'nu_asegurado'=>''
            );
            /**Procesamos la cotizacion Para el Titular */
            $instanciaAuditoria=new Auditoria;
            $cotizacionTitular=$instanciaAuditoria->fnBusquedaParametrizada(
                $busquedaCotizacionTitular,
                $arrayTitular,
                2
            );

            /**Agregamos al arreglo global de cotizacion al titular */
            $in_asegurados=$request->post('de_asegurados');
            //$cotizacionTitular[0];
            //print_r($request->all());
            if($in_asegurados=='on'){
                $cantidadClonacion=$request->post('ca_clonacion');
                /**Recorremos el array de asegurados para reemplazar la palabra _asegurado  */
                for($b=0;$b< sizeof($arrayInputsAsegurados);$b++){
                    $arrayAsegurados[str_replace('_asegurado','',$arrayInputsAsegurados[$b])]=$request->post($arrayInputsAsegurados[$b]);
                }
                $arrayAsegurados['cd_producto']=$request->post('cd_producto');
                $arrayAsegurados['cd_grupo_familiar']=$request->post('cd_grupo_familiar');
                $arrayAsegurados['mt_suma_asegurada']=$request->post('mt_suma_asegurada');
                $arrayAsegurados['cd_plan_pago']=$request->post('cd_plan_pago');
                $arrayAsegurados['mt_prima']=0;
                $arrayAsegurados['nu_asegurado']='as';

                /**Procesamos la cotizacion Para el primer asegurado */
                $cotizacionPrimerAsegurado=$instanciaAuditoria->fnBusquedaParametrizada(
                    $busquedaCotizacionTitular,
                    $arrayAsegurados,
                    2
                );

                //print_r($arrayAsegurados);
                /**Agregamos al arreglo global de cotizacion del primer asegurado */
                //$cotizacionPrimerAsegurado[0];
                $arrayAseguradosOtros=null;
                /**Recorremos los asegurados adicionales restantes*/
                if($cantidadClonacion>0){
                    for($a=0;$a<$cantidadClonacion;$a++){
                      
                        for($b=0;$b<sizeof($arrayInputsAsegurados);$b++){
                            //print_r($arrayInputsAsegurados[$b].''.$a);
                            $arrayAseguradosOtros[str_replace('_asegurado','',$arrayInputsAsegurados[$b])]=$request->post($arrayInputsAsegurados[$b].''.$a);
                        }
                        $arrayAseguradosOtros['cd_producto']=$request->post('cd_producto');
                        $arrayAseguradosOtros['cd_grupo_familiar']=$request->post('cd_grupo_familiar');
                        $arrayAseguradosOtros['mt_suma_asegurada']=$request->post('mt_suma_asegurada');
                        $arrayAseguradosOtros['cd_plan_pago']=$request->post('cd_plan_pago');
                        $arrayAseguradosOtros['nu_asegurado']='as_'.$a;
                        $arrayAseguradosOtros['mt_prima']=0;
                        /**Procesamos la cotizacion para el asegurado restante*/
                        $cotizacionOtrosAsegurado[$a]=$instanciaAuditoria->fnBusquedaParametrizada(
                            $busquedaCotizacionTitular,
                            $arrayAseguradosOtros,
                            2
                        )[0];
                        //print_r($cotizacionOtrosAsegurado);
                        /**Agregamos al arreglo global de cotizacion para el asegurado restante*/
                        //$cotizacionOtrosAsegurado[0];
                        //$arrayAsegurados=array($cotizacionOtrosAsegurado[0],$arrayAsegurados);
                        $arrayAdicionales=null;

                    }
                }
            }else{

            }
            $arrayAdicionales=array();
            $in_adicionales=$request->post('de_adicionales');
            if($in_adicionales=='on'){
                $cantidadClonacion=$request->post('ca_clonacion_adicionales');
                /**Recorremos el array de asegurados para reemplazar la palabra _asegurado  */
                for($b=0;$b< sizeof($arrayInputsAdicionales);$b++){
                    $arrayAdicionales[str_replace('_adicional','',$arrayInputsAdicionales[$b])]=$request->post($arrayInputsAdicionales[$b]);
                }
                $arrayAdicionales['cd_producto']=$request->post('cd_producto');
                $arrayAdicionales['cd_grupo_familiar']=$request->post('cd_grupo_familiar');
                $arrayAdicionales['mt_suma_asegurada']=$request->post('mt_suma_asegurada');
                $arrayAdicionales['cd_plan_pago']=$request->post('cd_plan_pago');
                $arrayAdicionales['mt_prima']=0;
                $arrayAdicionales['nu_asegurado']='ad';
                
                /**Procesamos la cotizacion Para el primer asegurado */
                $cotizacionPrimerAdicional=array();
                $cotizacionPrimerAdicional=$instanciaAuditoria->fnBusquedaParametrizada(
                    $busquedaCotizacionTitular,
                    $arrayAdicionales,
                    2
                );
                //$cotizacionPrimerAdicional[0];
                /**Agregamos al arreglo global de cotizacion del primer asegurado */
                //$retornoAsegurados[$contadorRetornos]=
                //$arrayAsegurados=array_merge($cotizacionPrimerAsegurado[0],$arrayAsegurados);
                $arrayAdicionalesOtros=array();
                /**Recorremos los asegurados adicionales restantes*/
                if($cantidadClonacion>0){
                    for($a=0;$a<$cantidadClonacion;$a++){
                        //print_r($cantidadClonacion);
                        for($b=0;$b<sizeof($arrayInputsAdicionales);$b++){
                            //print_r($arrayInputsAdicionales[$b].''.$a);
                            $arrayAdicionalesOtros[str_replace('_adicional','',$arrayInputsAdicionales[$b])]=$request->post($arrayInputsAdicionales[$b].''.$a);
                        }
                        $arrayAdicionalesOtros['cd_producto']=$request->post('cd_producto');
                        $arrayAdicionalesOtros['cd_grupo_familiar']=$request->post('cd_grupo_familiar');
                        $arrayAdicionalesOtros['mt_suma_asegurada']=$request->post('mt_suma_asegurada');
                        $arrayAdicionalesOtros['cd_plan_pago']=$request->post('cd_plan_pago');
                        $arrayAdicionalesOtros['nu_asegurado']='ad_'.$a;
                        
                        $arrayAdicionalesOtros['mt_prima']=0;
                        /**Procesamos la cotizacion para el asegurado restante*/
                        $cotizacionOtrosAdicionales[$a]=$instanciaAuditoria->fnBusquedaParametrizada(
                            $busquedaCotizacionTitular,
                            $arrayAdicionalesOtros,
                            2
                        )[0];

                        //print_r($cotizacionOtrosAdicionales[0]);
                        /**Agregamos al arreglo global de cotizacion para el asegurado restante*/
                        //$retornoAsegurados[$contadorRetornos]=
                        //$cotizacionOtrosAsegurado[0];
                        //$arrayAsegurados=array_merge($cotizacionOtrosAsegurado[0],$arrayAsegurados);
                        $arrayAdicionales=null;

                    }
                }
            }else{

            }
            $retornoAsegurados=array_merge( 
                $cotizacionTitular,
                $cotizacionPrimerAsegurado,
                $cotizacionOtrosAsegurado,
                $cotizacionPrimerAdicional,
                $cotizacionOtrosAdicionales);
            $retorno=array(
                'httpResponse'=>200,
                'message'=>array(
                    'validate'=>0,
                    'content'=>$retornoAsegurados,
                    'object'=>array(),
                ),
                'error'=>1
            );
            
        } catch (Exception $th) {
            $retorno=array(
                'httpResponse'=>400,
                'message'=>array(
                    'validate'=>0,
                    'content'=>$th,
                    'object'=>array(),
                ),
                'error'=>1
            );
        }
        return json_encode($retorno);
    }
    function fnValidarAsegurados(Request $request){
        $retorno=array();
        $contadorGlobal=0;
        try {
            $retornoAsegurados=array();
            $contadorClonacion=$request->post('ca_clonacion');
            $contadorClonacionAdicionales=$request->post('ca_clonacion-adicionales');

            $instanciaAuditoria=new Auditoria;
            $documentoTitular=$request->post('nu_documento');
            $producto=$request->post('cd_producto');

            $arrayTitular=array('cd_input'=>'nu_documento','nu_documento'=>$documentoTitular,'cd_producto'=>$producto);
            $busquedaDocumentoTitular=$instanciaAuditoria->fnBusquedaParametrizada(
                'busquedaDocumentoContrato',
                $arrayTitular,
                2
            );
            if(sizeof( $busquedaDocumentoTitular) >0){
                $retornoAsegurados[$contadorGlobal]=$busquedaDocumentoTitular[0];
                $contadorGlobal+=1;
            }
            
            $documentoAsegurado=$request->post('nu_documento_asegurado');
            $arrayAsegurado=array('cd_input'=>'nu_documento_asegurado','nu_documento'=>$documentoAsegurado,'cd_producto'=>$producto);
            $busquedaDocumentoAsegurado=$instanciaAuditoria->fnBusquedaParametrizada(
                'busquedaDocumentoContrato',
                $arrayAsegurado,
                2
            );
            if(sizeof( $busquedaDocumentoAsegurado) >0){
                $retornoAsegurados[$contadorGlobal]=$busquedaDocumentoAsegurado[0];
                $contadorGlobal+=1;
            }
            
            if($contadorClonacion>0){
                
                for($a=0;$a<$contadorClonacion;$a++){
                    $contadorGlobal+=1;
                    $busquedaDocumentoAseguradoExtra=$request->post('nu_documento_asegurado'.$a);
                    $arrayAseguradoExtra=array('cd_input'=>'nu_documento_asegurado'.$a,'nu_documento'=>$busquedaDocumentoAseguradoExtra,'cd_producto'=>$producto);
                    $documentoAseguradoExtra=$instanciaAuditoria->fnBusquedaParametrizada(
                        'busquedaDocumentoContrato',
                        $arrayAseguradoExtra,
                        2
                    );
                    $retornoAsegurados[$contadorGlobal]=$documentoAseguradoExtra[0];
                }
            } 
            if($contadorClonacionAdicionales>0){
                
                for($a=0;$a<$contadorClonacionAdicionales;$a++){
                    $contadorGlobal+=1;
                    $busquedaDocumentoAseguradoExtra=$request->post('nu_documento_adicional'.$a);
                    $arrayAseguradoExtra=array('cd_input'=>'nu_documento_adicional'.$a,'nu_documento'=>$busquedaDocumentoAseguradoExtra,'cd_producto'=>$producto);
                    $documentoAseguradoExtra=$instanciaAuditoria->fnBusquedaParametrizada(
                        'busquedaDocumentoContrato',
                        $arrayAseguradoExtra,
                        2
                    );
                    $retornoAsegurados[$contadorGlobal]=$documentoAseguradoExtra[0];
                }
            } 
            $validacion=0;
            if(sizeof($retornoAsegurados)>0){
                $validacion=1;
            }
            $retorno=array(
                'httpResponse'=>200,
                'message'=>array(
                    'validate'=>$validacion,
                    'content'=>$retornoAsegurados,
                    'object'=>array(),
                ),
                'error'=>1
            ); 
        } catch (Exception $th) {
            $retorno=array(
                'httpResponse'=>400,
                'message'=>array(
                    'validate'=>0,
                    'content'=>$th,
                    'object'=>array(),
                ),
                'error'=>1
            );
        }
        return json_encode($retorno);
    }

    function fnEmision(Request $request){
        $retorno='';
        try {
            //print_r($request->post('de_asegurados'));
            //print_r($request->post('de_asegurados'));
            $instanciaPersonas=new PersonasModel;
            $secuenciaPersona=$instanciaPersonas->fnCreateTitular($request);

            $instanciaContrato=new ContratoModel;
            $secuenciaContrato=$instanciaContrato->fnCreate($request,$secuenciaPersona);

            $instanciaContratoCertificado=new ContratoCertificadoModel;
            $instanciaContratoCertificado->fnCreate($request,$secuenciaPersona,$secuenciaContrato);

            $instanciaContratoCertificadoEndoso=new ContratoCertificadoEndosoModel;
            $instanciaContratoCertificadoEndoso->fnCreate($request,$secuenciaContrato,'');
            
            $instanciaPersonas->fnCreateAsegurados($request,$secuenciaContrato,$secuenciaPersona);
            
            $instanciaRecibos=new RecibosModel;
            $instanciaRecibos->fnCreateFacturacion($secuenciaContrato);

            $retorno=array(
                'httpResponse'=>200,
                'message'=>array(
                    'validate'=>'',
                    'content'=>$secuenciaContrato,
                    'object'=>array(),
                ),
                'error'=>1
            ); 
            
        } catch (Exception $th) {
            print_r($th);
        }
        return json_encode($retorno);
    }

    function fnVistaEmision($contrato){
        $contratoEmision=array();
        $contratoAsegurados=array();
        $contratoRecibos=array();
        $menu=5;
        $submenu=6;
        $scripts=array(
            '/prevision/utiles/validacionFormulario.js',
            '/prevision/utiles/sweetAlertsPersonalizados.js',
            '/prevision/utiles/comboDependienteProductos.js',
            '/prevision/utiles/comboDependienteEstados.js',
            '/prevision/procesos/cotizacion.js',
            '/prevision/utiles/clonarInputs.js',
            '/js/qrcodejs/qrcode.min.js',
            '/js/qrcodejs/emision.js',);
        
        try {
            $instanciaAuditoria=new Auditoria;
            $parametros=array('cd_contrato'=>$contrato);
            $contratoEmision=$instanciaAuditoria->fnBusquedaParametrizada(
                'busquedaInformacionEmision',
                $parametros,
                2
            );
            $contratoAsegurados=$instanciaAuditoria->fnBusquedaParametrizada(
                'busquedaInformacionAsegurados',
                $parametros,
                2
            );
            $contratoRecibos=$instanciaAuditoria->fnBusquedaParametrizada(
                'busquedainformacionRecibos',
                $parametros,
                2
            );
        } catch (Exception $th) {
            print_r($th);
        }
        return view('procesos.cotizacion.contrato-vista-emision',compact('contratoEmision','contratoAsegurados','contratoRecibos','menu','submenu','scripts'));
    }
    function fnCotizaPlanesPago(Request $request){
        $solicitud=array_keys($request->all());
        $asegurados=[];
        $adicionales=[];
        $titular=[];
        $acumuladoPrima=0.0;
        $siglasMoneda='';
        $query='procesoCotizacionPorPlan';
        $instanciaAuditoria=new Auditoria;
        $parametrosTitular=array(
            'cd_producto'=>$request->post('cd_producto'),
            'cd_grupo_familiar'=>$request->post('cd_grupo_familiar'),
            'mt_suma_asegurada'=>$request->post('mt_suma_asegurada'),
            'cd_parentesco'=>$request->post('cd_parentesco'),
        );
        
        $titular=$instanciaAuditoria->fnBusquedaParametrizada(
            $query,
            $parametrosTitular,
            2
        );
        $siglasMoneda=$titular[0]['siglas_moneda'];
        $acumuladoPrima+=$titular[0]['mt_prima'];
        for($a=0;$a<sizeof($solicitud);$a++){
            if($solicitud[$a]=='_token'){}
            if(preg_match('/asegurado/',$solicitud[$a])){
                //print_r($solicitud[$a]);
                $parametrosAsegurados=array(
                    'cd_producto'=>$request->post('cd_producto'),
                    'cd_grupo_familiar'=>$request->post('cd_grupo_familiar'),
                    'mt_suma_asegurada'=>$request->post('mt_suma_asegurada'),
                    'cd_parentesco'=>$request->post($solicitud[$a]),
                );
                
                $asegurados=$instanciaAuditoria->fnBusquedaParametrizada(
                    $query,
                    $parametrosAsegurados,
                    2
                );
                $acumuladoPrima+=$asegurados[0]['mt_prima'];
                
            }
            if(preg_match('/adicional/',$solicitud[$a])){
                //print_r($solicitud[$a]);
                $parametrosAdicional=array(
                    'cd_producto'=>$request->post('cd_producto'),
                    'cd_grupo_familiar'=>$request->post('cd_grupo_familiar'),
                    'mt_suma_asegurada'=>$request->post('mt_suma_asegurada'),
                    'cd_parentesco'=>$request->post($solicitud[$a]),
                );
                $adicionales=$instanciaAuditoria->fnBusquedaParametrizada(
                    $query,
                    $parametrosAdicional,
                    2
                );
                $acumuladoPrima+=$adicionales[0]['mt_prima'];
            }
        }
        $parametrosPlanesPorPrima=array(
            'mt_prima'=>$acumuladoPrima,
            'de_siglas_moneda'=>$siglasMoneda

        );
        $query='primasPorPlanesPago';
        $planesPorPrima=$instanciaAuditoria->fnBusquedaParametrizada(
            $query,
            $parametrosPlanesPorPrima,
            2
        );
        $retorno=array(
            'httpResponse'=>200,
            'message'=>array(
                'validate'=>'',
                'content'=>$planesPorPrima,
                'object'=>array(),
            ),
            'error'=>1
        ); 
        return json_encode($retorno);

    }

    function fnCotizaPorCorreo(Request $request){
        $solicitud=array_keys($request->all());
        $asegurados=[];
        $adicionales=[];
        $titular=[];
        $acumuladoPrima=0.0;
        $siglasMoneda='';
        $query='procesoCotizacionPorPlan';
        $instanciaAuditoria=new Auditoria;
        $parametrosTitular=array(
            'cd_producto'=>$request->post('cd_producto'),
            'cd_grupo_familiar'=>$request->post('cd_grupo_familiar'),
            'mt_suma_asegurada'=>$request->post('mt_suma_asegurada'),
            'cd_parentesco'=>$request->post('cd_parentesco'),
        );
        
        $titular=$instanciaAuditoria->fnBusquedaParametrizada(
            $query,
            $parametrosTitular,
            2
        );
        $siglasMoneda=$titular[0]['siglas_moneda'];
        $acumuladoPrima+=$titular[0]['mt_prima'];
        for($a=0;$a<sizeof($solicitud);$a++){
            if($solicitud[$a]=='_token'){}
            if(preg_match('/asegurado/',$solicitud[$a])){
                //print_r($solicitud[$a]);
                $parametrosAsegurados=array(
                    'cd_producto'=>$request->post('cd_producto'),
                    'cd_grupo_familiar'=>$request->post('cd_grupo_familiar'),
                    'mt_suma_asegurada'=>$request->post('mt_suma_asegurada'),
                    'cd_parentesco'=>$request->post($solicitud[$a]),
                );
                
                $asegurados=$instanciaAuditoria->fnBusquedaParametrizada(
                    $query,
                    $parametrosAsegurados,
                    2
                );
                $acumuladoPrima+=$asegurados[0]['mt_prima'];
                
            }
            if(preg_match('/adicional/',$solicitud[$a])){
                //print_r($solicitud[$a]);
                $parametrosAdicional=array(
                    'cd_producto'=>$request->post('cd_producto'),
                    'cd_grupo_familiar'=>$request->post('cd_grupo_familiar'),
                    'mt_suma_asegurada'=>$request->post('mt_suma_asegurada'),
                    'cd_parentesco'=>$request->post($solicitud[$a]),
                );
                $adicionales=$instanciaAuditoria->fnBusquedaParametrizada(
                    $query,
                    $parametrosAdicional,
                    2
                );
                $acumuladoPrima+=$adicionales[0]['mt_prima'];
            }
        }
        $parametrosPlanesPorPrima=array(
            'mt_prima'=>$acumuladoPrima,
            'de_siglas_moneda'=>$siglasMoneda

        );
        $arrayCotizacion=array(
            'cd_producto'=>$request->post('cd_producto'),
            'cd_grupo_familiar'=>$request->post('cd_grupo_familiar'),
            'mt_suma_asegurada'=>$request->post('mt_suma_asegurada'),
            'cd_plan_pago'=>$request->post('cd_plan_pago'),
            'nm_persona1'=>$request->post('nm_persona1'),
            'nm_apellido1'=>$request->post('nm_apellido1'),
            'nu_documento'=>$request->post('nu_documento'),
            'nu_telefono'=>$request->post('nu_telefono'),
            'de_correo'=>$request->post('de_correo'),
            'mt_prima'=>$acumuladoPrima,
        );
        $instaciaTempCotizacion=new TempCotizacionModel;
        $secuenciaTempCotizacion=
        $instaciaTempCotizacion->fnCreate($arrayCotizacion);
        $retorno=array(
            'httpResponse'=>200,
            'message'=>array(
                'validate'=>'',
                'content'=>$secuenciaTempCotizacion,
                'object'=>array(),
            ),
            'error'=>1
        ); 
        return json_encode($retorno);

    }
    
}

