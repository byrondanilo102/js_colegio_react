import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';
import {Pagination} from '../../../ts/general/business/logic/Pagination';

import {Alumno} from "../../../ts/entity/estructura/Alumno";
import {AlumnoReturnView} from "../../../ts/dto/estructura/alumno/AlumnoReturnView";

/*------------------ BUSCAR GENERAL ----------------------*/
import '../../../scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '../../../scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '../../../scss/responsive/form/form_buscar_general_responsive.scss';

type PropsBuscarAlumnoComp = {
	module: string,
	controller: string,
	tipo_busqueda: string,
	updateDatosView: Function
};

function BuscarAlumnoCompBase(props: PropsBuscarAlumnoComp,ref:any): JSX.Element {
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		tipo_busqueda:String
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title,setTitle] = useState("Buscar Alumno");
	
	//------------------ ACCIONES -------------------
	let [accion_busqueda,setAccion_busqueda] = useState("todos");
	let [pagination1,setPagination1] = useState(new Pagination());
	
	//------------------ DATOS ----------------------
	let [alumnos,setalumnos] = useState(new Array<Alumno>());
	
	let pagination2 = new Pagination();
	
	const updated_alumnos = () => {
		props.updateDatosView(alumnos);
	};
	
	useEffect(updated_alumnos,[alumnos]);
	
	const getTodosDatos = async () => {			
		//mostrarLoader();
		getPaginationInicializar();
		setAccion_busqueda('todos');
		await procesarTodosDatos();
		//ocultarLoader();		
		//props.updateDatosView(alumnos);
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
		
		const data:AlumnoReturnView = await response_json.json();
		
		setalumnos(data.alumnos);
		
		//alumnos = data.alumnos;
	};
	
	const anteriores = async () => {
		
		if(pagination1.skip - pagination1.limit < 0) {
			pagination1.skip = 0;			
		} else {
			pagination1.skip = pagination1.skip - pagination1.limit;
		}
		
		updatePagination();	
		
		await procesarBuscar();			
		//props.updateDatosView(alumnos);
	};
	
	const siguientes = async () => {
		
		if(alumnos != null && alumnos.length > 0) {
			pagination1.skip = pagination1.skip + pagination1.limit;
		}
		
		updatePagination();
		
		await procesarBuscar();		
		//props.updateDatosView(alumnos);
	};
	
	const procesarBuscar = async () => {
		
		if(accion_busqueda === 'todos') {
			await procesarTodosDatos();
			
		} else if(accion_busqueda === 'buscar') {
			//await getBuscarGeneralDatos();
		}			
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
	
	<div id="div_alumno_form_buscar" className="div_buscar_general">
			
			<div className="tabs_general">
	
	
			</div>
	
	</div>
	
	);
}

let BuscarAlumnoComp = forwardRef(BuscarAlumnoCompBase);

export {BuscarAlumnoCompBase,BuscarAlumnoComp};