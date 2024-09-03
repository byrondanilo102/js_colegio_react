import React,{useState,useRef,useEffect} from 'react';
//import {useNavigate} from 'react-router-dom';

import {Constantes} from '../../ts/general/util/Constantes';
//import {FuncionGeneral} from '../../React,{/general/util/FuncionGeneral';

import {Materia} from "../../ts/entity/estructura/Materia";

//HeaderClassComp
import {HeaderClassCompBase} from '../../components_testing/HeaderClassComp';
import {FooterClassComp} from '../../components_testing/FooterClassComp';
import {AlertClassComp} from '../../components_testing/AlertClassComp';

//import {BuscarMateriaClassCompRef} from '../../components_testing/estructura/materia/BuscarMateriaClassComp';
import {BuscarMateriaClassComp} from '../../components_testing/estructura/materia/BuscarMateriaClassComp';
import {TablaDatosMateriaClassComp} from '../../components_testing/estructura/materia/TablaDatosMateriaClassComp';
//import {FormularioMateriaClassCompRef} from '../../components_testing/estructura/materia/FormularioMateriaClassComp';
import {FormularioMateriaClassComp} from '../../components_testing/estructura/materia/FormularioMateriaClassComp';

/*------------------ TITLE GENERAL ----------------------*/
import '../../scss/components/title/titulo_general.scss';

