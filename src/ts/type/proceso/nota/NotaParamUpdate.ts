type NotaParamUpdate = {
	
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/

	/*CAMPOS*/
	id_alumno: number;
	id_materia: number;
	id_docente: number;
	nota_prueba: number;
	nota_trabajo: number;
	nota_examen: number;
	nota_final: number;
}

export type {NotaParamUpdate};