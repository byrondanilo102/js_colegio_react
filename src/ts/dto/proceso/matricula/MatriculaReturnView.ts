import {Matricula} from "../../../entity/proceso/Matricula";

class MatriculaReturnView {	
	title : string; 
	matriculas : Array<Matricula>;
	matricula1 : Matricula;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.matriculas = new Array<Matricula>();
		this.matricula1 = new Matricula();
		this.action = '';
		this.action_title = '';
	}
}

export {MatriculaReturnView};