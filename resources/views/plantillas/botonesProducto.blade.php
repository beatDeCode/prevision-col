<div class="container-fluid">
    <div class="row">
        <div class="col-md-12" style="margin-top:10px;">
            <div class="badge" style="background-color: #1d4068;color:white;text-align:left;">
                {{$busquedaProductos[0]['nombretitulo']}}

            </div>
            <hr class="hr-none">
            
        </div>
    </div>
    <input type="hidden" name="indicador-producto" value="0">
    <input type="hidden" name="indicador-cobertura" value="0">
    <input type="hidden" name="indicador-sumas" value="0">
    <input type="hidden" name="indicador-grupo-familiar" value="0">
    <input type="hidden" name="indicador-plan-pago" value="0">
    <div class="row">
        @foreach($busquedaProductos as $boton)
            <div class="col-sm-{{$boton['columnas']}}">
            <br>
                <div id="card-producto-{{$boton['value']}}" class="card" style="border-radius:10px;border:solid 2px lightgray;">
                    <div class="card-img-top" alt="100%x180" data-holder-rendered="true" style="height: 25px; width: 100%; display: block;">
                    <center><i class="{{$boton['tx_icono']}}" style="font-size:25px;"></i> </center>
                    

                    </div>
                    <div class="card-body" style="padding:0.1rem;">
                        <p class="card-title" style="margin:0px;font-size=13px;"><center>
                        <a href="#" style="color:#1d4068;font-weight:bold;" onclick="fnCambiarProducto({{$boton['value']}})"> {{$boton['titulo']}} </i> </a>  
                        </center></p>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
<!--<i class="typcn typcn-input-checked" style="font-size:20px;"> -->