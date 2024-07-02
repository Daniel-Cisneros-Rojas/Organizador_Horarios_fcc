import './App.css';
import Filtros from './componentes/Filtros';
import Leer from './componentes/lectorpdf'
import Horarios from './componentes/Horarios';



import { useState } from 'react';


function App() {
  const [materias,setMaterias]=useState([]);
  
  const ponerDatos=(datos)=>{
    setDatos(datos);
    
  }
  /*datos usados para los select */
  const [datos,setDatos]=useState([]);
  const [profes,setProfes]=useState([]);

  const ponerMaterias=(materias)=>{
    setMaterias(materias);
  }

  const ponerProfesores=(profesores)=>{
    setProfes(profesores);
  }
  /*obtener hora de inicio y fin para mandar a los horarios */
  const [intervaloTiempo,setIntervaloTiempo]=useState([]);

  const ponerIntervaloTiempo=(intervalo)=>{
    setIntervaloTiempo(intervalo);
  }

  /*Obtener grupos de materias para mostrarlos */
  const [grupos,setGrupos]=useState([]);
  
  const ponerGrupos=(gruposRecibidos)=>{
    setGrupos(gruposRecibidos);
  }

  
  return (
    <div className="App">
      <Leer 
      ponerDatos={ponerDatos}
      ponerMaterias={ponerMaterias}
      ponerProfesores={ponerProfesores}
      />
      
    
      <Filtros
      materias={materias}
      datos={datos}
      ponerGrupos={ponerGrupos}
      ponerIntervaloTiempo={ponerIntervaloTiempo}
      profes={profes}
      />
      

      <Horarios
      grupos={grupos}
      intervaloTiempo={intervaloTiempo}
      />
      
    </div>
  );
}

export default App;
