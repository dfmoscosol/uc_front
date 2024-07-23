import Header from "../../shared/header.component";
import { useEffect, useState, useRef } from "react";
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { CapacitacionesOpenGetAllReset, getCapacitacionesOpen } from "../../redux/capacitaciones/getOpenCapacitaciones";
import { GiTeamIdea } from "react-icons/gi";
import { GrWorkshop } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPersonVideo3 } from "react-icons/bs";
import { MdOutlineAccessTime, MdCalendarMonth, MdPeopleOutline, MdComputer, MdCheckCircle, MdOutlinePending } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import INTERNAL_ROUTES from "../../data/constants/internalRoutes";
import { CapacitacionGetOneReset } from "../../redux/capacitaciones/getCapacitacion.slice";

export function formatDateString(dateString: string): string {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const [day, month, year] = dateString.split("-");

  const formattedDate = `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  return formattedDate;
}

const InscripcionesPage = (): JSX.Element => {
  // local variables
  const { eventos } = useAppSelector((state) => state.eventos);

  // constants
  const {
    inscripciones: { pageTitle },
  } = BREADCRUMBS_ITEMS;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(CapacitacionGetOneReset())
    dispatch(getCapacitacionesOpen())
  }, [dispatch]);

  const handleOpenEvent = (evento): void => {
    if (evento.tipo === 1){
      navigate(`${INTERNAL_ROUTES.INSCRIPCIONES}/${evento.id_jornada}/${evento.id}`)
    }else{
      navigate(`${INTERNAL_ROUTES.INSCRIPCIONES}/${evento.id}`)
    }
  };

  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
        {eventos.length === 0 ? (
          <>
            <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
              <div className="col-4">
                <Loader></Loader>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row justify-content-center align-items-stretch px-5">
              {eventos?.map((evento): JSX.Element => (
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-10 col-xs-12 pb-4">
                  <div className="card-capacitacion text-center d-flex flex-column h-100" onClick={()=>handleOpenEvent(evento)}>
                    <div className="card-header">
                      <>
                        {evento.tipo === 1 ? <><GiTeamIdea style={{ marginRight: "10px" }} />Jornada de Innovación</> :
                          evento.tipo === 3 ? <><GrWorkshop style={{ marginRight: "10px" }} />Microtaller</> :
                            evento.tipo === 4 ? <><SiGoogleclassroom style={{ marginRight: "10px" }} />Observación Áulica</> :
                              evento.tipo === 2 ? <><FaChalkboardTeacher style={{ marginRight: "10px" }} />Charla</> : <></>
                        }
                      </>
                    </div>

                    <div className="card-body d-flex flex-column flex-fill justify-content-around">
                      <h5 className="card-title">
                        {evento.tipo === 1 ? `${evento.nombre_jornada}: ${evento.nombre}` : evento.nombre}
                      </h5>
                      <div className="row justify-content-center align-items-center mt-2">
                        <div className="col-auto d-flex align-items-center">
                          {evento.tipo !== 4 ? <>
                            <MdOutlineAccessTime className="me-2" />
                            <div>{evento.horas} Horas</div>
                          </> : <>
                            <MdOutlineAccessTime className="me-2" />
                            <div>{evento.periodo}</div>
                          </>}

                        </div>
                      </div>
                      <div className="row justify-content-center align-items-center mt-2">
                        <div className="col-auto d-flex align-items-center">
                          <MdCalendarMonth className="me-2" />
                          <div>{formatDateString(evento.fechas[0].fecha)}</div>
                        </div>
                      </div>
                      <div className="row justify-content-center align-items-center mt-2">
                        <div className="col-auto d-flex align-items-center">
                          {evento.tipo_modalidad === "Presencial" ? <MdPeopleOutline className="me-2" /> :
                            evento.tipo_modalidad === "Virtual" ? <MdComputer className="me-2" /> :
                              evento.tipo_modalidad === "Híbrida" ? <BsPersonVideo3 className="me-2" /> : <></>
                          }
                          <div>{evento.tipo_modalidad}</div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-muted">
                      {evento.aceptada === null ?
                        <button className="btn btn-primary" onClick={() => console.log(evento.id)}>
                          <FiUserPlus size={20} style={{ paddingRight: "5px" }} /> Inscribirse
                        </button> :
                        evento.aceptada === true ?
                          <Badge className="badge-inscrito" bg="primary">
                            <MdCheckCircle size={20} style={{ paddingRight: "5px" }} /> Inscrito
                          </Badge> :
                          evento.aceptada === false ?
                            <Badge className="badge-pendiente" bg="primary">
                              <MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Pendiente
                            </Badge> : <></>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </>
        )}
      </div>

    </>
  );
};

export default InscripcionesPage;
