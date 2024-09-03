import React,{useState,forwardRef,useImperativeHandle,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Matricula} from "../../../ts/entity/proceso/Matricula";
import {MatriculaReturnView} from "../../../ts/dto/proceso/matricula/MatriculaReturnView";

import {MatriculaFKReturnView} from "../../../ts/dto/proceso/matricula/MatriculaFKReturnView";

import {MatriculaParamCreate} from "../../../ts/type/proceso/matricula/MatriculaParamCreate";
import {MatriculaParamUpdate} from "../../../ts/type/proceso/matricula/MatriculaParamUpdate";

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


function MatriculaLoteView(props:any) {	
	let navigate = useNavigate();
	
	//------------------ GENERAL --------------------
	const [title] = useState('Matricula');
	//------------------ ACCIONES -------------------
	const [module] = useState('proceso');
	const [controller] = useState('matricula_api');
	//------------------ DATOS ----------------------
	let [matricula,setmatricula] = useState(new Matricula()); //,setmatricula
	let [matriculas,setmatriculas] = useState(new Array<Matricula>());	
	
	let [id_new,setid_new] = useState(0);
    let [matriculas_eliminar,setmatriculas_eliminar] = useState(new Array<Matricula>());

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

        setmatriculas(data.matriculas);
	};

    const onClickRowTable = async (id:number) => {
        let matricula2:Matricula | undefined = matriculas.find(matricula1 => matricula1.id==id);
        //let matricula3:Matricula = new Matricula();

        //Object.assign(matricula3,matricula2);
        //Object.assign(matricula3,matricula2);

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('block'); 

        setaccion('ACTUALIZAR');

        setmatricula(matricula2!);
    };

	const GetLabelBoolean = (value:any) => {
		return FuncionGeneral.GetLabelBoolean(value);
	};

    const nuevoPreparar = () => {
		matricula = new Matricula();

		setcreated_at(FuncionGeneral.GetLabelDate(new Date()));
		setupdated_at(FuncionGeneral.GetLabelDate(new Date()));
		setanio(0);		
		setcosto(0.0);		
		setfecha(FuncionGeneral.GetLabelDate(new Date()));
		setpagado(false);		
        
        setid_new(--id_new);
        matricula.id=id_new;
        
        setaccion('NUEVO');

        setform_deshabilitado(false);

        setnuevo_preparar_display('none');
        setactualizar_display('block');
        seteliminar_display('none');

        setmatricula(matricula);
	};

    const actualizar = () => {

        if(accion==='NUEVO') {
            //matricula.id=id_new;
            
            matriculas.push(matricula);
                           
            setmatriculas(matriculas);

            cancelar();                

        } else if(accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
            for(let matricula1 of matriculas) {

                if(matricula1.id == matricula.id) {
                    Object.assign(matricula1,matricula);
                    break;
                }
            }                

            setmatriculas(matriculas);
            
            cancelar();
        }
    };

    const eliminar = () => {	
        
        let matriculas2 = matriculas.filter((matricula1, index, arr) => { 
            return matricula1.id != matricula.id;
        });

        setmatriculas(matriculas2);

        if(matricula.id > 0) {
            matriculas_eliminar.push(matricula);

            setmatriculas_eliminar(matriculas_eliminar);
        }

        cancelar();
    };

    const cancelar = () => {
       setmatricula(new Matricula());
        //console.log('cancelar');

       setaccion('CANCELAR');

       setform_deshabilitado(true);

       setnuevo_preparar_display('block');
       setactualizar_display('none');   
       seteliminar_display('none'); 
    };

    const guardar = async () => {

        let data_json= prepararGuardarCambios_matricula();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(module,controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    };

    const prepararGuardarCambios_matricula =  () => {
        let data_json_final = {};
        
        let matriculas_nuevos = [];
        let matriculas_nuevos_final = [];

        let matriculas_actualizars = [];
		let matriculas_actualizars_final = [];
		
        let ids_matriculas_eliminars = [];
        
        let updates_columnas =['anio','costo'];

        matriculas_nuevos = matriculas.filter((matricula1:Matricula) => { /*, index, arr*/
            return matricula1.id < 0 ;
        });

        matriculas_nuevos_final = get_matriculasNuevosFinal(matriculas_nuevos);

        matriculas_actualizars = matriculas.filter((matricula1) => { /*, index, arr*/
            return matricula1.id > 0 ;
        });
		
		matriculas_actualizars_final = get_matriculasActualizarsFinal(matriculas_actualizars);
		
        ids_matriculas_eliminars = getIds_matriculasEliminars();
        
        
        data_json_final = {
            news_matriculas : matriculas_nuevos_final,
            updates_matriculas : matriculas_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_matriculas: ids_matriculas_eliminars
        };
            
        console.log(data_json_final);
        
        return data_json_final;
    };
    
    const getIds_matriculasEliminars = () => {
        let ids_matriculas_eliminars:Array<number> = [];
    
        for(let matricula1 of matriculas_eliminar) {
            ids_matriculas_eliminars.push(matricula1.id);
        }

        return ids_matriculas_eliminars;
    };

    const get_matriculasNuevosFinal = (matriculas_nuevos:Array<Matricula>) => {
        let matriculas_nuevos_final:Array<MatriculaParamCreate> = [];
        
        for(let matricula1 of matriculas_nuevos) {

            let matricula_nuevo_final:MatriculaParamCreate = {
				created_at : matricula1.created_at,
				updated_at : matricula1.updated_at,
				anio : matricula1.anio,
				costo : matricula1.costo,
				fecha : matricula1.fecha,
				pagado : matricula1.pagado,
            };

            matriculas_nuevos_final.push(matricula_nuevo_final);
        }

        return matriculas_nuevos_final;
    };

	const get_matriculasActualizarsFinal = (matriculas_actualizars:Array<Matricula>) => {
        let matriculas_actualizars_final:Array<MatriculaParamUpdate> = [];
        
        for(let matricula1 of matriculas_actualizars) {

            let matricula_actualizar_final:MatriculaParamUpdate = {
				id : matricula1.id,
				created_at : matricula1.created_at,
				updated_at : matricula1.updated_at,
				anio : matricula1.anio,
				costo : matricula1.costo,
				fecha : matricula1.fecha,
				pagado : matricula1.pagado,
            };

            matriculas_actualizars_final.push(matricula_actualizar_final);
        }

        return matriculas_actualizars_final;
    };
	
	/*FKs*/
	const getFks = async () => {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(module,controller,Constantes.RJ_GET_FKS);									
		const data_json = {};
		
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);		
		const data:MatriculaFKReturnView = await response_json.json();
		
		
			setalumnosFK(data.alumnosFK);			
	};
	
	const funLoadFormulario = () => {
		/*FKs*/
		getFks();
	};
	
	useEffect(funLoadFormulario, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	const setid = (id:number) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.id=id;	setmatricula(matricula2);};
	const setcreated_at = (created_at:string) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.created_at=created_at;	setmatricula(matricula2);};
	const setupdated_at = (updated_at:string) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.updated_at=updated_at;	setmatricula(matricula2);};
	const setanio = (anio:number) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.anio=anio;	setmatricula(matricula2);};
	const setcosto = (costo:number) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.costo=costo;	setmatricula(matricula2);};
	const setfecha = (fecha:string) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.fecha=fecha;	setmatricula(matricula2);};
	const setpagado = (pagado:boolean) => {	let matricula2 = new Matricula();	Object.assign(matricula2,matricula);	matricula2.pagado=pagado;	setmatricula(matricula2);};
	
	return (
		
		<div id="divLoteViewGlobal_matricula">
			
			<div id="div_matricula_form_general" 
				 className="form_general">
			
				<h2>
					Matriculas Lote
				</h2>
				
				<form id="matricula_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={matricula.id} placeholder="Id"
							onChange={(e) => setid(Number(e.target.value))}
							disabled={form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={matricula.created_at} placeholder="created_at" 
							onChange={(e) => setcreated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={matricula.updated_at} placeholder="updated_at"
							onChange={(e) => setupdated_at(e.target.value)}
							disabled={form_deshabilitado} />
							
					
					<label htmlFor="anio">Anio</label>
					<input type="text" id="anio" name="anio" placeholder="Anio"
							value={matricula.anio}
							onChange={(e) => setanio(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="costo">Costo</label>
					<input type="text" id="costo" name="costo" placeholder="Costo"
							value={matricula.costo}
							onChange={(e) => setcosto(Number(e.target.value))}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="fecha">Fecha</label>
					<input type="date" id="fecha" name="fecha" placeholder="Fecha"
							value={matricula.fecha}
							onChange={(e) => setfecha(e.target.value)}
							disabled={form_deshabilitado} />
													
					
					<label htmlFor="pagado">Pagado</label>
					<input type="checkbox" id="pagado" name="pagado" placeholder="Pagado"
							checked={matricula.pagado}
							onChange={(e) => setpagado(Boolean(e.target.checked))}
							disabled={form_deshabilitado} />
						
									
				</form>
					
			</div>
			
			<div id="div_matricula_actions_form_general">
				
				<form id="matricula_actions_form_general" 
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
			
			<div id="div_matricula_tabla_general">
				
				<table id="matricula_tabla_general" className="table_general">
				
					<thead>
						<tr>					
							<th></th>
							<th>Created At</th>
							<th>Updated At</th>
							<th style={{textAlign:"center"}}>Anio</th>
							<th style={{textAlign:"center"}}>Costo</th>
							<th>Fecha</th>
							<th style={{textAlign:"center"}}>Pagado</th>
						</tr>
					</thead>
					
					<tbody>
						{matriculas.map((matricula1:Matricula) => {
							return [
						<tr key={matricula1.id} onClick={(event) => onClickRowTable(matricula1.id)}>						
							<td data-label=""> {matricula1.alumno!.nombre} </td>
							<td data-label="Created At"> {matricula1.created_at} </td>
							<td data-label="Updated At"> {matricula1.updated_at} </td>
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
			
		</div>
	);
}

export {MatriculaLoteView};