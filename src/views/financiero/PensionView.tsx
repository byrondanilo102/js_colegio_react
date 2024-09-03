import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../ts/general/util/Constantes';
//import {FuncionGeneral} from '../../React,{/general/util/FuncionGeneral';

import {Pension} from "../../ts/entity/financiero/Pension";

import {HeaderComp} from '../../components/HeaderComp';
import {FooterComp} from '../../components/FooterComp';
import {AlertComp} from '../../components/AlertComp';

import {BuscarPensionComp} from '../../components/financiero/pension/BuscarPensionComp';
import {TablaDatosPensionComp} from '../../components/financiero/pension/TablaDatosPensionComp';
import {FormularioPensionComp} from '../../components/financiero/pension/FormularioPensionComp';

/*------------------ TITLE GENERAL ----------------------*/
import '../../scss/components/title/titulo_general.scss';

function PensionView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const buscarpensionComp1:any = useRef();
	const formulariopensionComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Pension');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('financiero');
	const [controller] = useState('pension_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [pensions,setpensions] = useState(new Array<Pension>());
	let [pension] = useState(new Pension()); //,setpension
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (pensions1:Array<Pension>) => {
		setpensions(pensions1);		
		//pensions = pensions1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		buscarpensionComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		buscarpensionComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		buscarpensionComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		formulariopensionComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (pension1: Pension) => {
		formulariopensionComp1.current.handleAction_ClickTableRow(pension1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		buscarpensionComp1.current.getTodosDatos();
		formulariopensionComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		buscarpensionComp1.current.getTodosDatos();
		formulariopensionComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		buscarpensionComp1.current.getTodosDatos();
		formulariopensionComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobalpension">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<BuscarPensionComp ref={buscarpensionComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<TablaDatosPensionComp 
					module={module} controller={controller}
					pensions={pensions}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<FormularioPensionComp ref={formulariopensionComp1}
					module={module} controller={controller}
					pension={pension}
					pensions={pensions}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {PensionView};