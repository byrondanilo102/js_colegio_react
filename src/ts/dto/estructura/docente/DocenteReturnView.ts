import {Docente} from "../../../entity/estructura/Docente";

class DocenteReturnView {	
	title : string; 
	docentes : Array<Docente>;
	docente1 : Docente;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.docentes = new Array<Docente>();
		this.docente1 = new Docente();
		this.action = '';
		this.action_title = '';
	}
}

export {DocenteReturnView};