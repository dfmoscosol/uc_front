// components
import Header from "../../shared/header.component";
import { useEffect, useState,useRef } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {  getAsistencias } from "../../redux/capacitaciones/getAsistencias.slice";
import {  GiTeamIdea } from "react-icons/gi";
import { GrWorkshop } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher, FaCheckSquare } from "react-icons/fa";
import { Badge, Toast } from "react-bootstrap";
import { MdBlock, MdCheckCircle, MdOutlinePending } from "react-icons/md";
import {  RxCrossCircled } from "react-icons/rx";
import { postAsistencia, postAsistenciaReset } from "../../redux/capacitaciones/postAsistencia.slice";
import {  AsistenciaForm } from "../../data/interfaces/capacitaciones.model";
import { ImSpinner } from "react-icons/im";
import { removeRutaFromLocalStorage, removeUserFromLocalStorage } from "../../services/persistUser.service";
const AsistenciaPage = (): JSX.Element => {
  // local variables
  const { data: asistencias } = useAppSelector((state) => state.asistencia);
  const { exito, isLoading } = useAppSelector((state) => state.post_asistencia);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const toastRefSuccess = useRef<HTMLDivElement>(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // constants
  const {
    asistencia: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const dispatch = useAppDispatch();

  useEffect(() => {
    removeRutaFromLocalStorage()
    dispatch(getAsistencias())
    if (exito==true) {
      setShowSuccessAlert(true)
      dispatch(postAsistenciaReset())
    }else if(exito==false){
      setShowErrorAlert(true)
      dispatch(postAsistenciaReset())
    }
  }, [dispatch, exito]);

  const handleCloseSuccess = () => {
    setShowSuccessAlert(false)
  };

  const handleCloseError = () => {
    setShowErrorAlert(false)
  };

  const handleMarcar = (column, id) => {
    const form: AsistenciaForm = {
      column: column,
      id_asistencia: id,
      value: true
    }
    dispatch(postAsistencia(form))
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

          <div className="row justify-content-center align-items-stretch pt-3" >
            {
              asistencias?.map(
                (asistencia): JSX.Element => (
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 pb-3">
                    <div className="card-capacitacion text-center d-flex flex-column h-100" >
                      <div className="card-header">
                        {asistencia.tipo === 'jornada' ? <GiTeamIdea style={{ marginRight: "10px" }}></GiTeamIdea> :
                          asistencia.tipo === 'taller' ? <GrWorkshop style={{ marginRight: "10px" }}></GrWorkshop> :
                            asistencia.tipo === 'observacion' ? <SiGoogleclassroom style={{ marginRight: "10px" }}></SiGoogleclassroom> :
                              asistencia.tipo === 'charla' ? <FaChalkboardTeacher style={{ marginRight: "10px" }}></FaChalkboardTeacher> : <></>
                        }
                        {asistencia.tipo === 'jornada' ? 'Jornada de Innovación' :
                          asistencia.tipo === 'taller' ? 'Taller' :
                            asistencia.tipo === 'observacion' ? 'Observación Áulica' : 'Charla'
                        }
                      </div>
                      <div className="card-body d-flex flex-column flex-fill justify-content-around">
                        <h5 className="card-title">{asistencia.tipo == 'jornada' ? asistencia.nombre_capacitacion + ': ' + asistencia.nombre_taller : asistencia.nombre_capacitacion}</h5>
                        {!asistencia.asiste_entrada && !asistencia.asiste_salida ?
                          <>
                            {asistencia.allow_asistencia_entrada ?
                              <>
                                <Badge className="mb-2 badge-bloqueado" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Entrada</Badge>
                                <Badge className="mb-2 badge-bloqueado" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Salida</Badge>
                                <button className="btn btn-primary" onClick={() => handleMarcar('asiste_entrada', asistencia.id_asistencia)} disabled={isLoading}
                                >{isLoading ? <ImSpinner size={20} className='rotating' /> : <FaCheckSquare style={{ marginRight: "5px" }} size={20} />} Marcar Entrada</button>
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
      {showSuccessAlert && (
        <div
          ref={toastRefSuccess}
          style={{
            position: 'absolute',
            top: 20, // Puedes ajustar esta posición para que se muestre donde desees
            right: 20, // Puedes ajustar esta posición para que se muestre donde desees
            zIndex: 1,
          }}
        >
          <Toast style={{
            background: '#fff', // Color de fondo
            color: '#000', // Color del texto
            maxWidth: '300px', // Ancho máximo del Toast
          }} show={showSuccessAlert} delay={6000} onClose={handleCloseSuccess} autohide>
            <Toast.Header closeButton={false} style={{ background: '#157347', color: '#fff' }}>
              <strong className="me-auto">Éxito</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Cerrar"
                onClick={handleCloseSuccess}
              />
            </Toast.Header>
            <Toast.Body>
              Asistencia registrada correctamente.
            </Toast.Body>
          </Toast>
        </div>
      )}
      {showErrorAlert && (
        <div
          ref={toastRefSuccess}
          style={{
            position: 'absolute',
            top: 20, // Puedes ajustar esta posición para que se muestre donde desees
            right: 20, // Puedes ajustar esta posición para que se muestre donde desees
            zIndex: 1,
          }}
        >
          <Toast style={{
            background: '#fff', // Color de fondo
            color: '#000', // Color del texto
            maxWidth: '300px', // Ancho máximo del Toast
          }} show={showErrorAlert} onClose={handleCloseError} autohide delay={6000}>
            <Toast.Header closeButton={false} style={{ background: '#A51008', color: '#fff' }}>
              <strong className="me-auto">Error</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Cerrar"
                onClick={handleCloseError}
              />
            </Toast.Header>
            <Toast.Body>
              No se pudo registrar la asistencia.
            </Toast.Body>
          </Toast>
        </div>
      )}

    </>
  );
};

export default AsistenciaPage;
