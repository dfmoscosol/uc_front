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

import { SubmitHandler, useForm } from "react-hook-form";

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
      <div style={{ background: "#ffffff", borderTop: "1px solid #d7dfe3", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3"}}><Header title={pageTitle} /></div>
      {false ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div className="" style={{background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3",}}>
            <div className="container" style={{paddingBottom:"10%",background: "#ffffff" }} >
              <div className="row" >

                  <div className="row justify-content-start pt-4 pb-4">
                    <div className="col-md-6 col-sm-12">
                      <label className="form-label">Periodo:</label>
                      <input
                        type="text"
                        //{...register("cedula", {
                        //  required: true,
                        //  minLength: 10,
                        //})}
                        className={`form-control form-control-sm `}//${errors.cedula && `is-invalid`}
                        placeholder=""
                      />
                      {/** 
                      {errors.cedula?.type === "required" && (
                        <label className="error">{`Este campo es obligatorio`}</label>

                      )}
                      {errors.cedula?.type === "minLength" && (
                        <label className="error">{`Este campo  debe tener al menos 10 dígitos`}</label>
                      )}
                      */}
                    </div>
                  </div>


                  <div className="col-md-8 col-sm-6" style={{ padding: "10px"}} >
                    <div
                      style={{ 
                        background:"#fafafa", 
                        //borderColor: "#e0ebf2", 
                        //borderWidth: "1px", 
                        //borderStyle: "solid", 
                        padding: "10px", 
                        height: "100%",
                        borderRadius: "0.75rem",
                      }}
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
                  <div className="col-md-4 col-sm-6" style={{ background:"", padding:"10px", display: "grid", gap:"10px", }}>
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

              <div className="row ">
                <div className="col-md-12 col-sm-12" style={{ padding: "10px", background: "", display:"grid", gap:"20px"}} >
                  <Interpretacion
                    competencia="Competencia Pedagógica"
                    momento="Momento Explorador"
                  /> 
                  <Interpretacion
                    competencia="Competencia Comunicativa"
                    momento="Momento Innovador"
                  /> 
                  <Interpretacion
                    competencia="Competencia de Gestión"
                    momento="Momento Integrador"
                  /> 
                  <Interpretacion
                    competencia="Competencia Investigativa"
                    momento="Momento Explorador"
                  /> 
                  <Interpretacion
                    competencia="Competencia Tecnológica"
                    momento="Momento Innovador"
                  /> 
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResultadosPage;
