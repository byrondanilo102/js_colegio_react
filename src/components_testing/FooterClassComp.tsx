import React from 'react';
//import ReactDOM from 'react-dom';


class FooterClassComp extends React.Component {

    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            
            <div id="div_footer">
                <h5 style={{textAlign: "center"}}>
                    Metricas Auto 2021 (F)
                </h5>            
            </div>
            
        )
    }
}

export {FooterClassComp}