/*FKs*/
import {Docente} from '../../../entity/estructura/Docente';
		

class SueldoFKReturnView {
	
	docentesFK : Array<Docente>;
	
	constructor() {
		
		this.docentesFK = new Array<Docente>();
	}
}

export {SueldoFKReturnView};
