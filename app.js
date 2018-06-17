window.addEventListener('load', init, false);

function init() {

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
  var solveBtn = document.getElementById('resolverBtn');
  var pendingYetBtn = document.getElementById('pendienteBtn');
  var deleteBtn = document.getElementById('deleteBtn');
  var cancelBtn = document.getElementById('cancelBtn');
  var reportsContainer = document.getElementById('reportsContainer');
  var updateBtn = document.getElementById('actualizarBtn');

  var owner = 'Jeison B.';
  var reports = [];
  var currentReportSelected = null;
  var newState = null;

  saveBtn.hidden = false;
  deleteBtn.hidden = true;
  cancelBtn.hidden = false;
  solveBtn.hidden = true;
  pendingYetBtn.hidden = true;
  updateBtn.hidden = true;


  saveBtn.onclick = saveBtnOnClick;
  solveBtn.onclick = solveBtnOnclick;
  pendingYetBtn.onclick = pendingYetBtnOnclick;
  deleteBtn.onclick = deleteBtnOnClick;
  cancelBtn.onclick = cleanUI;
  updateBtn.onclick = updateBtnOnclick;



  reportsContainer.addEventListener('click', selectReport, false);

  function solveBtnOnclick(){
    newState = "Resuelto";
    changeStateOnClick(newState)
  }

  function pendingYetBtnOnclick(){
    newState = 'Pendiente';
    changeStateOnClick(newState)
  }

  function updateBtnOnclick(){
    changeStateOnClick(currentReportSelected.estado);
  }


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

  function deleteBtnOnClick() {
    if (confirm('¿Estas seguro de eliminar el reporte?')) {
      var url = 'https://gallopintocalladmin.firebaseio.com/reportes/' + currentReportSelected.fbkey + '.json';
      var request = new XMLHttpRequest();
      request.open('DELETE', url, true);
      request.onreadystatechange = deleteReportCallback;
      request.send();
    }

  }

  function changeStateOnClick(pEstado, event) {
    var request = new XMLHttpRequest();
    request.open('PATCH', urlBase, true);
    request.onreadystatechange = updateReportCallback;
    request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

    var report = currentReportSelected;

    report.nombre = nameTxt.value;
    report.apellido = lastNameTxt.value;
    report.email = emailTxt.value;
    report.telefono = phoneNum.value;
    report.cedula = cedulaNum.value;
    report.reporte = reportTxt.value;
    report.timestamp = new Date();
    report.estado = pEstado;

    var fbkey = report.fbkey;
    report.fbkey = null;
    var reportJson = '{' + JSON.stringify(fbkey) + ':' + JSON.stringify(report) + '}';

    request.send(reportJson);
  }

  // Callbacks

  function updateReportCallback(event) {
    var request = event.target;
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        requestALLReports();
      } else {
        console.log('Error on request: ', request.status);
      }
    }
  }

  function deleteReportCallback(event) {
    var request = event.target;
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        requestALLReports();
      } else {
        console.log('Error on request: ', request.status);
      }
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
    request.open('GET', urlBase, true);
    request.onreadystatechange = requestALLReportsCallback;
    request.send();
  }

  function requestALLReportsCallback(event) {

    var request = event.target;

    switch (request.readyState) {
      case XMLHttpRequest.DONE:
        switch (request.status) {
          case 200:
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

  function selectReport(event) {
    currentReportSelected = getReportByFbKey(event.target);
    console.log(currentReportSelected.nombre);
    if (currentReportSelected.fbkey !== undefined) {

      nameTxt.value = currentReportSelected.nombre;
      lastNameTxt.value = currentReportSelected.apellido;
      emailTxt.value = currentReportSelected.email;
      phoneNum.value = currentReportSelected.telefono;
      cedulaNum.value = currentReportSelected.cedula;
      reportTxt.value = currentReportSelected.reporte;

      saveBtn.hidden = true;
      updateBtn.hidden = false;

      deleteBtn.hidden = false;

      if (currentReportSelected.estado === 'Pendiente') {
        resolverBtn.hidden = false;
        pendingYetBtn.hidden = true;

      } else {
        resolverBtn.hidden = true;
        if (currentReportSelected.owner === owner){
          pendingYetBtn.hidden = false;
        }else{
          pendingYetBtn.hidden = true;
        }
      }

    }

  }

  function getReportByFbKey(target) {
    var reportSelected = null;

    for (var i = 0; i < reports.length; i++) {
      if (reports[i].fbkey === target.parentElement.id) {
        reportSelected = reports[i];
      }
    }

    if (reportSelected === null && target.parentElement !== null) {
      return (target.parentElement);
    } else {
      if (reportSelected !== null) {
        return reportSelected;
      } else {
        return null;
      }
    }
  }

  function cleanUI() {
    nameTxt.value = '';
    lastNameTxt.value = '';
    emailTxt.value = '';
    phoneNum.value = '';
    cedulaNum.value = '';
    reportTxt.value = '';
    
    saveBtn.hidden = false;
    updateBtn.hidden = true;
    resolverBtn.hidden = true;
    pendingYetBtn.hidden = true;
    deleteBtn.hidden = true;
    currentReportSelected = null;
  };
}