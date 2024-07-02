import React from "react";
import { Paper,Box } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";



function Horarios({grupos,intervaloTiempo}){
   
 let c=0;

return(
   <>
    {
    grupos.map((grupo)=>{
        c++;
     return(
    
    
    <>
    <Box width={900} height={50} bgcolor={"black"} color={"white"}>
        Horario Numero : {c}
    </Box>
     <Box width={900}>
        <Scheduler
        day={null}
        month={null}
        agenda={null}
        disableViewNavigator={true}
        navigation={false}
        selectedDate={new Date("2024/1/4")}
        view="week"
        events={grupo}
        editable={false}
        onEventClick={()=>{console.log("nun");}}
        week={{
            weekDays:[2,3,4,5,6],
            startHour:intervaloTiempo[0],
            endHour:intervaloTiempo[1],
        }}
        viewerTitleComponent={()=>{
            return(
                <p>jose</p>
                );
        }}
        viewerExtraComponent={()=>{
            return(
                <p>kis</p>
            );
        }}

        eventRenderer={({event})=>{
            
            return(
            
                <div style={{backgroundColor:event.colorbg, height:"100%"}} onClick={()=>{console.log("hola");}}>
                    <p>{event.title}</p>
                    <p>{event.profesor}</p>
                    <p>{event.salon}</p>
                    <p>NRC: {event.nrc}</p> 
                </div>
                
            );
        }}
        />
    </Box>
    </>


     );
    })
    }
   </>
);
}

export default Horarios;