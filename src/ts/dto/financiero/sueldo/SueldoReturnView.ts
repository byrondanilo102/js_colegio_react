import {Sueldo} from "../../../entity/financiero/Sueldo";

class SueldoReturnView {	
	title : string; 
	sueldos : Array<Sueldo>;
	sueldo1 : Sueldo;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.sueldos = new Array<Sueldo>();
		this.sueldo1 = new Sueldo();
		this.action = '';
		this.action_title = '';
	}
}

export {SueldoReturnView};