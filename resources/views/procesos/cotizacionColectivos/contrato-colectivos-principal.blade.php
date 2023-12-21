@include('celestial-template.header')
@include('celestial-template.navbar')
@include('celestial-template.sidebar')
<div class="main-panel">
<div class="content-wrapper" style="font-size:14px;">
@include('plantillas.tarjetaDinamicaApertura')
    @csrf()
    @include('procesos.cotizacionColectivos.contrato-colectivos-producto')
    @include('procesos.cotizacionColectivos.contrato-colectivos-carga')
    @include('procesos.cotizacionColectivos.contrato-colectivos-cotizacion')
@include('plantillas.tarjetaDinamicaCierre')
</div>
</div>
@include('celestial-template.footer')