<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemporalColectivoModel extends Model{
    public $table="TEMPORALCOLECTIVO";
    public $timestamps=false;
    public $incrementing=false;
    protected $fillable=[
    "error",
    "nu_linea",
    "nu_temporal",
    "mt_suma_estandar",
    "mt_prima",
    "mt_suma",
    "cd_parentesco",
    "cd_sexo",
    "fe_nacimiento",
    "nu_documento_beneficiario",
    "tp_documento_beneficiario",
    "nu_documento_titular",
    "tp_documento_titular",
    "apellido1",
    "nombre1"];
    public function fnValidaciones(){ return ["mt_suma_estandar"=>"required",
        "mt_prima"=>"required",
        "mt_suma"=>"required",
        "cd_parentesco"=>"required",
        "cd_sexo"=>"required",
        "fe_nacimiento"=>"required",
        "nu_documento_beneficiario"=>"required",
        "tp_documento_beneficiario"=>"required",
        "nu_documento_titular"=>"required",
        "tp_documento_titular"=>"required",
        "apellido1"=>"required",
        "nombre1"=>"required"];}
    public function fnMensajes(){return ["mt_suma_estandar.required"=>"El campo está vacío.",
        "mt_prima.required"=>"El campo está vacío.",
        "mt_suma.required"=>"El campo está vacío.",
        "cd_parentesco.required"=>"El campo está vacío.",
        "cd_sexo.required"=>"El campo está vacío.",
        "fe_nacimiento.required"=>"El campo está vacío.",
        "nu_documento_beneficiario.required"=>"El campo está vacío.",
        "tp_documento_beneficiario.required"=>"El campo está vacío.",
        "nu_documento_titular.required"=>"El campo está vacío.",
        "tp_documento_titular.required"=>"El campo está vacío.",
        "apellido1.required"=>"El campo está vacío.",
        "nombre1.required"=>"El campo está vacío."];}

    public function fnCreate($temporal){
        $this->create($temporal);
    }


}
