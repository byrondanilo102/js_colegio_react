/*FKs*/
import {Alumno} from '../estructura/Alumno';
import {Materia} from '../estructura/Materia';


/*RELACIONES*/


class AlumnoMateria {
	
	static ALUMNO_MATERIA = 'alumno_materia';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	id_alumno: number;
	id_alumno_descripcion: string;	
	id_materia: number;
	id_materia_descripcion: string;	
	
	/*---------------- FKs ----------------*/
	
	alumno :Alumno | undefined;
	materia :Materia | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.id_alumno=-1;
		this.id_alumno_descripcion='';
		this.id_materia=-1;
		this.id_materia_descripcion='';
		
		/*-------------- FKs --------------*/
		
		this.alumno = undefined;
		this.materia = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
}

export {AlumnoMateria};