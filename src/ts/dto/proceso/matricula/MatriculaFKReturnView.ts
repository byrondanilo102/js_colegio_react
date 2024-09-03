/*FKs*/
import {Alumno} from '../../../entity/estructura/Alumno';
		

class MatriculaFKReturnView {
	
	alumnosFK : Array<Alumno>;
	
	constructor() {
		
		this.alumnosFK = new Array<Alumno>();
	}
}

export {MatriculaFKReturnView};
