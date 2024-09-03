type PensionParamUpdate = {
	
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/

	/*CAMPOS*/
	id_alumno: number;
	anio: number;
	mes: number;
	valor: number;
	cobrado: boolean;
}

export type {PensionParamUpdate};