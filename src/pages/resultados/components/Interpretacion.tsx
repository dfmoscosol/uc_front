import React from 'react'

import { 
  MdSchool, 
  MdOutlineGroups, 
  MdOutlineEngineering,
  MdContentPasteSearch, 
  MdComputer
} from 'react-icons/md';

const Interpretacion  = (props): JSX.Element =>{

  const { competencia, momento, resumen } = props;

  let icon;
  let momento_color;

  if (competencia==="Competencia Pedagógica"){
    icon = <MdSchool style={{ width: "20px", height: "20px", "margin-right":"5px" }} />
  } else if (competencia==="Competencia Comunicativa"){
    icon = <MdOutlineGroups style={{ width: "20px", height: "20px", "margin-right":"5px" }} />
  } else if (competencia==="Competencia de Gestión"){
    icon = <MdOutlineEngineering style={{ width: "20px", height: "20px", "margin-right":"5px" }} />
  } else if (competencia==="Competencia Investigativa"){
    icon = <MdContentPasteSearch style={{ width: "20px", height: "20px", "margin-right":"5px" }} />
  } else if (competencia==="Competencia Tecnológica"){
    icon = <MdComputer style={{ width: "20px", height: "20px", "margin-right":"5px" }} />
  }

  if (momento==="Momento Explorador"){
    momento_color = "#00b4d8"
  } else if (momento==="Momento Integrador"){
    momento_color = "#0077b6"
  } else if (momento==="Momento Innovador"){
    momento_color = "#03045e"
  }  

  momento_color = "#03045e"

  return (
    <>
      <div
        style={{ 
          background:"",
          width: "100%",
          display: "flex",
          //gap: "2px",
          "flex-direction": "column",
          "align-items": "center",
          "border-color": "#e0ebf2", 
          "border-width": "1px",
          //"border-radius": "12px",
          //"border-left-width": "5px",
          //"border-left-color": momento_color, 
          "border-style": "solid",
          padding: "10px"
        }}
      >

        <div 
          style={{ 
            "font-size": "16px",
            "line-height": "24px",
            "font-weight": "700",
            //"background": "red",
            display: "flex",
            width: "100%",
            "align-items": "start",
            "justify-content": "start",
          }}
        >
          <div>
            {icon} {competencia}
          </div>
        </div>



        <div style={{ width: "100%"}}>
          <hr />
        </div>

        <div
          style={{ 
            "background":"",
            "margin-top":"", 
            "margin-left":"5px", 
            "font-size": "12px",
            "font-weight": "500",
            //"line-height": "16px",
            //"border-color": "#00b4d8", 
            //"border-width": "1px",
            //"border-radius": "12px",
            //"border-style": "solid",
            //"padding-left":"10px", 
            //"padding-right":"10px", 
            //"padding-top":"5px", 
            //"padding-bottom":"5px", 
            "color": momento_color, 
          }}
        >
          {momento}
        </div>

        <div>
          {resumen}
        </div>

        <div 
          className='row '
          style={{ "width":"100%"}}
        >
          <div 
            className='col-md-4 col-sm-12'
            style={{ "background":"", padding: "10px"}}
          >
            <div 
              style={{
                "border-color": "#e0ebf2", 
                "border-width": "1px",
                "border-radius": "6px",
                "border-style": "solid", 
                padding: "10px",
                height: "100%"
              }}
            >
              Diseño ambientes de aprendizaje mediados por TIC de acuerdo con el desarrollo cognitivo, físico, psicológico y social de mis estudiantes para fomentar el desarrollo de sus competencias.
            </div>
          </div>
          <div 
            className='col-md-4 col-sm-12'
            style={{ "background":"", padding: "10px"}}
          >
            <div 
              style={{
                "border-color": "#e0ebf2", 
                "border-width": "1px",
                "border-radius": "6px",
                "border-style": "solid", 
                padding: "10px",
                height: "100%"
              }}
            >
              Propongo proyectos educativos mediados con TIC, que permiten la reflexión sobre el aprendizaje propio y la producción de conocimiento.
            </div>
          </div>

          <div 
            className='col-md-4 col-sm-12'
            style={{ "background":"", padding: "10px" }}
          >
            <div 
              style={{
                "border-color": "#e0ebf2", 
                "border-width": "1px",
                "border-radius": "6px",
                "border-style": "solid", 
                padding: "10px",
                height: "100%"
              }}
            >
              Evalúo los resultados obtenidos con la implementación de estrategias que hacen uso de las TIC y promuevo una cultura del seguimiento, realimentación y mejoramiento permanente.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Interpretacion;