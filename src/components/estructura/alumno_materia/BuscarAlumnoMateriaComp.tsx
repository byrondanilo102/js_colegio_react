import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';
import {Pagination} from '../../../ts/general/business/logic/Pagination';

import {AlumnoMateria} from "../../../ts/entity/estructura/AlumnoMateria";
import {AlumnoMateriaReturnView} from "../../../ts/dto/estructura/alumno_materia/AlumnoMateriaReturnView";

/*------------------ BUSCAR GENERAL ----------------------*/
import '../../../scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '../../../scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '../../../scss/responsive/form/form_buscar_general_responsive.scss';

type PropsBuscarAlumnoMateriaComp = {
	module: string,
	controller: string,
	tipo_busqueda: string,
	updateDatosView: Function
};

function BuscarAlumnoMateriaCompBase(props: PropsBuscarAlumnoMateriaComp,ref:any): JSX.Element {
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		tipo_busqueda:String
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title,setTitle] = useState("Buscar Alumno Materia");
	
	//------------------ ACCIONES -------------------
	let [accion_busqueda,setAccion_busqueda] = useState("todos");
	let [pagination1,setPagination1] = useState(new Pagination());
	
	//------------------ DATOS ----------------------
	let [alumno_materias,setalumno_materias] = useState(new Array<AlumnoMateria>());
	
	let pagination2 = new Pagination();
	
	const updated_alumno_materias = () => {
		props.updateDatosView(alumno_materias);
	};
	
	useEffect(updated_alumno_materias,[alumno_materias]);
	
	const getTodosDatos = async () => {			
		//mostrarLoader();
		getPaginationInicializar();
		setAccion_busqueda('todos');
		await procesarTodosDatos();
		//ocultarLoader();		
		//props.updateDatosView(alumno_materias);
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
		
		const data:AlumnoMateriaReturnView = await response_json.json();
		
		setalumno_materias(data.alumno_materias);
		
		//alumno_materias = data.alumno_materias;
	};
	
	const anteriores = async () => {
		
		if(pagination1.skip - pagination1.limit < 0) {
			pagination1.skip = 0;			
		} else {
			pagination1.skip = pagination1.skip - pagination1.limit;
		}
		
		updatePagination();	
		
		await procesarBuscar();			
		//props.updateDatosView(alumno_materias);
	};
	
	const siguientes = async () => {
		
		if(alumno_materias != null && alumno_materias.length > 0) {
			pagination1.skip = pagination1.skip + pagination1.limit;
		}
		
		updatePagination();
		
		await procesarBuscar();		
		//props.updateDatosView(alumno_materias);
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
		
	

	const buscar_FK_Idalumno = () => {
		//mostrarLoader()

		getPaginationInicializar();

		setAccion_busqueda('FK_Idalumno');

		procesar_FK_Idalumno();
	};

	const procesar_FK_Idalumno = async () => {

		let url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + "_FK_Idalumno");

		const data_json = { 
			pagination : pagination1
		};

		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

		const response_json = await fetch(url_global_controller, request_options);
		const data:AlumnoMateriaReturnView = await response_json.json();

		setalumno_materias(data.alumno_materias);
		alumno_materias = data.alumno_materias;
	};

	const buscar_FK_Idmateria = () => {
		//mostrarLoader()

		getPaginationInicializar();

		setAccion_busqueda('FK_Idmateria');

		procesar_FK_Idmateria();
	};

	const procesar_FK_Idmateria = async () => {

		let url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + "_FK_Idmateria");

		const data_json = { 
			pagination : pagination1
		};

		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

		const response_json = await fetch(url_global_controller, request_options);
		const data:AlumnoMateriaReturnView = await response_json.json();

		setalumno_materias(data.alumno_materias);
		alumno_materias = data.alumno_materias;
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
	
	<div id="div_alumno_materia_form_buscar" className="div_buscar_general">
			
			<div className="tabs_general">
	
				<button className="tab_button" 
						onClick={(e) => mostrarTabActual(e,'div_FK_Idalumno')}>FK_Idalumno</button>
				<button className="tab_button" 
						onClick={(e) => mostrarTabActual(e,'div_FK_Idmateria')}>FK_Idmateria</button>
	
			</div>
	
						
			<div id="div_FK_Idalumno" className="tab_item">
				<form id="alumno_materia_FK_Idalumno_form_buscar" className="form_buscar_general">
					<label htmlFor="id_alumno_FK_Idalumno"> Alumno</label>
					<input 	type="text" id="id_alumno_FK_Idalumno" name="id_alumno_FK_Idalumno" 
							placeholder=" Alumno"/>				
					
					<p></p>
					<button type="button" id="buscar_button_FK_Idalumno" name="buscar_button_FK_Idalumno" 
							value="Buscar" className="button_general" 
							onClick={buscar_FK_Idalumno}>
						<i className="fa fa-fw fa-search"></i>
						Buscar
					</button>
					
				</form>
			</div>
						
			<div id="div_FK_Idmateria" className="tab_item">
				<form id="alumno_materia_FK_Idmateria_form_buscar" className="form_buscar_general">
					<label htmlFor="id_materia_FK_Idmateria"> Materia</label>
					<input 	type="text" id="id_materia_FK_Idmateria" name="id_materia_FK_Idmateria" 
							placeholder=" Materia"/>				
					
					<p></p>
					<button type="button" id="buscar_button_FK_Idmateria" name="buscar_button_FK_Idmateria" 
							value="Buscar" className="button_general" 
							onClick={buscar_FK_Idmateria}>
						<i className="fa fa-fw fa-search"></i>
						Buscar
					</button>
					
				</form>
			</div>
	</div>
	
	);
}

let BuscarAlumnoMateriaComp = forwardRef(BuscarAlumnoMateriaCompBase);

export {BuscarAlumnoMateriaCompBase,BuscarAlumnoMateriaComp};