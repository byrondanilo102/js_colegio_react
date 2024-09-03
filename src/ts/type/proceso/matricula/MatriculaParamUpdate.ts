type MatriculaParamUpdate = {
	
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/

	/*CAMPOS*/
	anio: number;
	costo: number;
	fecha: string;
	pagado: boolean;
}

export type {MatriculaParamUpdate};