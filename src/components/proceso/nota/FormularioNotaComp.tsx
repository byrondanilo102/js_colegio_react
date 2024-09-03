import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Nota} from "../../../ts/entity/proceso/Nota";
import {NotaReturnView} from "../../../ts/dto/proceso/nota/NotaReturnView";

import {NotaFKReturnView} from "../../../ts/dto/proceso/nota/NotaFKReturnView";

import {NotaParamCreate} from "../../../ts/type/proceso/nota/NotaParamCreate";
import {NotaParamUpdate} from "../../../ts/type/proceso/nota/NotaParamUpdate";

/*FKs*/
import {Alumno} from '../../../ts/entity/estructura/Alumno';
import {Materia} from '../../../ts/entity/estructura/Materia';
import {Docente} from '../../../ts/entity/estructura/Docente';



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


type PropsFormularioNotaComp = {
	module: string,
	controller: string,
	nota: Nota,
	notas: Array<Nota>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function FormularioNotaCompBase(props: PropsFormularioNotaComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'FormularionotaComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		notas:Array,
		nota:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Nota")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [nota,setnota] = useState(new Nota());
	
	
	/*FKs*/
		
	let [alumnosFK, setalumnosFK] = useState(new Array<Alumno>());
	let [materiasFK, setmateriasFK] = useState(new Array<Materia>());
	let [docentesFK, setdocentesFK] = useState(new Array<Docente>());
			
	const setid = (id:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.id=id;	setnota(nota2);};
	const setcreated_at = (created_at:string) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.created_at=created_at;	setnota(nota2);};
	const setupdated_at = (updated_at:string) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.updated_at=updated_at;	setnota(nota2);};
	const setid_alumno = (id_alumno:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.id_alumno=id_alumno;	setnota(nota2);};
	const setid_materia = (id_materia:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.id_materia=id_materia;	setnota(nota2);};
	const setid_docente = (id_docente:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.id_docente=id_docente;	setnota(nota2);};
	const setnota_prueba = (nota_prueba:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.nota_prueba=nota_prueba;	setnota(nota2);};
	const setnota_trabajo = (nota_trabajo:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.nota_trabajo=nota_trabajo;	setnota(nota2);};
	const setnota_examen = (nota_examen:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.nota_examen=nota_examen;	setnota(nota2);};
	const setnota_final = (nota_final:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.nota_final=nota_final;	setnota(nota2);};
	
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
		setid_docente(-1);
		setnota_prueba(0.0);
		setnota_trabajo(0.0);
		setnota_examen(0.0);
		setnota_final(0.0);
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
	
	const handleAction_ClickTableRow = (data_json:Nota) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		nota.id = Number(data_json.id);
		nota.created_at = data_json.created_at;
		nota.updated_at = data_json.updated_at;
		nota.id_alumno = data_json.id_alumno;
		nota.id_materia = data_json.id_materia;
		nota.id_docente = data_json.id_docente;
		nota.nota_prueba = data_json.nota_prueba;
		nota.nota_trabajo = data_json.nota_trabajo;
		nota.nota_examen = data_json.nota_examen;
		nota.nota_final = data_json.nota_final;
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
					
		const form_json: NotaParamCreate = {
			created_at : nota.created_at,
			updated_at : nota.updated_at,
			id_alumno : nota.id_alumno,
			id_materia : nota.id_materia,
			id_docente : nota.id_docente,
			nota_prueba : nota.nota_prueba,
			nota_trabajo : nota.nota_trabajo,
			nota_examen : nota.nota_examen,
			nota_final : nota.nota_final,
		};
		
		const data_json = {
			nota : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:NotaReturnView = await response_json.json();
		
		props.handleAction_NuevoDatosView(data);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ACTUALIZAR);
			
		var form_json: NotaParamUpdate = {
			id : nota.id,
			created_at : nota.created_at,
			updated_at : nota.updated_at,
			id_alumno : nota.id_alumno,
			id_materia : nota.id_materia,
			id_docente : nota.id_docente,
			nota_prueba : nota.nota_prueba,
			nota_trabajo : nota.nota_trabajo,
			nota_examen : nota.nota_examen,
			nota_final : nota.nota_final,
		};
		
		const data_json = {
			nota : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:NotaReturnView = await response_json.json();
		
		props.handleAction_ActualizarDatosView(data);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : nota.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:NotaReturnView = await response_json.json();
		
		props.handleAction_EliminarDatosView(data);
	};
	
	/*FKs*/
	const getFks = async () => {
		
		const data_json = {};
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_GET_FKS);									
		
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		
		const data:NotaFKReturnView = await response_json.json();
		
		
			setalumnosFK(data.alumnosFK);
			setmateriasFK(data.materiasFK);
			setdocentesFK(data.docentesFK);			
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
	
	
	<div id="divModal_nota_form_general" 
			className="modal_form_general"
			style={{display : display}}>
				
		<div id="divModalContent_nota_form_general" 
			className="modal_form_general_content">
			
			<div className="modal_form_general_header">
				
				<span id="spanCloseModal_nota_form_general"
						className="close_modal_form_general" 
						onClick={cerrarModalFormGeneral}>
					&times;
				</span>
				<h2>
					Nota
				</h2>
				
			</div>
			
			<div className="modal_form_general_body">
			
				<div id="div_nota_form_general">
				
					<form id="nota_form_general" 
						className="form_general">
	
						<input type="hidden" id="id" name="id" 
								value={nota.id}
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
								value={nota.created_at} placeholder="created_at" 
								onChange={(e) => setcreated_at(e.target.value)} />
								
						<label id="label_updated_at" htmlFor="updated_at"
								className="" style={{display:"none"}}>updated_at</label>				
						<input type="text" id="updated_at" name="updated_at" 
								style={{display:"none"}} className=""
								value={nota.updated_at} placeholder="updated_at" 
								onChange={(e) => setupdated_at(e.target.value)} />
								
						
						<label htmlFor="id_alumno" className=""> Alumno</label>
						<select id="id_alumno" name="id_alumno"
								className="" placeholder=" Alumno"
								value={nota.id_alumno.toString()}
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
								value={nota.id_materia.toString()}
								onChange={(e) => setid_materia(Number(e.target.value))}>
							
							{materiasFK.map((materia:any) => { 
								return [
							<option key={materia.id} value={materia.id}>
								{ materia.codigo }
							</option>
								]
							})}
							
						</select>
					
						
						<label htmlFor="id_docente" className=""> Docente</label>
						<select id="id_docente" name="id_docente"
								className="" placeholder=" Docente"
								value={nota.id_docente.toString()}
								onChange={(e) => setid_docente(Number(e.target.value))}>
							
							{docentesFK.map((docente:any) => { 
								return [
							<option key={docente.id} value={docente.id}>
								{ docente.nombre }
							</option>
								]
							})}
							
						</select>
					
						
						<label htmlFor="nota_prueba" className="">Nota Prueba</label>
						<input type="text" id="nota_prueba" name="nota_prueba" 
								className="" placeholder="Nota Prueba"
								value={nota.nota_prueba}
								onChange={(e) => setnota_prueba(Number(e.target.value))}/>
														
						
						<label htmlFor="nota_trabajo" className="">Nota Trabajo</label>
						<input type="text" id="nota_trabajo" name="nota_trabajo" 
								className="" placeholder="Nota Trabajo"
								value={nota.nota_trabajo}
								onChange={(e) => setnota_trabajo(Number(e.target.value))}/>
														
						
						<label htmlFor="nota_examen" className="">Nota Examen</label>
						<input type="text" id="nota_examen" name="nota_examen" 
								className="" placeholder="Nota Examen"
								value={nota.nota_examen}
								onChange={(e) => setnota_examen(Number(e.target.value))}/>
														
						
						<label htmlFor="nota_final" className="">Nota Final</label>
						<input type="text" id="nota_final" name="nota_final" 
								className="" placeholder="Nota Final"
								value={nota.nota_final}
								onChange={(e) => setnota_final(Number(e.target.value))}/>
														
										
					</form>
					
				</div>
				
				<div id="div_nota_actions_form_general">
					
					<form id="nota_actions_form_general" 
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

let FormularioNotaComp = forwardRef(FormularioNotaCompBase);

export {FormularioNotaComp,FormularioNotaCompBase};