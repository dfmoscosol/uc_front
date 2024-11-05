import React from 'react';

import {
  MdSchool,
  MdOutlineGroups,
  MdOutlineEngineering,
  MdContentPasteSearch,
  MdComputer,
  MdSearch,
  MdHelpOutline
} from 'react-icons/md';

const DescriptorEvento = (props): JSX.Element => {

  const { competencia, momento } = props;

  let icon;
  let momento_color;

  if (competencia === "Competencia Pedagógica") {
    icon = <MdSchool style={{ width: "20px", height: "20px", marginRight: "5px" }} />
  } else if (competencia === "Competencia Comunicativa") {
    icon = <MdOutlineGroups style={{ width: "20px", height: "20px", marginRight: "5px" }} />
  } else if (competencia === "Competencia de Gestión") {
    icon = <MdOutlineEngineering style={{ width: "20px", height: "20px", marginRight: "5px" }} />
  } else if (competencia === "Competencia Investigativa") {
    icon = <MdContentPasteSearch style={{ width: "20px", height: "20px", marginRight: "5px" }} />
  } else if (competencia === "Competencia Tecnológica") {
    icon = <MdComputer style={{ width: "20px", height: "20px", marginRight: "5px" }} />
  }else {
    icon = <MdHelpOutline style={{ width: "20px", height: "20px", marginRight: "5px" }} />
  }

  if (momento === "Momento Explorador") {
    momento_color = "#00b4d8";
  } else if (momento === "Momento Integrador") {
    momento_color = "#0077b6";
  } else if (momento === "Momento Innovador") {
    momento_color = "#03045e";
  } else {
    momento_color = "#757575";
  }

  return (
    <>
      <div
        className='text-xs-center text-sm-center text-md-center text-lg-center text-xl-start mb-3 mb-xl-0'
        style={{
          width: "100%",
          borderRadius: "0.75rem",
          padding: "10px",
        }}
      >
        <div
          style={{
            fontSize: "1.15rem",
            gap: "0.5rem",
            lineHeight: "24px",
            fontWeight: "700",
            marginLeft: "10px",
            color: "",
          }}
        >
          {icon} {competencia}
        </div>
        <div
          className='mt-2'
          style={{
            background: momento_color,
            marginLeft: "10px",
            fontSize: "0.9rem",
            fontWeight: "500",
            borderRadius: "12px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
            color: 'white',
            display: "inline-block",
          }}
        >
          {momento}
        </div>
      </div>
    </>
  )
}

export default DescriptorEvento;
