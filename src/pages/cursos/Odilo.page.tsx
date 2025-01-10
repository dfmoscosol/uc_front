// components
import Header from "../../shared/header.component";
import { useEffect } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import TituloCurso from "./componenets/TituloCurso";
import Pagination from "./componenets/Pagination.component";
import { getOdiloComunicativa } from "../../redux/odilo/getOdiloComunicativa.slice";
import { getOdiloPedagogica } from "../../redux/odilo/getOdiloPedagogica.slice";
import { getOdiloGestion } from "../../redux/odilo/getOdiloGestionslice";
import { getOdiloInvestigativa } from "../../redux/odilo/getOdiloInvestigativa.slice";
import { getOdiloTecnologica } from "../../redux/odilo/getOdiloTecnologica.slice";
import { getUltimoResultado } from "../../redux/resultados/getResultados.slice";

const OdiloPage = (): JSX.Element => {
  const {
    odilo: { pageTitle },
  } = BREADCRUMBS_ITEMS;

  const dispatch = useAppDispatch();
  const { data: dataResultados, loading: loadingResultados } = useAppSelector((state) => state.resultados)

  const { odilo: cursosPedagogica, info: infoPedagogica, loading: loadingPedagogica } = useAppSelector(
    (state) => state.odiloPedagogica
  );
  const { odilo: cursosComunicativa, info: infoComunicativa, loading: loadingComunicativa } = useAppSelector(
    (state) => state.odiloComunicativa
  );
  const { odilo: cursosInvestigativa, info: infoInvestigativa, loading: loadingInvestigativa } = useAppSelector(
    (state) => state.odiloInvestigativa
  );
  const { odilo: cursosGestion, info: infoGestion, loading: loadingGestion } = useAppSelector(
    (state) => state.odiloGestion
  );
  const { odilo: cursosTecnologica, info: infoTecnologica, loading: loadingTecnologica } = useAppSelector(
    (state) => state.odiloTecnologica
  );


  const getOdiloPedagogicaByPagination = (page: number): void => {
    dispatch(getOdiloPedagogica(page))
  }
  const getOdiloComunicativaByPagination = (page: number): void => {
    dispatch(getOdiloComunicativa(page))
  }
  const getOdiloGestionByPagination = (page: number): void => {
    dispatch(getOdiloGestion(page))
  }
  const getOdiloInvestigativaByPagination = (page: number): void => {
    dispatch(getOdiloInvestigativa(page))
  }
  const getOdiloTecnologicaByPagination = (page: number): void => {
    dispatch(getOdiloTecnologica(page))
  }

  useEffect(() => {
    dispatch(getUltimoResultado())
    dispatch(getOdiloTecnologica())
    dispatch(getOdiloComunicativa())
    dispatch(getOdiloGestion())
    dispatch(getOdiloInvestigativa())
    dispatch(getOdiloPedagogica())
  }, [dispatch]);

  return (
    <>

      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
        <p className="descripcion-cursos" style={{ textAlign: "justify", paddingBottom: "20px" }}> En esta sección, encontrará una <b>selección de materiales provenientes de ODILO</b>, recomendados específicamente en función de su perfil de competencias. Estos recursos abarcan diversos formatos, como <b>eBooks, audiolibros, cursos, videos, resúmenes y podcasts</b>, ofreciendo opciones flexibles y adaptadas a sus necesidades de aprendizaje. Ya sea que desee fortalecer áreas específicas, explorar nuevas herramientas pedagógicas o actualizar sus conocimientos, aquí encontrará <b>recursos diseñados para apoyar su desarrollo profesional</b>.</p>
      </div>
      {(loadingComunicativa || loadingInvestigativa || loadingPedagogica || loadingGestion || loadingTecnologica || loadingResultados) ? (
        <>
          <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
            <div className="col-6">
              <Loader></Loader>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Pedagogica */}
          <div className="row" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
            <div className="pt-1 titulo-curso" >
              <TituloCurso
                competencia={dataResultados.pedagogica.competencia}
                momento={dataResultados.pedagogica.momento}
              />
            </div>
            <div className="justify-content-between custom-padding-lg">
              <a></a>
              <small className="float-end">Total de cursos: {infoPedagogica?.total}</small>
            </div>
            <div className="row justify-content-center pt-1 pb-2 row-cursos">
              {
                cursosPedagogica?.map(
                  (curso): JSX.Element => (
                    <div className="col-xl-5 col-lg-12 text-center mx-3">
                      <a href={curso.url} target="_blank" className="card-link">
                        <div className="card border rounded" >
                          <div className="row">
                            <div className="col-xl-3 col-4 d-flex align-items-center justify-content-center pe-0">
                              <img src={curso.urlimagen} className="card-img-odilo" />
                            </div>
                            <div className="col-xl-9 col-8 ps-0 d-flex flex-column justify-content-between">
                              <div className="card-body">
                                <h4>{curso.titulo}</h4>
                                <div className="curso-descripcion">
                                  <p className="card-text">
                                    {curso.descripcion.slice(0, 380)} ...
                                    <a style={{ color: "#0460e6" }}> Ver más</a>
                                  </p>
                                </div>
                              </div>
                              <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.autor}</b></small>
                              <small className="text-muted text-footer"><b>Tipo de material:</b> {curso.tipo.toUpperCase()}</small>
                              </div>
                            </div>
                          </div>

                        </div>
                      </a>
                    </div>
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
                fetchData={getOdiloPedagogicaByPagination}
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
            <div className="justify-content-between custom-padding-lg">
              <a></a>
              <small className="float-end">Total de cursos: {infoComunicativa?.total}</small>
            </div>
            <div className="row justify-content-center pt-1 pb-3 row-cursos">
              {
                cursosComunicativa?.map(
                  (curso): JSX.Element => (
                    <div className="col-xl-5 col-lg-12 text-center mx-3">
                      <a href={curso.url} target="_blank" className="card-link">
                        <div className="card border rounded" >
                          <div className="row">
                            <div className="col-xl-3 col-4 d-flex align-items-center justify-content-center pe-0">
                              <img src={curso.urlimagen} className="card-img-odilo" />
                            </div>
                            <div className="col-xl-9 col-8 ps-0 d-flex flex-column justify-content-between">
                              <div className="card-body">
                                <h4>{curso.titulo}</h4>
                                <div className="curso-descripcion">
                                  <p className="card-text">
                                    {curso.descripcion.slice(0, 380)} ...
                                    <a style={{ color: "#0460e6" }}> Ver más</a>
                                  </p>
                                </div>
                              </div>
                              <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.autor}</b></small>
                              <small className="text-muted text-footer"><b>Tipo de material:</b> {curso.tipo.toUpperCase()}</small>
                              </div>
                            </div>
                          </div>

                        </div>
                      </a>
                    </div>
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
                fetchData={getOdiloComunicativaByPagination}
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
            <div className="justify-content-between custom-padding-lg">
              <a></a>
              <small className="float-end">Total de cursos: {infoGestion?.total}</small>
            </div>
            <div className="row justify-content-center pt-1 pb-3 row-cursos">
              {
                cursosGestion?.map(
                  (curso): JSX.Element => (
                    <div className="col-xl-5 col-lg-12 text-center mx-3">
                      <a href={curso.url} target="_blank" className="card-link">
                        <div className="card border rounded" >
                          <div className="row">
                            <div className="col-xl-3 col-4 d-flex align-items-center justify-content-center pe-0">
                              <img src={curso.urlimagen} className="card-img-odilo" />
                            </div>
                            <div className="col-xl-9 col-8 ps-0 d-flex flex-column justify-content-between">
                              <div className="card-body">
                                <h4>{curso.titulo}</h4>
                                <div className="curso-descripcion">
                                  <p className="card-text">
                                    {curso.descripcion.slice(0, 380)} ...
                                    <a style={{ color: "#0460e6" }}> Ver más</a>
                                  </p>
                                </div>
                              </div>
                              <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.autor}</b></small>
                              <small className="text-muted text-footer"><b>Tipo de material:</b> {curso.tipo.toUpperCase()}</small>
                              </div>
                            </div>
                          </div>

                        </div>
                      </a>
                    </div>
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
                fetchData={getOdiloGestionByPagination}
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
            <div className="justify-content-between custom-padding-lg">
              <a></a>
              <small className="float-end">Total de cursos: {infoInvestigativa?.total}</small>
            </div>
            <div className="row justify-content-center pt-1 pb-3 row-cursos">
              {
                cursosInvestigativa?.map(
                  (curso): JSX.Element => (
                    <div className="col-xl-5 col-lg-12 text-center mx-3">
                      <a href={curso.url} target="_blank" className="card-link">
                        <div className="card border rounded" >
                          <div className="row">
                            <div className="col-xl-3 col-4 d-flex align-items-center justify-content-center pe-0">
                              <img src={curso.urlimagen} className="card-img-odilo" />
                            </div>
                            <div className="col-xl-9 col-8 ps-0 d-flex flex-column justify-content-between">
                              <div className="card-body">
                                <h4>{curso.titulo}</h4>
                                <div className="curso-descripcion">
                                  <p className="card-text">
                                    {curso.descripcion.slice(0, 380)} ...
                                    <a style={{ color: "#0460e6" }}> Ver más</a>
                                  </p>
                                </div>
                              </div>
                              <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.autor}</b></small>
                              <small className="text-muted text-footer"><b>Tipo de material:</b> {curso.tipo.toUpperCase()}</small>
                              </div>
                            </div>
                          </div>

                        </div>
                      </a>
                    </div>
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
                fetchData={getOdiloInvestigativaByPagination}
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
            <div className="justify-content-between custom-padding-lg">
              <a></a>
              <small className="float-end">Total de cursos: {infoTecnologica?.total}</small>
            </div>
            <div className="row justify-content-center pt-1 pb-3 row-cursos">
              {
                cursosTecnologica?.map(
                  (curso): JSX.Element => (
                    <div className="col-xl-5 col-lg-12 text-center mx-3">
                      <a href={curso.url} target="_blank" className="card-link">
                        <div className="card border rounded" >
                          <div className="row">
                            <div className="col-xl-3 col-4 d-flex align-items-center justify-content-center pe-0">
                              <img src={curso.urlimagen} className="card-img-odilo" />
                            </div>
                            <div className="col-xl-9 col-8 ps-0 d-flex flex-column justify-content-between">
                              <div className="card-body">
                                <h4>{curso.titulo}</h4>
                                <div className="curso-descripcion">
                                  <p className="card-text">
                                    {curso.descripcion.slice(0, 380)} ...
                                    <a style={{ color: "#0460e6" }}> Ver más</a>
                                  </p>
                                </div>
                              </div>
                              <div className="card-footer d-flex justify-content-between">
                              <small className="text-muted text-footer"><b>{curso.autor}</b></small>
                              <small className="text-muted text-footer"><b>Tipo de material:</b> {curso.tipo.toUpperCase()}</small>
                              </div>
                            </div>
                          </div>

                        </div>
                      </a>
                    </div>
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
                fetchData={getOdiloTecnologicaByPagination}
              />
            )}
          </div>
        </>
      )
      }

    </>
  );
};

export default OdiloPage;
