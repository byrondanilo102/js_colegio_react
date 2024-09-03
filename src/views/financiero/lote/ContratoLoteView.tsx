import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Contrato} from "../../../ts/entity/financiero/Contrato";
import {ContratoReturnView} from "../../../ts/dto/financiero/contrato/ContratoReturnView";

import {ContratoFKReturnView} from "../../../ts/dto/financiero/contrato/ContratoFKReturnView";

import {ContratoParamCreate} from "../../../ts/type/financiero/contrato/ContratoParamCreate";
import {ContratoParamUpdate} from "../../../ts/type/financiero/contrato/ContratoParamUpdate";

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


function ContratoLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Contrato');
	//------------------ ACCIONES -------------------
	const [module] = useState('financiero');
	const [controller] = useState('contrato_api');
	//------------------ DATOS ----------------------
	let [contrato,setcontrato] = useState(new Contrato()); //,setcontrato
	let [contratos,setcontratos] = useState(new Array<Contrato>());	
	
	let [id_new,setid_new] = useState(0);
    let [contratos_eliminar,setcontratos_eliminar] = useState(new Array<Contrato>());

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

        setcontratos(data.contratos);
	};

    const onClickRowTable = async (id:number) => {
        let contrato2:Contrato | undefined = contratos.find(contrato1 => contrato1.id==id);
        //let contrato3:Contrato = new Contrato();

        //Object.assign(contrato3,contrato2);
        //Object.assign(contrato3,contrato2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setcontrato(contrato2!);
    };

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};

    const nuevoPreparar = () => {
		contrato = new Contrato();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setanio(0);		
		setvalor(0.0);		
		setfecha(FuncionGeneral.GetLabelDate(new Date()));
		setfirmado(false);		
        
        setid_new(--id_new);
        contrato.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setcontrato(contrato);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //contrato.id=id_new;
            
            contratos.push(contrato);
                           
            setcontratos(contratos);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let contrato1 of contratos) {

                if(contrato1.id == contrato.id) {
                    Object.assign(contrato1,contrato);
                    break;
                }
            }                

            setcontratos(contratos);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let contratos2 = contratos.filter((contrato1, index, arr) => { 
            return contrato1.id != contrato.id;
        });

        setcontratos(contratos2);

        if(contrato.id > 0) {
            contratos_eliminar.push(contrato);

            setcontratos_eliminar(contratos_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setcontrato(new Contrato());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_contrato();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_contrato =  () => {
        let data_json_final = {};
        
        let contratos_nuevos = [];
        let contratos_nuevos_final = [];

        let contratos_actualizars = [];
		let contratos_actualizars_final = [];
		
        let ids_contratos_eliminars = [];
        
        let updates_columnas =['anio','valor'];

        contratos_nuevos = contratos.filter((contrato1:Contrato) => { /*, index, arr*/
            return contrato1.id < 0 ;
        });

        contratos_nuevos_final = get_contratosNuevosFinal(contratos_nuevos);

        contratos_actualizars = contratos.filter((contrato1) => { /*, index, arr*/
            return contrato1.id > 0 ;
        });
		
		contratos_actualizars_final = get_contratosActualizarsFinal(contratos_actualizars);
		
        ids_contratos_eliminars = getIds_contratosEliminars();
        
        
        data_json_final = {
            news_contratos : contratos_nuevos_final,
            updates_contratos : contratos_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_contratos: ids_contratos_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_contratosEliminars = () => {
        let ids_contratos_eliminars:Array<number> = [];
    
        for(let contrato1 of contratos_eliminar) {
            ids_contratos_eliminars.push(contrato1.id);
        }

        return ids_contratos_eliminars;
    };

    const get_contratosNuevosFinal = (contratos_nuevos:Array<Contrato>) => {
        let contratos_nuevos_final:Array<ContratoParamCreate> = [];
        
        for(let contrato1 of contratos_nuevos) {

            let contrato_nuevo_final:ContratoParamCreate = {
				created_at : contrato1.created_at,
				updated_at : contrato1.updated_at,
				anio : contrato1.anio,
				valor : contrato1.valor,
				fecha : contrato1.fecha,
				firmado : contrato1.firmado,
            };

            contratos_nuevos_final.push(contrato_nuevo_final);
        }

        return contratos_nuevos_final;
    };

	const get_contratosActualizarsFinal = (contratos_actualizars:Array<Contrato>) => {
        let contratos_actualizars_final:Array<ContratoParamUpdate> = [];
        
        for(let contrato1 of contratos_actualizars) {

            let contrato_actualizar_final:ContratoParamUpdate = {
				id : contrato1.id,
				created_at : contrato1.created_at,
				updated_at : contrato1.updated_at,
				anio : contrato1.anio,
				valor : contrato1.valor,
				fecha : contrato1.fecha,
				firmado : contrato1.firmado,
            };

            contratos_actualizars_final.push(contrato_actualizar_final);
        }

        return contratos_actualizars_final;
    };
	
	/*FKs*/
	const getFks = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);									
		const data_json = {};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		const data:ContratoFKReturnView = await response_json.json();
		
		
			setdocentesFK(data.docentesFK);			
	};
	
	const funLoadFormulario = () => {
		/*FKs*/
		getFks();
	};
	
	useEffect(funLoadFormulario, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	const setid = (id:number) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.id=id;	setcontrato(contrato2);};
	const setcreated_at = (created_at:string) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.created_at=created_at;	setcontrato(contrato2);};
	const setupdated_at = (updated_at:string) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.updated_at=updated_at;	setcontrato(contrato2);};
	const setanio = (anio:number) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.anio=anio;	setcontrato(contrato2);};
	const setvalor = (valor:number) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.valor=valor;	setcontrato(contrato2);};
	const setfecha = (fecha:string) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.fecha=fecha;	setcontrato(contrato2);};
	const setfirmado = (firmado:boolean) => {	let contrato2 = new Contrato();	Object.assign(contrato2,contrato);	contrato2.firmado=firmado;	setcontrato(contrato2);};
	
	return (
		
		<div id="divLoteViewGlobal_contrato">
			
			<div id="div_contrato_form_general" 
				 className="form_general">
			
				<h2>
					Contratos Lote
				</h2>
				
				<form id="contrato_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={contrato.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={contrato.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={contrato.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="anio">Anio</label>
					<input type="text" id="anio" name="anio" placeholder="Anio"
							value={contrato.anio}
							onChange={(e) => setanio(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="valor">Valor</label>
					<input type="text" id="valor" name="valor" placeholder="Valor"
							value={contrato.valor}
							onChange={(e) => setvalor(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="fecha">Fecha</label>
					<input type="date" id="fecha" name="fecha" placeholder="Fecha"
							value={contrato.fecha}
							onChange={(e) => setfecha(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="firmado">Firmado</label>
					<input type="checkbox" id="firmado" name="firmado" placeholder="Firmado"
							checked={contrato.firmado}
							onChange={(e) => setfirmado(Boolean(e.target.checked))}
							disabled={form_deshabilitado} />
						
									
				</form>
					
			</div>
			
			<div id="div_contrato_actions_form_general">
				
				<form id="contrato_actions_form_general" 
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
			
			<div id="div_contrato_tabla_general">
				
				<table id="contrato_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th></th>
							<th>Created At</th>
							<th>Updated At</th>
							<th style={{textAlign:"center"}}>Anio</th>
							<th style={{textAlign:"center"}}>Valor</th>
							<th>Fecha</th>
							<th style={{textAlign:"center"}}>Firmado</th>
						</tr>
					</thead>
					
					<tbody>
						{contratos.map((contrato1:Contrato) => {
							return [
						<tr key={contrato1.id} onClick={(event) => onClickRowTable(contrato1.id)}>						
							<td data-label=""> {contrato1.docente!.nombre} </td>
							<td data-label="Created At"> {contrato1.created_at} </td>
							<td data-label="Updated At"> {contrato1.updated_at} </td>
							<td data-label="Anio" style={{textAlign:"center"}}> {contrato1.anio} </td>
							<td data-label="Valor" style={{textAlign:"center"}}> {contrato1.valor} </td>
							<td data-label="Fecha"> {contrato1.fecha} </td>
							<td data-label="Firmado" style={{textAlign:"center"}}> {GetLabelBoolean(contrato1.firmado)} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
		</div>
	);
}

export {ContratoLoteView};