// components
import Header from "../../shared/header.component";
import { useEffect, useState } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { AsistenciasGetAllReset, getAsistencias } from "../../redux/capacitaciones/getAsistencias.slice";
import { GiTeamIdea } from "react-icons/gi";
import { GrWorkshop } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher, FaCheckSquare } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import { MdBlock, MdCheckCircle, MdOutlinePending } from "react-icons/md";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
const AsistenciaPage = (): JSX.Element => {
  // local variables
  const { data: asistencias } = useAppSelector((state) => state.asistencia);

  // constants
  const {
    asistencia: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(AsistenciasGetAllReset())
    dispatch(getAsistencias())
  }, [dispatch]);

  const handleMarcar = (capacitacion) => {
  };
  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
      </div>
      {asistencias.length === 0 ? (
        <>
          <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
            <div className="col-4">
              <Loader></Loader>
            </div>
          </div>
        </>
      ) : (
        <>

          <div className="row justify-content-center align-items-stretch pt-2" >
            {
              asistencias?.map(
                (asistencia): JSX.Element => (
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 pb-3">
                    <div className="card-capacitacion text-center d-flex flex-column h-100" >
                      <div className="card-header">
                        {asistencia.tipo === 'Jornada' ? <GiTeamIdea style={{ marginRight: "10px" }}></GiTeamIdea> :
                          asistencia.tipo === 'Taller' ? <GrWorkshop style={{ marginRight: "10px" }}></GrWorkshop> :
                            asistencia.tipo === 'Observación Aulica' ? <SiGoogleclassroom style={{ marginRight: "10px" }}></SiGoogleclassroom> :
                              asistencia.tipo === 'Charla' ? <FaChalkboardTeacher style={{ marginRight: "10px" }}></FaChalkboardTeacher> : <></>
                        }
                        {asistencia.tipo === 'Jornada' ? 'Jornada de Innovación' : asistencia.tipo}
                      </div>
                      <div className="card-body d-flex flex-column flex-fill justify-content-around">
                        <h5 className="card-title">{asistencia.nombre}</h5>
                        {!asistencia.asiste_entrada && !asistencia.asiste_salida ?
                          <>
                            {asistencia.allow_asistencia_entrada ?
                              <>
                                <Badge className="mb-2 badge-bloqueado" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Entrada</Badge>
                                <Badge className="mb-2 badge-bloqueado" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Salida</Badge>
                                <button className="btn btn-primary" onClick={() => handleMarcar}><FaCheckSquare size={20} style={{ paddingRight: "5px" }} /> Marcar Entrada</button>
                              </>
                              :
                              <>
                                {asistencia.allow_asistencia_salida ?
                                  <>
                                    <Badge className="mb-2 badge-sin-cupos" bg="primary"><RxCrossCircled size={20} style={{ paddingRight: "5px" }} />Entrada</Badge>
                                    <Badge className="mb-2 badge-bloqueado" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Salida</Badge>
                                    <button disabled className="btn btn-primary" onClick={() => handleMarcar}><MdBlock size={20} style={{ paddingRight: "5px" }} /> Marcar Salida</button>
                                  </>
                                  :
                                  <>
                                    <Badge className="mb-2 badge-bloqueado" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Entrada</Badge>
                                    <Badge className="mb-2 badge-bloqueado" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Salida</Badge>
                                    <button disabled className="btn btn-primary" onClick={() => handleMarcar}><MdBlock size={20} style={{ paddingRight: "5px" }} /> Marcar Entrada</button>
                                  </>
                                }
                              </>
                            }
                          </>
                          :
                          <>
                            {asistencia.asiste_entrada && !asistencia.asiste_salida ?
                              <>
                                <Badge className="mb-2 badge-inscrito" bg="primary"><MdCheckCircle size={20} style={{ paddingRight: "5px" }} />Entrada</Badge>
                                <Badge className="mb-2 badge-bloqueado" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Salida</Badge>
                                {asistencia.allow_asistencia_salida ?
                                  <button className="btn btn-primary" onClick={() => handleMarcar}><FaCheckSquare size={20} style={{ paddingRight: "5px" }} /> Marcar Salida</button>
                                  :
                                  <button disabled className="btn btn-primary" onClick={() => handleMarcar}><MdBlock size={20} style={{ paddingRight: "5px" }} /> Marcar Salida</button>
                                }
                              </>
                              :
                              <>
                                {asistencia.asiste_entrada && asistencia.asiste_salida ?
                                  <>
                                    <Badge className="mb-2 badge-inscrito" bg="primary"><MdCheckCircle size={20} style={{ paddingRight: "5px" }} />Entrada</Badge>
                                    <Badge className="mb-2 badge-inscrito" bg="primary"><MdCheckCircle size={20} style={{ paddingRight: "5px" }} />Salida</Badge>
                                  </>
                                  :
                                  <>
                                  </>
                                }
                              </>
                            }
                          </>
                        }
                      </div>
                      <div className="card-footer text-muted">
                        <b>Fecha: </b>{asistencia.fecha}
                      </div>
                    </div>
                  </div>
                )
              )
            }


          </div>

        </>
      )}


    </>
  );
};

export default AsistenciaPage;
