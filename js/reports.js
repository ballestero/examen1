class Report {
    constructor(fbkey, nombre, apellido, email, telefono, cedula, reporte, estado, owner, fecha){
        //null, nameTxt.value, lastNameTxt.value, emailTxt.value, phoneNum.value, cedulaNum.value, reportTxt.value, stateResuelto, owner
        this.fbkey = fbkey;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.cedula = cedula;
        this.reporte = reporte;
        this.estado = estado;
        this.owner = owner;

        if (fecha === null) {
            this.timestamp = new Date();
        } else {
            this.timestamp = new Date(fecha);
        }

        
    }
}