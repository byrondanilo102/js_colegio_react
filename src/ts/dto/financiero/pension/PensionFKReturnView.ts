/*FKs*/
import {Alumno} from '../../../entity/estructura/Alumno';
		

class PensionFKReturnView {
	
	alumnosFK : Array<Alumno>;
	
	constructor() {
		
		this.alumnosFK = new Array<Alumno>();
	}
}

export {PensionFKReturnView};
