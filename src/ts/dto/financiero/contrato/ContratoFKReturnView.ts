/*FKs*/
import {Docente} from '../../../entity/estructura/Docente';
		

class ContratoFKReturnView {
	
	docentesFK : Array<Docente>;
	
	constructor() {
		
		this.docentesFK = new Array<Docente>();
	}
}

export {ContratoFKReturnView};
