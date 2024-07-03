import { Box, Slider } from "@mui/material";
import React,{useState} from "react";
import Select from "react-select";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import makeAnimated from 'react-select/animated';
import '../estilos/Filtros.css'
import { FaRegCalendarCheck } from "react-icons/fa";


function Filtros({materias,datos,ponerGrupos,ponerIntervaloTiempo,profes}){
    /*colores para usar en los horarios */
    let controlColor=0;
    const colorAsignado=()=>{
      let colorFondo;
      switch (controlColor) {
        case 0:
          colorFondo="yellow";
          break;
        case 1:
          colorFondo="lime";
          break;
        case 2:
          colorFondo="fuchsia";
          break;
        case 3:
          colorFondo="orange";
          break;
        case 4:
          colorFondo="purple";
          break;
        default:
          colorFondo="aqua";
          controlColor=-1;
          break;
      }
      controlColor++;
      return colorFondo;
    }
  /*Drodown*/ 
   
   const[materiasSeleccionadas,setMateriasSeleccionadas]=useState([]);
   const handleChange=(selectedOption)=>{
    setMateriasSeleccionadas(selectedOption);
  
   };
   const[profesSeleccionados,setProfesSeleccionados]=useState([]);
   const handleChange3=(selectedOption)=>{
    setProfesSeleccionados(selectedOption);
   }
   /*seleccion de grupos que cumplan los filtros*/
   let datosFiltrados;
   const obtenerCandidatos=()=>{
   ponerIntervaloTiempo(value);
   const finales=datos.filter((dato)=>{
    for(let i=0;i<materiasSeleccionadas.length;i++){
       if(dato.materia===materiasSeleccionadas[i].value)
       {
        let aceptado=0;
     for(let j=0;j<dato.horaFin.length;j++){
      if(dato.horaFin[j]>value[1]||dato.horaIncio[j]<value[0]){
        
      }else{
        aceptado++;
      }
     }

     if(aceptado===dato.horaFin.length){
      return dato;
     }
       }
      }
   })

   /*obtiene indices de grupos grupos */
   let grupos=[];
   let valorMaterias=[];
   for(let i=0;i<materiasSeleccionadas.length;i++){
    grupos[i]=0;
    valorMaterias[i]=materiasSeleccionadas[i].value;
   }
   valorMaterias=valorMaterias.sort();
   for(let i=0;i<finales.length;i++){
    for(let j=0;j<materiasSeleccionadas.length;j++){
      if(finales[i].materia===valorMaterias[j]){
        grupos[j]++;
      }
    }
   }
    
   grupos=grupos.filter((grupo,i)=>grupo===0?alert(`No se encontraron grupos de ${valorMaterias[i]} prueba ampliando el intervalo de tiempo`):grupo)
  let inicioIndice=0,finIndice=0;
  for(let i=0;i<grupos.length;i++){
      inicioIndice=finIndice;
      finIndice=inicioIndice+grupos[i];
      grupos[i]=[inicioIndice,finIndice,grupos[i]];
  }

   /*verifica que existan datos que usar */
   datosFiltrados=finales;
  if(grupos.length===1){
    for(let i=0;i<grupos[0][2];i++){
      const  grupo=[{
        nrc: finales[grupos[0][0]+i].nrc,
        dia:finales[grupos[0][0]+i].dias,
        inicio: finales[grupos[0][0]+i].horaIncio,
        fin:finales[grupos[0][0]+i].horaFin,
        profesor:finales[grupos[0][0]+i].profesor,
        materia:finales[grupos[0][0]+i].materia,
        salon:finales[grupos[0][0]+i].salon
      }];
      /* */
      let id=0;
      let formato=[];
          
          for(let i=0;i<grupo.length;i++){
            const colorDeFondo=colorAsignado();
            for(let j=0;j<grupo[i].dia.length;j++){
              let dia;
              switch (grupo[i].dia[j]) {
                case "l":
                   dia=1;
                  break;
                case "a":
                  dia=2;
                  break;
                case "m":
                   dia=3;
                  break;
                case "j":
                  dia=4;
                  break;
                case "v":
                   dia=5;
                  break;
                
                default:
                  dia=0;
                  break;
              }
              const inicio="2024/1/"+dia+" "+grupo[i].inicio[j]+":00";
              const fin="2024/1/"+dia+" "+grupo[i].fin[j]+":00";
              const primeraLetra=grupo[i].materia.substring(0,2).toUpperCase();
              const restoCadena=grupo[i].materia.substring(2);
              const resultado=primeraLetra+restoCadena;
             const darFormato={
                event_id:id,
                title:resultado,
                profesor:grupo[i].profesor,
                salon:grupo[i].salon[j],
                start:new Date(inicio),
                end:new Date(fin),
                nrc:grupo[i].nrc,
                colorbg:colorDeFondo,
                
              }
              formato=[...formato,darFormato];
              id++;
            }}
      /* */
      controlColor=0;
       /*filtrado profesores */
       let contieneProfesor=[];
       let contieneTodos=0;
       for(let i=0;i<profesSeleccionados.length;i++){
         contieneProfesor[i]=0;
       }
       if(profesSeleccionados.length>0){
         for(let i=0;i<formato.length;i++){
           for(let j=0;j<profesSeleccionados.length;j++){
             if(profesSeleccionados[j].value===formato[i].profesor){
               contieneProfesor[j]++;
             }
           }
         }

         for(let i=0;i<profesSeleccionados.length;i++){
            if(contieneProfesor[i]===0){
              contieneTodos++;
              
            }
         }
        
         if(contieneTodos===0){
           gruposFinales=[...gruposFinales,formato];
         }
       }else{
         gruposFinales=[...gruposFinales,formato];
       }
    }
    if(gruposFinales.length<1){
      alert(`No se encontraron grupos `);
    }
    ponerGrupos(gruposFinales);
    
  }else if(grupos.length>1){
    
    for(let i=0;i<grupos[0][2];i++){
      const opciones=[{
        nrc: finales[grupos[0][0]+i].nrc,
        dia:finales[grupos[0][0]+i].dias,
        inicio: finales[grupos[0][0]+i].horaIncio,
        fin:finales[grupos[0][0]+i].horaFin,
        profesor:finales[grupos[0][0]+i].profesor,
        materia:finales[grupos[0][0]+i].materia,
        salon:finales[grupos[0][0]+i].salon
      }];
      Convinar(grupos.slice(1),opciones);
    }
    if(gruposFinales.length<1){
      alert(`No se encontraron grupos `);
    }
    ponerGrupos(gruposFinales);
  }else{
    alert('ningun grupo cumple los criterios de los filtros');
  }

 }

  /*Se hacen las convinaciones */
  let gruposFinales=[];
   const Convinar=(grupos,opcionesSeleccionadas)=>{
    if(grupos.length>1){
      for(let i=0;i<grupos[0][2];i++){
        const opciones={
          nrc:datosFiltrados[grupos[0][0]+i].nrc,
          dia:datosFiltrados[grupos[0][0]+i].dias,
          inicio:datosFiltrados[grupos[0][0]+i].horaIncio,
          fin:datosFiltrados[grupos[0][0]+i].horaFin,
          profesor:datosFiltrados[grupos[0][0]+i].profesor,
          materia:datosFiltrados[grupos[0][0]+i].materia,
          salon:datosFiltrados[grupos[0][0]+i].salon
        
        };
        // comprobar que no choque la materia con otra
        let choques=0;
        for(let j=0;j<opcionesSeleccionadas.length;j++){
           for(let k=0; k<opciones.dia.length;k++){
             for(let h=0;h<opcionesSeleccionadas[j].dia.length;h++){
              if(opciones.dia[k]===opcionesSeleccionadas[j].dia[h]){
                if(!(opciones.fin[k]<=opcionesSeleccionadas[j].inicio[h]||opciones.inicio[k]>=opcionesSeleccionadas[j].fin[h])){
                  choques++;
                  
                }
              }
             }
           }
        }
        if(choques===0){
          Convinar(grupos.slice(1),[...opcionesSeleccionadas,opciones]);
        }
        
      }
    }else if(grupos.length===1){
      
      for(let i=0;i<grupos[0][2];i++){
        const opciones={
          nrc:datosFiltrados[grupos[0][0]+i].nrc,
          dia:datosFiltrados[grupos[0][0]+i].dias,
          inicio:datosFiltrados[grupos[0][0]+i].horaIncio,
          fin:datosFiltrados[grupos[0][0]+i].horaFin,
          profesor:datosFiltrados[grupos[0][0]+i].profesor,
          materia:datosFiltrados[grupos[0][0]+i].materia,
          salon:datosFiltrados[grupos[0][0]+i].salon
        
        };

        // comprobar que no choque la materia con otra
        let choques=0;
        for(let j=0;j<opcionesSeleccionadas.length;j++){
           for(let k=0; k<opciones.dia.length;k++){
             for(let h=0;h<opcionesSeleccionadas[j].dia.length;h++){
              if(opciones.dia[k]===opcionesSeleccionadas[j].dia[h]){
                if(!(opciones.fin[k]<=opcionesSeleccionadas[j].inicio[h]||opciones.inicio[k]>=opcionesSeleccionadas[j].fin[h])){
                  choques++;
                }
              }
             }
           }
        }
        if(choques===0){
          const grupo=[...opcionesSeleccionadas,opciones];
          /*Da formato para el scheduler */
          let id=0;
          let formato=[];
          
          for(let i=0;i<grupo.length;i++){
            const colorDeFondo=colorAsignado();
            for(let j=0;j<grupo[i].dia.length;j++){
              let dia;
              switch (grupo[i].dia[j]) {
                case "l":
                   dia=1;
                  break;
                case "a":
                  dia=2;
                  break;
                case "m":
                   dia=3;
                  break;
                case "j":
                  dia=4;
                  break;
                case "v":
                   dia=5;
                  break;
                
                default:
                  dia=0;
                  break;
              }
              const inicio="2024/1/"+dia+" "+grupo[i].inicio[j]+":00";
              const fin="2024/1/"+dia+" "+grupo[i].fin[j]+":00";
              const primeraLetra=grupo[i].materia.substring(0,2).toUpperCase();
              const restoCadena=grupo[i].materia.substring(2);
              const resultado=primeraLetra+restoCadena;
             const darFormato={
                event_id:id,
                title:resultado,
                profesor:grupo[i].profesor,
                salon:grupo[i].salon[j],
                start:new Date(inicio),
                end:new Date(fin),
                nrc:grupo[i].nrc,
                colorbg:colorDeFondo,
              }
              formato=[...formato,darFormato];
              id++;
            }
          }
          controlColor=0;
        
          /*filtrado profesores */
          let contieneProfesor=[];
          let contieneTodos=0;
          for(let i=0;i<profesSeleccionados.length;i++){
            contieneProfesor[i]=0;
          }
          if(profesSeleccionados.length>0){
            for(let i=0;i<formato.length;i++){
              for(let j=0;j<profesSeleccionados.length;j++){
                if(profesSeleccionados[j].value===formato[i].profesor){
                  contieneProfesor[j]++;
                }
              }
            }

            for(let i=0;i<profesSeleccionados.length;i++){
               if(contieneProfesor[i]===0){
                 contieneTodos++;
                 
               }
            }
           
            if(contieneTodos===0){
              gruposFinales=[...gruposFinales,formato];
            }
          }else{
            gruposFinales=[...gruposFinales,formato];
          }
          
          
         
          
        }
      
      }
      
    }
    
   }

   
   /* Slider*/
   

   const marks = [
    {
      value: 7,
      label: '7:00 AM',
    },
    {
      value: 9,
      label: '9:00 AM',
    },
    {
      value: 11,
      label: '11:00 AM',
    },
    {
      value: 13,
      label: '1:00 PM',
    },
    {
      value: 15,
      label: '3:00 AM',
    },
    {
      value: 17,
      label: '5:00 PM',
    },
    {
      value: 19,
      label: '7:00 PM',
    },
    {
      value: 21,
      label: '9:00 PM',
    },
    
  ];
   const minDistance=2;
   const [value, setValue] = useState([7,9]);
   
   const handleChange2 = (
    e,
    newValue,
    activeThumb,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  /*comprobar que se tengan opciones seleccionadas */
  const calcularHorarios=()=>{
    if(materiasSeleccionadas.length>0){
      obtenerCandidatos();
    }
    else {
      if(materias.length<1){
        alert("carga un archivo que cumpla el formato");
      }else{
        alert("escoje las materias antes");
      }
      
    }

    
  }

  /*Styles para select */
  const customStyles={
    option:(provided,{isFocused})=>({
      ...provided,
      backgroundColor:isFocused?'fuchsia':'white',
      color:isFocused?'white':'black',
      borderBottom:'1px dotted purple',
      
    }),
    control:(provided)=>({
      ...provided,
      backgroundColor:'black',
      
    }),
    multiValue:(provided)=>({
      ...provided,
      backgroundColor:'white',
      color:'black',
      
    }),
    multiValueLabel:(provided)=>({
      ...provided,
      backgroundColor:'purple',
      color:'white'
    })

  };
  /*styles para slider */
  

const theme = createTheme({
 components:{
  MuiSlider:{
    styleOverrides:{
      root:{
        color:'purple'
      },
      thumb:{
        backgroundColor:'fuchsia',
      },
      markLabel:{
        backgroundColor:'purple',
        color:'white',
        borderRadius:'4px',
        fontSize:'11px'
      },
      
      
    }
  }
 }
});
const animatedComponents = makeAnimated();
  
    return(
      <>
      
     <Box marginTop={2} marginBottom={1}>
     <Select
      components={animatedComponents}
      maxMenuHeight={200}
      options={materias}
      value={materiasSeleccionadas}
      onChange={handleChange}
      isMulti={true}
      placeholder={"Escoje las materias que incluir"}
      styles={customStyles}
      />
     </Box>

     <Box>
     <Select
      components={animatedComponents}
      maxMenuHeight={200}
      options={profes}
      value={profesSeleccionados}
      onChange={handleChange3}
      isMulti={true}
      placeholder={"Selecciona si quieres que contenga a profesores especificos"}
      styles={customStyles}
      />
     </Box>

      <Box marginTop={5} marginBottom={5} marginLeft={5} marginRight={2}>
      <ThemeProvider theme={theme}>
      <Slider
      getAriaLabel={() => 'Minimum distance shift'}
      value={value}
      onChange={handleChange2}
      valueLabelDisplay="auto"
      valueLabelFormat={(value)=>`${value}:00 hrs`}
      marks={marks}
      step={2}
      min={7}
      max={21}
      disableSwap={true}
      
      />
      </ThemeProvider>
      </Box>
      
      <button onClick={calcularHorarios}><i><FaRegCalendarCheck /></i>Obtener horarios</button>
      </>
    );
}

export default Filtros;