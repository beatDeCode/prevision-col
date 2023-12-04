<?php

namespace App\Http\Controllers\Procesos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Auditoria;
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
        try {
            $archivo = $request->file('carga_colectivo'); // Retrieve the uploaded file from the request
            $nombreArchivo = $archivo->getClientOriginalName(); // Retrieve the original filename
            $archive=Storage::disk('local')->put('entrada/'.$nombreArchivo, file_get_contents($archivo));
            $contenido = storage::disk('local')->get('entrada/'.$nombreArchivo);
            $contador=1;
            $arr = explode("\n", $contenido);
            $pdo = DB::getPdo();
            $p1=50;
            $p2=100;
            $p3=null;
            $procedureName = 'prevision.pck_cotizacion.pd_valida_cotizacion_colectivo';
 
            $result = null;
            $bindings = [
                'p_a'  => $p1,
                'p_b'  => $p2,
                'p_cotizacion' => [
                    'value' => &$result,
                    'length' => 1000,
                ],
            ];
            DB::executeProcedure($procedureName, $bindings);
            print_r($result);
            
            
            //print_r($p3); // prints 1
        } catch (Exception $th) {
            print_r($th);
            //throw $th;
        }
        
    }
}
