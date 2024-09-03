/*FKs*/


/*RELACIONES*/
import {Matricula} from '../proceso/Matricula';
import {AlumnoMateria} from '../estructura/AlumnoMateria';
import {Materia} from '../estructura/Materia';
import {Pension} from '../financiero/Pension';
import {Nota} from '../proceso/Nota';


class Alumno {
	
	static ALUMNO = 'alumno';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	nombre: string;	
	apellido: string;	
	fecha_nacimiento: string;	
	
	/*---------------- FKs ----------------*/
	
	
	/*---------------- RELACIONES ----------------*/
	
	matricula: Matricula | undefined;
	alumno_materias: Array<AlumnoMateria> | undefined;
	materias: Array<Materia> | undefined;
	pensions: Array<Pension> | undefined;
	notas: Array<Nota> | undefined;
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.nombre='';
		this.apellido='';
		this.fecha_nacimiento='2001-01-01 01:01:01';
		
		/*-------------- FKs --------------*/
		
		
		/*-------------- RELACIONES --------------*/
		
		this.matricula = undefined;
		this.alumno_materias = undefined;
		this.materias = undefined;
		this.pensions = undefined;
		this.notas = undefined;
	}
}

export {Alumno};