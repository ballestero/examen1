class Report {
    constructor(fbkey, name, lastName, email, telephone, cedula, report, stateResuelto, timestamp){
        this.fbkey = fbkey;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.telephone = telephone;
        this.cedula = cedula;
        this.report = report;
        this.stateResuelto = stateResuelto;

        if (timestamp === null) {
            this.timestamp = new Date();
        } else {
            this.timestamp = new Date(timestamp);
        }
    }
}