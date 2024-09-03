/*FKs*/
import {Alumno} from '../estructura/Alumno';
import {Materia} from '../estructura/Materia';
import {Docente} from '../estructura/Docente';


/*RELACIONES*/


class Nota {
	
	static NOTA = 'nota';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	id_alumno: number;
	id_alumno_descripcion: string;	
	id_materia: number;
	id_materia_descripcion: string;	
	id_docente: number;
	id_docente_descripcion: string;	
	nota_prueba: number;	
	nota_trabajo: number;	
	nota_examen: number;	
	nota_final: number;	
	
	/*---------------- FKs ----------------*/
	
	alumno :Alumno | undefined;
	materia :Materia | undefined;
	docente :Docente | undefined;
	
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
		this.id_docente=-1;
		this.id_docente_descripcion='';
		this.nota_prueba=0.0;
		this.nota_trabajo=0.0;
		this.nota_examen=0.0;
		this.nota_final=0.0;
		
		/*-------------- FKs --------------*/
		
		this.alumno = undefined;
		this.materia = undefined;
		this.docente = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
}

export {Nota};