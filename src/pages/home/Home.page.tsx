// components
import Header from "../../shared/header.component";
import { useEffect, useState } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";
import YoutubeVideo from "../../shared/youtube";
import { MdComputer, MdContentPasteSearch, MdOutlineEngineering, MdOutlineGroups, MdSchool } from "react-icons/md";
import { OverlayTrigger, Popover } from "react-bootstrap";
import imginn from "../../assets/images/m_inn.png";
import imgexp from "../../assets/images/m_exp.png";
import imgint from "../../assets/images/m_int.png";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { getFacultadesReset } from "../../redux/encuesta/getFacultades.slice";
import { getCarrerasReset } from "../../redux/encuesta/getCarreras.slice";
import { validateEncuestaReset } from "../../redux/encuesta/validateEncuesta.slice";
import { getPreguntasReset } from "../../redux/encuesta/getPreguntas.slice";
import { getResultadosReset } from "../../redux/resultados/getResultados.slice";
import { getPeriodosReset } from "../../redux/resultados/getPeriodos.slice";
import { postPreguntasReset } from "../../redux/encuesta/postRespuesta.slice";

const HomePage = (): JSX.Element => {
  // local variables
  // constants
  const {
    home: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const [show, setShow] = useState(0);
  const [showPopover, setShowPopover] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getResultadosReset())
    dispatch(getPeriodosReset())
    dispatch(getPreguntasReset())
    dispatch(getFacultadesReset())
    dispatch(getCarrerasReset())
    dispatch(validateEncuestaReset())
    dispatch(postPreguntasReset())
  }, [dispatch]);
  
  const competencias = [
    {
      nombre: "Pedagógica",
      descripcion: " La competencia pedagógica se constituye en el eje central de la práctica de los docentes potenciando otras competencias como la comunicativa y la tecnológica para ponerlas al servicio de los procesos de enseñanza y aprendizaje. Considerando específicamente la integración de TIC en la educación, la competencia pedagógica se puede definir como la capacidad de utilizar las TIC para fortalecer los procesos de enseñanza y aprendizaje, reconociendo alcances y limitaciones de la incorporación de estas tecnologías en la formación integral de los estudiantes y en su propio desarrollo profesional.",
      innovador: "Lidera experiencias significativas que involucran ambientes de aprendizaje diferenciados de acuerdo a las necesidades e intereses propias y de los estudiantes.",
      integrador: "Integra las TIC en procesos de dinamización de las gestiones directiva, académica, administrativa y comunitaria de su institución.",
      explorador: "Identifica nuevas estrategias y metodologías mediadas por las TIC, como herramienta para su desempeño profesional.",
      icono: <MdSchool className="ih" />,
    },
    {
      nombre: "Comunicativa",
      descripcion: "Las TIC facilitan la conexión entre estudiantes, docentes, investigadores, otros profesionales miembros de la comunidad, incluso de manera anónima, y también permiten conectarse con datos, recursos, redes y experiencias de aprendizaje. Desde esta perspectiva la competencia comunicativa se puede definir como la capacidad para expresarse, establecer contacto y relacionarse en espacios virtuales y audiovisuales a través de diversos medios y con el manejo de múltiples lenguajes, de manera sincrónica y asincrónica.",
      innovador: "Participa en comunidades y publica sus producciones textuales en diversos espacios virtuales y a través de múltiples medios digitales, usando los lenguajes que posibilitan las TIC.",
      integrador: "Desarrolla estrategias de trabajo colaborativo en el contexto escolar a partir de su participación en redes y comunidades con el uso de las TIC.",
      explorador: "Emplea diversos canales y lenguajes propios de las TIC para comunicarse con la comunidad educativa.",
      icono: <MdOutlineGroups className="ih" />,
    },
    {
      nombre: "De Gestión",
      descripcion: "La gestión educativa se concentra en modular los factores asociados al proceso educativo, con el fin de imaginar de forma sistemática y sistémica lo que se quiere que suceda; organizar los recursos para que suceda; recoger las evidencias para reconocer lo que ha sucedido y, en consecuencia, medir qué tanto se ha logrado lo que se esperaba para finalmente realizar los ajustes necesarios. Para todos estos procesos existen sofisticadas tecnologías que pueden hacer más eficiente la gestión universitaria. Con estas consideraciones, la competencia de gestión se puede definir como la capacidad para utilizar las TIC en la planeación, organización, administración y evaluación de manera efectiva los procesos educativos; tanto a nivel de prácticas pedagógicas como de desarrollo institucional.",
      innovador: "Propone y lidera acciones para optimizar procesos integrados de la gestión escolar.",
      integrador: "Integra las TIC en procesos de dinamización de las gestiones directiva, académica, administrativa y comunitaria de su institución.",
      explorador: "Organiza actividades propias de su quehacer profesional con el uso de las TIC.",
      icono: <MdOutlineEngineering className="ih" />,
    },
    {
      nombre: "Investigativa",
      descripcion: "El eje alrededor del cual gira la competencia investigativa es la gestión del conocimiento y, en última instancia, la generación de nuevos conocimientos. En este contexto, la competencia investigativa se define como la capacidad para utilizar las TIC en la planeación, organización, administración y evaluación de los procesos educativos; tanto a nivel de prácticas pedagógicas como de desarrollo institucional.",
      innovador: "Construye estrategias educativas innovadoras que incluyen la generación colectiva de conocimientos.",
      integrador: "Lidera proyectos de investigación propia y con sus estudiantes.",
      explorador: "Usa las TIC para hacer registro y seguimiento de lo que vive y observa en su práctica, su contexto y el de sus estudiantes.",
      icono: <MdContentPasteSearch className="ih" />,
    },
    {
      nombre: "Tecnológica",
      descripcion: "El propósito de la integración de TIC en la educación ha sido mejorar los procesos de enseñanza y aprendizaje, así como la gestión universitaria. Dentro del contexto educativo la competencia tecnológica se puede definir como la capacidad para seleccionar y utilizar de forma pertinente, responsable y eficiente una variedad de herramientas tecnológicas entendiendo los principios que las rigen, la forma de combinarlas y su utilización en el contexto educativo.",
      innovador: "Aplica el conocimiento de una amplia variedad de tecnologías en el diseño de ambientes de aprendizaje innovadores y para plantear soluciones a problemas identificados en el contexto.",
      integrador: "Utiliza diversas herramientas tecnológicas en los procesos educativos, de acuerdo a su rol área de formación, nivel y contexto en el que se desempeña",
      explorador: "Reconoce un amplio espectro de herramientas tecnológicas y algunas formas de integrarlas a la práctica educativa",
      icono: <MdComputer className="ih" />,
    },
  ]

  const handleCompetencia = (index) => {
    setShow(index)
    setShowPopover(true)
  };
  const closePopover = () => {
    setShowPopover(false);
  };
  const popover = (
    <>
      {showPopover && (
        <div className="overlay-background" onClick={closePopover}>
          <Popover className="popover" style={{ display: showPopover ? 'block' : 'none' }}>
            <Popover.Header >
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-12 t-comp d-flex justify-content-center align-items-center justify-content-lg-end ">
                  {competencias[show].icono}
                </div>
                <div className="col-lg-8 col-md-12 t-comp d-flex text-center justify-content-center justify-content-lg-start align-items-center">
                  Competencia {competencias[show].nombre}
                </div>
              </div>
            </Popover.Header>
            <Popover.Body>
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-12 descripcion d-flex justify-content-center align-items-center">
                  {competencias[show].descripcion}
                </div>
                <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center">
                  <div className="row descripcion">
                    <div className="col-12 titulo-mom" style={{ background: "#00b4d8" }}>Momento Explorador</div>
                    <div className="col-xl-2 col-lg-3 col-md-12 img-mom d-flex flex-column justify-content-center align-items-center">
                      <img src={imgexp} width="50" />
                    </div>
                    <div className="col-xl-10 col-lg-9 col-md-12 mt-2 mb-2 d-flex flex-column justify-content-center align-items-center">{competencias[show].explorador}</div>
                  </div>
                  <div className="row descripcion">
                    <div className="col-12 titulo-mom" style={{ background: "#0077b6" }}>Momento Integrador</div>
                    <div className="col-xl-2 col-lg-3 col-md-12  img-mom d-flex flex-column justify-content-center align-items-center">
                      <img src={imgint} width="50" />
                    </div>
                    <div className="col-xl-10 col-lg-9 col-md-12 mt-2 mb-2 d-flex flex-column justify-content-center align-items-center">{competencias[show].integrador}</div>
                  </div>
                  <div className="row descripcion">
                    <div className="col-12 titulo-mom" style={{ background: "#03045e" }}>Momento Innovador</div>
                    <div className="col-xl-2 col-lg-3 col-md-12  img-mom d-flex flex-column justify-content-center align-items-center">
                      <img src={imginn} width="50" />
                    </div>
                    <div className="col-xl-10 col-lg-9 col-md-12 mt-2 mb-2 d-flex flex-column justify-content-center align-items-center">{competencias[show].innovador}</div>
                  </div>
                </div>
              </div>
            </Popover.Body>
          </Popover >
        </div>
      )}

    </>
  );

  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
      </div>
      {false ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3" }} >
            <div className="row pb-4 justify-content-center" >
              <div className="col-lg-8 col-md-9 col-sm-12" >
                <YoutubeVideo></YoutubeVideo>
              </div>
            </div>
            <div className="row justify-content-center" >
              {competencias.map(
                (competencia, index): JSX.Element => (
                  <>

                    <OverlayTrigger trigger="click" placement="auto" overlay={popover} rootClose={true}>
                      <div className="competencia pt-4 col-lg-2 col-md-4 col-sm-6" onClick={() => { handleCompetencia(index) }}>
                        <div className="row pb-3 d-flex justify-content-center align-items-center">
                          <div className="icon-home text-center">
                            {competencia.icono}
                          </div>
                        </div>
                        <div className="row text-center"><div className="t-comp">Competencia</div></div>
                        <div className="row pb-4 text-center"><div className="t-comp">{competencia.nombre}</div></div>
                      </div>
                    </OverlayTrigger>

                  </>
                ))}
            </div>
          </div>
        </>
      )}


    </>
  );
};

export default HomePage;
