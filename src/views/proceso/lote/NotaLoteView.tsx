import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Nota} from "../../../ts/entity/proceso/Nota";
import {NotaReturnView} from "../../../ts/dto/proceso/nota/NotaReturnView";

import {NotaFKReturnView} from "../../../ts/dto/proceso/nota/NotaFKReturnView";

import {NotaParamCreate} from "../../../ts/type/proceso/nota/NotaParamCreate";
import {NotaParamUpdate} from "../../../ts/type/proceso/nota/NotaParamUpdate";

/*FKs*/
import {Alumno} from '../../../ts/entity/estructura/Alumno';
import {Materia} from '../../../ts/entity/estructura/Materia';
import {Docente} from '../../../ts/entity/estructura/Docente';



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


function NotaLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Nota');
	//------------------ ACCIONES -------------------
	const [module] = useState('proceso');
	const [controller] = useState('nota_api');
	//------------------ DATOS ----------------------
	let [nota,setnota] = useState(new Nota()); //,setnota
	let [notas,setnotas] = useState(new Array<Nota>());	
	
	let [id_new,setid_new] = useState(0);
    let [notas_eliminar,setnotas_eliminar] = useState(new Array<Nota>());

    let [accion,setaccion] = useState('CANCELAR');

    let [form_deshabilitado,setform_deshabilitado] = useState(true);
    let [nuevo_preparar_display,setnuevo_preparar_display] = useState('block');
    let [actualizar_display,setactualizar_display] = useState('none');
    let [eliminar_display,seteliminar_display] = useState('none');
	
	/*FKs*/
		
	let [alumnosFK, setalumnosFK] = useState(new Array<Alumno>());
	let [materiasFK, setmateriasFK] = useState(new Array<Materia>());
	let [docentesFK, setdocentesFK] = useState(new Array<Docente>());
	
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

        setnotas(data.notas);
	};

    const onClickRowTable = async (id:number) => {
        let nota2:Nota | undefined = notas.find(nota1 => nota1.id==id);
        //let nota3:Nota = new Nota();

        //Object.assign(nota3,nota2);
        //Object.assign(nota3,nota2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setnota(nota2!);
    };

    const nuevoPreparar = () => {
		nota = new Nota();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setid_alumno(-1);		
		setid_materia(-1);		
		setid_docente(-1);		
		setnota_prueba(0.0);		
		setnota_trabajo(0.0);		
		setnota_examen(0.0);		
		setnota_final(0.0);		
        
        setid_new(--id_new);
        nota.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setnota(nota);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //nota.id=id_new;
            
            notas.push(nota);
                           
            setnotas(notas);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let nota1 of notas) {

                if(nota1.id == nota.id) {
                    Object.assign(nota1,nota);
                    break;
                }
            }                

            setnotas(notas);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let notas2 = notas.filter((nota1, index, arr) => { 
            return nota1.id != nota.id;
        });

        setnotas(notas2);

        if(nota.id > 0) {
            notas_eliminar.push(nota);

            setnotas_eliminar(notas_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setnota(new Nota());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_nota();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_nota =  () => {
        let data_json_final = {};
        
        let notas_nuevos = [];
        let notas_nuevos_final = [];

        let notas_actualizars = [];
		let notas_actualizars_final = [];
		
        let ids_notas_eliminars = [];
        
        let updates_columnas =['id_alumno','id_materia'];

        notas_nuevos = notas.filter((nota1:Nota) => { /*, index, arr*/
            return nota1.id < 0 ;
        });

        notas_nuevos_final = get_notasNuevosFinal(notas_nuevos);

        notas_actualizars = notas.filter((nota1) => { /*, index, arr*/
            return nota1.id > 0 ;
        });
		
		notas_actualizars_final = get_notasActualizarsFinal(notas_actualizars);
		
        ids_notas_eliminars = getIds_notasEliminars();
        
        
        data_json_final = {
            news_notas : notas_nuevos_final,
            updates_notas : notas_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_notas: ids_notas_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_notasEliminars = () => {
        let ids_notas_eliminars:Array<number> = [];
    
        for(let nota1 of notas_eliminar) {
            ids_notas_eliminars.push(nota1.id);
        }

        return ids_notas_eliminars;
    };

    const get_notasNuevosFinal = (notas_nuevos:Array<Nota>) => {
        let notas_nuevos_final:Array<NotaParamCreate> = [];
        
        for(let nota1 of notas_nuevos) {

            let nota_nuevo_final:NotaParamCreate = {
				created_at : nota1.created_at,
				updated_at : nota1.updated_at,
				id_alumno : nota1.id_alumno,
				id_materia : nota1.id_materia,
				id_docente : nota1.id_docente,
				nota_prueba : nota1.nota_prueba,
				nota_trabajo : nota1.nota_trabajo,
				nota_examen : nota1.nota_examen,
				nota_final : nota1.nota_final,
            };

            notas_nuevos_final.push(nota_nuevo_final);
        }

        return notas_nuevos_final;
    };

	const get_notasActualizarsFinal = (notas_actualizars:Array<Nota>) => {
        let notas_actualizars_final:Array<NotaParamUpdate> = [];
        
        for(let nota1 of notas_actualizars) {

            let nota_actualizar_final:NotaParamUpdate = {
				id : nota1.id,
				created_at : nota1.created_at,
				updated_at : nota1.updated_at,
				id_alumno : nota1.id_alumno,
				id_materia : nota1.id_materia,
				id_docente : nota1.id_docente,
				nota_prueba : nota1.nota_prueba,
				nota_trabajo : nota1.nota_trabajo,
				nota_examen : nota1.nota_examen,
				nota_final : nota1.nota_final,
            };

            notas_actualizars_final.push(nota_actualizar_final);
        }

        return notas_actualizars_final;
    };
	
	/*FKs*/
	const getFks = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);									
		const data_json = {};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		const data:NotaFKReturnView = await response_json.json();
		
		
			setalumnosFK(data.alumnosFK);
			setmateriasFK(data.materiasFK);
			setdocentesFK(data.docentesFK);			
	};
	
	const funLoadFormulario = () => {
		/*FKs*/
		getFks();
	};
	
	useEffect(funLoadFormulario, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	const setid = (id:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.id=id;	setnota(nota2);};
	const setcreated_at = (created_at:string) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.created_at=created_at;	setnota(nota2);};
	const setupdated_at = (updated_at:string) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.updated_at=updated_at;	setnota(nota2);};
	const setid_alumno = (id_alumno:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.id_alumno=id_alumno;	setnota(nota2);};
	const setid_materia = (id_materia:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.id_materia=id_materia;	setnota(nota2);};
	const setid_docente = (id_docente:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.id_docente=id_docente;	setnota(nota2);};
	const setnota_prueba = (nota_prueba:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.nota_prueba=nota_prueba;	setnota(nota2);};
	const setnota_trabajo = (nota_trabajo:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.nota_trabajo=nota_trabajo;	setnota(nota2);};
	const setnota_examen = (nota_examen:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.nota_examen=nota_examen;	setnota(nota2);};
	const setnota_final = (nota_final:number) => {	let nota2 = new Nota();	Object.assign(nota2,nota);	nota2.nota_final=nota_final;	setnota(nota2);};
	
	return (
		
		<div id="divLoteViewGlobal_nota">
			
			<div id="div_nota_form_general" 
				 className="form_general">
			
				<h2>
					Notas Lote
				</h2>
				
				<form id="nota_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={nota.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={nota.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={nota.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="id_alumno"> Alumno</label>
					<select id="id_alumno" name="id_alumno" 
							value={nota.id_alumno.toString()} placeholder=" Alumno"
							onChange={(e) => setid_alumno(Number(e.target.value))}
							disabled={form_deshabilitado} >
						
						{alumnosFK.map((alumno:any) => { 
							return [
						<option key={alumno.id} value={alumno.id}>
							{ alumno.nombre }
						</option>
							]
						})}
						
					</select>
				
					
					<label htmlFor="id_materia"> Materia</label>
					<select id="id_materia" name="id_materia" 
							value={nota.id_materia.toString()} placeholder=" Materia"
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
				
					
					<label htmlFor="id_docente"> Docente</label>
					<select id="id_docente" name="id_docente" 
							value={nota.id_docente.toString()} placeholder=" Docente"
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
				
					
					<label htmlFor="nota_prueba">Nota Prueba</label>
					<input type="text" id="nota_prueba" name="nota_prueba" placeholder="Nota Prueba"
							value={nota.nota_prueba}
							onChange={(e) => setnota_prueba(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="nota_trabajo">Nota Trabajo</label>
					<input type="text" id="nota_trabajo" name="nota_trabajo" placeholder="Nota Trabajo"
							value={nota.nota_trabajo}
							onChange={(e) => setnota_trabajo(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="nota_examen">Nota Examen</label>
					<input type="text" id="nota_examen" name="nota_examen" placeholder="Nota Examen"
							value={nota.nota_examen}
							onChange={(e) => setnota_examen(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="nota_final">Nota Final</label>
					<input type="text" id="nota_final" name="nota_final" placeholder="Nota Final"
							value={nota.nota_final}
							onChange={(e) => setnota_final(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
									
				</form>
					
			</div>
			
			<div id="div_nota_actions_form_general">
				
				<form id="nota_actions_form_general" 
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
			
			<div id="div_nota_tabla_general">
				
				<table id="nota_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th>Id</th>
							<th>Created At</th>
							<th>Updated At</th>
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
						{notas.map((nota1:Nota) => {
							return [
						<tr key={nota1.id} onClick={(event) => onClickRowTable(nota1.id)}>						
							<td data-label="Id"> {nota1.id} </td>
							<td data-label="Created At"> {nota1.created_at} </td>
							<td data-label="Updated At"> {nota1.updated_at} </td>
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
			
		</div>
	);
}

export {NotaLoteView};