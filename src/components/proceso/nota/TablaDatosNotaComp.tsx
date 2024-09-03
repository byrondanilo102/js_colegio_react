import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Nota} from "../../../ts/entity/proceso/Nota";
import {NotaReturnView} from "../../../ts/dto/proceso/nota/NotaReturnView";

/*------------------ GENERAL ----------------------*/
//import "../../../scss/general.scss";
/*------------------ BUTTON GENERAL ----------------------*/
import '../../../scss/components/button/button_general.scss';
/*------------------ TABLE GENERAL ----------------------*/
import '../../../scss/components/table/table_general.scss';
/*------------------ FORM PAGINATION GENERAL ----------------------*/
import '../../../scss/components/form/pagination_form_general.scss';
/*------------------ FORM ACTIONS GENERAL ----------------------*/
import '../../../scss/components/form/actions_form_general.scss';


/*------------------ RESPONSIVE TABLE GENERAL ----------------------*/
import '../../../scss/responsive/table/table_general_responsive.scss';
/*------------------ RESPONSIVE ACTIONS GENERAL ----------------------*/
import '../../../scss/responsive/form/actions_form_general_responsive.scss';
/*------------------ RESPONSIVE FORM PAGINATION GENERAL ----------------------*/
import '../../../scss/responsive/form/pagination_form_general_responsive.scss';

type PropsTablaDatosNotaComp = {
	module: string,
	controller: string,
	notas: Array<Nota>,
	getTodosDatosView: Function,
	anterioresView: Function,
	siguientesView: Function,
	nuevoPrepararView: Function,
	handleAction_ClickTableRowView:Function
};

function TablaDatosNotaComp(props: PropsTablaDatosNotaComp): JSX.Element {	
	let navigate = useNavigate();
	
	//name: 'TablaDatosnotaComp',
	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		
		//------------------ DATOS ----------------------
		notas:Array
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Tabla Datos Nota")
	
	//------------------ ACCIONES -------------------
	//let [tipo_accion,setTipo_accion] = useState(Constantes.CANCELAR)
	
	//------------------ ESTILOS -------------------
	let [style_id_column] = useState({}); //,setStyle_id_column
				
	const home = () => {		
		navigate('../main', {replace: true});
	};
		
	const atras = () => {
		window.history.back();
	};
	
	const getTodosDatos = () => {
		props.getTodosDatosView();
	};
	
	const anteriores = () => {
		props.anterioresView();
	};
	
	const siguientes = () => {
		props.siguientesView();
	};
	
	const nuevoPreparar = () => {
		props.nuevoPrepararView();
	};
	
	const onClickTableRow = async (id:number) => {	
		//setTipo_accion(Constantes.SELECCIONAR);		
		//abrir_modal_form_general();
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.SELECCIONAR);

		var id_json = {
			id : id
		};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		const data_json:NotaReturnView = await response_json.json();		
		
		props.handleAction_ClickTableRowView(data_json.nota1);
	}
		
	return (
	
	<div id="divCompGlobalTablanota">
		
		<div id="div_nota_tabla_general">					
			
			<input type="hidden" id="nota_tabla_general_length" name="nota_tabla_general_length" 
					value="{notas.length}"/>
			
			<table id="nota_tabla_general" className="table_general">
				
				<thead>
					<tr>					
						<th style={style_id_column}>Id</th>
						<th style={{display:"none"}}>Created At</th>
						<th style={{display:"none"}}>Updated At</th>
						<th> Alumno</th>
						<th> Materia</th>
						<th> Docente</th>
						<th style={{textAlign:"center"}}>Nota Prueba</th>
						<th style={{textAlign:"center"}}>Nota Trabajo</th>
						<th style={{textAlign:"center"}}>Nota Examen</th>
						<th style={{textAlign:"center"}}>Nota Final</th>
					</tr>
				</thead>
				
				<tbody>
					{props.notas.map((nota1:Nota) => {
                        return [
					<tr key={nota1.id} onClick={(event) => onClickTableRow(nota1.id)}>						
						<td data-label="Id" style={style_id_column}> {nota1.id} </td>
						<td data-label="Created At" style={{display:"none"}}> {nota1.created_at} </td>
						<td data-label="Updated At" style={{display:"none"}}> {nota1.updated_at} </td>
						<td data-label=" Alumno"> {nota1.alumno!.nombre} </td>
						<td data-label=" Materia"> {nota1.materia!.codigo} </td>
						<td data-label=" Docente"> {nota1.docente!.nombre} </td>
						<td data-label="Nota Prueba" style={{textAlign:"center"}}> {nota1.nota_prueba} </td>
						<td data-label="Nota Trabajo" style={{textAlign:"center"}}> {nota1.nota_trabajo} </td>
						<td data-label="Nota Examen" style={{textAlign:"center"}}> {nota1.nota_examen} </td>
						<td data-label="Nota Final" style={{textAlign:"center"}}> {nota1.nota_final} </td>
					</tr>
						]
                    })}
				</tbody>
				
			</table>
		</div>
		
		
		<div id="div_nota_pagination_form_general">
			
			<form id="nota_pagination_form_general" className="pagination_form_general">							
				
				<button type="button" id="anteriores_button" name="anteriores_button" 
						value="Anteriores" className="button_general" 
						onClick={anteriores}>
					<i className="fa fa-fw fa-arrow-alt-circle-left"></i>
					Anteriores
				</button>
				
				<button type="button" id="siguientes_button" name="siguientes_button" 
						value="Siguientes" className="button_general" 
						onClick={siguientes}>
					<i className="fa fa-fw fa-arrow-alt-circle-right"></i>
					Siguientes
				</button>
				
			</form>
		</div>
		
		<div id="div_nota_actions_general">
		
			<form id="nota_actions_general" className="actions_form_general">
				
				<button type="button" id="home_button" name="home_button"
						value="Home" className="button_general"
						onClick={home}>
					<i className="fa fa-fw fa-home"></i>
					Home
				</button>
				
				<button type="button" id="atras_button" name="atras_button" 
						value="Atras" className="button_general" 
						onClick={atras}>
					<i className="fa fa-fw fa-arrow-circle-left"></i>
					Atras
				</button>
				
				<button type="button" id="recargar_button" name="recargar_button" 
						value="Recargar" className="button_general" 
						onClick={getTodosDatos}>
					<i className="fa fa-fw fa-sync"></i>
					Recargar
				</button>
				
				<button type="button" id="nuevo_preparar_button" name="nuevo_preparar_button" 
						value="Nuevo" className="button_general" 
						onClick={nuevoPreparar}>
					<i className="fa fa-fw fa-plus-circle"></i>
					Nuevo
				</button>
				
			</form>
		</div>		
	</div>
	
	);
}

export {TablaDatosNotaComp};