window.addEventListener('load', init, false);

function init() {

  //firebaseInit();

  var urlBase = "https://gallopintocalladmin.firebaseio.com/reportes.json";

  //Form data
  var nameTxt = document.getElementById('nameTxt'),
    lastNameTxt = document.getElementById('lastNameTxt'),
    emailTxt = document.getElementById('emailTxt'),
    phoneNum = document.getElementById('phoneNum'),
    cedulaNum = document.getElementById('idNum'),
    reportTxt = document.getElementById('reportTxt');

  //Buttons
  var saveBtn = document.getElementById('saveBtn');
  //var updateBtn = document.getElementById('updateBtn');
  var deleteBtn = document.getElementById('deleteBtn');
  var cancelBtn = document.getElementById('cancelBtn');

  var owner = 'Jeison B.';
  var reports = [];

  saveBtn.hidden = false;
  deleteBtn.hidden = true;
  cancelBtn.hidden = true;

  saveBtn.onclick = saveBtnOnClick;
  //saveBtn.onclick = saveBtnOnClick;
  //deleteBtn.onclick = deleteBtnOnClick;
  //cancelBtn.onclick = cancelBtnOnClick;

  //saveBtnOnClick{};

  function saveBtnOnClick() {


    if (nameTxt.value === '' || lastNameTxt.value === '' || emailTxt.value === '' || phoneNum.value === '' || cedulaNum.value === '' || reportTxt.value === '') {
      alert('Los datos del reporte no estan completos');

    } else {
      var newReport = new Report(null, nameTxt.value, lastNameTxt.value, emailTxt.value, phoneNum.value, cedulaNum.value, reportTxt.value, 'Pendiente', owner, null);

      console.log(newReport);
      
      var request = new XMLHttpRequest();
      request.open('Post', urlBase, true);
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      request.onreadystatechange = sendReportCallback;
      request.send(JSON.stringify(newReport));
      cleanUI();
    }

  }

  function sendReportCallback(event) {
    var request = event.target;
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        requestALLReports();
      } else {
        console.log('Error on request: ', request.status);
      }
    }
  }

  requestALLReports()

  function requestALLReports() {
    var request = new XMLHttpRequest();
    request.open('GET', urlBase, true);//el ultimo valor indica si es asíncrono o no
    request.onreadystatechange = requestALLReportsCallback;
    request.send();
  }

  //se llama todas las veces que va a cambiar el atributo de readysatate
  function requestALLReportsCallback(event) {

    /*request se saca del target xq es quien activa el evento
    (y además, request pertenece a otro scope)*/
    var request = event.target;

    switch (request.readyState) {
      case XMLHttpRequest.DONE:
        switch (request.status) {
          case 200:
            //limpiar lista de Reports (x si llegan nuevos)
            reports = [];
            var reportsData = JSON.parse(request.responseText);

            console.log(reportsData.length);

            for (const key in reportsData) {

              var reportData = reportsData[key];
              
              var report = new Report(key, reportData.nombre, reportData.apellido, reportData.email, reportData.telefono, reportData.cedula, reportData.reporte, reportData.estado, reportData.owner, reportData.timestamp);

              
              reports.push(report);

              updatereportContainer();
            }

            break;

          case 400: break;
          case 401: break;
          default: break;

        }
        break;

      case XMLHttpRequest.LOADING:
        console.log('LOADING');
        break;
      case XMLHttpRequest.OPENED:
        console.log('OPENED');
        break;
      case XMLHttpRequest.HEADERS_RECEIVED:
        console.log('HEADERS_RECEIVED');
        break;
      case XMLHttpRequest.UNSET:
        console.log('UNSET');
        break;
      default: break;
    }

  }

  function updatereportContainer() {
    var reportContainer = document.getElementById("reportsContainer");
    reportContainer.innerHTML = '';

    for (var i = 0; i < reports.length; i++) {
      var reportUI = new ReportUI(reports[i], owner);
    }

    cleanUI()
}


  function cleanUI(){
    nameTxt.value = '';
    lastNameTxt.value = '';
    emailTxt.value = '';
    phoneNum.value = '';
    cedulaNum.value = '';
    reportTxt.value = '';
  };
}