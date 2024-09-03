/*FKs*/
import {Docente} from '../estructura/Docente';
import {Materia} from '../estructura/Materia';


/*RELACIONES*/


class DocenteMateria {
	
	static DOCENTE_MATERIA = 'docente_materia';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	id_docente: number;
	id_docente_descripcion: string;	
	id_materia: number;
	id_materia_descripcion: string;	
	
	/*---------------- FKs ----------------*/
	
	docente :Docente | undefined;
	materia :Materia | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.id_docente=-1;
		this.id_docente_descripcion='';
		this.id_materia=-1;
		this.id_materia_descripcion='';
		
		/*-------------- FKs --------------*/
		
		this.docente = undefined;
		this.materia = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
}

export {DocenteMateria};