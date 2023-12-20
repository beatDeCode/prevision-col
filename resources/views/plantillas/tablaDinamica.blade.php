@if(sizeof($cabecera)>0)
    <table class=" table-responsive" style="padding:10px;">
        <thead>
        <tr>
            @foreach($cabecera as $campo)
            <th style="font-size:12px;width:auto;">{{$campo}}</th>
            @endforeach
        </tr>
        </thead>
        <tbody tyle="height:auto;">
        @if(sizeof($datos)>0)
            @foreach($datos as $dato)
                <tr s>
                    @foreach($indices as $indice)
                    <td style="font-size:12px;width:110px;align-text:center;padding:10px;">{{$dato[$indice]}}</td>
                    @endforeach
                </tr>
            @endforeach
        @endif
        </tbody>
    </table>
@endif