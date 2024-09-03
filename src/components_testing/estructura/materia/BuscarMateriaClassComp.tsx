import React,{useState,forwardRef,useImperativeHandle} from 'react';
//import {useNavigate} from "react-router-dom";

import {Constantes} from '../../../ts/general/util/Constantes';
import {FuncionGeneral} from '../../../ts/general/util/FuncionGeneral';
import {Pagination} from '../../../ts/general/business/logic/Pagination';

import {Materia} from "../../../ts/entity/estructura/Materia";
import {MateriaReturnView} from "../../../ts/dto/estructura/materia/MateriaReturnView";

/*------------------ BUSCAR GENERAL ----------------------*/
import '../../../scss/components/div/div_buscar_general.scss';
/*------------------ TABS GENERAL ----------------------*/
import '../../../scss/components/tabs/tabs_general.scss';
/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
import '../../../scss/responsive/form/form_buscar_general_responsive.scss';


//const BuscarMateriaClassCompRef = React.forwardRef((props:any, ref:any) => {


class BuscarMateriaClassComp extends React.Component <{  module: string,
													tipo_busqueda: string,
                                                    controller:string,
                                                    updateDatosView: Function | undefined
                                                }, 
                                                    
                                                {	accion_busqueda: string,
                                                    pagination1: Pagination,
                                                    materias:  Array<Materia>                                                      
                                                }>{

	
	materias2:Array<Materia>;
	pagination2:Pagination;

    constructor(props:any,ref:any) {
        super(props);
        
        this.state = {
            accion_busqueda: 'todos',
			pagination1: new Pagination(),
            materias: new Array<Materia>()     
        };
		
		this.materias2 = new Array<Materia>();
		this.pagination2 = new Pagination();

        this.getTodosDatos = this.getTodosDatos.bind(this);
        this.setInitializeLocalPagination2 = this.setInitializeLocalPagination2.bind(this);
        this.updateStateVariablesFromLocals = this.updateStateVariablesFromLocals.bind(this);
        this.procesarTodosDatos = this.procesarTodosDatos.bind(this);
        this.anteriores = this.anteriores.bind(this);
        this.siguientes = this.siguientes.bind(this);
        this.procesarBuscar = this.procesarBuscar.bind(this);		
    }	

    setInitializeLocalPagination2() {
		
		this.pagination2 = new Pagination();
		
		this.pagination2.skip = 0;
		this.pagination2.limit = Constantes.LIMIT;		        
	}

	loadLocalVariablesFromState() {
		this.pagination2 = new Pagination();

		this.pagination2.skip = this.state.pagination1.skip;
		this.pagination2.limit = this.state.pagination1.limit;
	}

	updateStateVariablesFromLocals() {		
		this.setState({pagination1: this.pagination2});		
	}

	updateStateMateriasFromLocalGeneral(materias1:Array<Materia>) {		
		this.materias2 = new Array<Materia>();		
		this.materias2.push(...materias1);

		this.setState({materias: this.materias2}, () => {
			this.props.updateDatosView!(this.state.materias);
		});	
	}

	async getTodosDatos() {			
		//mostrarLoader();

		this.setInitializeLocalPagination2();		

        this.setState({accion_busqueda: 'todos'});

		await this.procesarTodosDatos();

		this.updateStateVariablesFromLocals();

		//ocultarLoader();		
		//this.props.updateDatosView!(this.materias2);
	};	

    async procesarTodosDatos() {
		
		const url_global_controller=FuncionGeneral.GetUrlGlobalController(this.props.module,this.props.controller,Constantes.RJ_TODOS);
			
		const data_json = {
			pagination : this.pagination2
		};

		const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
		
		const response_json = await fetch(url_global_controller, request_options);
		
		const data:MateriaReturnView = await response_json.json();
		
		this.updateStateMateriasFromLocalGeneral(data.materias);						
	}
	
	async anteriores() {
		
		this.loadLocalVariablesFromState();

		if(this.pagination2.skip - this.pagination2.limit < 0) {			
			this.pagination2.skip = 0;

		} else {
			this.pagination2.skip = this.pagination2.skip - this.pagination2.limit;
		}
				
		await this.procesarBuscar();	
		
		this.updateStateVariablesFromLocals();	
		
		//this.props.updateDatosView!(this.state.materias);
	}
	
	async siguientes() {
		
		this.loadLocalVariablesFromState();
		
		if(this.state.materias != null && this.state.materias.length > 0) {
						
			this.pagination2.skip =this.pagination2.skip + this.pagination2.limit;
		}
				
		await this.procesarBuscar();
		
		this.updateStateVariablesFromLocals();
		
		//this.props.updateDatosView!(this.state.materias);
	}
	
	async procesarBuscar() {
		
		if(this.state.accion_busqueda === 'todos') {
			await this.procesarTodosDatos();
			
		} else if(this.state.accion_busqueda === 'buscar') {
			//await getBuscarGeneralDatos();
		}			
	}

    render() {
		return (
            <div id="div_materia_form_buscar" className="div_buscar_general">
			
			<div className="tabs_general">
	
	
			</div>
	
	        </div>
        )
    }
}

//return <BuscarMateriaClassCompRef/>
//});

//export {BuscarMateriaClassComp};
//let BuscarMateriaClassCompRef = forwardRef(BuscarMateriaClassComp);
//export {BuscarMateriaClassComp,BuscarMateriaClassCompRef};

export {BuscarMateriaClassComp};