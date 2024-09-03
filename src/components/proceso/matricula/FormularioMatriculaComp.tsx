import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Matricula} from "../../../ts/entity/proceso/Matricula";
import {MatriculaReturnView} from "../../../ts/dto/proceso/matricula/MatriculaReturnView";

import {MatriculaFKReturnView} from "../../../ts/dto/proceso/matricula/MatriculaFKReturnView";

import {MatriculaParamCreate} from "../../../ts/type/proceso/matricula/MatriculaParamCreate";
import {MatriculaParamUpdate} from "../../../ts/type/proceso/matricula/MatriculaParamUpdate";

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


type PropsFormularioMatriculaComp = {
	module: string,
	controller: string,
	matricula: Matricula,
	matriculas: Array<Matricula>,
	ocultarMensajeAlertaView: Function,
	handleAction_NuevoDatosView: Function,
	handleAction_ActualizarDatosView: Function,
	handleAction_EliminarDatosView: Function
};

function FormularioMatriculaCompBase(props: PropsFormularioMatriculaComp,ref:any): JSX.Element {	
	
	let navigate = useNavigate();
	
	//name: 'FormulariomatriculaComp',	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		//------------------ DATOS ----------------------
		matriculas:Array,
		matricula:Object
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Formulario Matricula")
	
	//------------------ ACCIONES -------------------
	let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR);
	
	//------------------ ESTILOS -------------------
	let [display,setDisplay] = useState('none');
	let [style_id_column] = useState({}); //,setStyle_id_column
	
	//------------------ DATOS ----------------------
	/*let [id,setId] = useState(-1);*/
	let [text_id_aux,setText_id_aux] = useState('-1');
	let [matricula,setmatricula] = useState(new Matricula());
	
	
	/*FKs*/
		
	let [alumnosFK, setalumnosFK] = useState(new Array<Alumno>());
			
	const setid = (id:number) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.id=id;	setmatricula(matricula2);};
	const setcreated_at = (created_at:string) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.created_at=created_at;	setmatricula(matricula2);};
	const setupdated_at = (updated_at:string) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.updated_at=updated_at;	setmatricula(matricula2);};
	const setanio = (anio:number) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.anio=anio;	setmatricula(matricula2);};
	const setcosto = (costo:number) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.costo=costo;	setmatricula(matricula2);};
	const setfecha = (fecha:string) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.fecha=fecha;	setmatricula(matricula2);};
	const setpagado = (pagado:boolean) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.pagado=pagado;	setmatricula(matricula2);};
	
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
		setcosto(0.0);
		setfecha(FuncionGeneral.GetLabelDate(new Date()));
		setpagado(false);
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
	
	const handleAction_ClickTableRow = (data_json:Matricula) => {
		//this.ocultarMensajeAlerta();		
		setTipo_accion(Constantes.SELECCIONAR);		
		abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			setText_id_aux(data_json.id.toString());
		}
		
		/*setId(data_json.id);*/		
		matricula.id = Number(data_json.id);
		matricula.created_at = data_json.created_at;
		matricula.updated_at = data_json.updated_at;
		matricula.anio = data_json.anio;
		matricula.costo = data_json.costo;
		matricula.fecha = data_json.fecha;
		matricula.pagado = data_json.pagado;
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
					
		const form_json: MatriculaParamCreate = {
			created_at : matricula.created_at,
			updated_at : matricula.updated_at,
			anio : matricula.anio,
			costo : matricula.costo,
			fecha : matricula.fecha,
			pagado : matricula.pagado,
		};
		
		const data_json = {
			matricula : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:MatriculaReturnView = await response_json.json();
		
		props.handleAction_NuevoDatosView(data);
	};
	
	const actualizarDatos = async () => {		
		//this.mostrarLoader();		
		setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ACTUALIZAR);
			
		var form_json: MatriculaParamUpdate = {
			id : matricula.id,
			created_at : matricula.created_at,
			updated_at : matricula.updated_at,
			anio : matricula.anio,
			costo : matricula.costo,
			fecha : matricula.fecha,
			pagado : matricula.pagado,
		};
		
		const data_json = {
			matricula : form_json	
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:MatriculaReturnView = await response_json.json();
		
		props.handleAction_ActualizarDatosView(data);
	};
	
	const eliminarDatos = async () => {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : matricula.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:MatriculaReturnView = await response_json.json();
		
		props.handleAction_EliminarDatosView(data);
	};
	
	/*FKs*/
	const getFks = async () => {
		
		const data_json = {};
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_GET_FKS);									
		
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		
		const data:MatriculaFKReturnView = await response_json.json();
		
		
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
	
	
	<div id="divModal_matricula_form_general" 
			className="modal_form_general"
			style={{display : display}}>
				
		<div id="divModalContent_matricula_form_general" 
			className="modal_form_general_content">
			
			<div className="modal_form_general_header">
				
				<span id="spanCloseModal_matricula_form_general"
						className="close_modal_form_general" 
						onClick={cerrarModalFormGeneral}>
					&times;
				</span>
				<h2>
					Matricula
				</h2>
				
			</div>
			
			<div className="modal_form_general_body">
			
				<div id="div_matricula_form_general">
				
					<form id="matricula_form_general" 
						className="form_general">
	
						<input type="hidden" id="id" name="id" 
								value={matricula.id}
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
								value={matricula.created_at} placeholder="created_at" 
								onChange={(e) => setcreated_at(e.target.value)} />
								
						<label id="label_updated_at" htmlFor="updated_at"
								className="" style={{display:"none"}}>updated_at</label>				
						<input type="text" id="updated_at" name="updated_at" 
								style={{display:"none"}} className=""
								value={matricula.updated_at} placeholder="updated_at" 
								onChange={(e) => setupdated_at(e.target.value)} />
								
						
						<label htmlFor="anio" className="">Anio</label>
						<input type="text" id="anio" name="anio" 
								className="" placeholder="Anio"
								value={matricula.anio}
								onChange={(e) => setanio(Number(e.target.value))}/>
														
						
						<label htmlFor="costo" className="">Costo</label>
						<input type="text" id="costo" name="costo" 
								className="" placeholder="Costo"
								value={matricula.costo}
								onChange={(e) => setcosto(Number(e.target.value))}/>
														
						
						<label htmlFor="fecha" className="">Fecha</label>
						<input type="date" id="fecha" name="fecha" 
								className="" placeholder="Fecha"
								value={matricula.fecha}
								onChange={(e) => setfecha(e.target.value)}/>
														
						
						<label htmlFor="pagado" className="">Pagado</label>
						<input type="checkbox" id="pagado" name="pagado"
								className="" placeholder="Pagado"
								checked={matricula.pagado}
								onChange={(e) => setpagado(Boolean(e.target.checked))}/>
							
										
					</form>
					
				</div>
				
				<div id="div_matricula_actions_form_general">
					
					<form id="matricula_actions_form_general" 
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

let FormularioMatriculaComp = forwardRef(FormularioMatriculaCompBase);

export {FormularioMatriculaComp,FormularioMatriculaCompBase};