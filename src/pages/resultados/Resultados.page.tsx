import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../shared/header.component";

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import INTERNAL_ROUTES from "../../data/constants/internalRoutes";
import Loader from "../../shared/loader.component";


import RadarChart from "./components/RadarChart";
import DescriptorSmall from "./components/DescriptorSmall";
import Interpretacion from "./components/Interpretacion";

const ResultadosPage = (): JSX.Element => {
  // local variables
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // constants
  const {
    resultados: { pageTitle, breadcrumbs },
  } = BREADCRUMBS_ITEMS;

  return (
    <>
      <Header title={pageTitle} breadcrumbs={breadcrumbs} />
      {false ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div className="container" >
            <div className="row" >
              <div className="col-md-8 col-sm-6" style={{ padding: "10px"}} >
                <div
                  style={{ background:"", "border-color": "#e0ebf2", "border-width": "1px", "border-style": "solid", padding: "10px", "height": "100%"}}
                >
                  <RadarChart 
                    data={[
                      {
                        Pentagono: { MPED: 3.5, MCOM: 2.5, MGES: 1.5, MINV: 2.5, MTEC: 3.5 },
                        Nombre: 'Septiembre - Febrero 2023',
                      },
                    ]}
                    isTeacher={false}
                    showTittle={true}
                    showLabel={true}
                  />
                </div>
              </div>  
              <div className="col-md-4 col-sm-6" style={{ background:"", padding:"10px", display: "grid", gap:"10px"}}>
                <DescriptorSmall
                  competencia="Competencia Pedagógica"
                  momento="Momento Explorador"
                /> 
                <DescriptorSmall
                  competencia="Competencia Comunicativa"
                  momento="Momento Innovador"
                /> 
                <DescriptorSmall
                  competencia="Competencia de Gestión"
                  momento="Momento Integrador"
                /> 
                <DescriptorSmall
                  competencia="Competencia Investigativa"
                  momento="Momento Explorador"
                /> 
                <DescriptorSmall
                  competencia="Competencia Tecnológica"
                  momento="Momento Innovador"
                /> 
              </div>  
            </div>

            <div className="row">
              <div className="col-md-12 col-sm-12" style={{ padding: "10px", background: "", display:"grid", gap:"20px"}} >

                <Interpretacion 
                  competencia="Competencia Pedagógica"
                  resumen={<p>Esta competencia se define como la capacidad de <b>utilizar</b> las TIC <b>para fortalecer los procesos de enseñanza y aprendizaje</b>, reconociendo alcances y limitaciones de la incorporación de estas tecnologías en la formación integral de los estudiantes y en su propio desarrollo profesional.</p>}
                />

                <Interpretacion 
                  competencia="Competencia Comunicativa"
                  resumen={<p>Esta competencia se define como la capacidad de <b>utilizar</b> las TIC <b>para fortalecer los procesos de enseñanza y aprendizaje</b>, reconociendo alcances y limitaciones de la incorporación de estas tecnologías en la formación integral de los estudiantes y en su propio desarrollo profesional.</p>}
                />

                <Interpretacion 
                  competencia="Competencia de Gestión"
                  resumen={<p>Esta competencia se define como la capacidad de <b>utilizar</b> las TIC <b>para fortalecer los procesos de enseñanza y aprendizaje</b>, reconociendo alcances y limitaciones de la incorporación de estas tecnologías en la formación integral de los estudiantes y en su propio desarrollo profesional.</p>}
                />

                <Interpretacion 
                  competencia="Competencia Investigativa"
                  resumen={<p>Esta competencia se define como la capacidad de <b>utilizar</b> las TIC <b>para fortalecer los procesos de enseñanza y aprendizaje</b>, reconociendo alcances y limitaciones de la incorporación de estas tecnologías en la formación integral de los estudiantes y en su propio desarrollo profesional.</p>}
                />

                <Interpretacion 
                  competencia="Competencia Tecnológica"
                  resumen={<p>Esta competencia se define como la capacidad de <b>utilizar</b> las TIC <b>para fortalecer los procesos de enseñanza y aprendizaje</b>, reconociendo alcances y limitaciones de la incorporación de estas tecnologías en la formación integral de los estudiantes y en su propio desarrollo profesional.</p>}
                />

              </div>




            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResultadosPage;
