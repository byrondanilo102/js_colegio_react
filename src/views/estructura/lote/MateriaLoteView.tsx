import React,{useState,forwardRef,useImperativeHandle} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Materia} from "../../../ts/entity/estructura/Materia";
import {MateriaReturnView} from "../../../ts/dto/estructura/materia/MateriaReturnView";


import {MateriaParamCreate} from "../../../ts/type/estructura/materia/MateriaParamCreate";
import {MateriaParamUpdate} from "../../../ts/type/estructura/materia/MateriaParamUpdate";

/*FKs*/



/*------------------ TITLE GENERAL ----------------------*/
import '../../../scss/components/title/titulo_general.scss';
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


/*------------------ TABLE GENERAL ----------------------*/
import '../../../scss/components/table/table_general.scss';
/*------------------ FORM PAGINATION GENERAL ----------------------*/
import '../../../scss/components/form/pagination_form_general.scss';

/*------------------ RESPONSIVE TABLE GENERAL ----------------------*/
import '../../../scss/responsive/table/table_general_responsive.scss';
/*------------------ RESPONSIVE FORM PAGINATION GENERAL ----------------------*/
import '../../../scss/responsive/form/pagination_form_general_responsive.scss';


function MateriaLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Materia');
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('materia_api');
	//------------------ DATOS ----------------------
	let [materia,setmateria] = useState(new Materia()); //,setmateria
	let [materias,setmaterias] = useState(new Array<Materia>());	
	
	let [id_new,setid_new] = useState(0);
    let [materias_eliminar,setmaterias_eliminar] = useState(new Array<Materia>());

    let [accion,setaccion] = useState('CANCELAR');

    let [form_deshabilitado,setform_deshabilitado] = useState(true);
    let [nuevo_preparar_display,setnuevo_preparar_display] = useState('block');
    let [actualizar_display,setactualizar_display] = useState('none');
    let [eliminar_display,seteliminar_display] = useState('none');
	
	
	const getTodosDatos = async () => {
        
        let data_json = {
            pagination: {
                skip:'0',
                limit:'10'
            }
        };
        
        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_TODOS);
                    
        const response_json = await fetch(url_controller, request_options);

        const data = await response_json.json();

        console.log(data);

        setmaterias(data.materias);
	};

    const onClickRowTable = async (id:number) => {
        let materia2:Materia | undefined = materias.find(materia1 => materia1.id==id);
        //let materia3:Materia = new Materia();

        //Object.assign(materia3,materia2);
        //Object.assign(materia3,materia2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setmateria(materia2!);
    };

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};

    const nuevoPreparar = () => {
		materia = new Materia();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setcodigo('');		
		setnombre('');		
		setactivo(false);		
        
        setid_new(--id_new);
        materia.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setmateria(materia);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //materia.id=id_new;
            
            materias.push(materia);
                           
            setmaterias(materias);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let materia1 of materias) {

                if(materia1.id == materia.id) {
                    Object.assign(materia1,materia);
                    break;
                }
            }                

            setmaterias(materias);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let materias2 = materias.filter((materia1, index, arr) => { 
            return materia1.id != materia.id;
        });

        setmaterias(materias2);

        if(materia.id > 0) {
            materias_eliminar.push(materia);

            setmaterias_eliminar(materias_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setmateria(new Materia());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_materia();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_materia =  () => {
        let data_json_final = {};
        
        let materias_nuevos = [];
        let materias_nuevos_final = [];

        let materias_actualizars = [];
		let materias_actualizars_final = [];
		
        let ids_materias_eliminars = [];
        
        let updates_columnas =['codigo','nombre'];

        materias_nuevos = materias.filter((materia1:Materia) => { /*, index, arr*/
            return materia1.id < 0 ;
        });

        materias_nuevos_final = get_materiasNuevosFinal(materias_nuevos);

        materias_actualizars = materias.filter((materia1) => { /*, index, arr*/
            return materia1.id > 0 ;
        });
		
		materias_actualizars_final = get_materiasActualizarsFinal(materias_actualizars);
		
        ids_materias_eliminars = getIds_materiasEliminars();
        
        
        data_json_final = {
            news_materias : materias_nuevos_final,
            updates_materias : materias_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_materias: ids_materias_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_materiasEliminars = () => {
        let ids_materias_eliminars:Array<number> = [];
    
        for(let materia1 of materias_eliminar) {
            ids_materias_eliminars.push(materia1.id);
        }

        return ids_materias_eliminars;
    };

    const get_materiasNuevosFinal = (materias_nuevos:Array<Materia>) => {
        let materias_nuevos_final:Array<MateriaParamCreate> = [];
        
        for(let materia1 of materias_nuevos) {

            let materia_nuevo_final:MateriaParamCreate = {
				created_at : materia1.created_at,
				updated_at : materia1.updated_at,
				codigo : materia1.codigo,
				nombre : materia1.nombre,
				activo : materia1.activo,
            };

            materias_nuevos_final.push(materia_nuevo_final);
        }

        return materias_nuevos_final;
    };

	const get_materiasActualizarsFinal = (materias_actualizars:Array<Materia>) => {
        let materias_actualizars_final:Array<MateriaParamUpdate> = [];
        
        for(let materia1 of materias_actualizars) {

            let materia_actualizar_final:MateriaParamUpdate = {
				id : materia1.id,
				created_at : materia1.created_at,
				updated_at : materia1.updated_at,
				codigo : materia1.codigo,
				nombre : materia1.nombre,
				activo : materia1.activo,
            };

            materias_actualizars_final.push(materia_actualizar_final);
        }

        return materias_actualizars_final;
    };
	
	
	
	const setid = (id:number) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.id=id;	setmateria(materia2);};
	const setcreated_at = (created_at:string) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.created_at=created_at;	setmateria(materia2);};
	const setupdated_at = (updated_at:string) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.updated_at=updated_at;	setmateria(materia2);};
	const setcodigo = (codigo:string) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.codigo=codigo;	setmateria(materia2);};
	const setnombre = (nombre:string) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.nombre=nombre;	setmateria(materia2);};
	const setactivo = (activo:boolean) => {	let materia2 = new Materia();	Object.assign(materia2,materia);	materia2.activo=activo;	setmateria(materia2);};
	
	return (
		
		<div id="divLoteViewGlobal_materia">
			
			<div id="div_materia_form_general" 
				 className="form_general">
			
				<h2>
					Materias Lote
				</h2>
				
				<form id="materia_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={materia.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={materia.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={materia.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="codigo">Codigo</label>
					<input type="text" id="codigo" name="codigo" placeholder="Codigo"
							value={materia.codigo}
							onChange={(e) => setcodigo(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="nombre">Nombre</label>
					<input type="text" id="nombre" name="nombre" placeholder="Nombre"
							value={materia.nombre}
							onChange={(e) => setnombre(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="activo">Activo</label>
					<input type="checkbox" id="activo" name="activo" placeholder="Activo"
							checked={materia.activo}
							onChange={(e) => setactivo(Boolean(e.target.checked))}
							disabled={form_deshabilitado} />
						
									
				</form>
					
			</div>
			
			<div id="div_materia_actions_form_general">
				
				<form id="materia_actions_form_general" 
						className="actions_form_general">
						
					<button type="button" id="recargar_button" name="recargar_button" 
						value="Recargar" className="button_general" 
						onClick={getTodosDatos}>
						<i className="fa fa-fw fa-sync"></i>
						Recargar
					</button>
					
					<button type="button" id="nuevo_preparar_button" name="nuevo_preparar_button" 
						value="Nuevo" className="button_general" 
						onClick={nuevoPreparar}
						style={{display : nuevo_preparar_display}}>
						<i className="fa fa-fw fa-plus-circle"></i>
						Nuevo
					</button>
					
					<button type="button" id="actualizar_button" name="actualizar_button" 
							className="button_general" value="Actualizar" 
							onClick={actualizar}
							style={{display : actualizar_display}}>
						<i className="fa fa-fw fa-save"></i>
						Actualizar
					</button>
						
					<button type="button" id="eliminar_button" name="eliminar_button" 
							className="button_general" value="Eliminar" 
							onClick={eliminar}
							style={{display : eliminar_display}}>
						<i className="fa fa-fw fa-times-circle"></i>
						Eliminar
					</button>
						
					<button type="button" id="cancelar_button" name="cancelar_button" 
							className="button_general" value="Cancelar"
							onClick={cancelar}>
						<i className="fa fa-fw fa-minus-circle"></i>
						Cancelar
					</button>
				
					<button type="button" id="guardar_button" name="guardar_button" 
							className="button_general" value="Guardar"
							onClick={guardar}>
						<i className="fa fa-fw fa-minus-circle"></i>
						Guardar
					</button>
					
				</form>
			</div>
			
			<div id="div_materia_tabla_general">
				
				<table id="materia_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th>Id</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th>Codigo</th>
							<th>Nombre</th>
							<th style={{textAlign:"center"}}>Activo</th>
						</tr>
					</thead>
					
					<tbody>
						{materias.map((materia1:Materia) => {
							return [
						<tr key={materia1.id} onClick={(event) => onClickRowTable(materia1.id)}>						
							<td data-label="Id"> {materia1.id} </td>
							<td data-label="Created At"> {materia1.created_at} </td>
							<td data-label="Updated At"> {materia1.updated_at} </td>
							<td data-label="Codigo"> {materia1.codigo} </td>
							<td data-label="Nombre"> {materia1.nombre} </td>
							<td data-label="Activo" style={{textAlign:"center"}}> {GetLabelBoolean(materia1.activo)} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
		</div>
	);
}

export {MateriaLoteView};