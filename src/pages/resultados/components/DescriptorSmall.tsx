import React from 'react'

import { 
  MdSchool, 
  MdOutlineGroups, 
  MdOutlineEngineering,
  MdContentPasteSearch, 
  MdComputer
} from 'react-icons/md';

const DescriptorSmall  = (props): JSX.Element =>{

  const { competencia, momento } = props;

  let icon;
  let momento_color;
  let momento_bg;

  if (competencia==="Competencia Pedagógica"){
    icon = <MdSchool style={{ width: "20px", height: "20px", "marginRight":"5px" }} />
  } else if (competencia==="Competencia Comunicativa"){
    icon = <MdOutlineGroups style={{ width: "20px", height: "20px", "marginRight":"5px" }} />
  } else if (competencia==="Competencia de Gestión"){
    icon = <MdOutlineEngineering style={{ width: "20px", height: "20px", "marginRight":"5px" }} />
  } else if (competencia==="Competencia Investigativa"){
    icon = <MdContentPasteSearch style={{ width: "20px", height: "20px", "marginRight":"5px" }} />
  } else if (competencia==="Competencia Tecnológica"){
    icon = <MdComputer style={{ width: "20px", height: "20px", "marginRight":"5px" }} />
  }

  if (momento==="Momento Explorador"){
    momento_color="#00b4d8";
    momento_bg="#E3FFE3";
  } else if (momento==="Momento Integrador"){
    momento_color = "#0077b6";
    momento_bg="#E3FFE7";
  } else if (momento==="Momento Innovador"){
    momento_color = "#03045e";
    momento_bg="#E3F2F2";
  }  

  return (
    <>
      <div
        style={{ 
          
          width: "100%",
          display: "flex",
          gap: "5px",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          //borderColor: "#e0ebf2", 
          //borderWidth: "1px",
          //"border-radius": "12px",
          //borderLeftWidth: "5px",
          //borderLeftColor: momento_color, 
          //borderStyle: "solid",
          background:"#fafafa", 
          borderRadius: "0.75rem",
          padding: "10px",
          
        }}
      >
        <div
          style={{ 
            "fontSize": "16px",
            "lineHeight": "24px",
            "fontWeight": "600",
            "marginLeft":"10px", 
            //"background": "",
          }}
        >
          {icon} {competencia}
        </div>
        <div
          style={{ 
            background:momento_bg,
            //"marginTop":"5px", 
            "marginLeft":"10px", 
            "fontSize": "12px",
            "fontWeight": "500",
            //"lineHeight": "16px",
            //"borderColor": "#00b4d8", 
            //"borderWidth": "1px",
            "borderRadius": "12px",
            //"borderStyle": "solid",
            "paddingLeft":"10px", 
            "paddingRight":"10px", 
            "paddingTop":"5px", 
            "paddingBottom":"5px", 
            "color": momento_color, 
          }}
        >
          {momento}
        </div>
      </div>
    </>
  )
}

export default DescriptorSmall