class MateriaClassView extends React.Component<{}, 
                                                    
                                                {   title: string,
                                                    module: string,
                                                    controller: string,
                                                    tipo_busqueda: string,
                                                    materias: Array<Materia>,
                                                    materia: Materia,
                                                    tipo_mensaje: string,
                                                    mensaje: string                                                     
                                                }>{
    
    headerComp1:any;
    alertComp1:any;
    buscarmateriaComp1:any;
    formulariomateriaComp1:any;

    constructor(props:any) {
        super(props);

        this.headerComp1 = React.createRef();
        this.alertComp1 = React.createRef();
	    this.buscarmateriaComp1 = React.createRef();
	    this.formulariomateriaComp1 = React.createRef();
        
        this.state = {
            title: 'Materia',
            module: 'estructura',
            controller: 'materia_api',
            tipo_busqueda: 'ninguno',
            materias: new Array<Materia>(),
            materia: new Materia (),
            tipo_mensaje: 'NONE',
            mensaje: 'NONE'
        };

        this.setTipo_mensaje = this.setTipo_mensaje.bind(this);
        this.setMensaje = this.setMensaje.bind(this);
        this.setmaterias = this.setmaterias.bind(this);

        this.updateDatos = this.updateDatos.bind(this);
        this.getTodosDatos = this.getTodosDatos.bind(this);
        this.anteriores = this.anteriores.bind(this);
        this.siguientes = this.siguientes.bind(this);
        this.ocultarMensajeAlerta = this.ocultarMensajeAlerta.bind(this);
        this.nuevoPreparar = this.nuevoPreparar.bind(this);
        this.handleAction_ClickTableRow = this.handleAction_ClickTableRow.bind(this);
        this.handleAction_NuevoDatos = this.handleAction_NuevoDatos.bind(this);
        this.handleAction_ActualizarDatos = this.handleAction_ActualizarDatos.bind(this);
        this.handleAction_EliminarDatos = this.handleAction_EliminarDatos.bind(this);
        this.setMensajeAlerta = this.setMensajeAlerta.bind(this);
        this.funGetTodosDatos = this.funGetTodosDatos.bind(this);        
    }

    componentDidMount() {
        this.funGetTodosDatos();
        //console.log("Called when component did mount 1 ", this.headerComp2);
    }

    setTipo_mensaje(tipo_mensaje1:string) {this.setState({tipo_mensaje: tipo_mensaje1});}
    setMensaje(mensaje1:string) {this.setState({mensaje: mensaje1});}
    setmaterias(materias1:Array<Materia>) {this.setState({materias: materias1});}

    updateDatos(materias1:Array<Materia>) {
		this.setmaterias(materias1);		
		//materias = materias1;
	}

	getTodosDatos() {        
        (this.headerComp1.current as HeaderClassCompBase).mostrarLoader();
		(this.buscarmateriaComp1.current as BuscarMateriaClassComp).getTodosDatos();
		(this.headerComp1.current as HeaderClassCompBase).ocultarLoader();
	}
	
	anteriores() {
		(this.headerComp1.current as HeaderClassCompBase).mostrarLoader();
		(this.buscarmateriaComp1.current as BuscarMateriaClassComp).anteriores();
		(this.headerComp1.current as HeaderClassCompBase).ocultarLoader();
	}
	
	siguientes() {
		(this.headerComp1.current as HeaderClassCompBase).mostrarLoader();
		(this.buscarmateriaComp1.current as BuscarMateriaClassComp).siguientes();
		(this.headerComp1.current as HeaderClassCompBase).ocultarLoader();
	}
	
	ocultarMensajeAlerta() {
		this.setTipo_mensaje('NONE');
        this.setMensaje('');
        (this.alertComp1.current as AlertClassComp).closeAlertGeneral();
	};
	
	nuevoPreparar() {
		(this.formulariomateriaComp1.current as FormularioMateriaClassComp).nuevoPreparar();
	};
	
	handleAction_ClickTableRow(materia1: Materia) {
		(this.formulariomateriaComp1.current as FormularioMateriaClassComp).handleAction_ClickTableRow(materia1);
	};
	
	handleAction_NuevoDatos() { //data_json
		(this.buscarmateriaComp1.current as BuscarMateriaClassComp).getTodosDatos();
		(this.formulariomateriaComp1.current as FormularioMateriaClassComp).cerrarModalFormGeneral();
		
		this.setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
		(this.headerComp1.current as HeaderClassCompBase).ocultarLoader();
	}
	
	handleAction_ActualizarDatos() { //data_json
		(this.buscarmateriaComp1.current as BuscarMateriaClassComp).getTodosDatos();
		(this.formulariomateriaComp1.current as FormularioMateriaClassComp).cerrarModalFormGeneral();
		
		this.setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
		(this.headerComp1.current as HeaderClassCompBase).ocultarLoader();
	}
	
	handleAction_EliminarDatos() { //data_json
		(this.buscarmateriaComp1.current as BuscarMateriaClassComp).getTodosDatos();
		(this.formulariomateriaComp1.current as FormularioMateriaClassComp).cerrarModalFormGeneral();
		
		this.setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ELIMINADO);
		(this.headerComp1.current as HeaderClassCompBase).ocultarLoader();
	}
	
	setMensajeAlerta(tipo_mensaje:string,mensaje:string) {
		this.setTipo_mensaje(tipo_mensaje);
		this.setMensaje(mensaje);
		
		(this.alertComp1.current as AlertClassComp).setMensajeAlerta();
	}
	
	funGetTodosDatos() {
		this.getTodosDatos();
	}  
    
    render() {
        
        
        return (
            
            <div id="divViewGlobalmateria">
                    
                <HeaderClassCompBase ref={this.headerComp1}/>

                <h3 className="titulo_general">
                    {this.state.title}
                </h3>		
                
                <AlertClassComp ref={this.alertComp1}
					tipo_mensaje={this.state.tipo_mensaje} 
					mensaje={this.state.mensaje}/>

                <BuscarMateriaClassComp ref={this.buscarmateriaComp1}
                            module={this.state.module} controller={this.state.controller}
                            tipo_busqueda={this.state.tipo_busqueda}
                            updateDatosView={this.updateDatos}/>
                            
                <TablaDatosMateriaClassComp 
                            module={this.state.module} controller={this.state.controller}
                            materias={this.state.materias}
                            getTodosDatosView={this.getTodosDatos} 
                            anterioresView={this.anteriores}
                            siguientesView={this.siguientes}
                            nuevoPrepararView={this.nuevoPreparar}
                            handleAction_ClickTableRowView={this.handleAction_ClickTableRow}/>
                            
                <FormularioMateriaClassComp ref={this.formulariomateriaComp1}
                            module={this.state.module} controller={this.state.controller}
                            materia={this.state.materia}
                            materias={this.state.materias}
                            ocultarMensajeAlertaView={this.ocultarMensajeAlerta}
                            handleAction_ActualizarDatosView={this.handleAction_ActualizarDatos}
                            handleAction_NuevoDatosView={this.handleAction_NuevoDatos}
                            handleAction_EliminarDatosView={this.handleAction_EliminarDatos}/>
                
                <div id="div_auxiliar"></div>
                
                <FooterClassComp/>
                
            </div>
            
            );
    }
}

export {MateriaClassView};