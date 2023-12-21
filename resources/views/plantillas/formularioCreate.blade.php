<div class="container-fluid" id="{{$nombreFormulario}}">
<form onsubmit="return false;" name="{{$nombreFormulario}}">
    <div class="row">
        @if(sizeof($formulariosCreate)>0)
            @foreach(array_keys($formulariosCreate) as $key)
                <?php $input=explode('|',$key);?>
                @if($input[1]=='input' )
                    @if($input[2]!='hidden')
                        <div class="{{$input[3]}}" id="{{$input[0]}}">
                            <div class="form-group">
                                <label id="{{$input[0]}}" style="font-size:12px;">{{$input[4]}}</label>
                                <input type="{{$input[2]}}" class="form-control form-control-sm" placeholder="" aria-label="Username" 
                                name="{{$input[0]}}" id="{{$input[0]}}" {{$input[5]}} style="font-size:12px;">
                                <center><div style="margin-top:1px;font-size:10px;display:none;color:red;" id="error{{$input[0]}}"></div></center>
                            </div>
                        </div>
                    @elseif($input[2]=='hidden')
                        <input type="{{$input[2]}}" class="form-control form-control-sm" placeholder="" aria-label="Username" 
                        name="{{$input[0]}}" id="{{$input[0]}}">
                    @endif
                @endif

                @if($input[1]=='select')
                <div class="{{$input[3]}}" id="{{$input[0]}}">
                    <div class="form-group">
                        <label  id="{{$input[0]}}" style="font-size:12px;">{{$input[4]}}</label>
                        <select class="custom-select mr-sm-2" id="{{$input[0]}}" name="{{$input[0]}}" {{$input[5]}} style="font-size:12px;">
                            <option value=""></option>
                            @foreach($formulariosCreate[$key] as $option)
                                <option value="{{$option['value']}}">{{$option['text']}}</option>
                            @endforeach
                        </select>
                        <br>
                        <center><div style="margin-top:1px;font-size:10px;display:none;color:red;" id="error{{$input[0]}}"></div></center>
                    </div>
                </div>
                @endif
                @if($input[1]=='checkbox')
                <div class="{{$input[3]}}" id="{{$input[0]}}">
                <div class="form-check">
                    <input name="{{$input[0]}}" class="form-check-input" type="checkbox" id="{{$input[0]}}" >
                    <label class="form-check-label" id="{{$input[0]}}" for="autoSizingCheck2">
                    {{$input[4]}}
                    </label>
                </div>
                <div id="error{{$input[0]}}" style="font-size:11px;display:none;color:red;"></div>
                </div>
                @endif
                @if($input[1]=='div')
                    <div class="{{$input[3]}}" id="{{$input[0]}}" >
                    </div>
                @endif
                @if($input[1]=='hr')
                    
                    <div class="col-md-12" style="margin-top:10px;" id="{{$input[0]}}">
                        <div class="badge" style="background-color: #7c90a7;color:white;text-align:left;">
                            {{$input[4]}}
                        </div>
                        <hr class="hr-none">
                    </div>
                @endif
            @endforeach
        @endif
        @if($cantidadDeClonacion>0)
            
            @for($a=0;$a<$cantidadDeClonacion;$a++)
                @foreach(array_keys($formulariosAClonar) as $key)
                    <?php $input=explode('|',$key); ?>
                    @if($input[1]=='input' )
                        @if($input[2]!='hidden')
                        <div class="{{$input[3]}}" id="{{$input[0].''.$a}}" style="display:none;" >
                            <div class="form-group">
                                <label  id="{{$input[0].''.$a}}" style="font-size:12px;">{{$input[4]}}</label>
                                <input type="{{$input[2]}}" class="form-control form-control-sm" placeholder="" aria-label="Username" 
                                name="{{$input[0].''.$a}}" id="{{$input[0].''.$a}}"  style="font-size:12px;" disabled>
                                <center><div style="margin-top:1px;font-size:10px;display:none;color:red;" id="error{{$input[0].''.$a}}"></div></center>
                            </div>
                        </div>
                        
                        @endif
                    @endif

                    @if($input[1]=='select')
                    <div class="{{$input[3]}}" id="{{$input[0].''.$a}}" style="display:none;" >
                        <div class="form-group">
                            <label  id="{{$input[0].''.$a}}" style="font-size:12px;">{{$input[4]}}</label>
                            <select class="custom-select mr-sm-2" id="{{$input[0].''.$a}}" name="{{$input[0].''.$a}}" style="font-size:12px;" disabled>
                                <option value=""></option>
                                @foreach($formulariosAClonar[$key] as $option)
                                    <option value="{{$option['value']}}">{{$option['text']}}</option>
                                @endforeach
                            </select>
                            <br>
                            <center><div style="margin-top:1px;font-size:10px;display:none;color:red;" id="error{{$input[0].''.$a}}"></div></center>
                        </div>
                    </div>
                    @endif
                    @if($input[1]=='button')
                    <div class="{{$input[3]}}" id="{{$input[0].''.$a}}" style="display:none;">
                        <button type="button" class="btn btn-sm" style="background-color: #7c90a7;color: white;margin-top:10px;" onclick="fnQuitarUltimoForm('{{$nombreFormulario.'_'.$a}}')"><i class="typcn typcn-trash"></i></button>
                    </div>
                    @endif
                @endforeach
            @endfor
        @endif
    </div>
    </form>
</div>