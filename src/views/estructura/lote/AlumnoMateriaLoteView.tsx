import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {AlumnoMateria} from "../../../ts/entity/estructura/AlumnoMateria";
import {AlumnoMateriaReturnView} from "../../../ts/dto/estructura/alumno_materia/AlumnoMateriaReturnView";

import {AlumnoMateriaFKReturnView} from "../../../ts/dto/estructura/alumno_materia/AlumnoMateriaFKReturnView";

import {AlumnoMateriaParamCreate} from "../../../ts/type/estructura/alumno_materia/AlumnoMateriaParamCreate";
import {AlumnoMateriaParamUpdate} from "../../../ts/type/estructura/alumno_materia/AlumnoMateriaParamUpdate";

/*FKs*/
import {Alumno} from '../../../ts/entity/estructura/Alumno';
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


function AlumnoMateriaLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Alumno Materia');
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('alumno_materia_api');
	//------------------ DATOS ----------------------
	let [alumno_materia,setalumno_materia] = useState(new AlumnoMateria()); //,setalumno_materia
	let [alumno_materias,setalumno_materias] = useState(new Array<AlumnoMateria>());	
	
	let [id_new,setid_new] = useState(0);
    let [alumno_materias_eliminar,setalumno_materias_eliminar] = useState(new Array<AlumnoMateria>());

    let [accion,setaccion] = useState('CANCELAR');

    let [form_deshabilitado,setform_deshabilitado] = useState(true);
    let [nuevo_preparar_display,setnuevo_preparar_display] = useState('block');
    let [actualizar_display,setactualizar_display] = useState('none');
    let [eliminar_display,seteliminar_display] = useState('none');
	
	/*FKs*/
		
	let [alumnosFK, setalumnosFK] = useState(new Array<Alumno>());
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

        setalumno_materias(data.alumno_materias);
	};

    const onClickRowTable = async (id:number) => {
        let alumno_materia2:AlumnoMateria | undefined = alumno_materias.find(alumno_materia1 => alumno_materia1.id==id);
        //let alumno_materia3:AlumnoMateria = new AlumnoMateria();

        //Object.assign(alumno_materia3,alumno_materia2);
        //Object.assign(alumno_materia3,alumno_materia2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setalumno_materia(alumno_materia2!);
    };

    const nuevoPreparar = () => {
		alumno_materia = new AlumnoMateria();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setid_alumno(-1);		
		setid_materia(-1);		
        
        setid_new(--id_new);
        alumno_materia.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setalumno_materia(alumno_materia);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //alumno_materia.id=id_new;
            
            alumno_materias.push(alumno_materia);
                           
            setalumno_materias(alumno_materias);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let alumno_materia1 of alumno_materias) {

                if(alumno_materia1.id == alumno_materia.id) {
                    Object.assign(alumno_materia1,alumno_materia);
                    break;
                }
            }                

            setalumno_materias(alumno_materias);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let alumno_materias2 = alumno_materias.filter((alumno_materia1, index, arr) => { 
            return alumno_materia1.id != alumno_materia.id;
        });

        setalumno_materias(alumno_materias2);

        if(alumno_materia.id > 0) {
            alumno_materias_eliminar.push(alumno_materia);

            setalumno_materias_eliminar(alumno_materias_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setalumno_materia(new AlumnoMateria());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_alumno_materia();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_alumno_materia =  () => {
        let data_json_final = {};
        
        let alumno_materias_nuevos = [];
        let alumno_materias_nuevos_final = [];

        let alumno_materias_actualizars = [];
		let alumno_materias_actualizars_final = [];
		
        let ids_alumno_materias_eliminars = [];
        
        let updates_columnas =['id_alumno','id_materia'];

        alumno_materias_nuevos = alumno_materias.filter((alumno_materia1:AlumnoMateria) => { /*, index, arr*/
            return alumno_materia1.id < 0 ;
        });

        alumno_materias_nuevos_final = get_alumno_materiasNuevosFinal(alumno_materias_nuevos);

        alumno_materias_actualizars = alumno_materias.filter((alumno_materia1) => { /*, index, arr*/
            return alumno_materia1.id > 0 ;
        });
		
		alumno_materias_actualizars_final = get_alumno_materiasActualizarsFinal(alumno_materias_actualizars);
		
        ids_alumno_materias_eliminars = getIds_alumno_materiasEliminars();
        
        
        data_json_final = {
            news_alumno_materias : alumno_materias_nuevos_final,
            updates_alumno_materias : alumno_materias_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_alumno_materias: ids_alumno_materias_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_alumno_materiasEliminars = () => {
        let ids_alumno_materias_eliminars:Array<number> = [];
    
        for(let alumno_materia1 of alumno_materias_eliminar) {
            ids_alumno_materias_eliminars.push(alumno_materia1.id);
        }

        return ids_alumno_materias_eliminars;
    };

    const get_alumno_materiasNuevosFinal = (alumno_materias_nuevos:Array<AlumnoMateria>) => {
        let alumno_materias_nuevos_final:Array<AlumnoMateriaParamCreate> = [];
        
        for(let alumno_materia1 of alumno_materias_nuevos) {

            let alumno_materia_nuevo_final:AlumnoMateriaParamCreate = {
				created_at : alumno_materia1.created_at,
				updated_at : alumno_materia1.updated_at,
				id_alumno : alumno_materia1.id_alumno,
				id_materia : alumno_materia1.id_materia,
            };

            alumno_materias_nuevos_final.push(alumno_materia_nuevo_final);
        }

        return alumno_materias_nuevos_final;
    };

	const get_alumno_materiasActualizarsFinal = (alumno_materias_actualizars:Array<AlumnoMateria>) => {
        let alumno_materias_actualizars_final:Array<AlumnoMateriaParamUpdate> = [];
        
        for(let alumno_materia1 of alumno_materias_actualizars) {

            let alumno_materia_actualizar_final:AlumnoMateriaParamUpdate = {
				id : alumno_materia1.id,
				created_at : alumno_materia1.created_at,
				updated_at : alumno_materia1.updated_at,
				id_alumno : alumno_materia1.id_alumno,
				id_materia : alumno_materia1.id_materia,
            };

            alumno_materias_actualizars_final.push(alumno_materia_actualizar_final);
        }

        return alumno_materias_actualizars_final;
    };
	
	/*FKs*/
	const getFks = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);									
		const data_json = {};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		const data:AlumnoMateriaFKReturnView = await response_json.json();
		
		
			setalumnosFK(data.alumnosFK);
			setmateriasFK(data.materiasFK);			
	};
	
	const funLoadFormulario = () => {
		/*FKs*/
		getFks();
	};
	
	useEffect(funLoadFormulario, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	const setid = (id:number) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.id=id;	setalumno_materia(alumno_materia2);};
	const setcreated_at = (created_at:string) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.created_at=created_at;	setalumno_materia(alumno_materia2);};
	const setupdated_at = (updated_at:string) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.updated_at=updated_at;	setalumno_materia(alumno_materia2);};
	const setid_alumno = (id_alumno:number) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.id_alumno=id_alumno;	setalumno_materia(alumno_materia2);};
	const setid_materia = (id_materia:number) => {	let alumno_materia2 = new AlumnoMateria();	Object.assign(alumno_materia2,alumno_materia);	alumno_materia2.id_materia=id_materia;	setalumno_materia(alumno_materia2);};
	
	return (
		
		<div id="divLoteViewGlobal_alumno_materia">
			
			<div id="div_alumno_materia_form_general" 
				 className="form_general">
			
				<h2>
					Alumno Materias Lote
				</h2>
				
				<form id="alumno_materia_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={alumno_materia.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={alumno_materia.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={alumno_materia.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="id_alumno"> Alumno</label>
					<select id="id_alumno" name="id_alumno" 
							value={alumno_materia.id_alumno.toString()} placeholder=" Alumno"
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
							value={alumno_materia.id_materia.toString()} placeholder=" Materia"
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
			
			<div id="div_alumno_materia_actions_form_general">
				
				<form id="alumno_materia_actions_form_general" 
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
			
			<div id="div_alumno_materia_tabla_general">
				
				<table id="alumno_materia_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th>Id</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th> Alumno</th>
							<th> Materia</th>
						</tr>
					</thead>
					
					<tbody>
						{alumno_materias.map((alumno_materia1:AlumnoMateria) => {
							return [
						<tr key={alumno_materia1.id} onClick={(event) => onClickRowTable(alumno_materia1.id)}>						
							<td data-label="Id"> {alumno_materia1.id} </td>
							<td data-label="Created At"> {alumno_materia1.created_at} </td>
							<td data-label="Updated At"> {alumno_materia1.updated_at} </td>
							<td data-label=" Alumno"> {alumno_materia1.alumno!.nombre} </td>
							<td data-label=" Materia"> {alumno_materia1.materia!.codigo} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
		</div>
	);
}

export {AlumnoMateriaLoteView};