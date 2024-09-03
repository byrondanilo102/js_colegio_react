import React,{ useState,forwardRef,useImperativeHandle, ReactElement } from "react"
//import ReactDOM from 'react-dom'

import '../scss/components/loader/loader_general.scss'

function HeaderCompBase(props:any,ref:any): JSX.Element {

    //const [title, setTitle] = useState("HEADER")
    const [display, setDisplay] = useState("none")

    const style_loader1 = {
        display: display
    }

    const mostrarLoader = () => {
        setDisplay("block")
    }

    const ocultarLoader = () => {
        setDisplay("none")
    }

    useImperativeHandle(ref, () => ({
        mostrarLoader,
        ocultarLoader
    }));

    return (
        <div id="div_header">
    
            <h5 style={{textAlign: "center"}}>
                Metricas Auto (H)
            </h5>
            
            <div id="div_loader" 
                style={style_loader1}
                className="loader_general">
                
            </div>

        </div>
    )
}

let HeaderComp = forwardRef(HeaderCompBase)

export {HeaderCompBase,HeaderComp}