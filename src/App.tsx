import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg'
import './App.css'

import {LayoutView} from './views/LayoutView'
import {HomeView} from './views/HomeView'
//import {NoPageView} from './views/NoPageView.txt'

import {LoginView} from './views/LoginView'
import {MainView} from './views/MainView'

import {AlumnoView} from './views/estructura/AlumnoView'
import {AlumnoMateriaView} from './views/estructura/AlumnoMateriaView'
import {ContratoView} from './views/financiero/ContratoView'
import {DocenteView} from './views/estructura/DocenteView'
import {DocenteMateriaView} from './views/estructura/DocenteMateriaView'
import {MateriaView} from './views/estructura/MateriaView'
import {MatriculaView} from './views/proceso/MatriculaView'
import {NotaView} from './views/proceso/NotaView'
import {PensionView} from './views/financiero/PensionView'
import {SueldoView} from './views/financiero/SueldoView'

import {AlumnoLoteView} from './views/estructura/lote/AlumnoLoteView'
import {DocenteLoteView} from './views/estructura/lote/DocenteLoteView'
import {MateriaLoteView} from './views/estructura/lote/MateriaLoteView'
import {AlumnoMateriaLoteView} from './views/estructura/lote/AlumnoMateriaLoteView'

import {MateriaClassLoteView} from './views_testing/estructura/lote/MateriaClassLoteView'
import {MateriaClassView} from './views_testing/estructura/MateriaClassView'

function App() {
  return (
    <BrowserRouter basename='/dist/'>
    <Routes>
      <Route path="/" element={<LayoutView />}>        
      <Route index element={<HomeView />} />
      <Route path="login" element={<LoginView />} />
      <Route path="main" element={<MainView />} />
  
      <Route path="alumno" element={<AlumnoView />} />	
      <Route path="alumno_materia" element={<AlumnoMateriaView />} />	
      <Route path="contrato" element={<ContratoView />} />	
      <Route path="docente" element={<DocenteView />} />	
      <Route path="docente_materia" element={<DocenteMateriaView />} />	
      <Route path="materia" element={<MateriaView />} />	
      <Route path="matricula" element={<MatriculaView />} />	
      <Route path="nota" element={<NotaView />} />	
      <Route path="pension" element={<PensionView />} />	
      <Route path="sueldo" element={<SueldoView />} />	


      <Route path="alumno_lote" element={<AlumnoLoteView />} />
      <Route path="docente_lote" element={<DocenteLoteView />} />
      <Route path="materia_lote" element={<MateriaLoteView />} />
      <Route path="alumno_materia_lote" element={<AlumnoMateriaLoteView />} />
     
      <Route path="materia_class_lote" element={<MateriaClassLoteView />} />
      <Route path="materia_class" element={<MateriaClassView />} />
      
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
*/

export default App
