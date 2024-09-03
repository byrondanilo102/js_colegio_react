import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../ts/general/util/Constantes';
//import {FuncionGeneral} from '../../React,{/general/util/FuncionGeneral';

import {DocenteMateria} from "../../ts/entity/estructura/DocenteMateria";

import {HeaderComp} from '../../components/HeaderComp';
import {FooterComp} from '../../components/FooterComp';
import {AlertComp} from '../../components/AlertComp';

import {BuscarDocenteMateriaComp} from '../../components/estructura/docente_materia/BuscarDocenteMateriaComp';
import {TablaDatosDocenteMateriaComp} from '../../components/estructura/docente_materia/TablaDatosDocenteMateriaComp';
import {FormularioDocenteMateriaComp} from '../../components/estructura/docente_materia/FormularioDocenteMateriaComp';

/*------------------ TITLE GENERAL ----------------------*/
import '../../scss/components/title/titulo_general.scss';

function DocenteMateriaView(): JSX.Element {	
	
	const headerComp1:any = useRef();
	const alertComp1:any = useRef();
	const buscardocente_materiaComp1:any = useRef();
	const formulariodocente_materiaComp1:any = useRef();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Docente Materia');
	
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('docente_materia_api');
	let [tipo_busqueda] = useState('ninguno'); //,setTipo_busqueda
	
	//------------------ DATOS ----------------------
	let [docente_materias,setdocente_materias] = useState(new Array<DocenteMateria>());
	let [docente_materia] = useState(new DocenteMateria()); //,setdocente_materia
	
	//------------------ MENSAJE ALERT --------------
    let [tipo_mensaje,setTipo_mensaje] = useState('NONE');
    let [mensaje,setMensaje] = useState('NONE');
	
	const updateDatos = (docente_materias1:Array<DocenteMateria>) => {
		setdocente_materias(docente_materias1);		
		//docente_materias = docente_materias1;
	};
	
	const getTodosDatos = () => {
		headerComp1.current.mostrarLoader();
		buscardocente_materiaComp1.current.getTodosDatos();
		headerComp1.current.ocultarLoader();
	};
	
	const anteriores = () => {
		headerComp1.current.mostrarLoader();
		buscardocente_materiaComp1.current.anteriores();
		headerComp1.current.ocultarLoader();
	};
	
	const siguientes = () => {
		headerComp1.current.mostrarLoader();
		buscardocente_materiaComp1.current.siguientes();
		headerComp1.current.ocultarLoader();
	};
	
	const ocultarMensajeAlerta = () => {
		setTipo_mensaje('NONE');
        setMensaje('');
        alertComp1.current.closeAlertGeneral();
	};
	
	const nuevoPreparar = () => {
		formulariodocente_materiaComp1.current.nuevoPreparar();
	};
	
	const handleAction_ClickTableRow = (docente_materia1: DocenteMateria) => {
		formulariodocente_materiaComp1.current.handleAction_ClickTableRow(docente_materia1);
	};
	
	const handleAction_NuevoDatos = () => { //data_json
		buscardocente_materiaComp1.current.getTodosDatos();
		formulariodocente_materiaComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_ActualizarDatos = () => { //data_json
		buscardocente_materiaComp1.current.getTodosDatos();
		formulariodocente_materiaComp1.current.cerrarModalFormGeneral();
		
		setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		headerComp1.current.ocultarLoader();
	};
	
	const handleAction_EliminarDatos = () => { //data_json
		buscardocente_materiaComp1.current.getTodosDatos();
		formulariodocente_materiaComp1.current.cerrarModalFormGeneral();
		
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
	
	<div id="divViewGlobaldocente_materia">
	
		<HeaderComp ref={headerComp1}/>
		
		<h3 className="titulo_general">
			{title}
		</h3>		
		
		<AlertComp ref={alertComp1}
					tipo_mensaje={tipo_mensaje} 
					mensaje={mensaje}/>
		
		<BuscarDocenteMateriaComp ref={buscardocente_materiaComp1}
					module={module} controller={controller}
					tipo_busqueda={tipo_busqueda}
					updateDatosView={updateDatos}/>
					
		<TablaDatosDocenteMateriaComp 
					module={module} controller={controller}
					docente_materias={docente_materias}
					getTodosDatosView={getTodosDatos} 
					anterioresView={anteriores}
					siguientesView={siguientes}
					nuevoPrepararView={nuevoPreparar}
					handleAction_ClickTableRowView={handleAction_ClickTableRow}/>
					
		<FormularioDocenteMateriaComp ref={formulariodocente_materiaComp1}
					module={module} controller={controller}
					docente_materia={docente_materia}
					docente_materias={docente_materias}
					ocultarMensajeAlertaView={ocultarMensajeAlerta}
					handleAction_ActualizarDatosView={handleAction_ActualizarDatos}
					handleAction_NuevoDatosView={handleAction_NuevoDatos}
					handleAction_EliminarDatosView={handleAction_EliminarDatos}/>
		
		<div id="div_auxiliar"></div>
		
		<FooterComp/>
		
	</div>
	
	);
}

export {DocenteMateriaView};