import {Contrato} from "../../../entity/financiero/Contrato";

class ContratoReturnView {	
	title : string; 
	contratos : Array<Contrato>;
	contrato1 : Contrato;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.contratos = new Array<Contrato>();
		this.contrato1 = new Contrato();
		this.action = '';
		this.action_title = '';
	}
}

export {ContratoReturnView};