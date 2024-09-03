import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Materia} from "../../../ts/entity/estructura/Materia";
import {MateriaReturnView} from "../../../ts/dto/estructura/materia/MateriaReturnView";

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

type PropsTablaDatosMateriaComp = {
	module: string,
	controller: string,
	materias: Array<Materia>,
	getTodosDatosView: Function,
	anterioresView: Function,
	siguientesView: Function,
	nuevoPrepararView: Function,
	handleAction_ClickTableRowView:Function
};

function TablaDatosMateriaComp(props: PropsTablaDatosMateriaComp): JSX.Element {	
	let navigate = useNavigate();
	
	//name: 'TablaDatosmateriaComp',
	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		
		//------------------ DATOS ----------------------
		materias:Array
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Tabla Datos Materia")
	
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
		const data_json:MateriaReturnView = await response_json.json();		
		
		props.handleAction_ClickTableRowView(data_json.materia1);
	}

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};
		
	return (
	
	<div id="divCompGlobalTablamateria">
		
		<div id="div_materia_tabla_general">					
			
			<input type="hidden" id="materia_tabla_general_length" name="materia_tabla_general_length" 
					value="{materias.length}"/>
			
			<table id="materia_tabla_general" className="table_general">
				
				<thead>
					<tr>					
						<th style={style_id_column}>Id</th>
						<th style={{display:"none"}}>Created At</th>
						<th style={{display:"none"}}>Updated At</th>
						<th>Codigo</th>
						<th>Nombre</th>
						<th style={{textAlign:"center"}}>Activo</th>
					</tr>
				</thead>
				
				<tbody>
					{props.materias.map((materia1:Materia) => {
                        return [
					<tr key={materia1.id} onClick={(event) => onClickTableRow(materia1.id)}>						
						<td data-label="Id" style={style_id_column}> {materia1.id} </td>
						<td data-label="Created At" style={{display:"none"}}> {materia1.created_at} </td>
						<td data-label="Updated At" style={{display:"none"}}> {materia1.updated_at} </td>
						<td data-label="Codigo"> {materia1.codigo} </td>
						<td data-label="Nombre"> {materia1.nombre} </td>
						<td data-label="Activo" style={{textAlign:"center"}}> {GetLabelBoolean(materia1.activo)} </td>
					</tr>
						]
                    })}
				</tbody>
				
			</table>
		</div>
		
		
		<div id="div_materia_pagination_form_general">
			
			<form id="materia_pagination_form_general" className="pagination_form_general">							
				
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
		
		<div id="div_materia_actions_general">
		
			<form id="materia_actions_general" className="actions_form_general">
				
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

export {TablaDatosMateriaComp};