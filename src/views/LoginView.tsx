import React,{ useState,useRef } from "react"
//import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
//import ReactDOM from 'react-dom';

import {Constantes} from '../ts/general/util/Constantes'
import {FuncionGeneral} from '../ts/general/util/FuncionGeneral'

import {AlertComp} from "../components/AlertComp";


/*------------------ TITULO GENERAL ----------------------*/
import '../scss/components/title/titulo_general.scss'
/*------------------ BUTTON GENERAL ----------------------*/
import "../scss/components/button/button_general.scss";

/*------------------ LOGIN ----------------------*/
import "../scss/components/login/login_general.scss";

function LoginView() {
    
    let navigate = useNavigate();
    const alertComp1:any = useRef();

    //------------------ GENERAL ----------------
    const [title] = useState("LOGIN") //, setTitle
    //------------------ FORMULARIO ----------------
    const [usuario, setUsuario] = useState("")
    const [clave, setClave] = useState("")
    //------------------ ACCIONES FORMULARIO ----------------
    //const [tipo_accion, setTipo_accion] = useState("")
    const [module] = useState("global") //, setModule
    const [controller] = useState("login") //, setController
    //------------------ MENSAJE ALERT ----------------
    const [tipo_mensaje, setTipo_mensaje] = useState("NONE")
    const [mensaje, setMensaje] = useState("Defecto")
        
    const cancelar = () => {
        //alert("Cancelar",usuario,clave)
        //------------------ LOCAL ACCIONES FORMULARIO ----------------
       // setTipo_accion(constantes.CANCELAR)
        //------------------ LOCAL FORMULARIO ----------------
        setUsuario("")
        setClave("")
        //------------------ COMPONENTE MENSAJE----------------
        setMensajeAlerta(Constantes.SUCCESS,"Ingrese sus datos nuevamente")          
    }

    const setMensajeAlerta = (tipo_mensaje:string,mensaje:string) => { 
        setTipo_mensaje(tipo_mensaje)
        setMensaje(mensaje)
        
        //console.log(alertComp1.current)        
        alertComp1.current.setMensajeAlerta()        
        //navigate("../main", { replace: true });
    }

    const aceptar = async () => {

        const url_global_controller = FuncionGeneral.GetUrlGlobalController(module, controller, "aceptar");

        const form_data_json ={ usuario: usuario,
                                clave: clave }

        const request_options = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(form_data_json)
        }

        const response_json = await fetch(url_global_controller, request_options)
        
        const data_json = await response_json.json()
        
        if (data_json != null) {
            setMensajeAlerta(Constantes.SUCCESS,"Usuario Correcto...")                
            navigate("../main", { replace: true });

        } else {
            setMensajeAlerta(Constantes.ERROR,"Usuario Incorrecto...")                
        }
    }

             
    return (
        <div id="divLoginGlobal">

            <h3 className="titulo_general" style={{display:"none"}}>
                { title }
            </h3>		
            
            <AlertComp  ref={alertComp1}
                        tipo_mensaje={tipo_mensaje} 
                        mensaje={mensaje}/>
            
            {
            /*
            <AlertComp  ref="alertComp1"
            <!-- Si se usaria campos(Padre),propiedades(Hijo)-->
            <!-- <AlertComp @close_alert_emit="close_alert_parent" :tipo_mensaje="tipo_mensaje" :mensaje="mensaje" :display="display" :opacity="opacity" :isAlertGeneral="isAlertGeneral" :isAlertInfo="isAlertInfo" :isAlertSucess="isAlertSucess" :isAlertWarning="isAlertWarning" :isAlertError="isAlertError"/> -->		
            */
            }
   
            <div id="div_login_form_general" className="login_div_general">
                
                <form id="form_login_general" 
                    className="login_form_general" 
                    method="POST">
                    
                    <fieldset> 			

                        <legend>Login:</legend>
                        <input type="hidden" id="aux" name="aux" value=""/>																
                        
                        <label htmlFor="usuario">Usuario</label>
                        <input type="text" id="usuario" name="usuario" 
                            placeholder="Usuario.."
                            onChange={(e) => setUsuario(e.target.value)}/>
                        
                        <label htmlFor="clave">Clave</label>
                        <input type="password" id="contrasena" name="contrasena" 
                            placeholder="Clave.."
                            onChange={(e) => setClave(e.target.value)}/>
                        
                        <button type="button" id="aceptar_button" name="aceptar_button"
                                value="Aceptar" className="button_general"
                                onClick={aceptar}>                    
                            <i className="fa fa-fw fa-check-circle"></i>
                            Aceptar
                        </button>

                        <button type="button" id="cancelar_button" name="cancelar_button" 
                                value="Cancelar" className="button_general" 
                                onClick={cancelar}>                    
                            <i className="fa fa-fw fa-minus-circle"></i>
                            Cancelar
                        </button>

                    </fieldset>

                </form>        
            </div>
        </div>
      );
}

export {LoginView};