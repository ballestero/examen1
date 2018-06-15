class PeportUI {
    constructor(report,owner){
        this.report = report;
        this.owner = owner;

        console.log(this.report.timestamp.getDate());

        this.reportsContainer = document.getElementById('reportsContainer');
        this.containerRow = document.createElement ('div');
        this.divCol1 = document.createElement ('div');
        this.titleTxt = document.createElement ('h5');
        this.bodyTxt = document.createElement ('p');
        this.timesT = document.createElement ('p');
        this.divCol2 = document.createElement ('div');

        this.reportsContainer.appendChild(this.containerRow);
        this.containerRow.appendChild(this.divCol1);
        this.containerRow.appendChild(this.divCol2);
        this.divCol1.appendChild(this.titleTxt);
        this.divCol1.appendChild(this.bodyTxt);
        this.divCol1.appendChild(this.timesT);

        this.containerRow.classList.add('report','row');
        this.divCol1.className = 'col';
        this.divCol2.classList.add('col-2','btnreport');
        this.divCol2.id = this.report.fbkey;

        if(this.report !== null) {
            this.titleTxt.innerText = this.report.title;
            this.bodyTxt.innerText = this.report.body;
           this.timesT.innerText = this.report.owner + '-' + this.report.timestamp.getDate() + '/' + this.report.timestamp.getMonth() + '/' + this.report.timestamp.getFullYear();
        }

        if (this.owner === this.report.owner) {
            
        this.deleteBtn = document.createElement ('div');
        this.editBtn = document.createElement('div');
        
        this.divCol2.appendChild(this.deleteBtn);
        this.divCol2.appendChild(this.editBtn);

        
        this.editBtn.classList.add('btnAction', 'editBtn');
        this.editBtn.id = 'update';
        this.deleteBtn.classList.add('btnAction', 'deleteBtn');
        this.deleteBtn.id = 'delete';
            
        }

    }
}

 