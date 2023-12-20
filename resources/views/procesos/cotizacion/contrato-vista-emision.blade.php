@include('celestial-template.header')
@include('celestial-template.navbar')
@include('celestial-template.sidebar')
<?php 
    $arrayIndicesTarjetaDatos=[
        'Nombre del Titular-nm_completo',
        'Número de Documento-nu_documento',
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

        <div class="card">
            <div class="badge" style="background:#f6f8fa">-</div>
                <div class="container-fluid">
                    <div class="row" style="padding:10px;">
                        <div class="col-md-1">
                            <div class="sidebar-profile-image">
                                <img src="/images/valles-ccs-1.png" alt="image" width="50" height="50">
                                <span class="sidebar-status-indicator"></span>
                            </div>
                        </div>

                        <div class="col-md-5" style="margin-top:15px;">
                            <h6 class="card-title">Resumen de Contrato Emitido</h6>
                            
                        </div>
                        
                        <div class="col-md-3 offset-md-3">
                            <input type="hidden" name="qrcode" value="{{$contratoEmision[0]['nu_contrato']}}">
                            <center>
                                <button class="btn btn-sm btn-outline-info btn-icon-text" onclick="fnGenerarPDFContrato({{$contratoEmision[0]['nu_contrato']}})">
                                <i class="typcn typcn-download-outline"></i> Descargar </button>
                            <button class="btn btn-sm btn-outline-info btn-icon-text" onclick="fnEnviarCorreoPDF(
                                {{$contratoEmision[0]['nu_contrato']}},
                                '{{$contratoEmision[0]['nu_documento']}}',
                                '{{$contratoEmision[0]['nm_completo']}}',
                                '{{$contratoEmision[0]['de_correo']}}')"><i class="typcn typcn-mail"></i> Enviar Correo</button></center>
                        </div>
                        

                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-3">
                            <ul class="nav nav-tabs nav-tabs-vertical" role="tablist">
                                <li class="nav-item">
                                <a class="nav-link"  onclick="fnMostrarResumen(1)">
                                Datos Personales
                                <i class="typcn typcn-home-outline  ms-2"></i>
                                </a>
                                <li class="nav-item">
                                <a class="nav-link"  onclick="fnMostrarResumen(2)">
                                Datos de la Cobertura
                                <i class="typcn typcn-clipboard ms-2"></i>
                                </a>
                                </li>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" onclick="fnMostrarResumen(3)">
                                Familiares Asegurados
                                <i class="typcn typcn-user-outline ms-2"></i>
                                </a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link"  onclick="fnMostrarResumen(4)">
                                Facturación
                                <i class="typcn typcn-mail ms-2"></i>
                                </a>
                                </li>
                            </ul>

                            <hr>
                            <div id="qrcode" style="padding:10px;"></div>

                        </div>
                        
                        <div id="divFase" class="col-md-6" style="padding:10px;">
                            <div class="card" style="border-radius:3px;">
                                <div class="badge" style="background:#f6f8fa">Titular</div>
                                    <div class="row">
                                        <div class="container-fluid">
                                            @foreach($contratoEmision as $dato)
                                                @foreach($arrayIndicesTarjetaDatos as $indicesTarjeta)
                                                <div class="col-md-12" style="padding:10px;">
                                                    <?php 
                                                        $datoExplode=explode('-',
                                                        $indicesTarjeta);
                                                    ?>
                                                    <div class="d-flex align-items-center">
                                                        <div class="ms-3">
                                                        <p class="mb-0"><b style="text-small">{{$datoExplode[0]}}</b>: {{$dato[$datoExplode[1]]}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                @endforeach
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                    </div>

                    <div class="col-md-9" id="resumen1" style="display:none;">
                        <div class="card" style="border-radius:3px;">
                            <div class="badge" style="background:#f6f8fa">Titular</div>
                                <div class="row">
                                    <div class="container-fluid">
                                        @foreach($contratoEmision as $dato)
                                            @foreach($arrayIndicesTarjetaDatos as $indicesTarjeta)
                                            <div class="col-md-12" style="padding:10px;">
                                                <?php 
                                                    $datoExplode=explode('-',
                                                    $indicesTarjeta);
                                                ?>
                                                <div class="d-flex align-items-center">
                                                    <div class="ms-3">
                                                    <p class="mb-0"><b style="text-small">{{$datoExplode[0]}}</b>: {{$dato[$datoExplode[1]]}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            @endforeach
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-9"  id="resumen2" style="display:none;">
                        <div class="card">
                            <div class="badge" style="background:#f6f8fa">Titular</div>
                                <div class="row">
                                    <div class="container-fluid">
                                        @foreach($contratoEmision as $dato)
                                            @foreach($arrayIndicesTarjetaProducto as $indicesTarjeta)
                                            <div class="col-md-12" style="padding:10px;">
                                                <?php 
                                                    $datoExplode=explode('-',
                                                    $indicesTarjeta);
                                                ?>
                                                <div class="d-flex align-items-center">
                                                    <div class="ms-3">
                                                    <p class="mb-0"><b style="text-small">{{$datoExplode[0]}}</b>: {{$dato[$datoExplode[1]]}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            @endforeach
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-9"  id="resumen4" style="display:none;">
                        <div class="card">
                            <div class="badge" style="background:#f6f8fa">Titular</div>
                                <div class="row">
                                    <div class="container-fluid">
                                    @include('plantillas.tablaDinamica',['datos'=>$contratoRecibos,'indices'=>$arrayIndicesTablaRecibo,'cabecera'=>$arrayCabeceraTablaRecibo])
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-9"  id="resumen3" style="display:none;">
                        <div class="card">
                            <div class="badge" style="background:#f6f8fa">Titular</div>
                                <div class="row">
                                    <div class="container-fluid">
                                    @include('plantillas.tablaDinamica',['datos'=>$contratoAsegurados,'indices'=>$arrayIndicesTabla,'cabecera'=>$arrayCabeceraTabla])
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>             
        </div>
</div>
</div>
@include('celestial-template.footer')