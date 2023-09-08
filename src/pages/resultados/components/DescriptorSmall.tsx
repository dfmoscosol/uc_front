import React, { useState } from 'react'

import {
  MdSchool,
  MdOutlineGroups,
  MdOutlineEngineering,
  MdContentPasteSearch,
  MdComputer
} from 'react-icons/md';

const DescriptorSmall = (props): JSX.Element => {

  const { competencia, momento, onClick } = props;

  let icon;
  let momento_color;
  let momento_bg;

  if (competencia === "Competencia Pedagógica") {
    icon = <MdSchool style={{ width: "20px", height: "20px", "marginRight": "5px" }} />
  } else if (competencia === "Competencia Comunicativa") {
    icon = <MdOutlineGroups style={{ width: "20px", height: "20px", "marginRight": "5px" }} />
  } else if (competencia === "Competencia de Gestión") {
    icon = <MdOutlineEngineering style={{ width: "20px", height: "20px", "marginRight": "5px" }} />
  } else if (competencia === "Competencia Investigativa") {
    icon = <MdContentPasteSearch style={{ width: "20px", height: "20px", "marginRight": "5px" }} />
  } else if (competencia === "Competencia Tecnológica") {
    icon = <MdComputer style={{ width: "20px", height: "20px", "marginRight": "5px" }} />
  }

  if (momento === "Momento Explorador") {
    momento_color = "#00b4d8";
    momento_bg = "#E3FFE3";
  } else if (momento === "Momento Integrador") {
    momento_color = "#0077b6";
    momento_bg = "#E3FFE7";
  } else if (momento === "Momento Innovador") {
    momento_color = "#03045e";
    momento_bg = "#E3F2F2";
  }
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className='text-xs-center text-sm-center text-md-center text-lg-center text-xl-start mb-3 mb-xl-0'
        onClick={onClick}
        style={{

          width: "100%",
          /*display: "flex",
          gap: "5px",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center", */
          //borderColor: "#e0ebf2", 
          //borderWidth: "1px",
          //"border-radius": "12px",
          //borderLeftWidth: "5px",
          //borderLeftColor: momento_color, 
          //borderStyle: "solid",
          background: isHovered ? momento_color : "#fafafa",
          borderRadius: "0.75rem",
          padding: "10px",
          cursor: 'pointer'

          //margin:"10px"

        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            "fontSize": isHovered ? "18px" : "16px",
            "lineHeight": "24px",
            "fontWeight": "600",
            "marginLeft": "10px",
            "color": isHovered ? "#fff" : "",
          }}
        >
          {icon} {competencia}
        </div>
        <div className='mt-2'
          style={{
            background: isHovered ? "white" : momento_color,
            //"marginTop":"5px", 
            "marginLeft": "10px",
            "fontSize": isHovered ? "13px" : "12px",
            "fontWeight": isHovered ? "600" : "500",
            //"lineHeight": "16px",
            //"borderColor": "#00b4d8", 
            //"borderWidth": "1px",
            "borderRadius": "12px",
            //"borderStyle": "solid",
            "paddingLeft": "10px",
            "paddingRight": "10px",
            "paddingTop": "5px",
            "paddingBottom": "5px",
            "color": isHovered ? momento_color : 'white',
            display: "inline-block",
          }}
        >
          {momento}
        </div>
      </div>
    </>
  )
}

export default DescriptorSmall