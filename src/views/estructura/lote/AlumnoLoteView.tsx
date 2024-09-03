import React,{useState,forwardRef,useImperativeHandle} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Alumno} from "../../../ts/entity/estructura/Alumno";
import {AlumnoReturnView} from "../../../ts/dto/estructura/alumno/AlumnoReturnView";


import {AlumnoParamCreate} from "../../../ts/type/estructura/alumno/AlumnoParamCreate";
import {AlumnoParamUpdate} from "../../../ts/type/estructura/alumno/AlumnoParamUpdate";

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


function AlumnoLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Alumno');
	//------------------ ACCIONES -------------------
	const [module] = useState('estructura');
	const [controller] = useState('alumno_api');
	//------------------ DATOS ----------------------
	let [alumno,setalumno] = useState(new Alumno()); //,setalumno
	let [alumnos,setalumnos] = useState(new Array<Alumno>());	
	
	let [id_new,setid_new] = useState(0);
    let [alumnos_eliminar,setalumnos_eliminar] = useState(new Array<Alumno>());

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

        setalumnos(data.alumnos);
	};

    const onClickRowTable = async (id:number) => {
        let alumno2:Alumno | undefined = alumnos.find(alumno1 => alumno1.id==id);
        //let alumno3:Alumno = new Alumno();

        //Object.assign(alumno3,alumno2);
        //Object.assign(alumno3,alumno2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setalumno(alumno2!);
    };

    const nuevoPreparar = () => {
		alumno = new Alumno();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setnombre('');		
		setapellido('');		
		setfecha_nacimiento(FuncionGeneral.GetLabelDate(new Date()));
        
        setid_new(--id_new);
        alumno.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setalumno(alumno);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //alumno.id=id_new;
            
            alumnos.push(alumno);
                           
            setalumnos(alumnos);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let alumno1 of alumnos) {

                if(alumno1.id == alumno.id) {
                    Object.assign(alumno1,alumno);
                    break;
                }
            }                

            setalumnos(alumnos);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let alumnos2 = alumnos.filter((alumno1, index, arr) => { 
            return alumno1.id != alumno.id;
        });

        setalumnos(alumnos2);

        if(alumno.id > 0) {
            alumnos_eliminar.push(alumno);

            setalumnos_eliminar(alumnos_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setalumno(new Alumno());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_alumno();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_alumno =  () => {
        let data_json_final = {};
        
        let alumnos_nuevos = [];
        let alumnos_nuevos_final = [];

        let alumnos_actualizars = [];
		let alumnos_actualizars_final = [];
		
        let ids_alumnos_eliminars = [];
        
        let updates_columnas =['nombre','apellido'];

        alumnos_nuevos = alumnos.filter((alumno1:Alumno) => { /*, index, arr*/
            return alumno1.id < 0 ;
        });

        alumnos_nuevos_final = get_alumnosNuevosFinal(alumnos_nuevos);

        alumnos_actualizars = alumnos.filter((alumno1) => { /*, index, arr*/
            return alumno1.id > 0 ;
        });
		
		alumnos_actualizars_final = get_alumnosActualizarsFinal(alumnos_actualizars);
		
        ids_alumnos_eliminars = getIds_alumnosEliminars();
        
        
        data_json_final = {
            news_alumnos : alumnos_nuevos_final,
            updates_alumnos : alumnos_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_alumnos: ids_alumnos_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_alumnosEliminars = () => {
        let ids_alumnos_eliminars:Array<number> = [];
    
        for(let alumno1 of alumnos_eliminar) {
            ids_alumnos_eliminars.push(alumno1.id);
        }

        return ids_alumnos_eliminars;
    };

    const get_alumnosNuevosFinal = (alumnos_nuevos:Array<Alumno>) => {
        let alumnos_nuevos_final:Array<AlumnoParamCreate> = [];
        
        for(let alumno1 of alumnos_nuevos) {

            let alumno_nuevo_final:AlumnoParamCreate = {
				created_at : alumno1.created_at,
				updated_at : alumno1.updated_at,
				nombre : alumno1.nombre,
				apellido : alumno1.apellido,
				fecha_nacimiento : alumno1.fecha_nacimiento,
            };

            alumnos_nuevos_final.push(alumno_nuevo_final);
        }

        return alumnos_nuevos_final;
    };

	const get_alumnosActualizarsFinal = (alumnos_actualizars:Array<Alumno>) => {
        let alumnos_actualizars_final:Array<AlumnoParamUpdate> = [];
        
        for(let alumno1 of alumnos_actualizars) {

            let alumno_actualizar_final:AlumnoParamUpdate = {
				id : alumno1.id,
				created_at : alumno1.created_at,
				updated_at : alumno1.updated_at,
				nombre : alumno1.nombre,
				apellido : alumno1.apellido,
				fecha_nacimiento : alumno1.fecha_nacimiento,
            };

            alumnos_actualizars_final.push(alumno_actualizar_final);
        }

        return alumnos_actualizars_final;
    };
	
	
	
	const setid = (id:number) => {	let alumno2 = new Alumno();	Object.assign(alumno2,alumno);	alumno2.id=id;	setalumno(alumno2);};
	const setcreated_at = (created_at:string) => {	let alumno2 = new Alumno();	Object.assign(alumno2,alumno);	alumno2.created_at=created_at;	setalumno(alumno2);};
	const setupdated_at = (updated_at:string) => {	let alumno2 = new Alumno();	Object.assign(alumno2,alumno);	alumno2.updated_at=updated_at;	setalumno(alumno2);};
	const setnombre = (nombre:string) => {	let alumno2 = new Alumno();	Object.assign(alumno2,alumno);	alumno2.nombre=nombre;	setalumno(alumno2);};
	const setapellido = (apellido:string) => {	let alumno2 = new Alumno();	Object.assign(alumno2,alumno);	alumno2.apellido=apellido;	setalumno(alumno2);};
	const setfecha_nacimiento = (fecha_nacimiento:string) => {	let alumno2 = new Alumno();	Object.assign(alumno2,alumno);	alumno2.fecha_nacimiento=fecha_nacimiento;	setalumno(alumno2);};
	
	return (
		
		<div id="divLoteViewGlobal_alumno">
			
			<div id="div_alumno_form_general" 
				 className="form_general">
			
				<h2>
					Alumnos Lote
				</h2>
				
				<form id="alumno_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={alumno.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={alumno.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={alumno.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="nombre">Nombre</label>
					<input type="text" id="nombre" name="nombre" placeholder="Nombre"
							value={alumno.nombre}
							onChange={(e) => setnombre(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="apellido">Apellido</label>
					<input type="text" id="apellido" name="apellido" placeholder="Apellido"
							value={alumno.apellido}
							onChange={(e) => setapellido(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="fecha_nacimiento">Fecha Nacimiento</label>
					<input type="date" id="fecha_nacimiento" name="fecha_nacimiento" placeholder="Fecha Nacimiento"
							value={alumno.fecha_nacimiento}
							onChange={(e) => setfecha_nacimiento(e.target.value)}
							disabled={form_deshabilitado} />
													
									
				</form>
					
			</div>
			
			<div id="div_alumno_actions_form_general">
				
				<form id="alumno_actions_form_general" 
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
			
			<div id="div_alumno_tabla_general">
				
				<table id="alumno_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th>Id</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th>Nombre</th>
							<th>Apellido</th>
							<th>Fecha Nacimiento</th>
						</tr>
					</thead>
					
					<tbody>
						{alumnos.map((alumno1:Alumno) => {
							return [
						<tr key={alumno1.id} onClick={(event) => onClickRowTable(alumno1.id)}>						
							<td data-label="Id"> {alumno1.id} </td>
							<td data-label="Created At"> {alumno1.created_at} </td>
							<td data-label="Updated At"> {alumno1.updated_at} </td>
							<td data-label="Nombre"> {alumno1.nombre} </td>
							<td data-label="Apellido"> {alumno1.apellido} </td>
							<td data-label="Fecha Nacimiento"> {alumno1.fecha_nacimiento} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
		</div>
	);
}

export {AlumnoLoteView};