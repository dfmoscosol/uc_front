// components
import Header from "../../shared/header.component";
import { useEffect, useState } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getFacultadesReset } from "../../redux/encuesta/getFacultades.slice";
import { getCarrerasReset } from "../../redux/encuesta/getCarreras.slice";
import { validateEncuestaReset } from "../../redux/encuesta/validateEncuesta.slice";
import { getPreguntasReset } from "../../redux/encuesta/getPreguntas.slice";
import { getResultados, getResultadosReset, initialState } from "../../redux/resultados/getResultados.slice";
import { getPeriodosReset } from "../../redux/resultados/getPeriodos.slice";
import { postPreguntasReset } from "../../redux/encuesta/postRespuesta.slice";
import TituloCurso from "./componenets/TituloCurso";
import Pagination from "./componenets/Pagination.component";
import StarRating from "./componenets/StarRating.component";
import ModalComponent from "./componenets/Modal.component";

const CoursesPage = (): JSX.Element => {
  // local variables
  const [open, setOpen] = useState(false);
  const [keyWords, setKeyWords] = useState([]);
  const [url, setUrl] = useState("");

  // constants
  const {
    cursos: { pageTitle },
  } = BREADCRUMBS_ITEMS;

  const dispatch = useAppDispatch();
  const { data: dataResultados } = useAppSelector((state) => state.resultados)

  const { cursos: cursosPedagogica, info: infoPedagogica } = useAppSelector(
    (state) => state.cursosPedagogica
  );
  const { cursos: cursosComunicativa, info: infoComunicativa } = useAppSelector(
    (state) => state.cursosComunicativa
  );
  const { cursos: cursosInvestigativa, info: infoInvestigativa } = useAppSelector(
    (state) => state.cursosInvestigativa
  );
  const { cursos: cursosGestion, info: infoGestion } = useAppSelector(
    (state) => state.cursosGestion
  );
  const { cursos: cursosTecnologica, info: infoTecnologica } = useAppSelector(
    (state) => state.cursosTecnologica
  );


  const getCursosPedagogicaByPagination = (page: number): void => {
  }
  const getCursosComunicativaByPagination = (page: number): void => {
  }
  const getCursosGestionByPagination = (page: number): void => {
  }
  const getCursosInvestigativaByPagination = (page: number): void => {
  }
  const getCursosTecnologicaByPagination = (page: number): void => {
  }

  const handleOpenModal = (keyWords, url) => {
    setKeyWords(keyWords);
    setUrl(url);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getResultadosReset())
    dispatch(getResultados(2))
  }, [dispatch]);

  return (
    <>
      {open &&
        <ModalComponent
          url={url}
          keyWords={keyWords}
          onClose={handleCloseModal}
        />
      }
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
        <p className="descripcion-cursos" style={{ textAlign: "justify", paddingBottom: "20px" }}>En esta sección, encontrará una <b>selección de cursos</b> extraídos de la web en base a su perfil para <b>mejorar sus competencias TIC como docente</b>. Estos cursos están diseñados por expertos y respaldados por plataformas de aprendizaje de alta calidad, abordando aspectos clave de la <b>educación en la era digital</b>. Ya sea que desee fortalecer sus <b>habilidades en el uso de herramientas digitales</b> en el aula o explorar <b>estrategias pedagógicas innovadoras</b>, aquí encontrará opciones que se adaptan a sus necesidades. Su desarrollo profesional es esencial para <b>marcar la diferencia en la educación de sus estudiantes</b>, y estamos aquí para apoyarte en este proceso.</p>
      </div>
      {dataResultados == initialState.data ? (
        <>
          <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
            <div className="col-6">
              <Loader></Loader>
            </div>
          </div>        </>
      ) : (
        <>
          {/* Pedagogica */}
          <div className="row" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
            <div className="row pt-1 titulo-curso">
              <TituloCurso
                competencia={dataResultados.pedagogica.competencia}
                momento={dataResultados.pedagogica.momento}
              />
            </div>
            <div className="row justify-content-center pt-1 pb-2 row-cursos">
              <div className="justify-content-between">
                <a></a>
                <small className="float-end">Total de cursos: {infoPedagogica?.total}</small>
              </div>
              {
                cursosPedagogica?.map(
                  (curso): JSX.Element => (
                    <a href={curso.url} target="_blank" className="card-link ">
                      <div className="card border rounded" onClick={() => handleOpenModal(curso.key_words, curso.url)}>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.url_img} className="card-img" />
                          </div>
                          <div className="col-xl-9 col-lg-12">
                            <div className="card-body" >
                              <h4>{curso.titulo}</h4>
                              <div className="curso-descripcion" >
                                <p className="card-text">{curso.descripcion.slice(0, 280)} ... <a style={{ color: "#0460e6" }}> Ver más</a></p>
                                <StarRating rate={curso.puntuacion}></StarRating>
                              </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.ofertante}</b></small>
                              <img className="img-footer" src={curso.url_img_logo} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  )
                )
              }

            </div>
            {infoPedagogica && (
              <Pagination
                totalDocs={infoPedagogica.total}
                prevPage={infoPedagogica.prevPage}
                hasPrevPage={infoPedagogica.hasPrevPage}
                totalPages={infoPedagogica.totalPages}
                page={infoPedagogica.currentPage}
                nextPage={infoPedagogica.nextPage}
                hasNextPage={infoPedagogica.hasNextPage}
                limit={infoPedagogica.limit}
                fetchData={getCursosPedagogicaByPagination}
              />
            )}
          </div>
          {/* Comunicativa */}
          <div className="row mt-3" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
            <div className="row pt-1 titulo-curso " >
              <TituloCurso
                competencia={dataResultados.comunicativa.competencia}
                momento={dataResultados.comunicativa.momento}
              />
            </div>
            <div className="row justify-content-center pt-1 pb-3 row-cursos">
              <div className="justify-content-between">
                <a></a>
                <small className="float-end">Total de cursos: {infoComunicativa?.total}</small>
              </div>
              {
                cursosComunicativa?.map(
                  (curso): JSX.Element => (
                    <a href={curso.url} target="_blank" className="card-link ">
                      <div className="card border rounded" onClick={() => handleOpenModal(curso.key_words, curso.url)}>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.url_img} className="card-img" />
                          </div>
                          <div className="col-xl-9 col-lg-12">
                            <div className="card-body" >
                              <h4>{curso.titulo}</h4>
                              <div className="curso-descripcion" >
                                <p className="card-text">{curso.descripcion.slice(0, 280)} ... <a style={{ color: "#0460e6" }}> Ver más</a></p>
                                <StarRating rate={curso.puntuacion}></StarRating>
                              </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.ofertante}</b></small>
                              <img className="img-footer" src={curso.url_img_logo} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>

                  )
                )
              }

            </div>
            {infoComunicativa && (
              <Pagination
                totalDocs={infoComunicativa.total}
                prevPage={infoComunicativa.prevPage}
                hasPrevPage={infoComunicativa.hasPrevPage}
                totalPages={infoComunicativa.totalPages}
                page={infoComunicativa.currentPage}
                nextPage={infoComunicativa.nextPage}
                hasNextPage={infoComunicativa.hasNextPage}
                limit={infoComunicativa.limit}
                fetchData={getCursosComunicativaByPagination}
              />
            )}
          </div>
          {/* Gestion */}
          <div className="row mt-3" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
            <div className="row pt-1 titulo-curso " >
              <TituloCurso
                competencia={dataResultados.gestion.competencia}
                momento={dataResultados.gestion.momento}
              />
            </div>
            <div className="row justify-content-center pt-1 pb-3 row-cursos">
              <div className="justify-content-between">
                <a></a>
                <small className="float-end">Total de cursos: {infoGestion?.total}</small>
              </div>
              {
                cursosGestion?.map(
                  (curso): JSX.Element => (
                    <a href={curso.url} target="_blank" className="card-link ">
                      <div className="card border rounded" onClick={() => handleOpenModal(curso.key_words, curso.url)}>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.url_img} className="card-img" />
                          </div>
                          <div className="col-xl-9 col-lg-12">
                            <div className="card-body" >
                              <h4>{curso.titulo}</h4>
                              <div className="curso-descripcion" >
                                <p className="card-text">{curso.descripcion.slice(0, 280)} ... <a style={{ color: "#0460e6" }}> Ver más</a></p>
                                <StarRating rate={curso.puntuacion}></StarRating>
                              </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.ofertante}</b></small>
                              <img className="img-footer" src={curso.url_img_logo} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>

                  )
                )
              }

            </div>
            {infoGestion && (
              <Pagination
                totalDocs={infoGestion.total}
                prevPage={infoGestion.prevPage}
                hasPrevPage={infoGestion.hasPrevPage}
                totalPages={infoGestion.totalPages}
                page={infoGestion.currentPage}
                nextPage={infoGestion.nextPage}
                hasNextPage={infoGestion.hasNextPage}
                limit={infoGestion.limit}
                fetchData={getCursosGestionByPagination}
              />
            )}
          </div>
          {/* Investigativa */}
          <div className="row mt-3" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
            <div className="row pt-1 titulo-curso " >
              <TituloCurso
                competencia={dataResultados.investigativa.competencia}
                momento={dataResultados.investigativa.momento}
              />
            </div>
            <div className="row justify-content-center pt-1 pb-3 row-cursos">
              <div className="justify-content-between">
                <a></a>
                <small className="float-end">Total de cursos: {infoInvestigativa?.total}</small>
              </div>
              {
                cursosInvestigativa?.map(
                  (curso): JSX.Element => (
                    <a href={curso.url} target="_blank" className="card-link ">
                      <div className="card border rounded" onClick={() => handleOpenModal(curso.key_words, curso.url)}>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.url_img} className="card-img" />
                          </div>
                          <div className="col-xl-9 col-lg-12">
                            <div className="card-body" >
                              <h4>{curso.titulo}</h4>
                              <div className="curso-descripcion" >
                                <p className="card-text">{curso.descripcion.slice(0, 280)} ... <a style={{ color: "#0460e6" }}> Ver más</a></p>
                                <StarRating rate={curso.puntuacion}></StarRating>
                              </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.ofertante}</b></small>
                              <img className="img-footer" src={curso.url_img_logo} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>


                  )
                )
              }

            </div>
            {infoInvestigativa && (
              <Pagination
                totalDocs={infoInvestigativa.total}
                prevPage={infoInvestigativa.prevPage}
                hasPrevPage={infoInvestigativa.hasPrevPage}
                totalPages={infoInvestigativa.totalPages}
                page={infoInvestigativa.currentPage}
                nextPage={infoInvestigativa.nextPage}
                hasNextPage={infoInvestigativa.hasNextPage}
                limit={infoInvestigativa.limit}
                fetchData={getCursosInvestigativaByPagination}
              />
            )}
          </div>
          {/* Tecnologica */}
          <div className="row mt-3" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
            <div className="row pt-1 titulo-curso">
              <TituloCurso
                competencia={dataResultados.tecnologica.competencia}
                momento={dataResultados.tecnologica.momento}
              />
            </div>
            <div className="row justify-content-center pt-1 pb-3 row-cursos">
              <div className="justify-content-between">
                <a></a>
                <small className="float-end">Total de cursos: {infoTecnologica?.total}</small>
              </div>
              {
                cursosTecnologica?.map(
                  (curso): JSX.Element => (
                    <a href={curso.url} target="_blank" className="card-link ">
                      <div className="card border rounded" onClick={() => handleOpenModal(curso.key_words, curso.url)}>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.url_img} className="card-img" />
                          </div>
                          <div className="col-xl-9 col-lg-12">
                            <div className="card-body" >
                              <h4>{curso.titulo}</h4>
                              <div className="curso-descripcion" >
                                <p className="card-text">{curso.descripcion.slice(0, 280)} ... <a style={{ color: "#0460e6" }}> Ver más</a></p>
                                <StarRating rate={curso.puntuacion}></StarRating>
                              </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.ofertante}</b></small>
                              <img className="img-footer" src={curso.url_img_logo} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  )
                )
              }

            </div>
            {infoTecnologica && (
              <Pagination
                totalDocs={infoTecnologica.total}
                prevPage={infoTecnologica.prevPage}
                hasPrevPage={infoTecnologica.hasPrevPage}
                totalPages={infoTecnologica.totalPages}
                page={infoTecnologica.currentPage}
                nextPage={infoTecnologica.nextPage}
                hasNextPage={infoTecnologica.hasNextPage}
                limit={infoTecnologica.limit}
                fetchData={getCursosTecnologicaByPagination}
              />
            )}
          </div>
        </>
      )
      }


    </>
  );
};

export default CoursesPage;
