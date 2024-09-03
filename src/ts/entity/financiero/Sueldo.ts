/*FKs*/
import {Docente} from '../estructura/Docente';


/*RELACIONES*/


class Sueldo {
	
	static SUELDO = 'sueldo';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	id_docente: number;
	id_docente_descripcion: string;	
	anio: number;	
	mes: number;	
	valor: number;	
	cobrado: boolean;	
	
	/*---------------- FKs ----------------*/
	
	docente :Docente | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.id_docente=-1;
		this.id_docente_descripcion='';
		this.anio=0;
		this.mes=0;
		this.valor=0.0;
		this.cobrado=false;
		
		/*-------------- FKs --------------*/
		
		this.docente = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
}

export {Sueldo};