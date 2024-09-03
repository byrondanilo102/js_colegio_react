/*FKs*/
import {Docente} from '../estructura/Docente';


/*RELACIONES*/


class Contrato {
	
	static CONTRATO = 'contrato';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	anio: number;	
	valor: number;	
	fecha: string;	
	firmado: boolean;	
	
	/*---------------- FKs ----------------*/
	
	docente :Docente | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.anio=0;
		this.valor=0.0;
		this.fecha='2001-01-01 01:01:01';
		this.firmado=false;
		
		/*-------------- FKs --------------*/
		
		this.docente = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
}

export {Contrato};