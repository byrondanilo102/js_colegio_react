import React,{ useState } from "react" //,useRef
//import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
//import ReactDOM from 'react-dom';

import {AlertComp} from '../components/AlertComp'
import {HeaderComp} from '../components/HeaderComp'
import {FooterComp} from '../components/FooterComp'

/*------------------ GENERAL ----------------------*/
//import "../scss/general.scss";
/*------------------ TITULO GENERAL ----------------------*/
import '../scss/components/title/titulo_general.scss'
/*------------------ BUTTON GENERAL ----------------------*/
import "../scss/components/button/button_general.scss";

/*------------------ MAIN MENU ----------------------*/
import "../scss/components/main/main_general.scss";

function MainView() {
    
    let navigate = useNavigate();
    
    //------------------ GENERAL ----------------
    const [title] = useState("LOGIN") //, setTitle
    //------------------ ACCIONES FORMULARIO ----------------
    //const [module, setModule] = useState("global")
    //const [controller, setController] = useState("main")
   
    const abrirPrueba = () => {
      navigate("../prueba", { replace: true });
    }

    const abrirConfiguracion = () => {
      navigate("../configuracion", { replace: true });
    }

    const abrirActuador = () => {
      navigate("../actuador", { replace: true });
    }

    const abrirUsuario = () => {
      navigate("../usuario", { replace: true });
    }

    const abrirAislamiento = () => {
      navigate("../aislamiento", { replace: true });
    }

    const abrirAtracamiento = () => {
      navigate("../atracamiento", { replace: true });
    }

    const abrirBobinado = () => {
      navigate("../bobinado", { replace: true });
    }

    const abrirInductancia = () => {
      navigate("../inductancia", { replace: true });
    }

    const abrirEstanquiedad = () => {
      navigate("../estanquiedad", { replace: true });
    }

    const abrirAltaVelocidad = () => {
      navigate("../prueba", { replace: true });
    }

    const abrirMediaVelocidad = () => {
      navigate("../prueba", { replace: true });
    }
    
    const abrirBajaVelocidad = () => {
      navigate("../prueba", { replace: true });
    }

    const cerrarSession = () => {
      navigate("../prueba", { replace: true });
    }

    return (
      <div id="divMainGlobal">

        <HeaderComp/>
      
        <h3 className="titulo_general">
          { title }
        </h3>		
      
        <AlertComp tipo_mensaje="" mensaje=""/>
      
        <div id="div_main_menu_form_general"
          style={{width: "100%", textAlign: "center"}}>
      
          <form id="form_main_menu_general" className="main_menu_form_general">
      
            <fieldset className="fieldset_menu_general1">
              <legend>Pruebas:</legend>
      
              <button type="button" id="prueba_button" name="prueba_button" 
                  value="Pruebas" className="button_general" 
                  onClick={abrirPrueba}>
                <i className="fa fa-fw fa-check-square"></i>
                Pruebas								
              </button>
            </fieldset>
      
            <fieldset className="fieldset_menu_general2">
              <legend>Configuracion:</legend>
              <input type="hidden" id="aux1" name="aux1" value=""/>    
      
              <button type="button" id="configuracion_button" name="configuracion_button" 
                  value="Configuracion" className="button_general" 
                  onClick={abrirConfiguracion}>
                <i className="fa fa-fw fa-cogs"></i>
                Configuracion
              </button>
      
              <button type="button" id="actuador_button" name="actuador_button" 
                  value="Actuador" className="button_general" 
                  onClick={abrirActuador}>
                <i className="fa fa-fw fa-list"></i>
                Actuador
              </button>				
            </fieldset>
      
            <fieldset className="fieldset_menu_general3">					
              <legend>Seguridad:</legend>
              <input type="hidden" id="aux2" name="aux2" value=""/>
      
              <button type="button" id="usuario_button" name="usuario_button" 
                  value="Usuario" className="button_general" 
                  onClick={abrirUsuario}>
                <i className="fa fa-fw fa-user"></i>
                Usuarios
              </button>
      
              <button type="button" id="cerrar_button" name="cerrar_button" 
                  value="Cerrar" className="button_general" 
                  onClick={cerrarSession}>
                <i className="fa fa-fw fa-times-circle"></i>
                Cerrar
              </button>
            </fieldset>
      
            <fieldset className="fieldset_menu_general4">
              <legend>Auxiliar Electrica:</legend>
              <input type="hidden" id="aux3" name="aux3" value=""/>
              <input type="hidden" id="aux4" name="aux4" value=""/>
              <input type="hidden" id="aux5" name="aux5" value=""/>
      
              <button type="button" id="aislamiento_button" name="aislamiento_button" 
                  value="Aislamiento" className="button_general" 
                  onClick={abrirAislamiento}>
                <i className="fa fa-fw fa-lightbulb"></i>
                Aislamiento
              </button>
      
              <button type="button" id="atracamiento_button" name="atracamiento_button" 
                  value="Atracamiento" className="button_general" 
                  onClick={abrirAtracamiento}>
                <i className="fa fa-fw fa-lightbulb"></i>
                Atracamiento
              </button>
      
              <button type="button" id="bobinado_button" name="bobinado_button" 
                  value="Bobinado" className="button_general" 
                  onClick={abrirBobinado}>
                <i className="fa fa-fw fa-lightbulb"></i>
                Bobinado
              </button>
      
              <button type="button" id="inductancia_button" name="inductancia_button" 
                  value="Inductancia" className="button_general" 
                  onClick={abrirInductancia}>
                <i className="fa fa-fw fa-lightbulb"></i>
                Inductancia
              </button>
            </fieldset>
      
            <fieldset className="fieldset_menu_general5">					
              <legend>Auxiliar Mecanica:</legend>	
              <input type="hidden" id="aux6" name="aux6" value=""/>
              <input type="hidden" id="aux7" name="aux7" value=""/>
              <input type="hidden" id="aux8" name="aux8" value=""/>               
      
              <button type="button" id="estanquiedad_button" name="estanquiedad_button" 
                  value="Estanquiedad" className="button_general" 
                  onClick={abrirEstanquiedad}>
                <i className="fa fa-fw fa-car"></i>
                Estanquiedad
              </button>
      
              <button type="button" id="alta_velocidad_button" name="alta_velocidad_button" 
                  value="Alta Velocidad" className="button_general" 
                  onClick={abrirAltaVelocidad}>
                <i className="fa fa-fw fa-car"></i>
                Alta Velocidad
              </button>
      
              <button type="button" id="media_velocidad_button" name="media_velocidad_button" 
                  value="Media Velocidad" className="button_general" 
                  onClick={abrirMediaVelocidad}>
                <i className="fa fa-fw fa-car"></i>
                Media Velocidad
              </button>
      
              <button type="button" id="baja_velocidad_button" name="baja_velocidad_button" 
                  value="Baja Velocidad" className="button_general" 
                  onClick={abrirBajaVelocidad}>
                <i className="fa fa-fw fa-car"></i>
                Baja Velocidad
              </button>
      
            </fieldset>
      
          </form>
        </div>
      
        <FooterComp/>
      
      </div>
	
      );
}

export {MainView};