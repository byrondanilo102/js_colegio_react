import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Contrato} from "../../../ts/entity/financiero/Contrato";
import {ContratoReturnView} from "../../../ts/dto/financiero/contrato/ContratoReturnView";

import {ContratoFKReturnView} from "../../../ts/dto/financiero/contrato/ContratoFKReturnView";

import {ContratoParamCreate} from "../../../ts/type/financiero/contrato/ContratoParamCreate";
import {ContratoParamUpdate} from "../../../ts/type/financiero/contrato/ContratoParamUpdate";

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


type PropsFormularioContratoComp = {
	module: string,
	controller: string,
	contrato: Contrato,
	contratos: Array<Contrato>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function FormularioContratoCompBase(props: PropsFormularioContratoComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'FormulariocontratoComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		contratos:Array,
		contrato:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Contrato")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [contrato,setcontrato] = useState(new Contrato());
	
	
	/*FKs*/
		
	let [docentesFK, setdocentesFK] = useState(new Array<Docente>());
			
	const setid = (id:number) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.id=id;	setcontrato(contrato2);};
	const setcreated_at = (created_at:string) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.created_at=created_at;	setcontrato(contrato2);};
	const setupdated_at = (updated_at:string) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.updated_at=updated_at;	setcontrato(contrato2);};
	const setanio = (anio:number) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.anio=anio;	setcontrato(contrato2);};
	const setvalor = (valor:number) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.valor=valor;	setcontrato(contrato2);};
	const setfecha = (fecha:string) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.fecha=fecha;	setcontrato(contrato2);};
	const setfirmado = (firmado:boolean) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.firmado=firmado;	setcontrato(contrato2);};
	
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
		setanio(0);
		setvalor(0.0);
		setfecha(FuncionGeneral.GetLabelDate(new Date()));
		setfirmado(false);
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
	
	const handleAction_ClickTableRow = (data_json:Contrato) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		contrato.id = Number(data_json.id);
		contrato.created_at = data_json.created_at;
		contrato.updated_at = data_json.updated_at;
		contrato.anio = data_json.anio;
		contrato.valor = data_json.valor;
		contrato.fecha = data_json.fecha;
		contrato.firmado = data_json.firmado;
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
					
		const form_json: ContratoParamCreate = {
			created_at : contrato.created_at,
			updated_at : contrato.updated_at,
			anio : contrato.anio,
			valor : contrato.valor,
			fecha : contrato.fecha,
			firmado : contrato.firmado,
		};
		
		const data_json = {
			contrato : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:ContratoReturnView = await response_json.json();
		
		props.handleAction_NuevoDatosView(data);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ACTUALIZAR);
			
		var form_json: ContratoParamUpdate = {
			id : contrato.id,
			created_at : contrato.created_at,
			updated_at : contrato.updated_at,
			anio : contrato.anio,
			valor : contrato.valor,
			fecha : contrato.fecha,
			firmado : contrato.firmado,
		};
		
		const data_json = {
			contrato : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:ContratoReturnView = await response_json.json();
		
		props.handleAction_ActualizarDatosView(data);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : contrato.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:ContratoReturnView = await response_json.json();
		
		props.handleAction_EliminarDatosView(data);
	};
	
	/*FKs*/
	const getFks = async () => {
		
		const data_json = {};
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_GET_FKS);									
		
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		
		const data:ContratoFKReturnView = await response_json.json();
		
		
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
	
	
	<div id="divModal_contrato_form_general" 
			className="modal_form_general"
			style={{display : display}}>
				
		<div id="divModalContent_contrato_form_general" 
			className="modal_form_general_content">
			
			<div className="modal_form_general_header">
				
				<span id="spanCloseModal_contrato_form_general"
						className="close_modal_form_general" 
						onClick={cerrarModalFormGeneral}>
					&times;
				</span>
				<h2>
					Contrato
				</h2>
				
			</div>
			
			<div className="modal_form_general_body">
			
				<div id="div_contrato_form_general">
				
					<form id="contrato_form_general" 
						className="form_general">
	
						<input type="hidden" id="id" name="id" 
								value={contrato.id}
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
								value={contrato.created_at} placeholder="created_at" 
								onChange={(e) => setcreated_at(e.target.value)} />
								
						<label id="label_updated_at" htmlFor="updated_at"
								className="" style={{display:"none"}}>updated_at</label>				
						<input type="text" id="updated_at" name="updated_at" 
								style={{display:"none"}} className=""
								value={contrato.updated_at} placeholder="updated_at" 
								onChange={(e) => setupdated_at(e.target.value)} />
								
						
						<label htmlFor="anio" className="">Anio</label>
						<input type="text" id="anio" name="anio" 
								className="" placeholder="Anio"
								value={contrato.anio}
								onChange={(e) => setanio(Number(e.target.value))}/>
														
						
						<label htmlFor="valor" className="">Valor</label>
						<input type="text" id="valor" name="valor" 
								className="" placeholder="Valor"
								value={contrato.valor}
								onChange={(e) => setvalor(Number(e.target.value))}/>
														
						
						<label htmlFor="fecha" className="">Fecha</label>
						<input type="date" id="fecha" name="fecha" 
								className="" placeholder="Fecha"
								value={contrato.fecha}
								onChange={(e) => setfecha(e.target.value)}/>
														
						
						<label htmlFor="firmado" className="">Firmado</label>
						<input type="checkbox" id="firmado" name="firmado"
								className="" placeholder="Firmado"
								checked={contrato.firmado}
								onChange={(e) => setfirmado(Boolean(e.target.checked))}/>
							
										
					</form>
					
				</div>
				
				<div id="div_contrato_actions_form_general">
					
					<form id="contrato_actions_form_general" 
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

let FormularioContratoComp = forwardRef(FormularioContratoCompBase);

export {FormularioContratoComp,FormularioContratoCompBase};