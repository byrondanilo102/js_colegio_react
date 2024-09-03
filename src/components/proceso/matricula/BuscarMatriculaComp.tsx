import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';
import {Pagination} from '../../../ts/general/business/logic/Pagination';

import {Matricula} from "../../../ts/entity/proceso/Matricula";
import {MatriculaReturnView} from "../../../ts/dto/proceso/matricula/MatriculaReturnView";

/*------------------ BUSCAR GENERAL ----------------------*/
import '../../../scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '../../../scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '../../../scss/responsive/form/form_buscar_general_responsive.scss';

type PropsBuscarMatriculaComp = {
	module: string,
	controller: string,
	tipo_busqueda: string,
	updateDatosView: Function
};

function BuscarMatriculaCompBase(props: PropsBuscarMatriculaComp,ref:any): JSX.Element {
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		tipo_busqueda:String
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title,setTitle] = useState("Buscar Matricula");
	
	//------------------ ACCIONES -------------------
	let [accion_busqueda,setAccion_busqueda] = useState("todos");
	let [pagination1,setPagination1] = useState(new Pagination());
	
	//------------------ DATOS ----------------------
	let [matriculas,setmatriculas] = useState(new Array<Matricula>());
	
	let pagination2 = new Pagination();
	
	const updated_matriculas = () => {
		props.updateDatosView(matriculas);
	};
	
	useEffect(updated_matriculas,[matriculas]);
	
	const getTodosDatos = async () => {			
		//mostrarLoader();
		getPaginationInicializar();
		setAccion_busqueda('todos');
		await procesarTodosDatos();
		//ocultarLoader();		
		//props.updateDatosView(matriculas);
	};		
	
	const getPaginationInicializar = () => {
		
		pagination2 = new Pagination();
		
		pagination2.skip = 0;
		pagination2.limit = Constantes.LIMIT;
		
		setPagination1(pagination2);
	};
	
	const updatePagination = () => {
		
		pagination2 = new Pagination();

		pagination2.skip = pagination1.skip;
		pagination2.limit = pagination1.limit;

		setPagination1(pagination2);
	};
	
	const procesarTodosDatos = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_TODOS);
			
		const data_json = {
			pagination : pagination1
		};

		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		const data:MatriculaReturnView = await response_json.json();
		
		setmatriculas(data.matriculas);
		
		//matriculas = data.matriculas;
	};
	
	const anteriores = async () => {
		
		if(pagination1.skip - pagination1.limit < 0) {
			pagination1.skip = 0;			
		} else {
			pagination1.skip = pagination1.skip - pagination1.limit;
		}
		
		updatePagination();	
		
		await procesarBuscar();			
		//props.updateDatosView(matriculas);
	};
	
	const siguientes = async () => {
		
		if(matriculas != null && matriculas.length > 0) {
			pagination1.skip = pagination1.skip + pagination1.limit;
		}
		
		updatePagination();
		
		await procesarBuscar();		
		//props.updateDatosView(matriculas);
	};
	
	const procesarBuscar = async () => {
		
		if(accion_busqueda === 'todos') {
			await procesarTodosDatos();
			
		} else if(accion_busqueda === 'buscar') {
			//await getBuscarGeneralDatos();
		}			
	};
	
	const mostrarTabActual = (evt:any,tab1:string) => {
		FuncionGeneral.mostrarTabActual(evt,tab1);
	};
		
	

	const buscar_FK_Idalumnoid = () => {
		//mostrarLoader()

		getPaginationInicializar();

		setAccion_busqueda('FK_Idalumnoid');

		procesar_FK_Idalumnoid();
	};

	const procesar_FK_Idalumnoid = async () => {

		let url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + "_FK_Idalumnoid");

		const data_json = { 
			pagination : pagination1
		};

		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

		const response_json = await fetch(url_global_controller, request_options);
		const data:MatriculaReturnView = await response_json.json();

		setmatriculas(data.matriculas);
		matriculas = data.matriculas;
	};	
	
	const funUseImperativeHandle = () => ({
        getTodosDatos,
		procesarTodosDatos,
		anteriores,
		siguientes,
		procesarBuscar
    });
	
	useImperativeHandle(ref,funUseImperativeHandle);
	
	
	return (
	
	<div id="div_matricula_form_buscar" className="div_buscar_general">
			
			<div className="tabs_general">
	
				<button className="tab_button" 
						onClick={(e) => mostrarTabActual(e,'div_FK_Idalumnoid')}>FK_Idalumnoid</button>
	
			</div>
	
						
			<div id="div_FK_Idalumnoid" className="tab_item">
				<form id="matricula_FK_Idalumnoid_form_buscar" className="form_buscar_general">
					<label htmlFor="ConstantesSql.ID_FK_Idalumnoid"></label>
					<input 	type="text" id="ConstantesSql.ID_FK_Idalumnoid" name="ConstantesSql.ID_FK_Idalumnoid" 
							placeholder=""/>				
					
					<p></p>
					<button type="button" id="buscar_button_FK_Idalumnoid" name="buscar_button_FK_Idalumnoid" 
							value="Buscar" className="button_general" 
							onClick={buscar_FK_Idalumnoid}>
						<i className="fa fa-fw fa-search"></i>
						Buscar
					</button>
					
				</form>
			</div>
	</div>
	
	);
}

let BuscarMatriculaComp = forwardRef(BuscarMatriculaCompBase);

export {BuscarMatriculaCompBase,BuscarMatriculaComp};