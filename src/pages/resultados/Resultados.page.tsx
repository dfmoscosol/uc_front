import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../shared/header.component";
import Select from "react-select"

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";
import periodoimg from "../../assets/images/periodo.png";
import datosimg from "../../assets/images/datos.png";
import RadarChart from "./components/RadarChart";
import DescriptorSmall from "./components/DescriptorSmall";
import Interpretacion from "./components/Interpretacion";
import { getPeriodos, getPeriodosReset } from "../../redux/resultados/getPeriodos.slice";
import { getResultados, getResultadosReset, initialState } from "../../redux/resultados/getResultados.slice";
import { getPreguntasReset } from "../../redux/encuesta/getPreguntas.slice";
import { getFacultadesReset } from "../../redux/encuesta/getFacultades.slice";
import { getCarrerasReset } from "../../redux/encuesta/getCarreras.slice";
import { validateEncuestaReset } from "../../redux/encuesta/validateEncuesta.slice";
import { postPreguntasReset } from "../../redux/encuesta/postRespuesta.slice";

const ResultadosPage = (): JSX.Element => {
  // local variables
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // constants
  const {
    resultados: { pageTitle, breadcrumbs },
  } = BREADCRUMBS_ITEMS;
  const pedRef = useRef<HTMLDivElement | null>(null);
  const comRef = useRef<HTMLDivElement | null>(null);
  const invRef = useRef<HTMLDivElement | null>(null);
  const tecRef = useRef<HTMLDivElement | null>(null);
  const gesRef = useRef<HTMLDivElement | null>(null);
  const [periodo, setPeriodo] = useState("")
  const { data: dataPeriodos, ok: okPeriodos } = useAppSelector((state) => state.periodos)
  const { data: dataResultados } = useAppSelector((state) => state.resultados)

  const handlePeriodoSelectChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    const label = selectedOption ? selectedOption.label : '';
    setPeriodo(label)
    dispatch(getResultados(value))
  };
  useEffect(() => {
    dispatch(getResultadosReset())
    dispatch(getPeriodosReset())
    dispatch(getPreguntasReset())
    dispatch(getFacultadesReset())
    dispatch(getCarrerasReset())
    dispatch(validateEncuestaReset())
    dispatch(postPreguntasReset())
    dispatch(getPeriodos());
  }, [dispatch]);

  const handlePed = () => {
    if (pedRef.current) {
      pedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCom = () => {
    if (comRef.current) {
      comRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInv = () => {
    if (invRef.current) {
      invRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTec = () => {
    if (tecRef.current) {
      tecRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGes = () => {
    if (gesRef.current) {
      gesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3", }}><Header title={pageTitle} /></div>

      {!okPeriodos ? (
        <>
          <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
            <div className="col-6">
              <Loader></Loader>
            </div>
          </div>
        </>
      ) : (
        <>
          {dataPeriodos.length == 0 ? (
            <>
              <div className="row justify-content-center" style={{ paddingBlock: "10%", background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
                <div className="col-6" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <img
                    style={{ borderRadius: "8px" }}
                    src={datosimg}
                    width="300"
                    alt="Cargando Contenido"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3" }}>
                <div className="row justify-content-start mb-3" style={{ marginInline: "10px" }}>
                  <div className="col-12 col-xl-8">
                    <label className="form-label">Período:</label>
                    <Select
                      placeholder="Elegir Período"
                      onChange={handlePeriodoSelectChange}
                      options={dataPeriodos && dataPeriodos.map((elemento) => {
                        return { value: elemento.id_periodo, label: elemento.nombre } // Multiplicamos cada elemento por 2
                      })}
                    />
                  </div>
                </div>

                {dataResultados == initialState.data ? (
                  <>
                    <div className="row justify-content-center" style={{ paddingBlock: "10%", background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
                      <div className="col-6" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <img
                          style={{ borderRadius: "8px" }}
                          src={periodoimg}
                          width="300"
                          alt="Cargando Contenido"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row mb-3 justify-content-center" style={{ marginInline: "10px" }}>
                      <div className="col-xl-8 col-lg-12 col-md-12 mb-xl-0 mb-3">
                        <div
                          style={{
                            background: "#fafafa",
                            //borderColor: "#e0ebf2", 
                            //borderWidth: "1px", 
                            //borderStyle: "solid", 
                            height: "100%",
                            borderRadius: "0.75rem",
                          }}
                        >
                          <RadarChart
                            data={[
                              {
                                Pentagono: { MPED: dataResultados && dataResultados.pedagogica.puntaje, MCOM: dataResultados && dataResultados.comunicativa.puntaje, MGES: dataResultados && dataResultados.gestion.puntaje, MINV: dataResultados && dataResultados.investigativa.puntaje, MTEC: dataResultados && dataResultados.tecnologica.puntaje },
                                Nombre: periodo,
                              },
                            ]}
                            isTeacher={false}
                            showTittle={true}
                            showLabel={true}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-8 col-md-8 col-sm-12 d-flex flex-column justify-content-between align-items-center">
                        <DescriptorSmall
                          onClick={handlePed}
                          competencia="Competencia Pedagógica"
                          momento={dataResultados && dataResultados.pedagogica.momento}
                        />
                        <DescriptorSmall
                          onClick={handleCom}
                          competencia="Competencia Comunicativa"
                          momento={dataResultados && dataResultados.comunicativa.momento}
                        />
                        <DescriptorSmall
                          onClick={handleGes}
                          competencia="Competencia de Gestión"
                          momento={dataResultados && dataResultados.gestion.momento}
                        />
                        <DescriptorSmall
                          onClick={handleInv}
                          competencia="Competencia Investigativa"
                          momento={dataResultados && dataResultados.investigativa.momento}
                        />
                        <DescriptorSmall
                          onClick={handleTec}
                          competencia="Competencia Tecnológica"
                          momento={dataResultados && dataResultados.tecnologica.momento}
                        />
                      </div>
                    </div>

                    <div className="row " style={{ marginInline: "20px" }}>
                      <div className="col">
                        <div ref={pedRef}>
                          <Interpretacion
                            competencia="Competencia Pedagógica"
                            momento={dataResultados && dataResultados.pedagogica.momento}
                            d1={dataResultados && dataResultados.pedagogica.d1}
                            d2={dataResultados && dataResultados.pedagogica.d2}
                            d3={dataResultados && dataResultados.pedagogica.d3}
                          />
                        </div>
                        <div ref={comRef}>
                          <Interpretacion
                            competencia="Competencia Comunicativa"
                            momento={dataResultados && dataResultados.comunicativa.momento}
                            d1={dataResultados && dataResultados.comunicativa.d1}
                            d2={dataResultados && dataResultados.comunicativa.d2}
                            d3={dataResultados && dataResultados.comunicativa.d3}
                          />
                        </div>

                        <div ref={gesRef}>
                          <Interpretacion
                            competencia="Competencia de Gestión"
                            momento={dataResultados && dataResultados.gestion.momento}
                            d1={dataResultados && dataResultados.gestion.d1}
                            d2={dataResultados && dataResultados.gestion.d2}
                            d3={dataResultados && dataResultados.gestion.d3}
                          />
                        </div>

                        <div ref={invRef}>
                          <Interpretacion
                            competencia="Competencia Investigativa"
                            momento={dataResultados && dataResultados.investigativa.momento}
                            d1={dataResultados && dataResultados.investigativa.d1}
                            d2={dataResultados && dataResultados.investigativa.d2}
                            d3={dataResultados && dataResultados.investigativa.d3}
                          />
                        </div>

                        <div ref={tecRef}>
                          <Interpretacion
                            competencia="Competencia Tecnológica"
                            momento={dataResultados && dataResultados.tecnologica.momento}
                            d1={dataResultados && dataResultados.tecnologica.d1}
                            d2={dataResultados && dataResultados.tecnologica.d2}
                            d3={dataResultados && dataResultados.tecnologica.d3}
                          />
                        </div>

                      </div>
                    </div>
                  </>
                )}
              </div>

            </>
          )}
        </>
      )}
    </>
  );
};

export default ResultadosPage;
