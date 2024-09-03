/*FKs*/
import {Alumno} from '../estructura/Alumno';


/*RELACIONES*/


class Matricula {
	
	static MATRICULA = 'matricula';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	anio: number;	
	costo: number;	
	fecha: string;	
	pagado: boolean;	
	
	/*---------------- FKs ----------------*/
	
	alumno :Alumno | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.anio=0;
		this.costo=0.0;
		this.fecha='2001-01-01 01:01:01';
		this.pagado=false;
		
		/*-------------- FKs --------------*/
		
		this.alumno = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
}

export {Matricula};