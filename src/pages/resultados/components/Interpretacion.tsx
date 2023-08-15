import React from 'react'

import { 
  MdSchool, 
  MdOutlineGroups, 
  MdOutlineEngineering,
  MdContentPasteSearch, 
  MdComputer
} from 'react-icons/md';

import COM1EXPL from '../../../assets/images/pentagono_momentos/COM-1-EXPL.png'
import COM2INTE from '../../../assets/images/pentagono_momentos/COM-2-INTE.png'
import COM3INNO from '../../../assets/images/pentagono_momentos/COM-3-INNO.png'

import GES1EXPL from '../../../assets/images/pentagono_momentos/GES-1-EXPL.png'
import GES2INTE from '../../../assets/images/pentagono_momentos/GES-2-INTE.png'
import GES3INNO from '../../../assets/images/pentagono_momentos/GES-3-INNO.png'

import INV1EXPL from '../../../assets/images/pentagono_momentos/INV-1-EXPL.png'
import INV2INTE from '../../../assets/images/pentagono_momentos/INV-2-INTE.png'
import INV3INNO from '../../../assets/images/pentagono_momentos/INV-3-INNO.png'

import PED1EXPL from '../../../assets/images/pentagono_momentos/PED-1-EXPL.png'
import PED2INTE from '../../../assets/images/pentagono_momentos/PED-2-INTE.png'
import PED3INNO from '../../../assets/images/pentagono_momentos/PED-3-INNO.png'

import TEC1EXPL from '../../../assets/images/pentagono_momentos/TEC-1-EXPL.png'
import TEC2INTE from '../../../assets/images/pentagono_momentos/TEC-2-INTE.png'
import TEC3INNO from '../../../assets/images/pentagono_momentos/TEC-3-INNO.png'

