type AlumnoParamUpdate = {
	
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/

	/*CAMPOS*/
	nombre: string;
	apellido: string;
	fecha_nacimiento: string;
}

export type {AlumnoParamUpdate};