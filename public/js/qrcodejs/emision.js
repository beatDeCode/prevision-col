function fnCodigoQr(){
    link=$('input[name="qrcode"]').val();
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: 'http://10.10.0.200:8081/sgd.reportes/JRTE0001_1/NU_CONTRATO-'+link,
        width: 180,
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}
fnCodigoQr();

function fnMostrarResumen(resumen){
    
    var divValores=$('div[id="resumen'+resumen+'"]').html();
    var div=$('div[id="divFase"]');
    div.html('');
    div.append(divValores);
    

}
