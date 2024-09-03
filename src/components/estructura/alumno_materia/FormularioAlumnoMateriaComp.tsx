import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {AlumnoMateria} from "../../../ts/entity/estructura/AlumnoMateria";
import {AlumnoMateriaReturnView} from "../../../ts/dto/estructura/alumno_materia/AlumnoMateriaReturnView";

import {AlumnoMateriaFKReturnView} from "../../../ts/dto/estructura/alumno_materia/AlumnoMateriaFKReturnView";

import {AlumnoMateriaParamCreate} from "../../../ts/type/estructura/alumno_materia/AlumnoMateriaParamCreate";
import {AlumnoMateriaParamUpdate} from "../../../ts/type/estructura/alumno_materia/AlumnoMateriaParamUpdate";

/*FKs*/
import {Alumno} from '../../../ts/entity/estructura/Alumno';
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


type PropsFormularioAlumnoMateriaComp = {
	module: string,
	controller: string,
	alumno_materia: AlumnoMateria,
	alumno_materias: Array<AlumnoMateria>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function FormularioAlumnoMateriaCompBase(props: PropsFormularioAlumnoMateriaComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'Formularioalumno_materiaComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		alumno_materias:Array,
		alumno_materia:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Alumno Materia")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [alumno_materia,setalumno_materia] = useState(new AlumnoMateria());
	
	
	/*FKs*/
		
	let [alumnosFK, setalumnosFK] = useState(new Array<Alumno>());
	let [materiasFK, setmateriasFK] = useState(new Array<Materia>());
			
	const setid = (id:number) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.id=id;	setalumno_materia(alumno_materia2);};
	const setcreated_at = (created_at:string) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.created_at=created_at;	setalumno_materia(alumno_materia2);};
	const setupdated_at = (updated_at:string) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.updated_at=updated_at;	setalumno_materia(alumno_materia2);};
	const setid_alumno = (id_alumno:number) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.id_alumno=id_alumno;	setalumno_materia(alumno_materia2);};
	const setid_materia = (id_materia:number) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.id_materia=id_materia;	setalumno_materia(alumno_materia2);};
	
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
		setid_alumno(-1);
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
	
	const handleAction_ClickTableRow = (data_json:AlumnoMateria) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		alumno_materia.id = Number(data_json.id);
		alumno_materia.created_at = data_json.created_at;
		alumno_materia.updated_at = data_json.updated_at;
		alumno_materia.id_alumno = data_json.id_alumno;
		alumno_materia.id_materia = data_json.id_materia;
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
					
		const form_json: AlumnoMateriaParamCreate = {
			created_at : alumno_materia.created_at,
			updated_at : alumno_materia.updated_at,
			id_alumno : alumno_materia.id_alumno,
			id_materia : alumno_materia.id_materia,
		};
		
		const data_json = {
			alumno_materia : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:AlumnoMateriaReturnView = await response_json.json();
		
		props.handleAction_NuevoDatosView(data);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ACTUALIZAR);
			
		var form_json: AlumnoMateriaParamUpdate = {
			id : alumno_materia.id,
			created_at : alumno_materia.created_at,
			updated_at : alumno_materia.updated_at,
			id_alumno : alumno_materia.id_alumno,
			id_materia : alumno_materia.id_materia,
		};
		
		const data_json = {
			alumno_materia : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:AlumnoMateriaReturnView = await response_json.json();
		
		props.handleAction_ActualizarDatosView(data);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : alumno_materia.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:AlumnoMateriaReturnView = await response_json.json();
		
		props.handleAction_EliminarDatosView(data);
	};
	
	/*FKs*/
	const getFks = async () => {
		
		const data_json = {};
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_GET_FKS);									
		
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		
		const data:AlumnoMateriaFKReturnView = await response_json.json();
		
		
			setalumnosFK(data.alumnosFK);
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
	
	
	<div id="divModal_alumno_materia_form_general" 
			className="modal_form_general"
			style={{display : display}}>
				
		<div id="divModalContent_alumno_materia_form_general" 
			className="modal_form_general_content">
			
			<div className="modal_form_general_header">
				
				<span id="spanCloseModal_alumno_materia_form_general"
						className="close_modal_form_general" 
						onClick={cerrarModalFormGeneral}>
					&times;
				</span>
				<h2>
					Alumno Materia
				</h2>
				
			</div>
			
			<div className="modal_form_general_body">
			
				<div id="div_alumno_materia_form_general">
				
					<form id="alumno_materia_form_general" 
						className="form_general">
	
						<input type="hidden" id="id" name="id" 
								value={alumno_materia.id}
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
								value={alumno_materia.created_at} placeholder="created_at" 
								onChange={(e) => setcreated_at(e.target.value)} />
								
						<label id="label_updated_at" htmlFor="updated_at"
								className="" style={{display:"none"}}>updated_at</label>				
						<input type="text" id="updated_at" name="updated_at" 
								style={{display:"none"}} className=""
								value={alumno_materia.updated_at} placeholder="updated_at" 
								onChange={(e) => setupdated_at(e.target.value)} />
								
						
						<label htmlFor="id_alumno" className=""> Alumno</label>
						<select id="id_alumno" name="id_alumno"
								className="" placeholder=" Alumno"
								value={alumno_materia.id_alumno.toString()}
								onChange={(e) => setid_alumno(Number(e.target.value))}>
							
							{alumnosFK.map((alumno:any) => { 
								return [
							<option key={alumno.id} value={alumno.id}>
								{ alumno.nombre }
							</option>
								]
							})}
							
						</select>
					
						
						<label htmlFor="id_materia" className=""> Materia</label>
						<select id="id_materia" name="id_materia"
								className="" placeholder=" Materia"
								value={alumno_materia.id_materia.toString()}
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
				
				<div id="div_alumno_materia_actions_form_general">
					
					<form id="alumno_materia_actions_form_general" 
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

let FormularioAlumnoMateriaComp = forwardRef(FormularioAlumnoMateriaCompBase);

export {FormularioAlumnoMateriaComp,FormularioAlumnoMateriaCompBase};