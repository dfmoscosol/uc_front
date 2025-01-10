import Loader from '../../shared/loader.component';
import Header from '../../shared/header.component';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { getHistorial } from '../../redux/historial/getHistorial.slice';
import { Certificado, Evento } from '../../data/interfaces/historial.model';
import HorizontalBarChart from './components/BarChart';
import ProgressBar from './components/ProgressBar';
import DonutChart from './components/DonutChart';
import { downloadInformeObservacion } from '../../redux/historial/getDownloadObservation.slice';
import { MdPictureAsPdf } from "react-icons/md";
import { downloadCertificado } from '../../redux/historial/getDownloadCertificado.slice';
import { FaSpinner } from 'react-icons/fa';

const HistorialPage = () => {
    const { historial, horas_competencia, horas_evento, loading } = useAppSelector((state) => state.historial);
    const { loading: loadingCertificado } = useAppSelector((state) => state.downloadCertificado);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getHistorial())
    }, [dispatch]);

    const renderEventos = (eventos: Evento[]) => (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre del Evento</th>
                    <th>Competencia</th>
                    <th>Momento</th>
                    <th>Fecha</th>
                    <th>Aprobación</th>
                    <th>Comentario</th>
                    <th>Horas Acreditadas</th>
                </tr>
            </thead>
            <tbody>
                {eventos.map((evento, index) => (
                    <tr key={index}>
                        <td>{evento.nombre_evento}</td>
                        <td>{evento.competencia || "N/A"}</td>
                        <td>{evento.momento || "N/A"}</td>
                        <td>{evento.fecha}</td>
                        <td>{evento.aprobacion ? "Sí" : "No"}</td>
                        <td>{evento.comentario || "N/A"}</td>
                        <td>{evento.aprobacion ? evento.horas : 0}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderJornadas = (eventos: Evento[]) => (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre del Evento</th>
                    <th>Nombre del Taller</th>
                    <th>Competencia</th>
                    <th>Momento</th>
                    <th>Fecha</th>
                    <th>Aprobación</th>
                    <th>Comentario</th>
                    <th>Horas Acreditadas</th>
                </tr>
            </thead>
            <tbody>
                {eventos.map((evento, index) => (
                    <tr key={index}>
                        <td>{evento.nombre_evento}</td>
                        <td>{evento.taller}</td>
                        <td>{evento.competencia || "N/A"}</td>
                        <td>{evento.momento || "N/A"}</td>
                        <td>{evento.fecha}</td>
                        <td>{evento.aprobacion ? "Sí" : "No"}</td>
                        <td>{evento.comentario || "N/A"}</td>
                        <td>{evento.aprobacion ? evento.horas : 0}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderObservaciones = (eventos: Evento[]) => (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Período de Observación</th>
                    <th>Descargar Informe</th>
                    <th>Horas Acreditadas</th>
                </tr>
            </thead>
            <tbody>
                {eventos.map((evento, index) => (
                    <tr key={index}>
                        <td>{evento.nombre_evento}</td>
                        <td>
                            <button
                                style={{
                                    background: "none", // Sin fondo
                                    border: "none", // Sin borde
                                    padding: 0, // Sin padding
                                    fontSize: "25px",
                                    color: "#6d1510",
                                    cursor: "pointer",
                                }}
                                onClick={() => dispatch(downloadInformeObservacion(evento.id ?? 0))}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                }}
                            >
                                <MdPictureAsPdf style={{ transition: "transform 0.2s ease" }}></MdPictureAsPdf>
                            </button></td>

                        <td>{evento.horas}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderExternos = (certificados: Certificado[]) => (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre del Curso</th>
                    <th>Fecha de Subida</th>
                    <th>Horas Certificado</th>
                    <th>Horas Acreditadas</th>
                </tr>
            </thead>
            <tbody>
                {certificados.map((certificado, index) => (
                    <tr key={index}>
                        <td>{certificado.nombre_curso}</td>
                        <td>{certificado.fecha_subida}</td>
                        <td>{certificado.horas_certificado}</td>
                        <td>{certificado.horas_acredita}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
                {loading ? (
                    <>
                        <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
                            <div className="col-4">
                                <Loader></Loader>
                            </div>
                        </div>
                    </>
                ) : (
                    <>

                        <Header title={"Programa de Formación Docente - D360"} />

                        <div className="container pb-5 px-4">
                            <div className="row">
                                <div className="col-xl-10 col-md-8 mb-4 mb-md-0">
                                    <div className="event-info-dash">
                                        <span className="info-title-dash">Progreso en el Programa de Formación</span>
                                        <ProgressBar currentHours={horas_evento.Acumuladas} totalHours={horas_evento.Total} />
                                    </div>
                                </div>
                                <div className="col-xl-2 col-md-4">
                                    <div className="event-info-dash">
                                        <span className="info-title-dash">Descargar Certificado</span>
                                        <button
                                            style={{
                                                background: "none", // Sin fondo
                                                border: "none", // Sin borde
                                                padding: 0, // Sin padding
                                                fontSize: "50px",
                                                color: "#6d1510",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => dispatch(downloadCertificado())}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                            }}
                                        >
                                            {loadingCertificado ? (
                                                <FaSpinner
                                                    style={{
                                                        animation: "spin 1s linear infinite", // Spinner animado
                                                    }}
                                                />
                                            ) : (
                                                <MdPictureAsPdf style={{ transition: "transform 0.2s ease" }} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                {/* Primera Columna */}
                                <div className="col-xl-8 col-md-12 mb-4 mb-md-0">
                                    <div className="event-info-dash">
                                        <span className="info-title-dash">Horas de Capacitación por Competencia</span>
                                        <HorizontalBarChart competencias={horas_competencia} />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-12">
                                    <div className="event-info-dash">
                                        <span className="info-title-dash">Horas de Formación por Evento</span>
                                        <DonutChart eventos={horas_evento} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="container pb-4">
                            <span className="info-title-dash">Detalle del Programa de Formación Docente</span>
                            <div className="accordion pt-3" id="historialAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingJornadas">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseJornadas"
                                            aria-expanded="true"
                                            aria-controls="collapseJornadas"
                                        >
                                            Jornadas de Innovación Educativa
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseJornadas"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingJornadas"
                                        data-bs-parent="#historialAccordion"
                                    >
                                        <div className="accordion-body">
                                            {historial.jornadas.length > 0
                                                ? <div className="scrollable-table">
                                                    {renderJornadas(historial.jornadas)}
                                                </div>
                                                : <p>No hay registros de jornadas.</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingCharlas">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseCharlas"
                                            aria-expanded="false"
                                            aria-controls="collapseCharlas"
                                        >
                                            Charlas
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseCharlas"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingCharlas"
                                        data-bs-parent="#historialAccordion"
                                    >
                                        <div className="accordion-body">
                                            {historial.charlas.length > 0
                                                ? <div className="scrollable-table">
                                                    {renderEventos(historial.charlas)}
                                                </div>
                                                : <p>No hay registros de charlas.</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingMicrotalleres">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseMicrotalleres"
                                            aria-expanded="false"
                                            aria-controls="collapseMicrotalleres"
                                        >
                                            Microtalleres
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseMicrotalleres"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingMicrotalleres"
                                        data-bs-parent="#historialAccordion"
                                    >
                                        <div className="accordion-body">
                                            {historial.microtalleres.length > 0
                                                ? <div className="scrollable-table">
                                                    {renderEventos(historial.microtalleres)}
                                                </div>
                                                : <p>No hay registros de microtalleres.</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingObservaciones">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseObservaciones"
                                            aria-expanded="false"
                                            aria-controls="collapseObservaciones"
                                        >
                                            Acompañamiento Áulico
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseObservaciones"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingObservaciones"
                                        data-bs-parent="#historialAccordion"
                                    >
                                        <div className="accordion-body">
                                            {historial.observaciones.length > 0
                                                ? <div className="scrollable-table">
                                                    {renderObservaciones(historial.observaciones)}
                                                </div>
                                                : <p>No hay registros de observaciones.</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingExternos">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseExternos"
                                            aria-expanded="false"
                                            aria-controls="collapseExternos"
                                        >
                                            Capacitaciones Externas
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseExternos"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingExternos"
                                        data-bs-parent="#historialAccordion"
                                    >
                                        <div className="accordion-body">
                                            {historial.externos.length > 0
                                                ? <div className="scrollable-table">
                                                    {renderExternos(historial.externos)}
                                                </div>
                                                : <p>No hay registros de certificados externos.</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </>

    );
};

export default HistorialPage;