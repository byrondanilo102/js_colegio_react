import {FooterComp} from "../components/FooterComp";
import {HeaderComp} from "../components/HeaderComp";

import {AlertComp} from "../components/AlertComp";

function HomeView() {
    return (
        <>  
            {<HeaderComp />}          

            <h1>Home</h1>

            {<FooterComp />}

            {<AlertComp tipo_mensaje="info" mensaje="Testttt"/>}
        </>
    );
}
  
export {HomeView}