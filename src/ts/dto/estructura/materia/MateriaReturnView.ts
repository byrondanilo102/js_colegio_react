import {Materia} from "../../../entity/estructura/Materia";

class MateriaReturnView {	
	title : string; 
	materias : Array<Materia>;
	materia1 : Materia;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.materias = new Array<Materia>();
		this.materia1 = new Materia();
		this.action = '';
		this.action_title = '';
	}
}

export {MateriaReturnView};