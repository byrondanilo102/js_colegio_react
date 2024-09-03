import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Sueldo} from "../../../ts/entity/financiero/Sueldo";
import {SueldoReturnView} from "../../../ts/dto/financiero/sueldo/SueldoReturnView";

import {SueldoFKReturnView} from "../../../ts/dto/financiero/sueldo/SueldoFKReturnView";

import {SueldoParamCreate} from "../../../ts/type/financiero/sueldo/SueldoParamCreate";
import {SueldoParamUpdate} from "../../../ts/type/financiero/sueldo/SueldoParamUpdate";

/*FKs*/
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


type PropsFormularioSueldoComp = {
	module: string,
	controller: string,
	sueldo: Sueldo,
	sueldos: Array<Sueldo>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function FormularioSueldoCompBase(props: PropsFormularioSueldoComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'FormulariosueldoComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		sueldos:Array,
		sueldo:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Sueldo")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [sueldo,setsueldo] = useState(new Sueldo());
	
	
	/*FKs*/
		
	let [docentesFK, setdocentesFK] = useState(new Array<Docente>());
			
	const setid = (id:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.id=id;	setsueldo(sueldo2);};
	const setcreated_at = (created_at:string) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.created_at=created_at;	setsueldo(sueldo2);};
	const setupdated_at = (updated_at:string) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.updated_at=updated_at;	setsueldo(sueldo2);};
	const setid_docente = (id_docente:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.id_docente=id_docente;	setsueldo(sueldo2);};
	const setanio = (anio:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.anio=anio;	setsueldo(sueldo2);};
	const setmes = (mes:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.mes=mes;	setsueldo(sueldo2);};
	const setvalor = (valor:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.valor=valor;	setsueldo(sueldo2);};
	const setcobrado = (cobrado:boolean) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.cobrado=cobrado;	setsueldo(sueldo2);};
	
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
		setanio(0);
		setmes(0);
		setvalor(0.0);
		setcobrado(false);
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
	
	const handleAction_ClickTableRow = (data_json:Sueldo) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		sueldo.id = Number(data_json.id);
		sueldo.created_at = data_json.created_at;
		sueldo.updated_at = data_json.updated_at;
		sueldo.id_docente = data_json.id_docente;
		sueldo.anio = data_json.anio;
		sueldo.mes = data_json.mes;
		sueldo.valor = data_json.valor;
		sueldo.cobrado = data_json.cobrado;
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
					
		const form_json: SueldoParamCreate = {
			created_at : sueldo.created_at,
			updated_at : sueldo.updated_at,
			id_docente : sueldo.id_docente,
			anio : sueldo.anio,
			mes : sueldo.mes,
			valor : sueldo.valor,
			cobrado : sueldo.cobrado,
		};
		
		const data_json = {
			sueldo : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:SueldoReturnView = await response_json.json();
		
		props.handleAction_NuevoDatosView(data);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ACTUALIZAR);
			
		var form_json: SueldoParamUpdate = {
			id : sueldo.id,
			created_at : sueldo.created_at,
			updated_at : sueldo.updated_at,
			id_docente : sueldo.id_docente,
			anio : sueldo.anio,
			mes : sueldo.mes,
			valor : sueldo.valor,
			cobrado : sueldo.cobrado,
		};
		
		const data_json = {
			sueldo : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:SueldoReturnView = await response_json.json();
		
		props.handleAction_ActualizarDatosView(data);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : sueldo.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:SueldoReturnView = await response_json.json();
		
		props.handleAction_EliminarDatosView(data);
	};
	
	/*FKs*/
	const getFks = async () => {
		
		const data_json = {};
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_GET_FKS);									
		
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		
		const data:SueldoFKReturnView = await response_json.json();
		
		
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
	
	
	<div id="divModal_sueldo_form_general" 
			className="modal_form_general"
			style={{display : display}}>
				
		<div id="divModalContent_sueldo_form_general" 
			className="modal_form_general_content">
			
			<div className="modal_form_general_header">
				
				<span id="spanCloseModal_sueldo_form_general"
						className="close_modal_form_general" 
						onClick={cerrarModalFormGeneral}>
					&times;
				</span>
				<h2>
					Sueldo
				</h2>
				
			</div>
			
			<div className="modal_form_general_body">
			
				<div id="div_sueldo_form_general">
				
					<form id="sueldo_form_general" 
						className="form_general">
	
						<input type="hidden" id="id" name="id" 
								value={sueldo.id}
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
								value={sueldo.created_at} placeholder="created_at" 
								onChange={(e) => setcreated_at(e.target.value)} />
								
						<label id="label_updated_at" htmlFor="updated_at"
								className="" style={{display:"none"}}>updated_at</label>				
						<input type="text" id="updated_at" name="updated_at" 
								style={{display:"none"}} className=""
								value={sueldo.updated_at} placeholder="updated_at" 
								onChange={(e) => setupdated_at(e.target.value)} />
								
						
						<label htmlFor="id_docente" className=""> Docente</label>
						<select id="id_docente" name="id_docente"
								className="" placeholder=" Docente"
								value={sueldo.id_docente.toString()}
								onChange={(e) => setid_docente(Number(e.target.value))}>
							
							{docentesFK.map((docente:any) => { 
								return [
							<option key={docente.id} value={docente.id}>
								{ docente.nombre }
							</option>
								]
							})}
							
						</select>
					
						
						<label htmlFor="anio" className="">Anio</label>
						<input type="text" id="anio" name="anio" 
								className="" placeholder="Anio"
								value={sueldo.anio}
								onChange={(e) => setanio(Number(e.target.value))}/>
														
						
						<label htmlFor="mes" className="">Mes</label>
						<input type="text" id="mes" name="mes" 
								className="" placeholder="Mes"
								value={sueldo.mes}
								onChange={(e) => setmes(Number(e.target.value))}/>
														
						
						<label htmlFor="valor" className="">Valor</label>
						<input type="text" id="valor" name="valor" 
								className="" placeholder="Valor"
								value={sueldo.valor}
								onChange={(e) => setvalor(Number(e.target.value))}/>
														
						
						<label htmlFor="cobrado" className="">Cobrado</label>
						<input type="checkbox" id="cobrado" name="cobrado"
								className="" placeholder="Cobrado"
								checked={sueldo.cobrado}
								onChange={(e) => setcobrado(Boolean(e.target.checked))}/>
							
										
					</form>
					
				</div>
				
				<div id="div_sueldo_actions_form_general">
					
					<form id="sueldo_actions_form_general" 
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

let FormularioSueldoComp = forwardRef(FormularioSueldoCompBase);

export {FormularioSueldoComp,FormularioSueldoCompBase};