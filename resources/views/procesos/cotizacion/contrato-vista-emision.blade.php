@include('celestial-template.header')
@include('celestial-template.navbar')
@include('celestial-template.sidebar')
<?php 
    $arrayIndicesTarjetaDatos=[
        'Nombre del Titular-nm_completo',
        'Número de Documento-nu_documento',
        'Estado-de_estado',
        'Municipio-de_municipio',
        'Parroquia-de_parroquia',
        'Dirección-de_direccion',
        'Fecha de Nacimiento-fe_nacimiento',
        'Número de Teléfono-nu_telefono',
        'Correo-de_correo'
    ];
    $arrayIndicesTarjetaProducto=[
        'Producto-de_producto',
        'Número de Contrato-nu_contrato',
        'Fecha de Vigencia-fe_vigencia',
        'Grupo Familiar-de_grupo_familiar',
        'Tipo de Cobertura-de_cobertura',
        'Monto a Riesgo-de_cobertura_detalle',
        'Moneda del Contrato-de_moneda',
        'Plan de Pago-de_plan_pago',
        'Cuotas de Pago-nu_cuotas',
        'Prima Anual-mt_prima',
        'Prima Por Cuota-mt_prima_plan',
    ];
    $arrayCabeceraTabla=[
        'Documento',
        'Nombre Completo',
        'Parentesco',
        'Fecha de Nacimiento',
        'Prima Anual',
        'Prima Por Cuota'
    ];
    $arrayIndicesTabla=[
        'nu_documento',
        'nm_completo',
        'de_parentesco',
        'fe_nacimiento',
        'mt_prima',
        'mt_prima_plan'
    ];

    $arrayCabeceraTablaRecibo=[
        'Recibo',
        'Fecha Desde',
        'Fecha Hasta',
        'Monto',
        'Estatus',
    ];
    $arrayIndicesTablaRecibo=[
        'cd_recibo',
        'fe_desde',
        'fe_hasta',
        'mt_recibo',
        'st_recibo'
    ];

    

?>
<div class="main-panel">
<div class="content-wrapper" style="font-size:14px;">
<div class="container-fluid">
    <div class="row">
        <!-- Primera Tarjeta -->
        <div class="card">
            <div class="card-body">
                <h6 class="card-title">Resumen de Emisión</h6>
                <br>
                <div class="col-md-12">
                <center><button class="btn btn-info btn-sm" onclick="fnGenerarPDFContrato({{$contratoEmision[0]['nu_contrato']}})">Descargar PDF</button>
                  <button class="btn btn-info btn-sm" onclick="fnEnviarCorreoPDF(
                    {{$contratoEmision[0]['nu_contrato']}},
                    '{{$contratoEmision[0]['nu_documento']}}',
                    '{{$contratoEmision[0]['nm_completo']}}',
                    '{{$contratoEmision[0]['de_correo']}}')">Enviar PDF por Correo</button></center>
                  
                </div>
                <hr>
                Datos Personales
                <hr>

                <div class="col-md-12">
                    <div class="row">
                    @foreach($contratoEmision as $dato)
                        @foreach($arrayIndicesTarjetaDatos as $indicesTarjeta)
                        <?php 
                            $datoExplode=explode('-',
                            $indicesTarjeta);
                        ?>
                        <div class="col-md-3">
                            <div class="d-flex align-items-center">
                                <div class="ms-3">
                                <p class="mb-0 text-small"><b>{{$datoExplode[0]}}</b></p>
                                <p class="mb-0">{{$dato[$datoExplode[1]]}}</p>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    @endforeach
                    </div>
                </div>
                <!-- Cierre Primera Tarjeta-->
                <hr>
                Datos del Producto
                <hr>
                <!-- Segunda Tarjeta -->
                <div class="col-md-12">
                    <div class="row">
                    @foreach($contratoEmision as $dato)
                        @foreach($arrayIndicesTarjetaProducto as $indicesTarjeta)
                        <?php 
                            $datoExplode=explode('-',
                            $indicesTarjeta);
                        ?>
                        <div class="col-md-3">
                            <div class="d-flex align-items-center">
                                <div class="ms-3">
                                <p class="mb-0 text-small"><b>{{$datoExplode[0]}}</b></p>
                                <p class="mb-0">{{$dato[$datoExplode[1]]}}</p>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    @endforeach
                    </div>
                </div>
                <!-- Cierre Segunda Tarjeta-->
                <hr>
                Facturación
                <hr>
                
                <div class="row">
                    <!-- Tercera Tarjeta -->
                    <div class="col-md-6" style="padding:10px;">
                        @include('plantillas.tablaDinamica',['datos'=>$contratoRecibos,'indices'=>$arrayIndicesTablaRecibo,'cabecera'=>$arrayCabeceraTablaRecibo])
                        <hr>
                    </div>
                    <!-- Cierre Tercera Tarjeta-->

                    <!-- Cuarta Tarjeta -->
                    <div class="col-md-6" style="padding:10px;">
                        @include('plantillas.tablaDinamica',['datos'=>$contratoAsegurados,'indices'=>$arrayIndicesTabla,'cabecera'=>$arrayCabeceraTabla])
                        <hr>
                    </div>

                    
                    <!-- Cierre Cuarta Tarjeta-->
                </div>
                
            </div>
        </div>
    </div>
</div>
</div>
</div>
@include('celestial-template.footer')