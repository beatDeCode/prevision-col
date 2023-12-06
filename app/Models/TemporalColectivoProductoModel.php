<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemporalColectivoProductoModel extends Model{
    public $table="TEMPORALCOLECTIVOPRODUCTO";
    public $timestamps=false;
    public $incrementing=false;
    public $fillable=["cd_plan_pago",
    "nu_temporal",
    "tp_calculo",
    "cd_cobertura_detalle",
    "cd_grupo_familiar",
    "cd_cobertura",
    "cd_producto"];
    public function fnValidaciones(){ return ["cd_plan_pago"=>"required",
        "tp_calculo"=>"required",
        "cd_cobertura_detalle"=>"required",
        "cd_grupo_familiar"=>"required",
        "cd_cobertura"=>"required",
        "cd_producto"=>"required"];}
    public function fnMensajes(){return ["cd_plan_pago.required"=>"El campo est? vac?o.",
        "tp_calculo.required"=>"El campo est? vac?o.",
        "cd_cobertura_detalle.required"=>"El campo est? vac?o.",
        "cd_grupo_familiar.required"=>"El campo est? vac?o.",
        "cd_cobertura.required"=>"El campo est? vac?o.",
        "cd_producto.required"=>"El campo est? vac?o."];}
    
    public function fnCreate($array){
        $this->create($array);
    }

}
