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

type PropsAlertCompBase = {
    tipo_mensaje: string,
    mensaje: string
};

function AlertCompBase(props:PropsAlertCompBase,ref:any): JSX.Element {
    //GENERAL
    //const [title, setTitle] = useState("ALERT")
    //MENSAJE ALERT MOSTRAR OCULTAR
    const [display, setDisplay] = useState("none")
    const [opacity, setOpacity] = useState("none")
    //MENSAJE ALERT TIPO
    const [isAlertGeneral, setIsAlertGeneral] = useState(true)
    const [isAlertInfo, setIsAlertInfo] = useState(false)
    const [isAlertSucess, setIsAlertSucess] = useState(false)
    const [isAlertWarning, setIsAlertWarning] = useState(false)
    const [isAlertError, setIsAlertError] = useState(false)
   
    const closeAlertGeneral = () => {
        setOpacity("0")
            
        setTimeout(() => {
            setDisplay("none")
        }, 600)
    }

    const setMensajeAlerta = () => {
        //Son Parametros
        //this.tipo_mensaje=tipo_mensaje            
        //this.mensaje = mensaje

        //tipo_mensaje,mensaje
        //console.log("setMensajeAlerta,",this.tipo_mensaje,this.mensaje)
        
        //MENSAJE ALERT MOSTRAR OCULTAR
        setDisplay("block")
        setOpacity("1")
        //MENSAJE ALERT TIPO
        setIsAlertGeneral(true)
        setIsAlertInfo(false)
        setIsAlertSucess(false)
        setIsAlertWarning(false)
        setIsAlertError(false)

        if (props.tipo_mensaje === Constantes.INFO) {
            setIsAlertInfo(true)
        
        } else if (props.tipo_mensaje ===Constantes.SUCCESS) {
            setIsAlertSucess(true)

        } else if (props.tipo_mensaje === Constantes.WARNING) {
            setIsAlertWarning(true)

        } else if (props.tipo_mensaje === Constantes.ERROR) {
            setIsAlertError(true)         
        } 
    }

    //ref.current = setMensajeAlerta;

    useImperativeHandle(ref, () => ({
        setMensajeAlerta,
        closeAlertGeneral
    }));

      
    return (
        
        <div id="div_alert_general" 
            style={{display: display, 
                    opacity: opacity}}

            className={`${isAlertGeneral===true && "alert_general"} 
                        ${isAlertInfo===true && "alert_info"}
                        ${isAlertSucess===true && "alert_success"}
                        ${isAlertWarning===true && "alert_warning"}
                        ${isAlertError===true && "alert_error"}`}>
                
            <span id="span_close_alert_general" 
                className="close_alert_general" 
                onClick = {closeAlertGeneral}>

                &times;
            </span>

            <p id="p_mensaje_alert_general">
                {props.mensaje}
            </p>

        </div>
        
      );
}     //function
//})      //forwardRef

let AlertComp = forwardRef(AlertCompBase)

export {AlertComp}