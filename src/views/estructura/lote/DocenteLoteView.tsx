import React,{useState,forwardRef,useImperativeHandle} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Docente} from "../../../ts/entity/estructura/Docente";
import {DocenteReturnView} from "../../../ts/dto/estructura/docente/DocenteReturnView";


import {DocenteParamCreate} from "../../../ts/type/estructura/docente/DocenteParamCreate";
import {DocenteParamUpdate} from "../../../ts/type/estructura/docente/DocenteParamUpdate";

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


function DocenteLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Docente');
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('docente_api');
	//------------------ DATOS ----------------------
	let [docente,setdocente] = useState(new Docente()); //,setdocente
	let [docentes,setdocentes] = useState(new Array<Docente>());	
	
	let [id_new,setid_new] = useState(0);
    let [docentes_eliminar,setdocentes_eliminar] = useState(new Array<Docente>());

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

        setdocentes(data.docentes);
	};

    const onClickRowTable = async (id:number) => {
        let docente2:Docente | undefined = docentes.find(docente1 => docente1.id==id);
        //let docente3:Docente = new Docente();

        //Object.assign(docente3,docente2);
        //Object.assign(docente3,docente2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setdocente(docente2!);
    };

    const nuevoPreparar = () => {
		docente = new Docente();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setnombre('');		
		setapellido('');		
		setfecha_nacimiento(FuncionGeneral.GetLabelDate(new Date()));
		setanios_experiencia(0);		
		setnota_evaluacion(0.0);		
        
        setid_new(--id_new);
        docente.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setdocente(docente);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //docente.id=id_new;
            
            docentes.push(docente);
                           
            setdocentes(docentes);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let docente1 of docentes) {

                if(docente1.id == docente.id) {
                    Object.assign(docente1,docente);
                    break;
                }
            }                

            setdocentes(docentes);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let docentes2 = docentes.filter((docente1, index, arr) => { 
            return docente1.id != docente.id;
        });

        setdocentes(docentes2);

        if(docente.id > 0) {
            docentes_eliminar.push(docente);

            setdocentes_eliminar(docentes_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setdocente(new Docente());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_docente();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_docente =  () => {
        let data_json_final = {};
        
        let docentes_nuevos = [];
        let docentes_nuevos_final = [];

        let docentes_actualizars = [];
		let docentes_actualizars_final = [];
		
        let ids_docentes_eliminars = [];
        
        let updates_columnas =['nombre','apellido'];

        docentes_nuevos = docentes.filter((docente1:Docente) => { /*, index, arr*/
            return docente1.id < 0 ;
        });

        docentes_nuevos_final = get_docentesNuevosFinal(docentes_nuevos);

        docentes_actualizars = docentes.filter((docente1) => { /*, index, arr*/
            return docente1.id > 0 ;
        });
		
		docentes_actualizars_final = get_docentesActualizarsFinal(docentes_actualizars);
		
        ids_docentes_eliminars = getIds_docentesEliminars();
        
        
        data_json_final = {
            news_docentes : docentes_nuevos_final,
            updates_docentes : docentes_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_docentes: ids_docentes_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_docentesEliminars = () => {
        let ids_docentes_eliminars:Array<number> = [];
    
        for(let docente1 of docentes_eliminar) {
            ids_docentes_eliminars.push(docente1.id);
        }

        return ids_docentes_eliminars;
    };

    const get_docentesNuevosFinal = (docentes_nuevos:Array<Docente>) => {
        let docentes_nuevos_final:Array<DocenteParamCreate> = [];
        
        for(let docente1 of docentes_nuevos) {

            let docente_nuevo_final:DocenteParamCreate = {
				created_at : docente1.created_at,
				updated_at : docente1.updated_at,
				nombre : docente1.nombre,
				apellido : docente1.apellido,
				fecha_nacimiento : docente1.fecha_nacimiento,
				anios_experiencia : docente1.anios_experiencia,
				nota_evaluacion : docente1.nota_evaluacion,
            };

            docentes_nuevos_final.push(docente_nuevo_final);
        }

        return docentes_nuevos_final;
    };

	const get_docentesActualizarsFinal = (docentes_actualizars:Array<Docente>) => {
        let docentes_actualizars_final:Array<DocenteParamUpdate> = [];
        
        for(let docente1 of docentes_actualizars) {

            let docente_actualizar_final:DocenteParamUpdate = {
				id : docente1.id,
				created_at : docente1.created_at,
				updated_at : docente1.updated_at,
				nombre : docente1.nombre,
				apellido : docente1.apellido,
				fecha_nacimiento : docente1.fecha_nacimiento,
				anios_experiencia : docente1.anios_experiencia,
				nota_evaluacion : docente1.nota_evaluacion,
            };

            docentes_actualizars_final.push(docente_actualizar_final);
        }

        return docentes_actualizars_final;
    };
	
	
	
	const setid = (id:number) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.id=id;	setdocente(docente2);};
	const setcreated_at = (created_at:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.created_at=created_at;	setdocente(docente2);};
	const setupdated_at = (updated_at:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.updated_at=updated_at;	setdocente(docente2);};
	const setnombre = (nombre:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.nombre=nombre;	setdocente(docente2);};
	const setapellido = (apellido:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.apellido=apellido;	setdocente(docente2);};
	const setfecha_nacimiento = (fecha_nacimiento:string) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.fecha_nacimiento=fecha_nacimiento;	setdocente(docente2);};
	const setanios_experiencia = (anios_experiencia:number) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.anios_experiencia=anios_experiencia;	setdocente(docente2);};
	const setnota_evaluacion = (nota_evaluacion:number) => {	let docente2 = new Docente();	Object.assign(docente2,docente);	docente2.nota_evaluacion=nota_evaluacion;	setdocente(docente2);};
	
	return (
		
		<div id="divLoteViewGlobal_docente">
			
			<div id="div_docente_form_general" 
				 className="form_general">
			
				<h2>
					Docentes Lote
				</h2>
				
				<form id="docente_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={docente.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={docente.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={docente.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="nombre">Nombre</label>
					<input type="text" id="nombre" name="nombre" placeholder="Nombre"
							value={docente.nombre}
							onChange={(e) => setnombre(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="apellido">Apellido</label>
					<input type="text" id="apellido" name="apellido" placeholder="Apellido"
							value={docente.apellido}
							onChange={(e) => setapellido(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="fecha_nacimiento">Fecha Nacimiento</label>
					<input type="date" id="fecha_nacimiento" name="fecha_nacimiento" placeholder="Fecha Nacimiento"
							value={docente.fecha_nacimiento}
							onChange={(e) => setfecha_nacimiento(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="anios_experiencia">Anios Experiencia</label>
					<input type="text" id="anios_experiencia" name="anios_experiencia" placeholder="Anios Experiencia"
							value={docente.anios_experiencia}
							onChange={(e) => setanios_experiencia(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="nota_evaluacion">Nota Evaluacion</label>
					<input type="text" id="nota_evaluacion" name="nota_evaluacion" placeholder="Nota Evaluacion"
							value={docente.nota_evaluacion}
							onChange={(e) => setnota_evaluacion(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
									
				</form>
					
			</div>
			
			<div id="div_docente_actions_form_general">
				
				<form id="docente_actions_form_general" 
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
			
			<div id="div_docente_tabla_general">
				
				<table id="docente_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th>Id</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th>Nombre</th>
							<th>Apellido</th>
							<th>Fecha Nacimiento</th>
							<th style={{textAlign:"center"}}>Anios Experiencia</th>
							<th style={{textAlign:"center"}}>Nota Evaluacion</th>
						</tr>
					</thead>
					
					<tbody>
						{docentes.map((docente1:Docente) => {
							return [
						<tr key={docente1.id} onClick={(event) => onClickRowTable(docente1.id)}>						
							<td data-label="Id"> {docente1.id} </td>
							<td data-label="Created At"> {docente1.created_at} </td>
							<td data-label="Updated At"> {docente1.updated_at} </td>
							<td data-label="Nombre"> {docente1.nombre} </td>
							<td data-label="Apellido"> {docente1.apellido} </td>
							<td data-label="Fecha Nacimiento"> {docente1.fecha_nacimiento} </td>
							<td data-label="Anios Experiencia" style={{textAlign:"center"}}> {docente1.anios_experiencia} </td>
							<td data-label="Nota Evaluacion" style={{textAlign:"center"}}> {docente1.nota_evaluacion} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
		</div>
	);
}

export {DocenteLoteView};