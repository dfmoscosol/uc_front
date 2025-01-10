// components
import Header from "../../shared/header.component";
import { useEffect, useState, useRef } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getUltimoResultado } from "../../redux/resultados/getResultados.slice";
import TituloCurso from "./componenets/TituloCurso";
import StarRating from "./componenets/StarRating.component";
import Pagination from "./componenets/Pagination.component";
import { getCursosPedagogica } from "../../redux/cursos/getCursosPedagogica.slice";
import { getCursosComunicativa } from "../../redux/cursos/getCursosComunicativa.slice";
import { getCursosGestion } from "../../redux/cursos/getCursosGestionslice";
import { getCursosInvestigativa } from "../../redux/cursos/getCursosInvestigativa.slice";
import { getCursosTecnologica } from "../../redux/cursos/getCursosTecnologica.slice";
const CoursesPage = (): JSX.Element => {

  // constants
  const {
    cursos: { pageTitle },
  } = BREADCRUMBS_ITEMS;

  const dispatch = useAppDispatch();
  const { data: dataResultados, loading: loadingResultados } = useAppSelector((state) => state.resultados)

  const { cursos: cursosPedagogica, info: infoPedagogica, loading: loadingPedagogica } = useAppSelector(
    (state) => state.cursosPedagogica
  );
  const { cursos: cursosComunicativa, info: infoComunicativa, loading: loadingComunicativa } = useAppSelector(
    (state) => state.cursosComunicativa
  );
  const { cursos: cursosInvestigativa, info: infoInvestigativa, loading: loadingInvestigativa } = useAppSelector(
    (state) => state.cursosInvestigativa
  );
  const { cursos: cursosGestion, info: infoGestion, loading: loadingGestion } = useAppSelector(
    (state) => state.cursosGestion
  );
  const { cursos: cursosTecnologica, info: infoTecnologica, loading: loadingTecnologica } = useAppSelector(
    (state) => state.cursosTecnologica
  );

  const getCursosPedagogicaByPagination = (page: number): void => {
    dispatch(getCursosPedagogica(page))
  }
  const getCursosComunicativaByPagination = (page: number): void => {
    dispatch(getCursosComunicativa(page))
  }
  const getCursosGestionByPagination = (page: number): void => {
    dispatch(getCursosGestion(page))
  }
  const getCursosInvestigativaByPagination = (page: number): void => {
    dispatch(getCursosInvestigativa(page))
  }
  const getCursosTecnologicaByPagination = (page: number): void => {
    dispatch(getCursosTecnologica(page))
  }

  useEffect(() => {
    dispatch(getUltimoResultado())
    dispatch(getCursosPedagogica())
    dispatch(getCursosComunicativa())
    dispatch(getCursosGestion())
    dispatch(getCursosInvestigativa())
    dispatch(getCursosTecnologica())
  }, [dispatch]);

  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
        <p className="descripcion-cursos" style={{ textAlign: "justify", paddingBottom: "20px" }}>En esta sección, encontrará una <b>selección de cursos</b> extraídos de la web en base a su perfil para <b>mejorar sus competencias TIC como docente</b>. Estos cursos están diseñados por expertos y respaldados por plataformas de aprendizaje de alta calidad, abordando aspectos clave de la <b>educación en la era digital</b>. Ya sea que desee fortalecer sus <b>habilidades en el uso de herramientas digitales</b> en el aula o explorar <b>estrategias pedagógicas innovadoras</b>, aquí encontrará opciones que se adaptan a sus necesidades. Su desarrollo profesional es esencial para <b>marcar la diferencia en la educación de sus estudiantes</b>, y estamos aquí para apoyarte en este proceso.</p>
      </div>
      {(loadingComunicativa || loadingInvestigativa || loadingPedagogica || loadingGestion || loadingTecnologica || loadingResultados) ? (
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
                      <div className="card border rounded" /* onClick={() => handleOpenModal(curso.keywords, "pedagogica")} */>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.urlimagen} className="card-img" />
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
                              <img className="img-footer" src={curso.urllogo} alt="" />
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
                total_pages={infoPedagogica.total_pages}
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
                      <div className="card border rounded" /* onClick={() => handleOpenModal(curso.keywords, "comunicativa")} */>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.urlimagen} className="card-img" />
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
                              <img className="img-footer" src={curso.urllogo} alt="" />
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
                total_pages={infoComunicativa.total_pages}
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
                      <div className="card border rounded" /* onClick={() => handleOpenModal(curso.keywords, "gestion")} */>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.urlimagen} className="card-img" />
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
                              <img className="img-footer" src={curso.urllogo} alt="" />
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
                total_pages={infoGestion.total_pages}
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
                      <div className="card border rounded" /* onClick={() => handleOpenModal(curso.keywords, "investigativa")} */>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.urlimagen} className="card-img" />
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
                              <img className="img-footer" src={curso.urllogo} alt="" />
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
                total_pages={infoInvestigativa.total_pages}
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
                      <div className="card border rounded" /* onClick={() => handleOpenModal(curso.keywords, "tecnologica")} */>
                        <div className="row">
                          <div className="col-xl-3 col-lg-12" style={{ height: "100%" }}>
                            <img src={curso.urlimagen} className="card-img" />
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
                              <img className="img-footer" src={curso.urllogo} alt="" />
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
                total_pages={infoTecnologica.total_pages}
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
