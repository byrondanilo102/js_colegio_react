import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../ts/general/util/Constantes';
//import {FuncionGeneral} from '../../React,{/general/util/FuncionGeneral';

import {Contrato} from "../../ts/entity/financiero/Contrato";

import {HeaderComp} from '../../components/HeaderComp';
import {FooterComp} from '../../components/FooterComp';
import {AlertComp} from '../../components/AlertComp';

import {BuscarContratoComp} from '../../components/financiero/contrato/BuscarContratoComp';
import {TablaDatosContratoComp} from '../../components/financiero/contrato/TablaDatosContratoComp';
import {FormularioContratoComp} from '../../components/financiero/contrato/FormularioContratoComp';

/*------------------ TITLE GENERAL ----------------------*/
import '../../scss/components/title/titulo_general.scss';

function ContratoView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const buscarcontratoComp1:any = useRef();
	const formulariocontratoComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Contrato');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('financiero');
	const [controller] = useState('contrato_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [contratos,setcontratos] = useState(new Array<Contrato>());
	let [contrato] = useState(new Contrato()); //,setcontrato
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (contratos1:Array<Contrato>) => {
		setcontratos(contratos1);		
		//contratos = contratos1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		buscarcontratoComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		buscarcontratoComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		buscarcontratoComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		formulariocontratoComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (contrato1: Contrato) => {
		formulariocontratoComp1.current.handleAction_ClickTableRow(contrato1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		buscarcontratoComp1.current.getTodosDatos();
		formulariocontratoComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		buscarcontratoComp1.current.getTodosDatos();
		formulariocontratoComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		buscarcontratoComp1.current.getTodosDatos();
		formulariocontratoComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ELIMINADO);
		headerComp1.current.ocultarLoader();
	};
	
	const setMensajeAlerta = (tipo_mensaje:string,mensaje:string) => {
		setTipo_mensaje(tipo_mensaje);
		setMensaje(mensaje);
		
		alertComp1.current.setMensajeAlerta();
	};
	
	const funGetTodosDatos = () => {
		getTodosDatos();
	};
	
	useEffect(funGetTodosDatos, []);
	
	return (
	
	<div id="divViewGlobalcontrato">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<BuscarContratoComp ref={buscarcontratoComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<TablaDatosContratoComp 
					module={module} controller={controller}
					contratos={contratos}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<FormularioContratoComp ref={formulariocontratoComp1}
					module={module} controller={controller}
					contrato={contrato}
					contratos={contratos}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {ContratoView};