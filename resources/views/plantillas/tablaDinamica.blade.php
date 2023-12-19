@if(sizeof($cabecera)>0)
<div class="table-responsive">
    <table class="table">
        <thead>
        <tr>
            @foreach($cabecera as $campo)
            <th style="font-size:11px">{{$campo}}</th>
            @endforeach
        </tr>
        </thead>
        <tbody>
        @if(sizeof($datos)>0)
            @foreach($datos as $dato)
                <tr>
                    @foreach($indices as $indice)
                    <td style="font-size:12px">{{$dato[$indice]}}</td>
                    @endforeach
                </tr>
            @endforeach
        @endif
        </tbody>
    </table>
</div>
@endif