import { Outlet, Link } from "react-router-dom";
 
import '../scss/components/menu_principal/menu_principal_general.scss';

const LayoutView = () => {
  return (
    <> 
      <nav>
        <ul className="navbar_general">
            
          <li><i className="fa fa-fw fa-home"></i><Link to="/">Home</Link></li>
          <li><Link to="/alumno">Alumnos</Link></li>			
          <li><Link to="/alumno_materia">Alumno_materias</Link></li>			
          <li><Link to="/contrato">Contratos</Link></li>			
          <li><Link to="/docente">Docentes</Link></li>			
          <li><Link to="/docente_materia">Docente_materias</Link></li>			
          <li><Link to="/materia">Materias</Link></li>			
          <li><Link to="/matricula">Matriculas</Link></li>			
          <li><Link to="/nota">Notas</Link></li>			
          <li><Link to="/pension">Pensions</Link></li>			
          <li><Link to="/sueldo">Sueldos</Link></li>
          <li><Link to="/main">Main</Link></li>
          <li><Link to="/login">Login</Link></li>   

          <li><Link to="/alumno_lote">Alumnos Lote</Link></li>                    
          <li><Link to="/docente_lote">Docentes Lote</Link></li>
          <li><Link to="/materia_lote">Materias Lote</Link></li>
          <li><Link to="/alumno_materia_lote">Alumno Materias Lote</Link></li>

          <li><Link to="/materia_class_lote">Materias Class Lote</Link></li>
          <li><Link to="/materia_class">Materias Class</Link></li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export {LayoutView}