import React from "react";

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Materia} from "../../../ts/entity/estructura/Materia";
import {MateriaReturnView} from "../../../ts/dto/estructura/materia/MateriaReturnView";


import {MateriaParamCreate} from "../../../ts/type/estructura/materia/MateriaParamCreate";
import {MateriaParamUpdate} from "../../../ts/type/estructura/materia/MateriaParamUpdate";

/*FKs */



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

class MateriaClassLoteView extends React.Component<{}, {	materia: Materia,
													materias: Array<Materia>,
													id_new: number,
													materias_eliminar: Array<Materia>,
													accion: string,
												   	form_deshabilitado:boolean,
												   	module: string,
												   	controller:string,
													nuevo_preparar_display:string,
													actualizar_display:string,
													eliminar_display:string
												}> {

	constructor(props:any) {
		super(props);

		this.state = {
			materia: new Materia(), 
			materias: new Array<Materia>(),
			id_new: 0,
			materias_eliminar: new Array<Materia>(),
			accion: 'CANCELAR',
			form_deshabilitado: true,
			module: 'estructura',
			controller:'materia_api',
			nuevo_preparar_display: 'block',
			actualizar_display: 'none',
			eliminar_display: 'none'
		};

		
		this.setid = this.setid.bind(this);
		this.setcreated_at = this.setcreated_at.bind(this);
		this.setupdated_at = this.setupdated_at.bind(this);
		this.setcodigo = this.setcodigo.bind(this);
		this.setnombre = this.setnombre.bind(this);

		this.setactivo = this.setactivo.bind(this);
		this.getTodosDatos = this.getTodosDatos.bind(this);
		this.GetLabelBoolean = this.GetLabelBoolean.bind(this);
		this.nuevoPreparar = this.nuevoPreparar.bind(this);
		this.actualizar = this.actualizar.bind(this);
		this.eliminar = this.eliminar.bind(this);
		this.cancelar = this.cancelar.bind(this);
		this.guardar = this.guardar.bind(this);
		this.prepararGuardarCambios_materia = this.prepararGuardarCambios_materia.bind(this);
		this.onClickRowTable = this.onClickRowTable.bind(this);
	}

	setid(event:any) {
		let materia2 = new Materia();	
		Object.assign(materia2,this.state.materia);	
		materia2.id=event.target.value;

		this.setState({materia: materia2});
	}

	setcreated_at(event:any) {
		let materia2 = new Materia();	
		Object.assign(materia2,this.state.materia);	
		materia2.created_at=event.target.value;

		this.setState({materia: materia2});
	}

	setupdated_at(event:any) {
		let materia2 = new Materia();	
		Object.assign(materia2,this.state.materia);	
		materia2.updated_at=event.target.value;

		this.setState({materia: materia2});
	}
	
	setcodigo(event:any) {
		let materia2 = new Materia();	
		Object.assign(materia2,this.state.materia);	
		materia2.codigo=event.target.value;

		this.setState({materia: materia2});
	}

	setnombre(event:any) {
		let materia2 = new Materia();	
		Object.assign(materia2,this.state.materia);	
		materia2.nombre=event.target.value;

		this.setState({materia: materia2});
	}

	setactivo(event:any) {
		let materia2 = new Materia();	
		Object.assign(materia2,this.state.materia);	
		materia2.activo=event.target.value;

		this.setState({materia: materia2});
	}

	async getTodosDatos() {
        
		console.log(this.state);

        let data_json = {
            pagination: {
                skip: 0,
                limit: 25
            }
        };
        
        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(this.state.module,this.state.controller,Constantes.RJ_TODOS);
                    
        const response_json = await fetch(url_controller, request_options);

        const data = await response_json.json();

        console.log(data);

		this.setState({materias: data.materias});        
	}

	GetLabelBoolean(value:any){
		return FuncionGeneral.GetLabelBoolean(value);
	}

	nuevoPreparar(){
		let materia1= new Materia();
		
		materia1.created_at=FuncionGeneral.GetLabelDate(new Date());
		materia1.updated_at=FuncionGeneral.GetLabelDate(new Date());
		materia1.codigo='';		
		materia1.nombre='';		
		materia1.activo=false;		
        
        let id_new1 = this.state.id_new - 1;		
        materia1.id=id_new1;
        
		this.setState({	accion: 'NUEVO',
						form_deshabilitado: false,
						nuevo_preparar_display: 'none',
						actualizar_display: 'block',
						eliminar_display: 'none',
						materia: materia1,
						id_new: id_new1
						});
	}

	actualizar() {

        if(this.state.accion==='NUEVO') {
            //materia.id=id_new;
            
			let materias2 = new Array<Materia>();

			materias2.push(...this.state.materias);
			materias2.push(this.state.materia);

            //this.state.materias.push(this.state.materia);
                                      
			this.setState({materias: materias2});        

			console.log(this.state.materias);

            this.cancelar();                

        } else if(this.state.accion==='ACTUALIZAR') {
            //console.log('actualizar');
            
			let materias2 = new Array<Materia>();

			materias2.push(...this.state.materias);

            for(let materia1 of materias2) {

                if(materia1.id == this.state.materia.id) {
                    Object.assign(materia1,this.state.materia);
                    break;
                }
            }                

            this.setState({materias: materias2});
            
            this.cancelar();
        }
    }

	eliminar() {	
        
		let materias2 = new Array<Materia>();

        materias2 = this.state.materias.filter((materia1, index, arr) => { 
            return materia1.id != this.state.materia.id;
        });

        
		let materias_eliminar2 = new Array<Materia>();
		materias_eliminar2.push(...this.state.materias_eliminar);

        if(this.state.materia.id > 0) {
            materias_eliminar2.push(this.state.materia);
        }

		this.setState({	materias: materias2,
						materias_eliminar: materias_eliminar2});

        this.cancelar();
    }

	cancelar() {		
		
		this.setState({	materia: new Materia(),
						accion: 'CANCELAR',
						form_deshabilitado: true,
						nuevo_preparar_display: 'block',
						actualizar_display: 'none',
						eliminar_display: 'none'
						});
	}

	async guardar() {

        let data_json= this.prepararGuardarCambios_materia();

        let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
        
        let url_controller = FuncionGeneral.GetUrlGlobalController(this.state.module,this.state.controller,'guardar_cambios');                                    
        
        let response_json = await fetch(url_controller, request_options);                

        let response_data = await response_json.json();
        
        console.log(response_data);            

        alert('Cambios Guardados');       
    }

	prepararGuardarCambios_materia() {
        let data_json_final = {};
        
		
        let materias_nuevos = [];
        let materias_nuevos_final = [];

        let materias_actualizars = [];
		let materias_actualizars_final = [];
		
        let ids_materias_eliminars = [];
        
        let updates_columnas =['codigo','nombre'];

        materias_nuevos = this.state.materias.filter((materia1:Materia) => { //, index, arr
            return materia1.id < 0 ;
        });

		
        materias_nuevos_final = this.get_materiasNuevosFinal(materias_nuevos);

        materias_actualizars = this.state.materias.filter((materia1) => { //, index, arr
            return materia1.id > 0 ;
        });
		
		materias_actualizars_final = this.get_materiasActualizarsFinal(materias_actualizars);
		
        ids_materias_eliminars = this.getIds_materiasEliminars();
        
        
        data_json_final = {
            news_materias : materias_nuevos_final,
            updates_materias : materias_actualizars_final,
            updates_columnas : updates_columnas,
            ids_deletes_materias: ids_materias_eliminars
        };
            
        console.log(data_json_final);
        

        return data_json_final;
    }

	get_materiasNuevosFinal(materias_nuevos:Array<Materia>) {
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
    }
	
	getIds_materiasEliminars() {
        let ids_materias_eliminars:Array<number> = [];
    
        for(let materia1 of this.state.materias_eliminar) {
            ids_materias_eliminars.push(materia1.id);
        }

        return ids_materias_eliminars;
    }

	get_materiasActualizarsFinal(materias_actualizars:Array<Materia>) {
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
    }

	async onClickRowTable(id:number) {
		//id:number
		//event: React.MouseEvent<HTMLTableRowElement

        let materia1:Materia | undefined = this.state.materias.find(materia1 => materia1.id==id);

		let materia2= new Materia();

		Object.assign(materia2,materia1);

        //let materia3:Materia = new Materia();

        //Object.assign(materia3,materia2);
        //Object.assign(materia3,materia2);        

		this.setState({	
			form_deshabilitado: false,
			nuevo_preparar_display: 'none',
			actualizar_display:'block',
			eliminar_display:'block',
			accion: 'ACTUALIZAR',
			materia: materia2!
		});
    }

	render() {
		return (
			<div id="divLoteViewGlobal_materia">
			
			<div id="div_materia_form_general" 
				 className="form_general">
			
				<h2>
					Materias Class Lote
				</h2>
				
				<form id="materia_form_general" 
						className="form_general">
						
					<label id="label_id" htmlFor="id">Id</label>				
					<input type="text" id="id" name="id" 
							value={this.state.materia.id} placeholder="Id"
							onChange={this.setid}
							disabled={this.state.form_deshabilitado}/>
					
					<label id="label_created_at" htmlFor="created_at">created_at</label>				
					<input type="text" id="created_at" name="created_at" 
							value={this.state.materia.created_at} placeholder="created_at" 
							onChange={this.setcreated_at}
							disabled={this.state.form_deshabilitado} />
							
					<label id="label_updated_at" htmlFor="updated_at">updated_at</label>
					<input type="text" id="updated_at" name="updated_at"
							value={this.state.materia.updated_at} placeholder="updated_at"
							onChange={this.setupdated_at}
							disabled={this.state.form_deshabilitado} />
							
					
					<label htmlFor="codigo">Codigo</label>
					<input type="text" id="codigo" name="codigo" placeholder="Codigo"
							value={this.state.materia.codigo}
							onChange={this.setcodigo}
							disabled={this.state.form_deshabilitado} />
													
					
					<label htmlFor="nombre">Nombre</label>
					<input type="text" id="nombre" name="nombre" placeholder="Nombre"
							value={this.state.materia.nombre}
							onChange={this.setnombre}
							disabled={this.state.form_deshabilitado} />
													
					
					<label htmlFor="activo">Activo</label>
					<input type="checkbox" id="activo" name="activo" placeholder="Activo"
							checked={this.state.materia.activo}
							onChange={this.setactivo}
							disabled={this.state.form_deshabilitado} />
						
									
				</form>
					
			</div>
			
			<div id="div_materia_actions_form_general">
				
				<form id="materia_actions_form_general" 
						className="actions_form_general">
						
					<button type="button" id="recargar_button" name="recargar_button" 
						value="Recargar" className="button_general" 
						onClick={this.getTodosDatos}>
						<i className="fa fa-fw fa-sync"></i>
						Recargar
					</button>
					
					<button type="button" id="nuevo_preparar_button" name="nuevo_preparar_button" 
						value="Nuevo" className="button_general" 
						onClick={this.nuevoPreparar}
						style={{display : this.state.nuevo_preparar_display}}>
						<i className="fa fa-fw fa-plus-circle"></i>
						Nuevo
					</button>
					
					<button type="button" id="actualizar_button" name="actualizar_button" 
							className="button_general" value="Actualizar" 
							onClick={this.actualizar}
							style={{display : this.state.actualizar_display}}>
						<i className="fa fa-fw fa-save"></i>
						Actualizar
					</button>
						
					<button type="button" id="eliminar_button" name="eliminar_button" 
							className="button_general" value="Eliminar" 
							onClick={this.eliminar}
							style={{display : this.state.eliminar_display}}>
						<i className="fa fa-fw fa-times-circle"></i>
						Eliminar
					</button>
						
					<button type="button" id="cancelar_button" name="cancelar_button" 
							className="button_general" value="Cancelar"
							onClick={this.cancelar}>
						<i className="fa fa-fw fa-minus-circle"></i>
						Cancelar
					</button>
				
					<button type="button" id="guardar_button" name="guardar_button" 
							className="button_general" value="Guardar"
							onClick={this.guardar}>
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
						{this.state.materias.map((materia1:Materia) => {
							return [
						<tr key={materia1.id} onClick={(event:any) => this.onClickRowTable(materia1.id)}>						
							<td data-label="Id"> {materia1.id} </td>
							<td data-label="Created At"> {materia1.created_at} </td>
							<td data-label="Updated At"> {materia1.updated_at} </td>
							<td data-label="Codigo"> {materia1.codigo} </td>
							<td data-label="Nombre"> {materia1.nombre} </td>
							<td data-label="Activo" style={{textAlign:"center"}}> {this.GetLabelBoolean(materia1.activo)} </td>
						</tr>
							]
						})}
					</tbody>
					
				</table>
			
			</div>
			
			</div>
  		)
	}
}

export {MateriaClassLoteView};