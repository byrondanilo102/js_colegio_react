import React,{useState,forwardRef,useImperativeHandle} from 'react';
import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';

import {Materia} from "../../../ts/entity/estructura/Materia";
import {MateriaReturnView} from "../../../ts/dto/estructura/materia/MateriaReturnView";


import {MateriaParamCreate} from "../../../ts/type/estructura/materia/MateriaParamCreate";
import {MateriaParamUpdate} from "../../../ts/type/estructura/materia/MateriaParamUpdate";

/*FKs*/



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


//const FormularioMateriaClassCompRef = React.forwardRef((props:any, ref:any) => {

class FormularioMateriaClassComp extends React.Component <{
														module: string,
                                                        controller:string,
														materia:Materia,
														materias: Array<Materia>
                                                        ocultarMensajeAlertaView:Function,
                                                        handleAction_NuevoDatosView:Function,
                                                        handleAction_ActualizarDatosView:Function,
                                                        handleAction_EliminarDatosView:Function
                                                    
                                                }, 
                                                    
                                                {	tipo_accion: string,
                                                    display:string,
                                                    style_id_column: object,
                                                    text_id_aux: string  
                                                    materia: Materia                            
                                                }>{

    //navigate;
	materia2:Materia;
	tipo_accion2:string;

    constructor(props:any,ref:any) {
        super(props);

        //this.navigate = useNavigate();

        this.state = {
            tipo_accion: Constantes.CANCELAR,
            display: 'none',
            style_id_column: {},
            text_id_aux: '-1',
            materia: new Materia()
            
        };

		this.materia2 = new Materia();
		this.tipo_accion2='';

		this.setid = this.setid.bind(this);
		this.setcreated_at = this.setcreated_at.bind(this);
		this.setupdated_at = this.setupdated_at.bind(this);
		this.setcodigo = this.setcodigo.bind(this);
		this.setnombre = this.setnombre.bind(this);
		this.setactivo = this.setactivo.bind(this);

		this.setTipo_accion = this.setTipo_accion.bind(this);
		this.setDisplay = this.setDisplay.bind(this);
		this.setText_id_aux = this.setText_id_aux.bind(this);

		this.home = this.home.bind(this);
		this.nuevoPreparar = this.nuevoPreparar.bind(this);
		this.cancelar = this.cancelar.bind(this);
		this.abrirModalFormGeneral = this.abrirModalFormGeneral.bind(this);
		this.cerrarModalFormGeneral = this.cerrarModalFormGeneral.bind(this);
		this.showConfirm = this.showConfirm.bind(this);
		this.handleAction_ClickTableRow = this.handleAction_ClickTableRow.bind(this);
		this.actualizar = this.actualizar.bind(this);
		this.eliminar = this.eliminar.bind(this);
		this.nuevoDatos = this.nuevoDatos.bind(this);
		this.actualizarDatos = this.actualizarDatos.bind(this);
		this.eliminarDatos = this.eliminarDatos.bind(this);
    }

    setid(id:number) {	let materia2 = new Materia();	Object.assign(materia2,this.state.materia);	materia2.id=id;	this.setState({materia: materia2});};
	setcreated_at(created_at:string) {	let materia2 = new Materia();	Object.assign(materia2,this.state.materia);	materia2.created_at=created_at;	this.setState({materia: materia2});};
	setupdated_at(updated_at:string) {	let materia2 = new Materia();	Object.assign(materia2,this.state.materia);	materia2.updated_at=updated_at;	this.setState({materia: materia2});};
	setcodigo(codigo:string) {	let materia2 = new Materia();	Object.assign(materia2,this.state.materia);	materia2.codigo=codigo;	this.setState({materia: materia2});};
	setnombre(nombre:string) {	let materia2 = new Materia();	Object.assign(materia2,this.state.materia);	materia2.nombre=nombre;	this.setState({materia: materia2});};
	setactivo(activo:boolean) {	let materia2 = new Materia();	Object.assign(materia2,this.state.materia);	materia2.activo=activo;	this.setState({materia: materia2});};
	
    
    setTipo_accion(tipo_accion1:string){this.setState({tipo_accion: tipo_accion1});}
    setDisplay(display1:string){this.setState({display: display1});}
    setText_id_aux(text_id_aux1:string){this.setState({text_id_aux: text_id_aux1});}

    home(){
		window.location.replace('../dist/main')	
		//this.navigate('../main', {replace: true});
	}		

	nuevoPreparar() {		
		this.tipo_accion2 = Constantes.NUEVO;	
		this.setTipo_accion(Constantes.NUEVO);			
		this.abrirModalFormGeneral();		
		this.props.ocultarMensajeAlertaView();
		//this.ocultarMensajeAlerta();
		
		/*setId(-1);*/
		/*this.setText_id_aux('-1');*/
		
		this.newMateriaLocal();

		this.updateStateMateriaFromLocal('-1');
	}
	
	newMateriaLocal() {
		this.materia2 = new Materia();

		this.materia2.created_at=FuncionGeneral.GetLabelDate(new Date());
		this.materia2.updated_at=FuncionGeneral.GetLabelDate(new Date());
		this.materia2.codigo="";
		this.materia2.nombre="";
		this.materia2.activo=false;
	}

	updateStateMateriaFromLocal(text_id_aux1:string) {
		this.setState({
			materia: this.materia2,
			text_id_aux: text_id_aux1
		});
	}

	handleAction_ClickTableRow (data_json:Materia) {
		//this.ocultarMensajeAlerta();		
		this.tipo_accion2 = Constantes.SELECCIONAR;
		this.setTipo_accion(Constantes.SELECCIONAR);
		
		this.abrirModalFormGeneral();
		
		if(Constantes.IS_DEVELOPING === true) {
			this.setText_id_aux(data_json.id.toString());
		}
				
		this.updateMateriaLocal(data_json);

		this.updateStateMateriaFromLocal(data_json.id.toString());				

		console.log(this.materia2);

		/*setId(data_json.id);*/
		/*		
		this.state.materia.id=data_json.id;
		this.state.materia.created_at=data_json.created_at;
		this.state.materia.updated_at=data_json.updated_at;
		this.state.materia.codigo=data_json.codigo;
		this.state.materia.nombre=data_json.nombre;
		this.state.materia.activo=data_json.activo;
		*/
	}

	updateMateriaLocal(materia1:Materia) {
		this.materia2 = new Materia();

		this.materia2.id = Number(materia1.id);
		this.materia2.created_at = materia1.created_at;
		this.materia2.updated_at = materia1.updated_at;
		this.materia2.codigo = materia1.codigo;
		this.materia2.nombre = materia1.nombre;
		this.materia2.activo = materia1.activo;
	}

	cancelar() {
		this.tipo_accion2 = Constantes.CANCELAR;			
		this.setTipo_accion(Constantes.CANCELAR);
		this.cerrarModalFormGeneral();
	}
	
	abrirModalFormGeneral() {
		this.setDisplay('block');
	}
	
	cerrarModalFormGeneral() {
		this.setDisplay('none');
	}
	
	showConfirm(mensaje:string) {
		return window.confirm(mensaje);
	}
	
	actualizar() {	
		
		if(this.state.tipo_accion === Constantes.NUEVO) {
			this.nuevoDatos();						
		
		} else if(this.state.tipo_accion === Constantes.SELECCIONAR) {

			if(this.tipo_accion2 !== Constantes.ELIMINAR) {			
				this.actualizarDatos();				

			} else {
				this.eliminarDatos();				
			}
		} 	
		
		//console.log(this.tipo_accion2)
	}
	
	eliminar() {
		this.tipo_accion2 = Constantes.ELIMINAR;
		this.setTipo_accion(Constantes.ELIMINAR);
		//this.state.tipo_accion = Constantes.ELIMINAR;
		
		if (this.showConfirm(Constantes.MENSAJE_ELIMINAR_SINO)) {
			this.actualizar();
		}
	}
	
	async nuevoDatos() {
		
		//this.mostrarLoader();		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(this.props.module,this.props.controller,Constantes.NUEVO);
					
		const form_json: MateriaParamCreate = {
			created_at : this.state.materia.created_at,
			updated_at : this.state.materia.updated_at,
			codigo : this.state.materia.codigo,
			nombre : this.state.materia.nombre,
			activo : this.state.materia.activo,
		};
		
		const data_json = {
			materia : form_json	
		};
		console.log(data_json)
		console.log(url_global_controller)
		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
								
		const response_json = await fetch(url_global_controller,request_options);
		
		console.log(response_json.statusText);

		const data:MateriaReturnView = await response_json.json();
		
		this.props.handleAction_NuevoDatosView(data);
	}
	
	async actualizarDatos() {		
		//this.mostrarLoader();
		this.tipo_accion2 = Constantes.SELECCIONAR;		
		this.setTipo_accion(Constantes.SELECCIONAR);		
		
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(this.props.module,this.props.controller,Constantes.ACTUALIZAR);
			
		var form_json: MateriaParamUpdate = {
			id : this.state.materia.id,
			created_at : this.state.materia.created_at,
			updated_at : this.state.materia.updated_at,
			codigo : this.state.materia.codigo,
			nombre : this.state.materia.nombre,
			activo : this.state.materia.activo,
		};
		
		const data_json = {
			materia : form_json	
		};
		//console.log(data_json)
		const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);
		
		const response_json = await fetch(url_global_controller,request_options);				

		//console.log(await response_json.json())

		const data:MateriaReturnView = await response_json.json();
		
		this.props.handleAction_ActualizarDatosView(data);
	}
	
	async eliminarDatos() {	
		/*this.mostrarLoader();*/
		let url_global_controller = FuncionGeneral.GetUrlGlobalController(this.props.module,this.props.controller,Constantes.ELIMINAR);
		/*let id1:number = .id;*/
		
		var id_json = {
			id : this.state.materia.id
		};			
		
		const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
		
		const response_json = await fetch(url_global_controller,request_options);
		
		const data:MateriaReturnView = await response_json.json();
		
		this.props.handleAction_EliminarDatosView(data);
	}

    render() {

		return (
            <div id="divModal_materia_form_general" 
			className="modal_form_general"
			style={{display : this.state.display}}>
				
            <div id="divModalContent_materia_form_general" 
                className="modal_form_general_content">
                
                <div className="modal_form_general_header">
                    
                    <span id="spanCloseModal_materia_form_general"
                            className="close_modal_form_general" 
                            onClick={this.cerrarModalFormGeneral}>
                        &times;
                    </span>
                    <h2>
                        Materia
                    </h2>
                    
                </div>
                
                <div className="modal_form_general_body">
                
                    <div id="div_materia_form_general">
                    
                        <form id="materia_form_general" 
                            className="form_general">
        
                            <input type="hidden" id="id" name="id" 
                                    value={this.state.materia.id}
                                    onChange={(e) => this.setid(Number(e.target.value))}/>
                            
                            <label id="label_id" htmlFor="text_id_aux"								
                                    className="" style={this.state.style_id_column}>Id</label>				
                            <input type="text" id="text_id_aux" name="text_id_aux" placeholder="Id"
                                    style={this.state.style_id_column} className=""
                                    value={this.state.text_id_aux} readOnly/>
                            
                            <label id="label_created_at" htmlFor="created_at"
                                    className="" style={{display:"none"}}>created_at</label>				
                            <input type="text" id="created_at" name="created_at" 
                                    style={{display:"none"}} className=""
                                    value={this.state.materia.created_at} placeholder="created_at" 
                                    onChange={(e) => this.setcreated_at(e.target.value)} />
                                    
                            <label id="label_updated_at" htmlFor="updated_at"
                                    className="" style={{display:"none"}}>updated_at</label>				
                            <input type="text" id="updated_at" name="updated_at" 
                                    style={{display:"none"}} className=""
                                    value={this.state.materia.updated_at} placeholder="updated_at" 
                                    onChange={(e) => this.setupdated_at(e.target.value)} />
                                    
                            
                            <label htmlFor="codigo" className="">Codigo</label>
                            <input type="text" id="codigo" name="codigo" 
                                    className="" placeholder="Codigo"
                                    value={this.state.materia.codigo}
                                    onChange={(e) => this.setcodigo(e.target.value)}/>
                                                            
                            
                            <label htmlFor="nombre" className="">Nombre</label>
                            <input type="text" id="nombre" name="nombre" 
                                    className="" placeholder="Nombre"
                                    value={this.state.materia.nombre}
                                    onChange={(e) => this.setnombre(e.target.value)}/>
                                                            
                            
                            <label htmlFor="activo" className="">Activo</label>
                            <input type="checkbox" id="activo" name="activo"
                                    className="" placeholder="Activo"
                                    checked={this.state.materia.activo}
                                    onChange={(e) => this.setactivo(Boolean(e.target.checked))}/>
                                
                                            
                        </form>
                        
                    </div>
                    
                    <div id="div_materia_actions_form_general">
                        
                        <form id="materia_actions_form_general" 
                            className="actions_form_general">				
                            
                            <button type="button" id="actualizar_button" name="actualizar_button" 
                                    className="button_general" value="Actualizar" 
                                    onClick={this.actualizar}>
                                <i className="fa fa-fw fa-save"></i>
                                Actualizar
                            </button>
                            
                            <button type="button" id="eliminar_button" name="eliminar_button" 
                                    className="button_general" value="Eliminar" 
                                    onClick={this.eliminar}>
                                <i className="fa fa-fw fa-times-circle"></i>
                                Eliminar
                            </button>
                            
                            <button type="button" id="cancelar_button" name="cancelar_button" 
                                    className="button_general" value="Cancelar"
                                    onClick={this.cancelar}>
                                <i className="fa fa-fw fa-minus-circle"></i>
                                Cancelar
                            </button>
                            
                        </form>
                        
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        );
    }
}

//return <FormularioMateriaClassCompRef />
//});

//export {FormularioMateriaClassComp};
//let FormularioMateriaClassCompRef = forwardRef(FormularioMateriaClassComp);
//export {FormularioMateriaClassComp,FormularioMateriaClassCompRef};

export {FormularioMateriaClassComp};