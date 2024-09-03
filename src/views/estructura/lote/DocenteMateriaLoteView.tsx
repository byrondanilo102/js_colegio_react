import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {DocenteMateria} from "../../../ts/entity/estructura/DocenteMateria";
import {DocenteMateriaReturnView} from "../../../ts/dto/estructura/docente_materia/DocenteMateriaReturnView";

import {DocenteMateriaFKReturnView} from "../../../ts/dto/estructura/docente_materia/DocenteMateriaFKReturnView";

import {DocenteMateriaParamCreate} from "../../../ts/type/estructura/docente_materia/DocenteMateriaParamCreate";
import {DocenteMateriaParamUpdate} from "../../../ts/type/estructura/docente_materia/DocenteMateriaParamUpdate";

/*FKs*/
import {Docente} from '../../../ts/entity/estructura/Docente';
import {Materia} from '../../../ts/entity/estructura/Materia';



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


function DocenteMateriaLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Docente Materia');
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('docente_materia_api');
	//------------------ DATOS ----------------------
	let [docente_materia,setdocente_materia] = useState(new DocenteMateria()); //,setdocente_materia
	let [docente_materias,setdocente_materias] = useState(new Array<DocenteMateria>());	
	
	let [id_new,setid_new] = useState(0);
    let [docente_materias_eliminar,setdocente_materias_eliminar] = useState(new Array<DocenteMateria>());

    let [accion,setaccion] = useState('CANCELAR');

    let [form_deshabilitado,setform_deshabilitado] = useState(true);
    let [nuevo_preparar_display,setnuevo_preparar_display] = useState('block');
    let [actualizar_display,setactualizar_display] = useState('none');
    let [eliminar_display,seteliminar_display] = useState('none');
	
	/*FKs*/
		
	let [docentesFK, setdocentesFK] = useState(new Array<Docente>());
	let [materiasFK, setmateriasFK] = useState(new Array<Materia>());
	
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

        setdocente_materias(data.docente_materias);
	};

    const onClickRowTable = async (id:number) => {
        let docente_materia2:DocenteMateria | undefined = docente_materias.find(docente_materia1 => docente_materia1.id==id);
        //let docente_materia3:DocenteMateria = new DocenteMateria();

        //Object.assign(docente_materia3,docente_materia2);
        //Object.assign(docente_materia3,docente_materia2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setdocente_materia(docente_materia2!);
    };

    const nuevoPreparar = () => {
		docente_materia = new DocenteMateria();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setid_docente(-1);		
		setid_materia(-1);		
        
        setid_new(--id_new);
        docente_materia.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setdocente_materia(docente_materia);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //docente_materia.id=id_new;
            
            docente_materias.push(docente_materia);
                           
            setdocente_materias(docente_materias);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let docente_materia1 of docente_materias) {

                if(docente_materia1.id == docente_materia.id) {
                    Object.assign(docente_materia1,docente_materia);
                    break;
                }
            }                

            setdocente_materias(docente_materias);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let docente_materias2 = docente_materias.filter((docente_materia1, index, arr) => { 
            return docente_materia1.id != docente_materia.id;
        });

        setdocente_materias(docente_materias2);

        if(docente_materia.id > 0) {
            docente_materias_eliminar.push(docente_materia);

            setdocente_materias_eliminar(docente_materias_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setdocente_materia(new DocenteMateria());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_docente_materia();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_docente_materia =  () => {
        let data_json_final = {};
        
        let docente_materias_nuevos = [];
        let docente_materias_nuevos_final = [];

        let docente_materias_actualizars = [];
		let docente_materias_actualizars_final = [];
		
        let ids_docente_materias_eliminars = [];
        
        let updates_columnas =['id_docente','id_materia'];

        docente_materias_nuevos = docente_materias.filter((docente_materia1:DocenteMateria) => { /*, index, arr*/
            return docente_materia1.id < 0 ;
        });

        docente_materias_nuevos_final = get_docente_materiasNuevosFinal(docente_materias_nuevos);

        docente_materias_actualizars = docente_materias.filter((docente_materia1) => { /*, index, arr*/
            return docente_materia1.id > 0 ;
        });
		
		docente_materias_actualizars_final = get_docente_materiasActualizarsFinal(docente_materias_actualizars);
		
        ids_docente_materias_eliminars = getIds_docente_materiasEliminars();
        
        
        data_json_final = {
            news_docente_materias : docente_materias_nuevos_final,
            updates_docente_materias : docente_materias_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_docente_materias: ids_docente_materias_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_docente_materiasEliminars = () => {
        let ids_docente_materias_eliminars:Array<number> = [];
    
        for(let docente_materia1 of docente_materias_eliminar) {
            ids_docente_materias_eliminars.push(docente_materia1.id);
        }

        return ids_docente_materias_eliminars;
    };

    const get_docente_materiasNuevosFinal = (docente_materias_nuevos:Array<DocenteMateria>) => {
        let docente_materias_nuevos_final:Array<DocenteMateriaParamCreate> = [];
        
        for(let docente_materia1 of docente_materias_nuevos) {

            let docente_materia_nuevo_final:DocenteMateriaParamCreate = {
				created_at : docente_materia1.created_at,
				updated_at : docente_materia1.updated_at,
				id_docente : docente_materia1.id_docente,
				id_materia : docente_materia1.id_materia,
            };

            docente_materias_nuevos_final.push(docente_materia_nuevo_final);
        }

        return docente_materias_nuevos_final;
    };

	const get_docente_materiasActualizarsFinal = (docente_materias_actualizars:Array<DocenteMateria>) => {
        let docente_materias_actualizars_final:Array<DocenteMateriaParamUpdate> = [];
        
        for(let docente_materia1 of docente_materias_actualizars) {

            let docente_materia_actualizar_final:DocenteMateriaParamUpdate = {
				id : docente_materia1.id,
				created_at : docente_materia1.created_at,
				updated_at : docente_materia1.updated_at,
				id_docente : docente_materia1.id_docente,
				id_materia : docente_materia1.id_materia,
            };

            docente_materias_actualizars_final.push(docente_materia_actualizar_final);
        }

        return docente_materias_actualizars_final;
    };
	
	/*FKs*/
	const getFks = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);									
		const data_json = {};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		const data:DocenteMateriaFKReturnView = await response_json.json();
		
		
			setdocentesFK(data.docentesFK);
			setmateriasFK(data.materiasFK);			
	};
	
	const funLoadFormulario = () => {
		/*FKs*/
		getFks();
	};
	
	useEffect(funLoadFormulario, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	const setid = (id:number) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.id=id;	setdocente_materia(docente_materia2);};
	const setcreated_at = (created_at:string) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.created_at=created_at;	setdocente_materia(docente_materia2);};
	const setupdated_at = (updated_at:string) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.updated_at=updated_at;	setdocente_materia(docente_materia2);};
	const setid_docente = (id_docente:number) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.id_docente=id_docente;	setdocente_materia(docente_materia2);};
	const setid_materia = (id_materia:number) => {	let docente_materia2 = new DocenteMateria();	Object.assign(docente_materia2,docente_materia);	docente_materia2.id_materia=id_materia;	setdocente_materia(docente_materia2);};
	
	return (
		
		<div id="divLoteViewGlobal_docente_materia">
			
			<div id="div_docente_materia_form_general" 
				 className="form_general">
			
				<h2>
					Docente Materias Lote
				</h2>
				
				<form id="docente_materia_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={docente_materia.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={docente_materia.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={docente_materia.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="id_docente"> Docente</label>
					<select id="id_docente" name="id_docente" 
							value={docente_materia.id_docente.toString()} placeholder=" Docente"
							onChange={(e) => setid_docente(Number(e.target.value))}
							disabled={form_deshabilitado} >
						
						{docentesFK.map((docente:any) => { 
							return [
						<option key={docente.id} value={docente.id}>
							{ docente.nombre }
						</option>
							]
						})}
						
					</select>
				
					
					<label htmlFor="id_materia"> Materia</label>
					<select id="id_materia" name="id_materia" 
							value={docente_materia.id_materia.toString()} placeholder=" Materia"
							onChange={(e) => setid_materia(Number(e.target.value))}
							disabled={form_deshabilitado} >
						
						{materiasFK.map((materia:any) => { 
							return [
						<option key={materia.id} value={materia.id}>
							{ materia.codigo }
						</option>
							]
						})}
						
					</select>
				
									
				</form>
					
			</div>
			
			<div id="div_docente_materia_actions_form_general">
				
				<form id="docente_materia_actions_form_general" 
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
			
			<div id="div_docente_materia_tabla_general">
				
				<table id="docente_materia_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th>Id</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th> Docente</th>
							<th> Materia</th>
						</tr>
					</thead>
					
					<tbody>
						{docente_materias.map((docente_materia1:DocenteMateria) => {
							return [
						<tr key={docente_materia1.id} onClick={(event) => onClickRowTable(docente_materia1.id)}>						
							<td data-label="Id"> {docente_materia1.id} </td>
							<td data-label="Created At"> {docente_materia1.created_at} </td>
							<td data-label="Updated At"> {docente_materia1.updated_at} </td>
							<td data-label=" Docente"> {docente_materia1.docente!.nombre} </td>
							<td data-label=" Materia"> {docente_materia1.materia!.codigo} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
		</div>
	);
}

export {DocenteMateriaLoteView};