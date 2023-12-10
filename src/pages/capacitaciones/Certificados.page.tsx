// components
import Header from "../../shared/header.component";
import { useEffect, useState } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { GiTeamIdea } from "react-icons/gi";
import { Badge } from "react-bootstrap";
import { MdCheckCircle, MdComputer, MdContentPasteSearch, MdOutlineEngineering, MdOutlineGroups, MdOutlineSpeakerNotes, MdSchool } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { GrWorkshop } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AcreditacionesCapacitacionGetAllReset, getAcreditacionesCapacitacion } from "../../redux/cursos/getAcreditacionesCapacitaciones.slice";
import { SiGoogleclassroom } from "react-icons/si";
import { getAcreditacionesCursos } from "../../redux/cursos/getAcreditacionesCursos.slice";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CertificadosPage = (): JSX.Element => {
  // local variables
  const { acreditaciones_capacitacion, isLoading: isLoadingCap } = useAppSelector((state) => state.acreditaciones_capacitaciones);
  const { acreditaciones_cursos, isLoading: isLoadingCur } = useAppSelector((state) => state.acreditaciones_cursos);

  // constants
  const {
    certificados: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAcreditacionesCapacitacion())
    dispatch(getAcreditacionesCursos())
  }, [dispatch]);

  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
      </div>
      {isLoadingCap && isLoadingCur ? (
        <>
          <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
            <div className="col-4">
              <Loader></Loader>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="table-container" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856", marginTop: "20px" }} >
            <h5 className="titulo-portafolio">Capacitaciones programa D360</h5>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Capacitación</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Horas Acreditadas</th>
                  <th scope="col">Modalidad</th>
                  <th scope="col">Asitió</th>
                  <th scope="col">Aprobó</th>
                  <th scope="col">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  acreditaciones_capacitacion?.map(
                    (acreditacion): JSX.Element => (
                      <tr>
                        <th scope="row">
                          <div className="row">
                            {acreditacion.tipo === 'jornada' ? <GiTeamIdea /> :
                              acreditacion.tipo === 'taller' ? <GrWorkshop /> :
                                acreditacion.tipo === 'observacion' ? <SiGoogleclassroom /> :
                                  acreditacion.tipo === 'charla' ? <FaChalkboardTeacher /> : <></>
                            }
                          </div>
                          <div className="row pt-2" style={{ marginInline: "5px" }}>
                            <Badge className="badge-tipo" bg="primary">
                              {acreditacion.tipo === 'jornada' ? 'Jornada de Innovación' :
                                acreditacion.tipo === 'taller' ? 'Taller' :
                                  acreditacion.tipo === 'observacion' ? 'Observación Áulica' : 'Charla'
                              }
                            </Badge>
                          </div>
                        </th>
                        <td>{acreditacion.nombre}</td>
                        <td>{acreditacion.horas}</td>
                        <td>{acreditacion.presencial ? "Presencial" : "Virtual"}</td>
                        <td>{acreditacion.asistencia ? <Badge className="badge-limpio" bg="primary"><MdCheckCircle size={20} /></Badge> : <Badge className="badge-limpio" style={{ color: "red" }} bg="primary"><RxCrossCircled size={20} /></Badge>}</td>
                        <td>{acreditacion.aprobado ? <Badge className="badge-limpio" bg="primary"><MdCheckCircle size={20} /></Badge> : <Badge className="badge-limpio" style={{ color: "red" }} bg="primary"><RxCrossCircled size={20} /></Badge>}</td>
                        <td>
                          {acreditacion.observacion ?
                            <>
                              <OverlayTrigger
                                overlay={<Tooltip className="tooltip-custom">{acreditacion.observacion}</Tooltip>}
                                placement="auto"
                                delay={{ show: 0, hide: 1000 }}
                              >
                                <Badge className="badge-link" bg="primary"><MdOutlineSpeakerNotes size={20} /></Badge>
                              </OverlayTrigger>
                            </>
                            :
                            <>
                              <Badge className="badge-limpio" bg="primary" style={{ color: "gray" }}><MdOutlineSpeakerNotes size={20} /></Badge>

                            </>}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

          </div>

          <div className="table-container" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856", marginTop: "20px" }} >
            <h5 className="titulo-portafolio">Cursos recomendados</h5>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Competencia</th>
                  <th scope="col">Titulo del Curso</th>
                  <th scope="col">Horas Acreditadas</th>
                  <th scope="col">Aprobado</th>
                  <th scope="col">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  acreditaciones_cursos?.map(
                    (acreditacion): JSX.Element => (
                      <tr>
                        <th scope="row">
                          <div className="row">
                            {acreditacion.competencia === 'Pedagógica' ? <MdSchool /> :
                              acreditacion.competencia === 'Comunicativa' ? <MdOutlineGroups /> :
                                acreditacion.competencia === 'De Gestión' ? <MdOutlineEngineering /> :
                                  acreditacion.competencia === 'Investigativa' ? <MdContentPasteSearch /> :
                                    acreditacion.competencia === 'Tecnológica' ? <MdComputer /> : <></>
                            }
                          </div>
                          <div className="row pt-2" style={{ marginInline: "5px" }}>
                            <Badge className="badge-tipo" bg="primary">
                              {acreditacion.competencia
                              }
                            </Badge>
                          </div>
                        </th>
                        <td>{acreditacion.titulo}</td>
                        <td>{acreditacion.horas}</td>
                        <td>{acreditacion.isapproved ? <Badge className="badge-limpio" bg="primary"><MdCheckCircle size={20} /></Badge> : <Badge className="badge-limpio" style={{ color: "red" }} bg="primary"><RxCrossCircled size={20} /></Badge>}</td>
                        <td>
                          {acreditacion.observacion ?
                            <>
                              <OverlayTrigger
                                overlay={<Tooltip className="tooltip-custom">{acreditacion.observacion}</Tooltip>}
                                placement="auto"
                                delay={{ show: 0, hide: 1000 }}
                              >
                                <Badge className="badge-link" bg="primary"><MdOutlineSpeakerNotes size={20} /></Badge>
                              </OverlayTrigger>
                            </>
                            :
                            <>
                              <Badge className="badge-limpio" bg="primary" style={{ color: "gray" }}><MdOutlineSpeakerNotes size={20} /></Badge>

                            </>}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

          </div>
        </>
      )}


    </>
  );
};

export default CertificadosPage;
