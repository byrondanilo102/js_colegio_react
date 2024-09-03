/*FKs*/
import {Alumno} from '../../../entity/estructura/Alumno';
import {Materia} from '../../../entity/estructura/Materia';
		

class AlumnoMateriaFKReturnView {
	
	alumnosFK : Array<Alumno>;
	materiasFK : Array<Materia>;
	
	constructor() {
		
		this.alumnosFK = new Array<Alumno>();
		this.materiasFK = new Array<Materia>();
	}
}

export {AlumnoMateriaFKReturnView};
