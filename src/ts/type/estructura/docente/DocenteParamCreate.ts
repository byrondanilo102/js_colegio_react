type DocenteParamCreate = {
	
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	/*CAMPOS*/
	nombre: string;
	apellido: string;
	fecha_nacimiento: string;
	anios_experiencia: number;
	nota_evaluacion: number;
}

export type {DocenteParamCreate};