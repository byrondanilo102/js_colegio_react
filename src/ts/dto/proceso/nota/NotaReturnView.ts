import {Nota} from "../../../entity/proceso/Nota";

class NotaReturnView {	
	title : string; 
	notas : Array<Nota>;
	nota1 : Nota;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.notas = new Array<Nota>();
		this.nota1 = new Nota();
		this.action = '';
		this.action_title = '';
	}
}

export {NotaReturnView};