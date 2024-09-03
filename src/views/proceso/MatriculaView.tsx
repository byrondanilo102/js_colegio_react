import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../ts/general/util/Constantes';
//import {FuncionGeneral} from '../../React,{/general/util/FuncionGeneral';

import {Matricula} from "../../ts/entity/proceso/Matricula";

import {HeaderComp} from '../../components/HeaderComp';
import {FooterComp} from '../../components/FooterComp';
import {AlertComp} from '../../components/AlertComp';

import {BuscarMatriculaComp} from '../../components/proceso/matricula/BuscarMatriculaComp';
import {TablaDatosMatriculaComp} from '../../components/proceso/matricula/TablaDatosMatriculaComp';
import {FormularioMatriculaComp} from '../../components/proceso/matricula/FormularioMatriculaComp';

/*------------------ TITLE GENERAL ----------------------*/
import '../../scss/components/title/titulo_general.scss';

function MatriculaView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const buscarmatriculaComp1:any = useRef();
	const formulariomatriculaComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Matricula');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('proceso');
	const [controller] = useState('matricula_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [matriculas,setmatriculas] = useState(new Array<Matricula>());
	let [matricula] = useState(new Matricula()); //,setmatricula
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (matriculas1:Array<Matricula>) => {
		setmatriculas(matriculas1);		
		//matriculas = matriculas1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		buscarmatriculaComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		buscarmatriculaComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		buscarmatriculaComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		formulariomatriculaComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (matricula1: Matricula) => {
		formulariomatriculaComp1.current.handleAction_ClickTableRow(matricula1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		buscarmatriculaComp1.current.getTodosDatos();
		formulariomatriculaComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		buscarmatriculaComp1.current.getTodosDatos();
		formulariomatriculaComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		buscarmatriculaComp1.current.getTodosDatos();
		formulariomatriculaComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobalmatricula">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<BuscarMatriculaComp ref={buscarmatriculaComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<TablaDatosMatriculaComp 
					module={module} controller={controller}
					matriculas={matriculas}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<FormularioMatriculaComp ref={formulariomatriculaComp1}
					module={module} controller={controller}
					matricula={matricula}
					matriculas={matriculas}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {MatriculaView};