<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemporalColectivoTitularModel extends Model{
    public $table="TEMPORALCOLECTIVOTITULAR";
    public $timestamps=false;
    public $incrementing=false;
    public $fillable=["de_correo",
    "nu_telefono",
    "de_direccion",
    "cd_parroquia",
    "cd_municipio",
    "cd_estado",
    "cd_sexo",
    "fe_nacimiento",
    "nm_completo",
    "nu_documento",
    "tp_documento",
    "nu_temporal"];
    public function fnValidaciones(){ return ["de_correo"=>"required",
        "nu_telefono"=>"required",
        "de_direccion"=>"required",
        "cd_parroquia"=>"required",
        "cd_municipio"=>"required",
        "cd_estado"=>"required",
        "cd_sexo"=>"required",
        "fe_nacimiento"=>"required",
        "nm_completo"=>"required",
        "nu_documento"=>"required",
        "tp_documento"=>"required",
        "nu_temporal"=>"required"];}
    public function fnMensajes(){return ["de_correo.required"=>"El campo est¿ vac¿o.",
        "nu_telefono.required"=>"El campo est¿ vac¿o.",
        "de_direccion.required"=>"El campo est¿ vac¿o.",
        "cd_parroquia.required"=>"El campo est¿ vac¿o.",
        "cd_municipio.required"=>"El campo est¿ vac¿o.",
        "cd_estado.required"=>"El campo est¿ vac¿o.",
        "cd_sexo.required"=>"El campo est¿ vac¿o.",
        "fe_nacimiento.required"=>"El campo est¿ vac¿o.",
        "nm_completo.required"=>"El campo est¿ vac¿o.",
        "nu_documento.required"=>"El campo est¿ vac¿o.",
        "tp_documento.required"=>"El campo est¿ vac¿o.",
        "nu_temporal.required"=>"El campo est¿ vac¿o."];}

    public function fnCreate($array){
        $this->create($array);
    }

}
