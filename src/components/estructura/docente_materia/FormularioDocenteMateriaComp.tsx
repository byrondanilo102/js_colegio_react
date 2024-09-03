import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {DocenteMateria} from "../../../ts/entity/estructura/DocenteMateria";
import {DocenteMateriaReturnView} from "../../../ts/dto/estructura/docente_materia/DocenteMateriaReturnView";

import {DocenteMateriaFKReturnView} from "../../../ts/dto/estructura/docente_materia/DocenteMateriaFKReturnView";

import {DocenteMateriaParamCreate} from "../../../ts/type/estructura/docente_materia/DocenteMateriaParamCreate";
import {DocenteMateriaParamUpdate} from "../../../ts/type/estructura/docente_materia/DocenteMateriaParamUpdate";

/*FKs*/
import {Docente} from '../../../ts/entity/estructura/Docente';
import {Materia} from '../../../ts/entity/estructura/Materia';



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


type PropsFormularioDocenteMateriaComp = {
	module: string,
	controller: string,
	docente_materia: DocenteMateria,
	docente_materias: Array<DocenteMateria>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function FormularioDocenteMateriaCompBase(props: PropsFormularioDocenteMateriaComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'Formulariodocente_materiaComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		docente_materias:Array,
		docente_materia:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Docente Materia")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [docente_materia,setdocente_materia] = useState(new DocenteMateria());
	
	
	/*FKs*/
		
	let [docentesFK, setdocentesFK] = useState(new Array<Docente>());
	let [materiasFK, setmateriasFK] = useState(new Array<Materia>());
			
	const setid = (id:number) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.id=id;	setdocente_materia(docente_materia2);};
	const setcreated_at = (created_at:string) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.created_at=created_at;	setdocente_materia(docente_materia2);};
	const setupdated_at = (updated_at:string) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.updated_at=updated_at;	setdocente_materia(docente_materia2);};
	const setid_docente = (id_docente:number) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.id_docente=id_docente;	setdocente_materia(docente_materia2);};
	const setid_materia = (id_materia:number) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.id_materia=id_materia;	setdocente_materia(docente_materia2);};
	
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
		setid_docente(-1);
		setid_materia(-1);
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
	
	const handleAction_ClickTableRow = (data_json:DocenteMateria) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		docente_materia.id = Number(data_json.id);
		docente_materia.created_at = data_json.created_at;
		docente_materia.updated_at = data_json.updated_at;
		docente_materia.id_docente = data_json.id_docente;
		docente_materia.id_materia = data_json.id_materia;
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
					
		const form_json: DocenteMateriaParamCreate = {
			created_at : docente_materia.created_at,
			updated_at : docente_materia.updated_at,
			id_docente : docente_materia.id_docente,
			id_materia : docente_materia.id_materia,
		};
		
		const data_json = {
			docente_materia : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:DocenteMateriaReturnView = await response_json.json();
		
		props.handleAction_NuevoDatosView(data);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ACTUALIZAR);
			
		var form_json: DocenteMateriaParamUpdate = {
			id : docente_materia.id,
			created_at : docente_materia.created_at,
			updated_at : docente_materia.updated_at,
			id_docente : docente_materia.id_docente,
			id_materia : docente_materia.id_materia,
		};
		
		const data_json = {
			docente_materia : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:DocenteMateriaReturnView = await response_json.json();
		
		props.handleAction_ActualizarDatosView(data);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : docente_materia.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:DocenteMateriaReturnView = await response_json.json();
		
		props.handleAction_EliminarDatosView(data);
	};
	
	/*FKs*/
	const getFks = async () => {
		
		const data_json = {};
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_GET_FKS);									
		
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		
		const data:DocenteMateriaFKReturnView = await response_json.json();
		
		
			setdocentesFK(data.docentesFK);
			setmateriasFK(data.materiasFK);			
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
	
	const funLoadFormulario = () => {
		/*FKs*/
		getFks();
	};
	
	useEffect(funLoadFormulario, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	return (
	
	
	<div id="divModal_docente_materia_form_general" 
			className="modal_form_general"
			style={{display : display}}>
				
		<div id="divModalContent_docente_materia_form_general" 
			className="modal_form_general_content">
			
			<div className="modal_form_general_header">
				
				<span id="spanCloseModal_docente_materia_form_general"
						className="close_modal_form_general" 
						onClick={cerrarModalFormGeneral}>
					&times;
				</span>
				<h2>
					Docente Materia
				</h2>
				
			</div>
			
			<div className="modal_form_general_body">
			
				<div id="div_docente_materia_form_general">
				
					<form id="docente_materia_form_general" 
						className="form_general">
	
						<input type="hidden" id="id" name="id" 
								value={docente_materia.id}
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
								value={docente_materia.created_at} placeholder="created_at" 
								onChange={(e) => setcreated_at(e.target.value)} />
								
						<label id="label_updated_at" htmlFor="updated_at"
								className="" style={{display:"none"}}>updated_at</label>				
						<input type="text" id="updated_at" name="updated_at" 
								style={{display:"none"}} className=""
								value={docente_materia.updated_at} placeholder="updated_at" 
								onChange={(e) => setupdated_at(e.target.value)} />
								
						
						<label htmlFor="id_docente" className=""> Docente</label>
						<select id="id_docente" name="id_docente"
								className="" placeholder=" Docente"
								value={docente_materia.id_docente.toString()}
								onChange={(e) => setid_docente(Number(e.target.value))}>
							
							{docentesFK.map((docente:any) => { 
								return [
							<option key={docente.id} value={docente.id}>
								{ docente.nombre }
							</option>
								]
							})}
							
						</select>
					
						
						<label htmlFor="id_materia" className=""> Materia</label>
						<select id="id_materia" name="id_materia"
								className="" placeholder=" Materia"
								value={docente_materia.id_materia.toString()}
								onChange={(e) => setid_materia(Number(e.target.value))}>
							
							{materiasFK.map((materia:any) => { 
								return [
							<option key={materia.id} value={materia.id}>
								{ materia.codigo }
							</option>
								]
							})}
							
						</select>
					
										
					</form>
					
				</div>
				
				<div id="div_docente_materia_actions_form_general">
					
					<form id="docente_materia_actions_form_general" 
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

let FormularioDocenteMateriaComp = forwardRef(FormularioDocenteMateriaCompBase);

export {FormularioDocenteMateriaComp,FormularioDocenteMateriaCompBase};