import React,{ useState,forwardRef,useImperativeHandle, LegacyRef } from "react"
//import ReactDOM from 'react-dom'

import '../scss/components/loader/loader_general.scss'

class HeaderClassCompBase extends React.Component<{},{  
                                                        display: string
                                                        style_loader1: object}
                                                    ,{}> 
                                                    {

    //style_loader1;
    //innerRef:any;

    constructor(props:any) {
        super(props);

        this.state = {
            display: 'none',
            style_loader1: {
                display: 'none'
            }
        };
        
        /*
        this.style_loader1 = {
            display: this.state.display
        };
        */

        this.setDisplay = this.setDisplay.bind(this);
        this.mostrarLoader = this.mostrarLoader.bind(this);
        this.ocultarLoader = this.ocultarLoader.bind(this);  
        
        /*
        let mostrarLoader =this.mostrarLoader;
        let ocultarLoader =this.ocultarLoader;

        useImperativeHandle(ref, () => ({
            mostrarLoader,
            ocultarLoader
        }));
        */
    }    

    setDisplay(display1:string) {
        this.setState({display: display1});
    }
    
    mostrarLoader() {
        this.setDisplay("block")
    }

    ocultarLoader() {
        this.setDisplay("none")
    }
    

    render() {               

        return (
            <div id="div_header">
        
                <h5 style={{textAlign: "center"}}>
                    Metricas Auto (H)
                </h5>
                
                <div id="div_loader" 
                    style={this.state.style_loader1}
                    className="loader_general">
                    
                </div>

            </div>
        )
    }
}

//return <HeaderClassCompBase {...props} innerRef={ref}/>
/*
const HeaderClassComp0 = React.forwardRef((props:any, ref:any) => (
    <HeaderClassCompBase {...props} forwardRef={ref}/>
));

//let HeaderComp = forwardRef(HeaderCompBase)
*/

export {HeaderClassCompBase}