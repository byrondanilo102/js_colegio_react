import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Pension} from "../../../ts/entity/financiero/Pension";
import {PensionReturnView} from "../../../ts/dto/financiero/pension/PensionReturnView";

import {PensionFKReturnView} from "../../../ts/dto/financiero/pension/PensionFKReturnView";

import {PensionParamCreate} from "../../../ts/type/financiero/pension/PensionParamCreate";
import {PensionParamUpdate} from "../../../ts/type/financiero/pension/PensionParamUpdate";

/*FKs*/
import {Alumno} from '../../../ts/entity/estructura/Alumno';



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


type PropsFormularioPensionComp = {
	module: string,
	controller: string,
	pension: Pension,
	pensions: Array<Pension>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function FormularioPensionCompBase(props: PropsFormularioPensionComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'FormulariopensionComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		pensions:Array,
		pension:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Pension")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [pension,setpension] = useState(new Pension());
	
	
	/*FKs*/
		
	let [alumnosFK, setalumnosFK] = useState(new Array<Alumno>());
			
	const setid = (id:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.id=id;	setpension(pension2);};
	const setcreated_at = (created_at:string) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.created_at=created_at;	setpension(pension2);};
	const setupdated_at = (updated_at:string) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.updated_at=updated_at;	setpension(pension2);};
	const setid_alumno = (id_alumno:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.id_alumno=id_alumno;	setpension(pension2);};
	const setanio = (anio:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.anio=anio;	setpension(pension2);};
	const setmes = (mes:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.mes=mes;	setpension(pension2);};
	const setvalor = (valor:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.valor=valor;	setpension(pension2);};
	const setcobrado = (cobrado:boolean) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.cobrado=cobrado;	setpension(pension2);};
	
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
	
	const handleAction_ClickTableRow = (data_json:Pension) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		pension.id = Number(data_json.id);
		pension.created_at = data_json.created_at;
		pension.updated_at = data_json.updated_at;
		pension.id_alumno = data_json.id_alumno;
		pension.anio = data_json.anio;
		pension.mes = data_json.mes;
		pension.valor = data_json.valor;
		pension.cobrado = data_json.cobrado;
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
					
		const form_json: PensionParamCreate = {
			created_at : pension.created_at,
			updated_at : pension.updated_at,
			id_alumno : pension.id_alumno,
			anio : pension.anio,
			mes : pension.mes,
			valor : pension.valor,
			cobrado : pension.cobrado,
		};
		
		const data_json = {
			pension : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:PensionReturnView = await response_json.json();
		
		props.handleAction_NuevoDatosView(data);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ACTUALIZAR);
			
		var form_json: PensionParamUpdate = {
			id : pension.id,
			created_at : pension.created_at,
			updated_at : pension.updated_at,
			id_alumno : pension.id_alumno,
			anio : pension.anio,
			mes : pension.mes,
			valor : pension.valor,
			cobrado : pension.cobrado,
		};
		
		const data_json = {
			pension : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:PensionReturnView = await response_json.json();
		
		props.handleAction_ActualizarDatosView(data);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : pension.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:PensionReturnView = await response_json.json();
		
		props.handleAction_EliminarDatosView(data);
	};
	
	/*FKs*/
	const getFks = async () => {
		
		const data_json = {};
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_GET_FKS);									
		
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		
		const data:PensionFKReturnView = await response_json.json();
		
		
			setalumnosFK(data.alumnosFK);			
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
	
	
	<div id="divModal_pension_form_general" 
			className="modal_form_general"
			style={{display : display}}>
				
		<div id="divModalContent_pension_form_general" 
			className="modal_form_general_content">
			
			<div className="modal_form_general_header">
				
				<span id="spanCloseModal_pension_form_general"
						className="close_modal_form_general" 
						onClick={cerrarModalFormGeneral}>
					&times;
				</span>
				<h2>
					Pension
				</h2>
				
			</div>
			
			<div className="modal_form_general_body">
			
				<div id="div_pension_form_general">
				
					<form id="pension_form_general" 
						className="form_general">
	
						<input type="hidden" id="id" name="id" 
								value={pension.id}
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
								value={pension.created_at} placeholder="created_at" 
								onChange={(e) => setcreated_at(e.target.value)} />
								
						<label id="label_updated_at" htmlFor="updated_at"
								className="" style={{display:"none"}}>updated_at</label>				
						<input type="text" id="updated_at" name="updated_at" 
								style={{display:"none"}} className=""
								value={pension.updated_at} placeholder="updated_at" 
								onChange={(e) => setupdated_at(e.target.value)} />
								
						
						<label htmlFor="id_alumno" className=""> Alumno</label>
						<select id="id_alumno" name="id_alumno"
								className="" placeholder=" Alumno"
								value={pension.id_alumno.toString()}
								onChange={(e) => setid_alumno(Number(e.target.value))}>
							
							{alumnosFK.map((alumno:any) => { 
								return [
							<option key={alumno.id} value={alumno.id}>
								{ alumno.nombre }
							</option>
								]
							})}
							
						</select>
					
						
						<label htmlFor="anio" className="">Anio</label>
						<input type="text" id="anio" name="anio" 
								className="" placeholder="Anio"
								value={pension.anio}
								onChange={(e) => setanio(Number(e.target.value))}/>
														
						
						<label htmlFor="mes" className="">Mes</label>
						<input type="text" id="mes" name="mes" 
								className="" placeholder="Mes"
								value={pension.mes}
								onChange={(e) => setmes(Number(e.target.value))}/>
														
						
						<label htmlFor="valor" className="">Valor</label>
						<input type="text" id="valor" name="valor" 
								className="" placeholder="Valor"
								value={pension.valor}
								onChange={(e) => setvalor(Number(e.target.value))}/>
														
						
						<label htmlFor="cobrado" className="">Cobrado</label>
						<input type="checkbox" id="cobrado" name="cobrado"
								className="" placeholder="Cobrado"
								checked={pension.cobrado}
								onChange={(e) => setcobrado(Boolean(e.target.checked))}/>
							
										
					</form>
					
				</div>
				
				<div id="div_pension_actions_form_general">
					
					<form id="pension_actions_form_general" 
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

let FormularioPensionComp = forwardRef(FormularioPensionCompBase);

export {FormularioPensionComp,FormularioPensionCompBase};