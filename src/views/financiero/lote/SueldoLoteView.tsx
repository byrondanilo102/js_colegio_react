import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Sueldo} from "../../../ts/entity/financiero/Sueldo";
import {SueldoReturnView} from "../../../ts/dto/financiero/sueldo/SueldoReturnView";

import {SueldoFKReturnView} from "../../../ts/dto/financiero/sueldo/SueldoFKReturnView";

import {SueldoParamCreate} from "../../../ts/type/financiero/sueldo/SueldoParamCreate";
import {SueldoParamUpdate} from "../../../ts/type/financiero/sueldo/SueldoParamUpdate";

/*FKs*/
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


function SueldoLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Sueldo');
	//------------------ ACCIONES -------------------
	const [module] = useState('financiero');
	const [controller] = useState('sueldo_api');
	//------------------ DATOS ----------------------
	let [sueldo,setsueldo] = useState(new Sueldo()); //,setsueldo
	let [sueldos,setsueldos] = useState(new Array<Sueldo>());	
	
	let [id_new,setid_new] = useState(0);
    let [sueldos_eliminar,setsueldos_eliminar] = useState(new Array<Sueldo>());

    let [accion,setaccion] = useState('CANCELAR');

    let [form_deshabilitado,setform_deshabilitado] = useState(true);
    let [nuevo_preparar_display,setnuevo_preparar_display] = useState('block');
    let [actualizar_display,setactualizar_display] = useState('none');
    let [eliminar_display,seteliminar_display] = useState('none');
	
	/*FKs*/
		
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

        setsueldos(data.sueldos);
	};

    const onClickRowTable = async (id:number) => {
        let sueldo2:Sueldo | undefined = sueldos.find(sueldo1 => sueldo1.id==id);
        //let sueldo3:Sueldo = new Sueldo();

        //Object.assign(sueldo3,sueldo2);
        //Object.assign(sueldo3,sueldo2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setsueldo(sueldo2!);
    };

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};

    const nuevoPreparar = () => {
		sueldo = new Sueldo();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setid_docente(-1);		
		setanio(0);		
		setmes(0);		
		setvalor(0.0);		
		setcobrado(false);		
        
        setid_new(--id_new);
        sueldo.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setsueldo(sueldo);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //sueldo.id=id_new;
            
            sueldos.push(sueldo);
                           
            setsueldos(sueldos);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let sueldo1 of sueldos) {

                if(sueldo1.id == sueldo.id) {
                    Object.assign(sueldo1,sueldo);
                    break;
                }
            }                

            setsueldos(sueldos);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let sueldos2 = sueldos.filter((sueldo1, index, arr) => { 
            return sueldo1.id != sueldo.id;
        });

        setsueldos(sueldos2);

        if(sueldo.id > 0) {
            sueldos_eliminar.push(sueldo);

            setsueldos_eliminar(sueldos_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setsueldo(new Sueldo());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_sueldo();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_sueldo =  () => {
        let data_json_final = {};
        
        let sueldos_nuevos = [];
        let sueldos_nuevos_final = [];

        let sueldos_actualizars = [];
		let sueldos_actualizars_final = [];
		
        let ids_sueldos_eliminars = [];
        
        let updates_columnas =['id_docente','anio'];

        sueldos_nuevos = sueldos.filter((sueldo1:Sueldo) => { /*, index, arr*/
            return sueldo1.id < 0 ;
        });

        sueldos_nuevos_final = get_sueldosNuevosFinal(sueldos_nuevos);

        sueldos_actualizars = sueldos.filter((sueldo1) => { /*, index, arr*/
            return sueldo1.id > 0 ;
        });
		
		sueldos_actualizars_final = get_sueldosActualizarsFinal(sueldos_actualizars);
		
        ids_sueldos_eliminars = getIds_sueldosEliminars();
        
        
        data_json_final = {
            news_sueldos : sueldos_nuevos_final,
            updates_sueldos : sueldos_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_sueldos: ids_sueldos_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_sueldosEliminars = () => {
        let ids_sueldos_eliminars:Array<number> = [];
    
        for(let sueldo1 of sueldos_eliminar) {
            ids_sueldos_eliminars.push(sueldo1.id);
        }

        return ids_sueldos_eliminars;
    };

    const get_sueldosNuevosFinal = (sueldos_nuevos:Array<Sueldo>) => {
        let sueldos_nuevos_final:Array<SueldoParamCreate> = [];
        
        for(let sueldo1 of sueldos_nuevos) {

            let sueldo_nuevo_final:SueldoParamCreate = {
				created_at : sueldo1.created_at,
				updated_at : sueldo1.updated_at,
				id_docente : sueldo1.id_docente,
				anio : sueldo1.anio,
				mes : sueldo1.mes,
				valor : sueldo1.valor,
				cobrado : sueldo1.cobrado,
            };

            sueldos_nuevos_final.push(sueldo_nuevo_final);
        }

        return sueldos_nuevos_final;
    };

	const get_sueldosActualizarsFinal = (sueldos_actualizars:Array<Sueldo>) => {
        let sueldos_actualizars_final:Array<SueldoParamUpdate> = [];
        
        for(let sueldo1 of sueldos_actualizars) {

            let sueldo_actualizar_final:SueldoParamUpdate = {
				id : sueldo1.id,
				created_at : sueldo1.created_at,
				updated_at : sueldo1.updated_at,
				id_docente : sueldo1.id_docente,
				anio : sueldo1.anio,
				mes : sueldo1.mes,
				valor : sueldo1.valor,
				cobrado : sueldo1.cobrado,
            };

            sueldos_actualizars_final.push(sueldo_actualizar_final);
        }

        return sueldos_actualizars_final;
    };
	
	/*FKs*/
	const getFks = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);									
		const data_json = {};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		const data:SueldoFKReturnView = await response_json.json();
		
		
			setdocentesFK(data.docentesFK);			
	};
	
	const funLoadFormulario = () => {
		/*FKs*/
		getFks();
	};
	
	useEffect(funLoadFormulario, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	const setid = (id:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.id=id;	setsueldo(sueldo2);};
	const setcreated_at = (created_at:string) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.created_at=created_at;	setsueldo(sueldo2);};
	const setupdated_at = (updated_at:string) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.updated_at=updated_at;	setsueldo(sueldo2);};
	const setid_docente = (id_docente:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.id_docente=id_docente;	setsueldo(sueldo2);};
	const setanio = (anio:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.anio=anio;	setsueldo(sueldo2);};
	const setmes = (mes:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.mes=mes;	setsueldo(sueldo2);};
	const setvalor = (valor:number) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.valor=valor;	setsueldo(sueldo2);};
	const setcobrado = (cobrado:boolean) => {	let sueldo2 = new Sueldo();	Object.assign(sueldo2,sueldo);	sueldo2.cobrado=cobrado;	setsueldo(sueldo2);};
	
	return (
		
		<div id="divLoteViewGlobal_sueldo">
			
			<div id="div_sueldo_form_general" 
				 className="form_general">
			
				<h2>
					Sueldos Lote
				</h2>
				
				<form id="sueldo_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={sueldo.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={sueldo.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={sueldo.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="id_docente"> Docente</label>
					<select id="id_docente" name="id_docente" 
							value={sueldo.id_docente.toString()} placeholder=" Docente"
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
				
					
					<label htmlFor="anio">Anio</label>
					<input type="text" id="anio" name="anio" placeholder="Anio"
							value={sueldo.anio}
							onChange={(e) => setanio(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="mes">Mes</label>
					<input type="text" id="mes" name="mes" placeholder="Mes"
							value={sueldo.mes}
							onChange={(e) => setmes(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="valor">Valor</label>
					<input type="text" id="valor" name="valor" placeholder="Valor"
							value={sueldo.valor}
							onChange={(e) => setvalor(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="cobrado">Cobrado</label>
					<input type="checkbox" id="cobrado" name="cobrado" placeholder="Cobrado"
							checked={sueldo.cobrado}
							onChange={(e) => setcobrado(Boolean(e.target.checked))}
							disabled={form_deshabilitado} />
						
									
				</form>
					
			</div>
			
			<div id="div_sueldo_actions_form_general">
				
				<form id="sueldo_actions_form_general" 
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
			
			<div id="div_sueldo_tabla_general">
				
				<table id="sueldo_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th>Id</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th> Docente</th>
							<th style={{textAlign:"center"}}>Anio</th>
							<th style={{textAlign:"center"}}>Mes</th>
							<th style={{textAlign:"center"}}>Valor</th>
							<th style={{textAlign:"center"}}>Cobrado</th>
						</tr>
					</thead>
					
					<tbody>
						{sueldos.map((sueldo1:Sueldo) => {
							return [
						<tr key={sueldo1.id} onClick={(event) => onClickRowTable(sueldo1.id)}>						
							<td data-label="Id"> {sueldo1.id} </td>
							<td data-label="Created At"> {sueldo1.created_at} </td>
							<td data-label="Updated At"> {sueldo1.updated_at} </td>
							<td data-label=" Docente"> {sueldo1.docente!.nombre} </td>
							<td data-label="Anio" style={{textAlign:"center"}}> {sueldo1.anio} </td>
							<td data-label="Mes" style={{textAlign:"center"}}> {sueldo1.mes} </td>
							<td data-label="Valor" style={{textAlign:"center"}}> {sueldo1.valor} </td>
							<td data-label="Cobrado" style={{textAlign:"center"}}> {GetLabelBoolean(sueldo1.cobrado)} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
		</div>
	);
}

export {SueldoLoteView};