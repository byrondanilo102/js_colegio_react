import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../ts/general/util/Constantes';
//import {FuncionGeneral} from '../../React,{/general/util/FuncionGeneral';

import {Alumno} from "../../ts/entity/estructura/Alumno";

import {HeaderComp} from '../../components/HeaderComp';
import {FooterComp} from '../../components/FooterComp';
import {AlertComp} from '../../components/AlertComp';

import {BuscarAlumnoComp} from '../../components/estructura/alumno/BuscarAlumnoComp';
import {TablaDatosAlumnoComp} from '../../components/estructura/alumno/TablaDatosAlumnoComp';
import {FormularioAlumnoComp} from '../../components/estructura/alumno/FormularioAlumnoComp';

/*------------------ TITLE GENERAL ----------------------*/
import '../../scss/components/title/titulo_general.scss';

function AlumnoView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const buscaralumnoComp1:any = useRef();
	const formularioalumnoComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Alumno');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('alumno_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [alumnos,setalumnos] = useState(new Array<Alumno>());
	let [alumno] = useState(new Alumno()); //,setalumno
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (alumnos1:Array<Alumno>) => {
		setalumnos(alumnos1);		
		//alumnos = alumnos1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		buscaralumnoComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		buscaralumnoComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		buscaralumnoComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		formularioalumnoComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (alumno1: Alumno) => {
		formularioalumnoComp1.current.handleAction_ClickTableRow(alumno1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		buscaralumnoComp1.current.getTodosDatos();
		formularioalumnoComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		buscaralumnoComp1.current.getTodosDatos();
		formularioalumnoComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		buscaralumnoComp1.current.getTodosDatos();
		formularioalumnoComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobalalumno">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<BuscarAlumnoComp ref={buscaralumnoComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<TablaDatosAlumnoComp 
					module={module} controller={controller}
					alumnos={alumnos}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<FormularioAlumnoComp ref={formularioalumnoComp1}
					module={module} controller={controller}
					alumno={alumno}
					alumnos={alumnos}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {AlumnoView};