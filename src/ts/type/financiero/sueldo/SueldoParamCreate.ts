type SueldoParamCreate = {
	
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	/*CAMPOS*/
	id_docente: number;
	anio: number;
	mes: number;
	valor: number;
	cobrado: boolean;
}

export type {SueldoParamCreate};