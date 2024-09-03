/*FKs*/
import {Alumno} from '../../../entity/estructura/Alumno';
import {Materia} from '../../../entity/estructura/Materia';
import {Docente} from '../../../entity/estructura/Docente';
		

class NotaFKReturnView {
	
	alumnosFK : Array<Alumno>;
	materiasFK : Array<Materia>;
	docentesFK : Array<Docente>;
	
	constructor() {
		
		this.alumnosFK = new Array<Alumno>();
		this.materiasFK = new Array<Materia>();
		this.docentesFK = new Array<Docente>();
	}
}

export {NotaFKReturnView};
