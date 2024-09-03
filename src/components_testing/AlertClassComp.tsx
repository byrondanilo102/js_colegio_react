import React,{ useState,forwardRef,useImperativeHandle } from "react"
//import ReactDOM from 'react-dom'

import {Constantes} from '../ts/general/util/Constantes'

import '../scss/components/alert/alert_general.scss'

/*
 //MENSAJE ALERT GENERAL
tipo_mensaje:String,
mensaje:String
*/
//function AlertComp(props) {
//const AlertComp = forwardRef((props, ref) => {

class AlertClassComp extends React.Component <{ tipo_mensaje:string
                                                mensaje:string
                                                },{
                                                    display:string,
                                                    opacity:string,

                                                    isAlertGeneral:boolean,
                                                    isAlertInfo:boolean,
                                                    isAlertSucess:boolean,
                                                    isAlertWarning:boolean,
                                                    isAlertError:boolean
                                                }> {
   
    constructor(props:any) {
        super(props);

        this.state = {
            display: 'none',
            opacity: 'none',

            isAlertGeneral: true,
            isAlertInfo: false,
            isAlertSucess:false,
            isAlertWarning:false,
            isAlertError:false            
        };
        
        this.setOpacity = this.setOpacity.bind(this);
        this.setDisplay = this.setDisplay.bind(this);

        this.setIsAlertGeneral = this.setIsAlertGeneral.bind(this);
        this.setIsAlertInfo = this.setIsAlertInfo.bind(this);
        this.setIsAlertSucess = this.setIsAlertSucess.bind(this);
        this.setIsAlertWarning = this.setIsAlertWarning.bind(this);
        this.setIsAlertError = this.setIsAlertError.bind(this);

        this.setMensajeAlerta = this.setMensajeAlerta.bind(this);
        this.closeAlertGeneral = this.closeAlertGeneral.bind(this);
    }

    setOpacity(opacity1:string){this.setState({opacity: opacity1});}
    setDisplay(display1:string){this.setState({display: display1});}

    setIsAlertGeneral(isAlertGeneral1:boolean){this.setState({isAlertGeneral: isAlertGeneral1});}
    setIsAlertInfo(isAlertInfo1:boolean){this.setState({isAlertInfo: isAlertInfo1});}
    setIsAlertSucess(isAlertSucess1:boolean){this.setState({isAlertSucess: isAlertSucess1});}
    setIsAlertWarning(isAlertWarning1:boolean){this.setState({isAlertWarning: isAlertWarning1});}
    setIsAlertError(isAlertError1:boolean){this.setState({isAlertError: isAlertError1});}

    closeAlertGeneral() {
        this.setOpacity("0")
            
        setTimeout(() => {
            this.setDisplay("none")
        }, 600)
    }

    setMensajeAlerta() {
        //Son Parametros
        //this.tipo_mensaje=tipo_mensaje            
        //this.mensaje = mensaje

        //tipo_mensaje,mensaje
        //console.log("setMensajeAlerta,",this.tipo_mensaje,this.mensaje)
        
        //MENSAJE ALERT MOSTRAR OCULTAR
        this.setDisplay("block")
        this.setOpacity("1")
        //MENSAJE ALERT TIPO
        this.setIsAlertGeneral(true)
        this.setIsAlertInfo(false)
        this.setIsAlertSucess(false)
        this.setIsAlertWarning(false)
        this.setIsAlertError(false)

        if (this.props.tipo_mensaje === Constantes.INFO) {
            this.setIsAlertInfo(true)
        
        } else if (this.props.tipo_mensaje ===Constantes.SUCCESS) {
            this.setIsAlertSucess(true)

        } else if (this.props.tipo_mensaje === Constantes.WARNING) {
            this.setIsAlertWarning(true)

        } else if (this.props.tipo_mensaje === Constantes.ERROR) {
            this.setIsAlertError(true)         
        } 
    }

    render() {
        return (
        
            <div id="div_alert_general" 
                style={{display: this.state.display, 
                        opacity: this.state.opacity}}
    
                className={`${this.state.isAlertGeneral===true && "alert_general"} 
                            ${this.state.isAlertInfo===true && "alert_info"}
                            ${this.state.isAlertSucess===true && "alert_success"}
                            ${this.state.isAlertWarning===true && "alert_warning"}
                            ${this.state.isAlertError===true && "alert_error"}`}>
                    
                <span id="span_close_alert_general" 
                    className="close_alert_general" 
                    onClick = {this.closeAlertGeneral}>
    
                    &times;
                </span>
    
                <p id="p_mensaje_alert_general">
                    {this.props.mensaje}
                </p>
    
            </div>
            
          );
    }

}     //function
//})      //forwardRef

//let AlertComp = forwardRef(AlertCompBase)

export {AlertClassComp}