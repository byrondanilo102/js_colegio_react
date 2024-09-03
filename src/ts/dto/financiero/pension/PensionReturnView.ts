import {Pension} from "../../../entity/financiero/Pension";

class PensionReturnView {	
	title : string; 
	pensions : Array<Pension>;
	pension1 : Pension;
	action : string;
	action_title : string;
	
	constructor() {
		this.title = '';
		this.pensions = new Array<Pension>();
		this.pension1 = new Pension();
		this.action = '';
		this.action_title = '';
	}
}

export {PensionReturnView};