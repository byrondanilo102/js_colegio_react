import {DocenteMateria} from "../../../entity/estructura/DocenteMateria";

class DocenteMateriaReturnView {	
	title : string; 
	docente_materias : Array<DocenteMateria>;
	docente_materia1 : DocenteMateria;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.docente_materias = new Array<DocenteMateria>();
		this.docente_materia1 = new DocenteMateria();
		this.action = '';
		this.action_title = '';
	}
}

export {DocenteMateriaReturnView};