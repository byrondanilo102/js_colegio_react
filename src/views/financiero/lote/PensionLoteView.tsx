import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Pension} from "../../../ts/entity/financiero/Pension";
import {PensionReturnView} from "../../../ts/dto/financiero/pension/PensionReturnView";

import {PensionFKReturnView} from "../../../ts/dto/financiero/pension/PensionFKReturnView";

import {PensionParamCreate} from "../../../ts/type/financiero/pension/PensionParamCreate";
import {PensionParamUpdate} from "../../../ts/type/financiero/pension/PensionParamUpdate";

/*FKs*/
import {Alumno} from '../../../ts/entity/estructura/Alumno';



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


function PensionLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Pension');
	//------------------ ACCIONES -------------------
	const [module] = useState('financiero');
	const [controller] = useState('pension_api');
	//------------------ DATOS ----------------------
	let [pension,setpension] = useState(new Pension()); //,setpension
	let [pensions,setpensions] = useState(new Array<Pension>());	
	
	let [id_new,setid_new] = useState(0);
    let [pensions_eliminar,setpensions_eliminar] = useState(new Array<Pension>());

    let [accion,setaccion] = useState('CANCELAR');

    let [form_deshabilitado,setform_deshabilitado] = useState(true);
    let [nuevo_preparar_display,setnuevo_preparar_display] = useState('block');
    let [actualizar_display,setactualizar_display] = useState('none');
    let [eliminar_display,seteliminar_display] = useState('none');
	
	/*FKs*/
		
	let [alumnosFK, setalumnosFK] = useState(new Array<Alumno>());
	
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

        setpensions(data.pensions);
	};

    const onClickRowTable = async (id:number) => {
        let pension2:Pension | undefined = pensions.find(pension1 => pension1.id==id);
        //let pension3:Pension = new Pension();

        //Object.assign(pension3,pension2);
        //Object.assign(pension3,pension2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setpension(pension2!);
    };

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};

    const nuevoPreparar = () => {
		pension = new Pension();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setid_alumno(-1);		
		setanio(0);		
		setmes(0);		
		setvalor(0.0);		
		setcobrado(false);		
        
        setid_new(--id_new);
        pension.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setpension(pension);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //pension.id=id_new;
            
            pensions.push(pension);
                           
            setpensions(pensions);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let pension1 of pensions) {

                if(pension1.id == pension.id) {
                    Object.assign(pension1,pension);
                    break;
                }
            }                

            setpensions(pensions);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let pensions2 = pensions.filter((pension1, index, arr) => { 
            return pension1.id != pension.id;
        });

        setpensions(pensions2);

        if(pension.id > 0) {
            pensions_eliminar.push(pension);

            setpensions_eliminar(pensions_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setpension(new Pension());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_pension();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_pension =  () => {
        let data_json_final = {};
        
        let pensions_nuevos = [];
        let pensions_nuevos_final = [];

        let pensions_actualizars = [];
		let pensions_actualizars_final = [];
		
        let ids_pensions_eliminars = [];
        
        let updates_columnas =['id_alumno','anio'];

        pensions_nuevos = pensions.filter((pension1:Pension) => { /*, index, arr*/
            return pension1.id < 0 ;
        });

        pensions_nuevos_final = get_pensionsNuevosFinal(pensions_nuevos);

        pensions_actualizars = pensions.filter((pension1) => { /*, index, arr*/
            return pension1.id > 0 ;
        });
		
		pensions_actualizars_final = get_pensionsActualizarsFinal(pensions_actualizars);
		
        ids_pensions_eliminars = getIds_pensionsEliminars();
        
        
        data_json_final = {
            news_pensions : pensions_nuevos_final,
            updates_pensions : pensions_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_pensions: ids_pensions_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_pensionsEliminars = () => {
        let ids_pensions_eliminars:Array<number> = [];
    
        for(let pension1 of pensions_eliminar) {
            ids_pensions_eliminars.push(pension1.id);
        }

        return ids_pensions_eliminars;
    };

    const get_pensionsNuevosFinal = (pensions_nuevos:Array<Pension>) => {
        let pensions_nuevos_final:Array<PensionParamCreate> = [];
        
        for(let pension1 of pensions_nuevos) {

            let pension_nuevo_final:PensionParamCreate = {
				created_at : pension1.created_at,
				updated_at : pension1.updated_at,
				id_alumno : pension1.id_alumno,
				anio : pension1.anio,
				mes : pension1.mes,
				valor : pension1.valor,
				cobrado : pension1.cobrado,
            };

            pensions_nuevos_final.push(pension_nuevo_final);
        }

        return pensions_nuevos_final;
    };

	const get_pensionsActualizarsFinal = (pensions_actualizars:Array<Pension>) => {
        let pensions_actualizars_final:Array<PensionParamUpdate> = [];
        
        for(let pension1 of pensions_actualizars) {

            let pension_actualizar_final:PensionParamUpdate = {
				id : pension1.id,
				created_at : pension1.created_at,
				updated_at : pension1.updated_at,
				id_alumno : pension1.id_alumno,
				anio : pension1.anio,
				mes : pension1.mes,
				valor : pension1.valor,
				cobrado : pension1.cobrado,
            };

            pensions_actualizars_final.push(pension_actualizar_final);
        }

        return pensions_actualizars_final;
    };
	
	/*FKs*/
	const getFks = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);									
		const data_json = {};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		const data:PensionFKReturnView = await response_json.json();
		
		
			setalumnosFK(data.alumnosFK);			
	};
	
	const funLoadFormulario = () => {
		/*FKs*/
		getFks();
	};
	
	useEffect(funLoadFormulario, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	const setid = (id:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.id=id;	setpension(pension2);};
	const setcreated_at = (created_at:string) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.created_at=created_at;	setpension(pension2);};
	const setupdated_at = (updated_at:string) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.updated_at=updated_at;	setpension(pension2);};
	const setid_alumno = (id_alumno:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.id_alumno=id_alumno;	setpension(pension2);};
	const setanio = (anio:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.anio=anio;	setpension(pension2);};
	const setmes = (mes:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.mes=mes;	setpension(pension2);};
	const setvalor = (valor:number) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.valor=valor;	setpension(pension2);};
	const setcobrado = (cobrado:boolean) => {	let pension2 = new Pension();	Object.assign(pension2,pension);	pension2.cobrado=cobrado;	setpension(pension2);};
	
	return (
		
		<div id="divLoteViewGlobal_pension">
			
			<div id="div_pension_form_general" 
				 className="form_general">
			
				<h2>
					Pensions Lote
				</h2>
				
				<form id="pension_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={pension.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={pension.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={pension.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="id_alumno"> Alumno</label>
					<select id="id_alumno" name="id_alumno" 
							value={pension.id_alumno.toString()} placeholder=" Alumno"
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
				
					
					<label htmlFor="anio">Anio</label>
					<input type="text" id="anio" name="anio" placeholder="Anio"
							value={pension.anio}
							onChange={(e) => setanio(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="mes">Mes</label>
					<input type="text" id="mes" name="mes" placeholder="Mes"
							value={pension.mes}
							onChange={(e) => setmes(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="valor">Valor</label>
					<input type="text" id="valor" name="valor" placeholder="Valor"
							value={pension.valor}
							onChange={(e) => setvalor(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="cobrado">Cobrado</label>
					<input type="checkbox" id="cobrado" name="cobrado" placeholder="Cobrado"
							checked={pension.cobrado}
							onChange={(e) => setcobrado(Boolean(e.target.checked))}
							disabled={form_deshabilitado} />
						
									
				</form>
					
			</div>
			
			<div id="div_pension_actions_form_general">
				
				<form id="pension_actions_form_general" 
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
			
			<div id="div_pension_tabla_general">
				
				<table id="pension_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th>Id</th>
							<th>Created At</th>
							<th>Updated At</th>
							<th> Alumno</th>
							<th style={{textAlign:"center"}}>Anio</th>
							<th style={{textAlign:"center"}}>Mes</th>
							<th style={{textAlign:"center"}}>Valor</th>
							<th style={{textAlign:"center"}}>Cobrado</th>
						</tr>
					</thead>
					
					<tbody>
						{pensions.map((pension1:Pension) => {
							return [
						<tr key={pension1.id} onClick={(event) => onClickRowTable(pension1.id)}>						
							<td data-label="Id"> {pension1.id} </td>
							<td data-label="Created At"> {pension1.created_at} </td>
							<td data-label="Updated At"> {pension1.updated_at} </td>
							<td data-label=" Alumno"> {pension1.alumno!.nombre} </td>
							<td data-label="Anio" style={{textAlign:"center"}}> {pension1.anio} </td>
							<td data-label="Mes" style={{textAlign:"center"}}> {pension1.mes} </td>
							<td data-label="Valor" style={{textAlign:"center"}}> {pension1.valor} </td>
							<td data-label="Cobrado" style={{textAlign:"center"}}> {GetLabelBoolean(pension1.cobrado)} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
		</div>
	);
}

export {PensionLoteView};