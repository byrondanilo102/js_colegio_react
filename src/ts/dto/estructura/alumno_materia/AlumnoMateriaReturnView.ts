import {AlumnoMateria} from "../../../entity/estructura/AlumnoMateria";

class AlumnoMateriaReturnView {	
	title : string; 
	alumno_materias : Array<AlumnoMateria>;
	alumno_materia1 : AlumnoMateria;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.alumno_materias = new Array<AlumnoMateria>();
		this.alumno_materia1 = new AlumnoMateria();
		this.action = '';
		this.action_title = '';
	}
}

export {AlumnoMateriaReturnView};