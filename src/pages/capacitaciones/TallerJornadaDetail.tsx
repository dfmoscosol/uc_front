import React, { useState, useEffect } from 'react';
import { FaCross, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { MdCheck, MdCheckCircle, MdMoreTime, MdOutlinePending } from 'react-icons/md';
import JORNADA from '../../assets/images/jornadas.png';
import { FiUserPlus } from 'react-icons/fi';
import { Carousel, Modal, Button, Toast } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';
import { formatDateString } from './Inscripciones.page';
import { HiInformationCircle } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { postInscripcion, postInscripcionReset } from '../../redux/capacitaciones/postInscripcion.slice';
import { ImSpinner } from 'react-icons/im';
import { RxCross2 } from "react-icons/rx";
import { getCapacitacion } from '../../redux/capacitaciones/getCapacitacion.slice';

const TallerJornadaEvent = ({ evento }) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { exito, isLoading } = useAppSelector((state) => state.postIncripcion);

  const handleInscribirse = () => {
    const formData = {
      evento_id: evento.id_jornada,
      taller_id: evento.id
    };
    dispatch(postInscripcion(formData));
  };

  useEffect(() => {
    if (exito !== null) {
      if (exito.estado) {
        setShowToast(true);
      } else {
        setShowErrorToast(true)
      }
      setShowModal(false);
      setTimeout(() => dispatch(postInscripcionReset()), 3000); // Reset the state after showing the toast
      dispatch(getCapacitacion(Number(evento.id_jornada),Number(evento.id))); // Reset the state after showing the toast
    }
  }, [exito, dispatch]);

  return (
    <>
     <div className="row justify-content-center align-items-stretch px-xl-5">
      <div className="container">
        <div className="row mb-2 justify-content-center">
          <div className="col-xl-7 col-lg-10 col-md-12">
              <div className="container">
                <div className="col-md-12 text-center">
                  <img src={JORNADA} alt="Evento" className="img-fluid event-image" />
                  <div className="row justify-content-center mb-4">
                    <div className="col-md-4">
                      <p className="event-info-img">
                        <span className="info-title-img"><FaGraduationCap /> Modalidad</span>
                        <span className="info-value-img">{evento.tipo_modalidad}</span>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="event-info-img">
                        <span className="info-title-img"><MdMoreTime /> Acredita</span>
                        <span className="info-value-img">{evento.horas_acreditadas} horas</span>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="event-info-img">
                        <span className="info-title-img"><FaUsers /> Cupos</span>
                        <span className="info-value-img">{evento.cupos}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-10 col-md-12">
            <div className="container mb-4">
                <p className="event-info-der">
                  <span className="info-title-der"><HiInformationCircle /> Sesiones</span>
                  <Carousel className="custom-carousel">
                    {evento.sesiones?.map((sesion, index) => (
                      <Carousel.Item key={index}>
                        <table className="table-custom mt-2 mb-4">
                          <tbody>
                            <tr>
                              <td className="font-weight-bold">Fecha:</td>
                              <td>{formatDateString(sesion.fecha)}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold">Modalidad:</td>
                              <td>{sesion.modalidad}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold">Ubicación:</td>
                              <td>{sesion.ubicacion}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold">Hora de Inicio:</td>
                              <td>{sesion.hora_inicio}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold">Duración:</td>
                              <td>{sesion.duracion} horas</td>
                            </tr>
                          </tbody>
                        </table>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </p>
              </div>
              <div className="container">
                <p className="event-info-der">
                  <span className="info-title-der"><BsPersonCircle /> Facilitadores</span>
                  <Carousel className="custom-carousel">
                    {evento.ponentes?.map((ponente, index) => (
                      <Carousel.Item key={index}>
                        <div className="ponente-slide">
                          <span className="info-charla">{ponente.nombre}</span>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </p>
              </div>
              <div className="container mt-4 px-5">
                <div className="row justify-content-center px-5">
                  {evento.aceptada === null ?
                    <button className="btn btn-primary" onClick={() => setShowModal(true)} disabled={isLoading}>
                      <FiUserPlus size={20} style={{ paddingRight: "5px" }} /> Inscribirse
                    </button> :
                    evento.aceptada === true ?
                      <button className="btn btn-success" disabled>
                        <MdCheckCircle size={20} style={{ paddingRight: "5px" }} /> Inscrito
                      </button> :
                      evento.aceptada === false ?
                        <button className="btn btn-secondary" disabled>
                          <MdOutlinePending size={20} style={{ paddingRight: "5px" }} /> Pendiente
                        </button> : <></>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Confirmar Inscripción</Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Cerrar"
            onClick={() => setShowModal(false)}
          />
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea inscribirse en este evento?</Modal.Body>
        <Modal.Footer >
          <button
            type="button"
            className="btn btn-modal boton-modal"
            aria-label="Cerrar"
            onClick={() => handleInscribirse()}
          >{isLoading ? <ImSpinner size={20} className='rotating' /> : <MdCheck style={{ marginRight: "10px" }} size={20} />}
            Confirmar</button>
          <button
            type="button"
            className="btn boton-modal"
            aria-label="Cerrar"
            onClick={() => setShowModal(false)}
          ><RxCross2 style={{ marginRight: "10px" }} size={20} />
            Cancelar</button>
        </Modal.Footer>
      </Modal>

      {/* Success Toast */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          bottom: 500,
          right: 20,
          minWidth: '250px',
          background: '#fff', // Color de fondo
          color: '#000', // Color del texto
          maxWidth: '300px', // Ancho máximo del Toast
        }}
      >
        <Toast.Header closeButton={false} style={{ background: '#157347', color: '#fff' }}>
          <strong className="me-auto">Inscripción Exitosa</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Cerrar"
            onClick={() => setShowToast(false)}
          />
        </Toast.Header>
        <Toast.Body>¡Te has inscrito correctamente en el evento!</Toast.Body>
      </Toast>

      {/* Error Toast */}

      <Toast

        onClose={() => setShowErrorToast(false)}
        show={showErrorToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          bottom: 500,
          right: 20,
          minWidth: '250px',
          background: '#fff', // Color de fondo
          color: '#000', // Color del texto
          maxWidth: '300px', // Ancho máximo del Toast
        }}
      >
        <Toast.Header closeButton={false} style={{ background: '#A51008', color: '#fff' }}>
          <strong className="me-auto">Error de Inscripción</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Cerrar"
            onClick={() => setShowErrorToast(false)}
          />
        </Toast.Header>
        <Toast.Body style={{background:'white'}}>Hubo un error al intentar inscribirse en el evento: {exito?.error}</Toast.Body>
      </Toast>
    </>
  );
};

export default TallerJornadaEvent;

