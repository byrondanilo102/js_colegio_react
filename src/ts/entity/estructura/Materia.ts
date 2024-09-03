/*FKs*/


/*RELACIONES*/
import {Alumno} from '../estructura/Alumno';
import {AlumnoMateria} from '../estructura/AlumnoMateria';
import {Docente} from '../estructura/Docente';
import {Nota} from '../proceso/Nota';
import {DocenteMateria} from '../estructura/DocenteMateria';


class Materia {
	
	static MATERIA = 'materia';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	codigo: string;	
	nombre: string;	
	activo: boolean;	
	
	/*---------------- FKs ----------------*/
	
	
	/*---------------- RELACIONES ----------------*/
	
	alumnos: Array<Alumno> | undefined;
	alumno_materias: Array<AlumnoMateria> | undefined;
	docentes: Array<Docente> | undefined;
	notas: Array<Nota> | undefined;
	docente_materias: Array<DocenteMateria> | undefined;
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.codigo='';
		this.nombre='';
		this.activo=false;
		
		/*-------------- FKs --------------*/
		
		
		/*-------------- RELACIONES --------------*/
		
		this.alumnos = undefined;
		this.alumno_materias = undefined;
		this.docentes = undefined;
		this.notas = undefined;
		this.docente_materias = undefined;
	}
}

export {Materia};