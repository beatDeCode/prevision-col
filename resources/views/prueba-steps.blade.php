@include('celestial-template.header')
@include('celestial-template.navbar')
@include('celestial-template.sidebar')
<div class="main-panel">
<div class="content-wrapper" style="font-size:14px;">
@include('plantillas.tarjetaDinamicaApertura')
<div class="container-fluid">
  <div class="col-md-12" style="margin-top:10px;">
      <hr class="hr-none">
      <div class="badge" style="background-color: #1d4068;color:white;text-align:left;">
      Producto
      </div>
      
  </div>
  <br>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3">
        <div class="card" style="width: 18rem;border-radius:10px;border:solid 2px lightgray;">
        <div class="card-img-top" alt="100%x180" 
        data-holder-rendered="true" style="height: 40px; width: 100%; display: block;">
          <center><i style="font-size:40px;">$</i>  </center>
        
        </div>
        <div class="card-body" style="padding:0.7rem;">
          <h5 class="card-title" style="margin:0px;"><center>
          <a href="#" style="color:#1d4068;">Servicio Funerario </a>  
          </center></h5>
        </div>
      </div>

      </div>

      <div class="col-sm-3">
        <div class="card" style="width: 18rem;border-radius:10px;border:solid 2px lightgray;">
        <div class="card-img-top" alt="100%x180" data-holder-rendered="true" style="height: 40px; width: 100%; display: block;">
        <center><i class="typcn typcn-home-outline" style="font-size:40px;"></i> </center>
        </div>
        
        <div class="card-body" style="padding:0.7rem;">
          <h5 class="card-title" style="margin:0px;"><center>
          <a href="#" style="color:#1d4068;font-weight:bold;">Servicio Funerario <i class="typcn typcn-input-checked" style="font-size:20px;"></i> </a>  
          </center></h5>
        </div>
      </div>

      </div>
    </div>


    @include('plantillas.formularioCreate',[
            'formulariosCreate'=>$formulariosCreate1,
            'nombreFormulario'=>$nombreFormulario1,
            'formulariosAClonar'=>$formulariosAClonar1,
            'cantidadDeClonacion'=>$cantidadDeClonacion1 ])


    <hr>
  </div>

  <div class="col-md-12" style="margin-top:10px;">
      <div class="badge" style="background-color: #1d4068;color:white;text-align:left;">
      Coberturas
      </div>
      <hr class="hr-none">
  </div>
  
  <br>
  <div class="container-fluid">
    <div class="row">
    <div class="col-sm-3">
        <div class="card" style="border:solid 2px gray;border-radius:15px;">
          <div class="card-body" style="padding:1rem">
            <div class="row">
              <div class="col-md-12">
              <div class="card-body" style="padding:0px;">
              
              <h6 class="card-title" style="margin:5px;"> <i class="typcn typcn-home-outline" style="font-size:20px;"></i> Funerario</h6>
              <div style="float:right;"><a href="#" class="btn btn-info btn-sm" style=""><i class="typcn typcn-plus"></i></a></div>
              
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
  
  <br>



  <br>
</div>
@include('plantillas.tarjetaDinamicaCierre')
</div>
</div>
@include('celestial-template.footer')