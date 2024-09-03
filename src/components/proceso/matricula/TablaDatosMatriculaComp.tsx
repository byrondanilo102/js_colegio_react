import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Matricula} from "../../../ts/entity/proceso/Matricula";
import {MatriculaReturnView} from "../../../ts/dto/proceso/matricula/MatriculaReturnView";

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

type PropsTablaDatosMatriculaComp = {
	module: string,
	controller: string,
	matriculas: Array<Matricula>,
	getTodosDatosView: Function,
	anterioresView: Function,
	siguientesView: Function,
	nuevoPrepararView: Function,
	handleAction_ClickTableRowView:Function
};

function TablaDatosMatriculaComp(props: PropsTablaDatosMatriculaComp): JSX.Element {	
	let navigate = useNavigate();
	
	//name: 'TablaDatosmatriculaComp',
	
	/*
	props: {
		//------------------ ACCIONES -------------------
		module:String,
		controller:String,
		
		//------------------ DATOS ----------------------
		matriculas:Array
	}
	*/
	
	//------------------ GENERAL --------------------
	//const [title] = useState("Tabla Datos Matricula")
	
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
		const data_json:MatriculaReturnView = await response_json.json();		
		
		props.handleAction_ClickTableRowView(data_json.matricula1);
	}

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};
		
	return (
	
	<div id="divCompGlobalTablamatricula">
		
		<div id="div_matricula_tabla_general">					
			
			<input type="hidden" id="matricula_tabla_general_length" name="matricula_tabla_general_length" 
					value="{matriculas.length}"/>
			
			<table id="matricula_tabla_general" className="table_general">
				
				<thead>
					<tr>					
						<th style={style_id_column}></th>
						<th style={{display:"none"}}>Created At</th>
						<th style={{display:"none"}}>Updated At</th>
						<th style={{textAlign:"center"}}>Anio</th>
						<th style={{textAlign:"center"}}>Costo</th>
						<th>Fecha</th>
						<th style={{textAlign:"center"}}>Pagado</th>
					</tr>
				</thead>
				
				<tbody>
					{props.matriculas.map((matricula1:Matricula) => {
                        return [
					<tr key={matricula1.id} onClick={(event) => onClickTableRow(matricula1.id)}>						
						<td data-label="" style={style_id_column}> {matricula1.alumno!.nombre} </td>
						<td data-label="Created At" style={{display:"none"}}> {matricula1.created_at} </td>
						<td data-label="Updated At" style={{display:"none"}}> {matricula1.updated_at} </td>
						<td data-label="Anio" style={{textAlign:"center"}}> {matricula1.anio} </td>
						<td data-label="Costo" style={{textAlign:"center"}}> {matricula1.costo} </td>
						<td data-label="Fecha"> {matricula1.fecha} </td>
						<td data-label="Pagado" style={{textAlign:"center"}}> {GetLabelBoolean(matricula1.pagado)} </td>
					</tr>
						]
                    })}
				</tbody>
				
			</table>
		</div>
		
		
		<div id="div_matricula_pagination_form_general">
			
			<form id="matricula_pagination_form_general" className="pagination_form_general">							
				
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
		
		<div id="div_matricula_actions_general">
		
			<form id="matricula_actions_general" className="actions_form_general">
				
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

export {TablaDatosMatriculaComp};