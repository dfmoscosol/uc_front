import React from 'react'

import {
  MdSchool,
  MdOutlineGroups,
  MdOutlineEngineering,
  MdContentPasteSearch,
  MdComputer
} from 'react-icons/md';

import COM1EXPL from '../../../assets/images/pentagono_momentos/PED-1-EXPL.png'
import COM2INTE from '../../../assets/images/pentagono_momentos/GES-2-INTE.png'
import COM3INNO from '../../../assets/images/pentagono_momentos/COM-3-INNO.png'

import GES1EXPL from '../../../assets/images/pentagono_momentos/PED-1-EXPL.png'
import GES2INTE from '../../../assets/images/pentagono_momentos/GES-2-INTE.png'
import GES3INNO from '../../../assets/images/pentagono_momentos/COM-3-INNO.png'

import INV1EXPL from '../../../assets/images/pentagono_momentos/PED-1-EXPL.png'
import INV2INTE from '../../../assets/images/pentagono_momentos/GES-2-INTE.png'
import INV3INNO from '../../../assets/images/pentagono_momentos/COM-3-INNO.png'

import PED1EXPL from '../../../assets/images/pentagono_momentos/PED-1-EXPL.png'
import PED2INTE from '../../../assets/images/pentagono_momentos/GES-2-INTE.png'
import PED3INNO from '../../../assets/images/pentagono_momentos/COM-3-INNO.png'

import TEC1EXPL from '../../../assets/images/pentagono_momentos/PED-1-EXPL.png'
import TEC2INTE from '../../../assets/images/pentagono_momentos/GES-2-INTE.png'
import TEC3INNO from '../../../assets/images/pentagono_momentos/COM-3-INNO.png'

const Interpretacion = (props): JSX.Element => {

  const { competencia, momento, d1, d2, d3, ref } = props;

  let icon;
  let momento_color;
  let momento_bg;
  let competencia_single;
  let image_comp_momento = PED1EXPL;
  let descriptores = [d1, d2, d3]

  let iconStyle = { width: "40px", height: "40px" }

  if (competencia === "Competencia Pedagógica") {
    icon = <MdSchool style={iconStyle} />
    competencia_single = "Pedagógica";
    if (momento === "Momento Explorador") {
      image_comp_momento = PED1EXPL;
    } else if (momento === "Momento Integrador") {
      image_comp_momento = PED2INTE;
    } else if (momento === "Momento Innovador") {
      image_comp_momento = PED3INNO;
    }

  } else if (competencia === "Competencia Comunicativa") {
    icon = <MdOutlineGroups style={iconStyle} />
    competencia_single = "Comunicativa";
    if (momento === "Momento Explorador") {
      image_comp_momento = COM1EXPL;
    } else if (momento === "Momento Integrador") {
      image_comp_momento = COM2INTE;
    } else if (momento === "Momento Innovador") {
      image_comp_momento = COM3INNO;
    }

  } else if (competencia === "Competencia de Gestión") {
    icon = <MdOutlineEngineering style={iconStyle} />
    competencia_single = "De Gestión";
    if (momento === "Momento Explorador") {
      image_comp_momento = GES1EXPL;
    } else if (momento === "Momento Integrador") {
      image_comp_momento = GES2INTE;
    } else if (momento === "Momento Innovador") {
      image_comp_momento = GES3INNO;
    }

  } else if (competencia === "Competencia Investigativa") {
    icon = <MdContentPasteSearch style={iconStyle} />
    competencia_single = "Investigativa";
    if (momento === "Momento Explorador") {
      image_comp_momento = INV1EXPL;
    } else if (momento === "Momento Integrador") {
      image_comp_momento = INV2INTE;
    } else if (momento === "Momento Innovador") {
      image_comp_momento = INV3INNO;
    }

  } else if (competencia === "Competencia Tecnológica") {
    icon = <MdComputer style={iconStyle} />
    competencia_single = "Tecnológica";
    if (momento === "Momento Explorador") {
      image_comp_momento = TEC1EXPL;
    } else if (momento === "Momento Integrador") {
      image_comp_momento = TEC2INTE;
    } else if (momento === "Momento Innovador") {
      image_comp_momento = TEC3INNO;
    }

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

  return (
    <>
      <div
        className="row mb-3"
        style={{
          //background:"#f5f7f7", 
          borderRadius: "0.75rem",
          //padding: "15px",
          //width: "100%",
          //display: "flex",
          //gap: "10px",
          //"flexDirection": "row",
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
          className="col-xl-6 col-12"
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
          <div className='row'>
            <div className='col-xl-1 col-lg-1 col-md-12 col-sm-12 col-xs-12'>
              {icon}
            </div>
            <div className='col-xl-11 col-lg-11 col-md-12 col-sm-12 col-xs-12' style={{ paddingLeft: "20px" }}>
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
          <div className='row'>
            <img src={image_comp_momento} alt="Mi Imagen" style={{ width: "100%" }} />
          </div>
          <div className="text-center mt-2">
            <div
              style={{
                background: momento_color,
                //"marginTop":"5px", 
                //"marginLeft":"10px", 
                "fontSize": "12px",
                "fontWeight": "500",
                //"lineHeight": "16px",
                //"borderColor": "#00b4d8", 
                //"borderWidth": "1px",
                "borderRadius": "12px",
                //"borderStyle": "solid",
                "paddingLeft": "10px",
                "paddingRight": "10px",
                "paddingTop": "5px",
                "paddingBottom": "5px",
                "color": "white",
                display: "inline-block",
              }}
            >
              {momento}
            </div>
          </div>

        </div>

        {/**Derecha */}
        <div
          className="col-xl-6 col-12 d-flex flex-column justify-content-center align-items-start"
          style={{
            //background:"green", 
            background: "#fafafa",
            //borderRadius: "0.75rem",
            //borderRadius: "0.75rem",
            padding: "15px",
            // width: "100%",
            //display: "flex",
            //gap: "10px",
            //flexDirection: "column",
            //alignItems: "start",
            //justifyContent: "center",
            //"borderColor": "#e0ebf2", 
            //"borderWidth": "1px",
            //"border-radius": "12px",
            //"border-left-width": "5px",
            //"border-left-color": momento_color, 
            //"borderStyle": "solid",
          }}
        >

          <div className='row mb-3'
            style={{
              fontWeight: "600",
              fontSize: "1rem", /* 30px */
              lineHeight: "1.5rem", /* 36px */
              marginInline: "10px"
            }}
          >
            Descriptores de Desempeño
          </div>
          {descriptores.map(
            (descriptor): JSX.Element => (
              <>
                <div className="row mb-3" style={{ marginInline: "10px" }}>
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
                    {descriptor}
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  )
}

export default Interpretacion;