const Interpretacion  = (props): JSX.Element =>{

  const { competencia, momento, resumen } = props;

  let icon;
  let momento_color;
  let momento_bg;
  let competencia_single;
  let image_comp_momento = PED1EXPL;

  let iconStyle={ width: "40px", height: "40px"}

  if (competencia==="Competencia Pedagógica"){
    icon = <MdSchool style={iconStyle} />
    competencia_single = "Pedagógica";
    console.log("pedagogica")
    console.log(momento)
    if (momento==="Momento Explorador"){
      image_comp_momento = PED1EXPL;
    } else if (momento==="Momento Integrador"){
      image_comp_momento = PED2INTE;
    } else if (momento==="Momento Innovador"){
      image_comp_momento = PED3INNO;
    }

  } else if (competencia==="Competencia Comunicativa"){
    icon = <MdOutlineGroups style={iconStyle} />
    competencia_single = "Comunicativa";
    if (momento==="Momento Explorador"){
      image_comp_momento = COM1EXPL;
    } else if (momento==="Momento Integrador"){
      image_comp_momento = COM2INTE;
    } else if (momento==="Momento Innovador"){
      image_comp_momento = COM3INNO;
    }  

  } else if (competencia==="Competencia de Gestión"){
    icon = <MdOutlineEngineering style={iconStyle} />
    competencia_single = "De Gestión";
    if (momento==="Momento Explorador"){
      image_comp_momento = GES1EXPL;
    } else if (momento==="Momento Integrador"){
      image_comp_momento = GES2INTE;
    } else if (momento==="Momento Innovador"){
      image_comp_momento = GES3INNO;
    }

  } else if (competencia==="Competencia Investigativa"){
    icon = <MdContentPasteSearch style={iconStyle} />
    competencia_single = "Investigativa";
    if (momento==="Momento Explorador"){
      image_comp_momento = INV1EXPL;
    } else if (momento==="Momento Integrador"){
      image_comp_momento = INV2INTE;
    } else if (momento==="Momento Innovador"){
      image_comp_momento = INV3INNO;
    }

  } else if (competencia==="Competencia Tecnológica"){
    icon = <MdComputer style={iconStyle} />
    competencia_single = "Tecnológica";
    if (momento==="Momento Explorador"){
      image_comp_momento = TEC1EXPL;
    } else if (momento==="Momento Integrador"){
      image_comp_momento = TEC2INTE;
    } else if (momento==="Momento Innovador"){
      image_comp_momento = TEC3INNO;
    }

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
        className="row"
        style={{ 
          //background:"#f5f7f7", 
          borderRadius: "0.75rem",
          //padding: "15px",
          width: "100%",
          display: "flex",
          //gap: "10px",
          "flexDirection": "row",
          //"alignItems": "center",
          "borderColor": "#fafafa", 
          "borderWidth": "5px",
          //"borderRadius": "12px",
          //"border-left-width": "5px",
          //"border-left-color": momento_color, 
          "borderStyle": "solid",
        }}
      >

        {/**Izquierda */}
        <div
          className="col-md-6 col-sm-12"
          style={{ 
            //background:"red", 
            //borderRadius: "0.75rem",
            padding: "15px",
            //width: "100%",
            //display: "flex",
            //gap: "2px",
            //"flexDirection": "row",
            //"alignItems": "center",
            //"borderColor": "#e0ebf2", 
            //"borderWidth": "1px",
            //"border-radius": "12px",
            //"border-left-width": "5px",
            //"border-left-color": momento_color, 
            //"borderStyle": "solid",
          }}
        >
          <div
            style={{ 
              //background:"yellow", 
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              gap: "20px",
              //borderRadius: "0.75rem",
              //padding: "10px",
              //width: "100%",
              //"borderColor": "#e0ebf2", 
              //"borderWidth": "1px",
              //"border-radius": "12px",
              //"border-left-width": "5px",
              //"border-left-color": momento_color, 
              //"borderStyle": "solid",
            }}
          >
            <div>
              {icon}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div>Competencia</div>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "1.5rem", /* 30px */
                  lineHeight: "2rem", /* 36px */
                }}
              >
                {competencia_single}
              </div>
              <hr />
            </div>
          </div>
          <div>
            <img src={image_comp_momento} alt="Mi Imagen" style={{ width: "100%"}}/>
          </div>
          <div
            style={{ 
              //background:"red", 
              //borderRadius: "0.75rem",
              //padding: "10px",
              // width: "100%",
              display: "flex",
              //gap: "2px",
              //"flexDirection": "row",
              alignItems: "center",
              justifyContent: "center",
              //"borderColor": "#e0ebf2", 
              //"borderWidth": "1px",
              //"border-radius": "12px",
              //"border-left-width": "5px",
              //"border-left-color": momento_color, 
              //"borderStyle": "solid",
            }}
          >
            <div
              style={{ 
                background:momento_bg,
                //"marginTop":"5px", 
                //"marginLeft":"10px", 
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
        </div>

        {/**Derecha */}
        <div
          className="col-md-6 col-sm-12"
          style={{ 
            //background:"green", 
            background:"#fafafa", 
            //borderRadius: "0.75rem",
            //borderRadius: "0.75rem",
            padding: "15px",
           // width: "100%",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            //"borderColor": "#e0ebf2", 
            //"borderWidth": "1px",
            //"border-radius": "12px",
            //"border-left-width": "5px",
            //"border-left-color": momento_color, 
            //"borderStyle": "solid",
          }}
        >
          
          <div
            style={{
              fontWeight: "600",
              fontSize: "1rem", /* 30px */
              lineHeight: "1.5rem", /* 36px */
            }}
          >
            Descriptores de Desempeño
          </div>

          <div
            style={{
              "borderColor": "#F0F0F0", 
              "borderWidth": "1px",
              "borderRadius": "12px",
              padding: "10px",
              //"border-left-width": "5px",
              //"border-left-color": momento_color, 
              "borderStyle": "solid",
              fontWeight: "300",
              fontSize: " 0.875rem", /* 30px */
              lineHeight: "1.25rem", /* 36px */
            }}
          >
            Diseño ambientes de aprendizaje mediados por TIC de acuerdo con el desarrollo cognitivo, físico, psicológico y social de mis estudiantes para fomentar el desarrollo de sus competencias.
          </div>


          <div
            style={{
              "borderColor": "#F0F0F0", 
              "borderWidth": "1px",
              "borderRadius": "12px",
              padding: "10px",
              //"border-left-width": "5px",
              //"border-left-color": momento_color, 
              "borderStyle": "solid",
              fontWeight: "300",
              fontSize: " 0.875rem", /* 30px */
              lineHeight: "1.25rem", /* 36px */
            }}
          >
            Propongo proyectos educativos mediados con TIC, que permiten la reflexión sobre el aprendizaje propio y la producción de conocimiento.  
          </div>

          <div
            style={{
              "borderColor": "#F0F0F0", 
              "borderWidth": "1px",
              "borderRadius": "12px",
              padding: "10px",
              //"border-left-width": "5px",
              //"border-left-color": momento_color, 
              "borderStyle": "solid",
              fontWeight: "300",
              fontSize: " 0.875rem", /* 30px */
              lineHeight: "1.25rem", /* 36px */
            }}
          >
            Evalúo los resultados obtenidos con la implementación de estrategias que hacen uso de las TIC y promuevo una cultura del seguimiento, realimentación y mejoramiento permanente.
          </div>
        </div>
      </div>
    </>
  )
}

export default Interpretacion;
