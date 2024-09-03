import React,{useState,forwardRef,useImperativeHandle} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Docente} from "../../../ts/entity/estructura/Docente";
import {DocenteReturnView} from "../../../ts/dto/estructura/docente/DocenteReturnView";


import {DocenteParamCreate} from "../../../ts/type/estructura/docente/DocenteParamCreate";
import {DocenteParamUpdate} from "../../../ts/type/estructura/docente/DocenteParamUpdate";

/*FKs*/



/*------------------ BUTTON GENERAL ----------------------*/
import '../../../scss/components/button/button_general.scss';
/*------------------ FORM GENERAL ----------------------*/
import '../../../scss/components/form/form_general.scss';
/*------------------ FORM ACTIONS GENERAL ----------------------*/
import '../../../scss/components/form/actions_form_general.scss';
/*------------------ FORM MODAL GENERAL ----------------------*/
import '../../../scss/components/form/modal_form_general.scss';


/*------------------ RESPONSIVE FORM GENERAL ----------------------*/
import '../../../scss/responsive/form/form_general_responsive.scss';
/*------------------ RESPONSIVE ACTIONS GENERAL ----------------------*/
import '../../../scss/responsive/form/actions_form_general_responsive.scss';


type PropsFormularioDocenteComp = {
	module: string,
	controller: string,
	docente: Docente,
	docentes: Array<Docente>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function FormularioDocenteCompBase(props: PropsFormularioDocenteComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'FormulariodocenteComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		docentes:Array,
		docente:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Docente")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [docente,setdocente] = useState(new Docente());
	
	
			
	const setid = (id:number) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.id=id;	setdocente(docente2);};
	const setcreated_at = (created_at:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.created_at=created_at;	setdocente(docente2);};
	const setupdated_at = (updated_at:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.updated_at=updated_at;	setdocente(docente2);};
	const setnombre = (nombre:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.nombre=nombre;	setdocente(docente2);};
	const setapellido = (apellido:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.apellido=apellido;	setdocente(docente2);};
	const setfecha_nacimiento = (fecha_nacimiento:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.fecha_nacimiento=fecha_nacimiento;	setdocente(docente2);};
	const setanios_experiencia = (anios_experiencia:number) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.anios_experiencia=anios_experiencia;	setdocente(docente2);};
	const setnota_evaluacion = (nota_evaluacion:number) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.nota_evaluacion=nota_evaluacion;	setdocente(docente2);};
	
	const home = () => {		
		navigate('../main', {replace: true});
	};		
	
	const nuevoPreparar = () => {	
		
		setTipo_accion(Constantes.NUEVO);	
		abrirModalFormGeneral();		
		props.ocultarMensajeAlertaView();
		//this.ocultarMensajeAlerta();
		
		/*setId(-1);*/
		setText_id_aux('-1');
		
		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setnombre('');
		setapellido('');
		setfecha_nacimiento(FuncionGeneral.GetLabelDate(new Date()));
		setanios_experiencia(0);
		setnota_evaluacion(0.0);
	};
	
	const cancelar = () => {			
		setTipo_accion(Constantes.CANCELAR);
		cerrarModalFormGeneral();
	};
	
	const abrirModalFormGeneral = () => {
		setDisplay('block');
	};
	
	const cerrarModalFormGeneral = () => {
		setDisplay('none');
	};
	
	const showConfirm = (mensaje:string) => {
		return window.confirm(mensaje);
	};
	
	const handleAction_ClickTableRow = (data_json:Docente) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		docente.id = Number(data_json.id);
		docente.created_at = data_json.created_at;
		docente.updated_at = data_json.updated_at;
		docente.nombre = data_json.nombre;
		docente.apellido = data_json.apellido;
		docente.fecha_nacimiento = data_json.fecha_nacimiento;
		docente.anios_experiencia = data_json.anios_experiencia;
		docente.nota_evaluacion = data_json.nota_evaluacion;
	};
	
	const actualizar = () => {	
		
		if(tipo_accion === Constantes.NUEVO) {
			nuevoDatos();			
			
		} else if(tipo_accion === Constantes.SELECCIONAR) {
			actualizarDatos();
			
		} else if(tipo_accion === Constantes.ELIMINAR) {
			eliminarDatos();
		}
	};
	
	const eliminar = () => {
		
		setTipo_accion(Constantes.ELIMINAR);
		tipo_accion = Constantes.ELIMINAR;
		
		if (showConfirm(Constantes.MENSAJE_ELIMINAR_SINO)) {
			actualizar();
		}
	};
	
	const nuevoDatos = async () => {
		
		//this.mostrarLoader();		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.NUEVO);
					
		const form_json: DocenteParamCreate = {
			created_at : docente.created_at,
			updated_at : docente.updated_at,
			nombre : docente.nombre,
			apellido : docente.apellido,
			fecha_nacimiento : docente.fecha_nacimiento,
			anios_experiencia : docente.anios_experiencia,
			nota_evaluacion : docente.nota_evaluacion,
		};
		
		const data_json = {
			docente : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:DocenteReturnView = await response_json.json();
		
		props.handleAction_NuevoDatosView(data);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ACTUALIZAR);
			
		var form_json: DocenteParamUpdate = {
			id : docente.id,
			created_at : docente.created_at,
			updated_at : docente.updated_at,
			nombre : docente.nombre,
			apellido : docente.apellido,
			fecha_nacimiento : docente.fecha_nacimiento,
			anios_experiencia : docente.anios_experiencia,
			nota_evaluacion : docente.nota_evaluacion,
		};
		
		const data_json = {
			docente : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:DocenteReturnView = await response_json.json();
		
		props.handleAction_ActualizarDatosView(data);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : docente.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:DocenteReturnView = await response_json.json();
		
		props.handleAction_EliminarDatosView(data);
	};
	
		
	const funUseImperativeHandle = () => ({
        home,
		nuevoPreparar,
		cancelar,
		abrirModalFormGeneral,
		cerrarModalFormGeneral,
		showConfirm,
		handleAction_ClickTableRow,
		actualizar,
		eliminar,
		nuevoDatos,
		actualizarDatos,
		eliminarDatos
    });
	
	useImperativeHandle(ref,funUseImperativeHandle);
	
	//<!-- The Modal -->
	//<!-- Modal content -->
	
	
	return (
	
	
	<div id="divModal_docente_form_general" 
			className="modal_form_general"
			style={{display : display}}>
				
		<div id="divModalContent_docente_form_general" 
			className="modal_form_general_content">
			
			<div className="modal_form_general_header">
				
				<span id="spanCloseModal_docente_form_general"
						className="close_modal_form_general" 
						onClick={cerrarModalFormGeneral}>
					&times;
				</span>
				<h2>
					Docente
				</h2>
				
			</div>
			
			<div className="modal_form_general_body">
			
				<div id="div_docente_form_general">
				
					<form id="docente_form_general" 
						className="form_general">
	
						<input type="hidden" id="id" name="id" 
								value={docente.id}
								onChange={(e) => setid(Number(e.target.value))}/>
						
						<label id="label_id" htmlFor="text_id_aux"								
								className="" style={style_id_column}>Id</label>				
						<input type="text" id="text_id_aux" name="text_id_aux" placeholder="Id"
								style={style_id_column} className=""
								value={text_id_aux} readOnly/>
						
						<label id="label_created_at" htmlFor="created_at"
								className="" style={{display:"none"}}>created_at</label>				
						<input type="text" id="created_at" name="created_at" 
								style={{display:"none"}} className=""
								value={docente.created_at} placeholder="created_at" 
								onChange={(e) => setcreated_at(e.target.value)} />
								
						<label id="label_updated_at" htmlFor="updated_at"
								className="" style={{display:"none"}}>updated_at</label>				
						<input type="text" id="updated_at" name="updated_at" 
								style={{display:"none"}} className=""
								value={docente.updated_at} placeholder="updated_at" 
								onChange={(e) => setupdated_at(e.target.value)} />
								
						
						<label htmlFor="nombre" className="">Nombre</label>
						<input type="text" id="nombre" name="nombre" 
								className="" placeholder="Nombre"
								value={docente.nombre}
								onChange={(e) => setnombre(e.target.value)}/>
														
						
						<label htmlFor="apellido" className="">Apellido</label>
						<input type="text" id="apellido" name="apellido" 
								className="" placeholder="Apellido"
								value={docente.apellido}
								onChange={(e) => setapellido(e.target.value)}/>
														
						
						<label htmlFor="fecha_nacimiento" className="">Fecha Nacimiento</label>
						<input type="date" id="fecha_nacimiento" name="fecha_nacimiento" 
								className="" placeholder="Fecha Nacimiento"
								value={docente.fecha_nacimiento}
								onChange={(e) => setfecha_nacimiento(e.target.value)}/>
														
						
						<label htmlFor="anios_experiencia" className="">Anios Experiencia</label>
						<input type="text" id="anios_experiencia" name="anios_experiencia" 
								className="" placeholder="Anios Experiencia"
								value={docente.anios_experiencia}
								onChange={(e) => setanios_experiencia(Number(e.target.value))}/>
														
						
						<label htmlFor="nota_evaluacion" className="">Nota Evaluacion</label>
						<input type="text" id="nota_evaluacion" name="nota_evaluacion" 
								className="" placeholder="Nota Evaluacion"
								value={docente.nota_evaluacion}
								onChange={(e) => setnota_evaluacion(Number(e.target.value))}/>
														
										
					</form>
					
				</div>
				
				<div id="div_docente_actions_form_general">
					
					<form id="docente_actions_form_general" 
						className="actions_form_general">				
						
						<button type="button" id="actualizar_button" name="actualizar_button" 
								className="button_general" value="Actualizar" 
								onClick={actualizar}>
							<i className="fa fa-fw fa-save"></i>
							Actualizar
						</button>
						
						<button type="button" id="eliminar_button" name="eliminar_button" 
								className="button_general" value="Eliminar" 
								onClick={eliminar}>
							<i className="fa fa-fw fa-times-circle"></i>
							Eliminar
						</button>
						
						<button type="button" id="cancelar_button" name="cancelar_button" 
								className="button_general" value="Cancelar"
								onClick={cancelar}>
							<i className="fa fa-fw fa-minus-circle"></i>
							Cancelar
						</button>
						
					</form>
					
				</div>
				
			</div>
			
		</div>
		
	</div>
	
	);
}

let FormularioDocenteComp = forwardRef(FormularioDocenteCompBase);

export {FormularioDocenteComp,FormularioDocenteCompBase};