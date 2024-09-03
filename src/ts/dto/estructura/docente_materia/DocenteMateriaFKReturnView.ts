/*FKs*/
import {Docente} from '../../../entity/estructura/Docente';
import {Materia} from '../../../entity/estructura/Materia';
		

class DocenteMateriaFKReturnView {
	
	docentesFK : Array<Docente>;
	materiasFK : Array<Materia>;
	
	constructor() {
		
		this.docentesFK = new Array<Docente>();
		this.materiasFK = new Array<Materia>();
	}
}

export {DocenteMateriaFKReturnView};
