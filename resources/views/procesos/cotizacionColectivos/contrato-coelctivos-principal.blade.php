@include('celestial-template.header')
@include('celestial-template.navbar')
@include('celestial-template.sidebar')
<div class="main-panel">
<div class="content-wrapper" style="font-size:14px;">
@include('plantillas.tarjetaDinamicaApertura')

    @include('procesos.cotizacionColectivos.contrato-colectivos-producto')
@include('plantillas.tarjetaDinamicaCierre')
</div>
</div>
@include('celestial-template.footer')