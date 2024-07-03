import pdfToText from 'react-pdftotext';
import '../estilos/lectorpdf.css'
import { Box } from '@mui/material';
import { FaFileDownload } from "react-icons/fa";
 function PDFParserReact({ponerDatos,ponerMaterias,ponerProfesores}) {

  let prueba=[];
  let materias=[];
  let profesores=[];
  let datosAgrupados=[];

 //filtros para obtener los datos requeridos de cada linea, de contenerlos se agregan a un arreglo
  const agregarDatos=async(referencia,lineaTexto)=>{
    const patron=[
    /(\b\d{4}\s-\s\d{4}\b)/g,
    /(\s-\s)/g,
    /\d{1}[a-z]{3}\d\W\d{3}/,
    /\d{1}[a-z]{3}\d[a-z]\W/,
    /por\sasignar/,
    ];
    const clave=lineaTexto.slice(0,9);
    let nuevoTexto=lineaTexto.slice(9);
    let horarios=nuevoTexto.match(patron[0]);
    nuevoTexto=nuevoTexto.split(patron[0]);
   
    if(horarios!==null) {
      horarios=horarios[0].split(patron[1]);
      const horaInicio=parseInt(horarios[0].slice(0,2));
      const horaFin=parseInt(horarios[2].slice(0,2))+1;
      const diaSemana=nuevoTexto[0].slice(nuevoTexto[0].length-2,nuevoTexto[0].length-1);
      const seccion=nuevoTexto[0].slice(nuevoTexto[0].length-6,nuevoTexto[0].length-3);
      const materia=nuevoTexto[0].slice(0,nuevoTexto[0].length-7);
      
      

      if(nuevoTexto[2].match(patron[2])){
        const salon=nuevoTexto[2].match(patron[2]);
        nuevoTexto=nuevoTexto[2].split(patron[2]);
        const profesor=nuevoTexto[0];
        const datosMateria={
          nrc:parseInt(referencia),
          clave:clave,
          horaIncio:horaInicio,
          horaFin:horaFin,
          dia: diaSemana,
          seccion:seccion,
          materia:materia,
          profesor:profesor,
          salon:salon[0]

        }
        prueba=[...prueba,datosMateria];
        materias=[...materias,materia];
        profesores=[...profesores,profesor];
        //console.log(datosMateria);
        
      }else if(nuevoTexto[2].match(patron[3]))
      {
        const salon=nuevoTexto[2].match(patron[3]);
        nuevoTexto=nuevoTexto[2].split(patron[3]);
        const profesor=nuevoTexto[0];
        const datosMateria={
          nrc:parseInt(referencia),
          clave:clave,
          horaIncio:horaInicio,
          horaFin:horaFin,
          dia: diaSemana,
          seccion:seccion,
          materia:materia,
          profesor:profesor,
          salon:salon[0]

        }
        prueba=[...prueba,datosMateria];
        materias=[...materias,materia];
        profesores=[...profesores,profesor];
        
      }else if(nuevoTexto[2].match(patron[4])){
      
        nuevoTexto=nuevoTexto[2].split(patron[4]);
        const profesor=nuevoTexto[0];
        const datosMateria={
          nrc:parseInt(referencia),
          clave:clave,
          horaIncio:horaInicio,
          horaFin:horaFin,
          dia: diaSemana,
          seccion:seccion,
          materia:materia,
          profesor:profesor,
          salon:"Salon por asignar"

        }
        prueba=[...prueba,datosMateria];
        materias=[...materias,materia];
        profesores=[...profesores,profesor];
        
      }
      else{
        console.log('no concuerda');
      }
      
      
    }
    
    

  }

  
    //obtiene el texto del pdf
    function extractText(event) {
      prueba=[];
    const file = event.target.files[0];
       pdfToText(file)
      .then((extractedText)=>{
         analizarTexto(extractedText);   
      })
      .catch((error) => {console.error("Error al extraer el texto del PDF", error);});  
      
  };
    //separa el texto por lineas de la tabla, estas lineas aun se consideran candidatas
     const analizarTexto=(text)=>{
     const patron=[/\d{5}/g];
     const filtroEspacios=text.replace(/\s+/g,' ');
     const numeroReferencia=filtroEspacios.match(patron[0]);
     const lineas=filtroEspacios.toLowerCase().split(patron[0]);
     
     if(lineas.length===numeroReferencia.length+1)
     {
      let omitirSiguiente=false;
      for(let i = 0; i < numeroReferencia.length; i++){
        if(lineas[i+1].match('materia cruzada'))
        {
           omitirSiguiente=true;
      
           agregarDatos(numeroReferencia[i],lineas[i+1]);
           
        }
        else if(!omitirSiguiente){
           
           agregarDatos(numeroReferencia[i],lineas[i+1]);
      
        } else {omitirSiguiente=!omitirSiguiente;}
        
      }
      
       
     }
     
     //elimina duplicados;

     materias=materias.filter((elemento,indice)=>{
      return materias.indexOf(elemento)===indice;
     });

     profesores=profesores.filter((elemento,indice)=>{
      return profesores.indexOf(elemento)===indice;
     });

     //da formato para select
     materias=materias.map((materia)=>{
      return {
        value:materia,
        label:materia
      }
     })

     profesores=profesores.map((profesor)=>{
      return {
        value:profesor,
        label:profesor
      }
     })
     //agrupacion de los datos
     let contador=0,pivoteAgrupar;
     const tamano=prueba.length-1;
    
     

     while(contador<=tamano){
      if(tamano-contador>=2){
        if(prueba[contador].nrc===prueba[contador+1].nrc&&prueba[contador+2].nrc===prueba[contador].nrc)
        {
         
          pivoteAgrupar={
            nrc: prueba[contador].nrc,
            clave: prueba[contador].clave,
            materia: prueba[contador].materia,
            seccion:prueba[contador].seccion,
            profesor: prueba[contador].profesor,
            salon:[prueba[contador].salon,prueba[contador+1].salon,prueba[contador+2].salon],
            dias: [prueba[contador].dia,prueba[contador+1].dia,prueba[contador+2].dia],
            horaIncio: [prueba[contador].horaIncio,prueba[contador+1].horaIncio,prueba[contador+2].horaIncio],
            horaFin:[prueba[contador].horaFin,prueba[contador+1].horaFin,prueba[contador+2].horaFin]

          }
          datosAgrupados=[...datosAgrupados,pivoteAgrupar];
          
          contador+=2;
        }
        else{
          if(prueba[contador].nrc===prueba[contador+1].nrc)
          {

            pivoteAgrupar={
              nrc: prueba[contador].nrc,
              clave: prueba[contador].clave,
              materia: prueba[contador].materia,
              seccion:prueba[contador].seccion,
              profesor: prueba[contador].profesor,
              salon:[prueba[contador].salon,prueba[contador+1].salon],
              dias: [prueba[contador].dia,prueba[contador+1].dia],
              horaIncio: [prueba[contador].horaIncio,prueba[contador+1].horaIncio],
              horaFin:[prueba[contador].horaFin,prueba[contador+1].horaFin]
              
            }
            datosAgrupados=[...datosAgrupados,pivoteAgrupar];
            contador++;
            
          }
        }
        
      }
      contador++;
     
     }
   
     
     //
     ponerProfesores(profesores);
     ponerMaterias(materias);
     ponerDatos(datosAgrupados);
  }
  

  return (
    <Box width={'100%'} textAlign={'center'} justifyContent={'center'} marginTop={2}>
      
      <input type="file" id="file" accept="application/pdf" onChange={extractText} />
     
      <label htmlFor='file'><i><FaFileDownload/></i>Cargar archivo de Horarios</label>
      
      
    </Box>
        
     
  );
}

export default PDFParserReact;