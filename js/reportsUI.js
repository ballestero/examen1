class ReportUI {
    constructor(report,owner){
        this.report = report;
        this.owner = owner;

        console.log(this.report.timestamp);

        this.reportsContainer = document.getElementById('reportsContainer');
        this.containerRow = document.createElement ('div');
        this.divCol1 = document.createElement ('div');
        this.name = document.createElement ('h5');
        this.email = document.createElement ('p');
        this.telefono = document.createElement ('p');
        this.cedula = document.createElement ('p');
        this.reporte = document.createElement ('p');
        this.reportadoPor = document.createElement ('p');
        this.estado = document.createElement ('p');

        this.reportsContainer.appendChild(this.containerRow);
        this.containerRow.appendChild(this.divCol1);
        this.divCol1.appendChild(this.name);
        this.divCol1.appendChild(this.email);
        this.divCol1.appendChild(this.telefono);
        this.divCol1.appendChild(this.cedula);
        this.divCol1.appendChild(this.reporte);
        this.divCol1.appendChild(this.reportadoPor);
        this.divCol1.appendChild(this.estado);

        this.containerRow.classList.add('report','row');
        this.divCol1.className = 'col';

        if (report.estado === 'Pendiente') {
            
            this.containerRow.classList.add('pendiente');
        }else{
        }

        if(this.report !== null) {
            this.name.innerText = this.report.nombre +' '+this.report.apellido;
            this.email.innerText = `Email: ${this.report.email}`;
            this.telefono.innerHTML = `Teléfono ${this.report.telefono}`;
            this.cedula.innerHTML = `Cedula ${this.report.cedula}`;
            this.reporte.innerHTML = this.report.reporte;
           this.reportadoPor.innerText = `Hecho por: ${this.report.owner}: ${ this.report.timestamp.getDate() }/${this.report.timestamp.getMonth()}/ ${this.report.timestamp.getFullYear()}`;
           this.estado.innerHTML = `Estado: ${this.report.estado}`;
        }

        if (this.owner === this.report.owner) {
            
            console.log(`editable`);
            
            
        }

    }
}

 