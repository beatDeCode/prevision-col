<div class="container-fluid">

    <input type="hidden" name="indicador-producto" value="0">
    <input type="hidden" name="indicador-cobertura" value="0">
    <input type="hidden" name="indicador-sumas" value="0">
    <input type="hidden" name="indicador-grupo-familiar" value="0">
    <input type="hidden" name="indicador-plan-pago" value="0">
    <input type="hidden" name="indicador-ubicacion-resumen" value="1">
    <div id="divproductos">
        <div class="row">
            <div class="col-md-12" style="margin-top:10px;">
                <div class="badge" style="background-color: #1d4068;color:white;text-align:left;">
                    {{$busquedaProductos[0]['nombretitulo']}}
                </div>
                <hr class="hr-none">
            </div>
        </div>
        <div class="row">
            @foreach($busquedaProductos as $boton)
                <div class="col-sm-{{$boton['columnas']}}">
                    <br>
                    
                    <div id="card-producto-{{$boton['value']}}" class="card text-right" style="height:200px;border-radius:10px;border: 2px solid lightgray;">
                        <div class="card-body">
                            <h5 class="card-title">{{$boton['titulo']}}</h5>
                            <p class="card-text">{{$boton['de_tarjeta']}} </p>
                            
                        </div>
                        <div class="card-footer">
                            <a href="#" onclick="fnCambiarProducto({{$boton['value']}})" class="badge" style="background-color: #1d4068;color:white;text-align:left;">Elegir</a>
                        </div>
                    </div>
                    

                </div>
            @endforeach
        </div>
    </div>
</div>
<!--<i class="typcn typcn-input-checked" style="font-size:20px;"> -->