<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Auditoria;

class TempCotizacionModel extends Model{
    protected $table="TEMPCOTIZACION";
    public $timestamps=false;
    public $incrementing=false;
    public $fillable=["nu_documento",
    "nu_telefono",
    "de_correo",
    "mt_prima",
    "cd_plan_pago",
    "cd_grupo_familiar",
    "mt_suma_asegurada",
    "cd_producto",
    "ap_persona1",
    "nm_persona1",
    "cd_temporal_cotizacion"];

    public function fnCreate($array){
        $instanciaAuditoria=new Auditoria;
        $secuenciaTempCotizacion=$instanciaAuditoria->fnBuscarSecuenciaCatalogo('busquedaSecuenciaTempCotizacion',array())[0]['secuencia'];
        $array['cd_temporal_cotizacion']=$secuenciaTempCotizacion;
        try {
            $this->create($array);
        } catch (Exception $th) {
            print_r($th);
        }
        return $secuenciaTempCotizacion;
    }
    
}
