import { FaGraduationCap, FaUsers } from 'react-icons/fa';
import { MdBlock, MdCheckCircle, MdMoreTime, MdOutlinePending } from 'react-icons/md';
import Observacion from '../../assets/images/observacion.png';
import { FiUserPlus } from 'react-icons/fi';
import { HiInformationCircle } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { formatDateString } from './Inscripciones.page';
import DynamicFormModal from './DynamicModal';
import { Toast } from 'react-bootstrap';
import { postInscripcion, postInscripcionReset } from '../../redux/capacitaciones/postInscripcion.slice';
import { getCapacitacion } from '../../redux/capacitaciones/getCapacitacion.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { ObservacionForm } from '../../data/interfaces/capacitaciones.model';

const ObservacionEvent = ({ evento }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { exito, isLoading } = useAppSelector((state) => state.postIncripcion);

  const handleInscripcion = (data: any) => {
    data.evento_id=evento.id
    data.anios_ejercicio=Number(data.anios_ejercicio)
    data.carrera_id=Number(data.carrera_id)
    data.ciclo_carrera=Number(data.ciclo_carrera)
    data.duracion_clase=Number(data.duracion_clase)
    data.facultad_id=Number(data.facultad_id)    
    data.numero_estudiantes=Number(data.numero_estudiantes)
    data.inclusion = (typeof data.inclusion === "string" && data.inclusion === "si") ? true : false;
    /* data.anios_ejercicio=Number(data.anios_ejercicio)
    data.anios_ejercicio=Number(data.anios_ejercicio)
    data.anios_ejercicio=Number(data.anios_ejercicio) */
    console.log("Datos del formulario", data);
    
    dispatch(postInscripcion(data));
    // Aquí puedes hacer la lógica para enviar la inscripción con los datos del formulario al backend.
  };

  useEffect(() => {
    if (exito !== null) {
      if (exito.estado) {
        setShowToast(true);
      } else {
        setShowErrorToast(true)
        console.log(exito?.error)
      }
      setShowModal(false);
      setTimeout(() => dispatch(postInscripcionReset()), 3000); // Reset the state after showing the toast
      dispatch(getCapacitacion(Number(evento.id))); // Reset the state after showing the toast
    }
  }, [exito, dispatch]);

  return (
    <>
      <div className="row justify-content-center align-items-stretch px-xl-5">
        <div className="col-xl-7 col-lg-10 col-md-12">
          <div className="container">
            <div className="col-md-12 text-center">
              <img src={Observacion} alt="Evento" className="img-fluid event-image" />
              <div className="row justify-content-center mb-4">
                <div className="col-md-4">
                  <p className="event-info-img">
                    <span className="info-title-img">
                      <FaGraduationCap /> Inicia
                    </span>
                    <span className="info-value-img">{formatDateString(evento.fechas[0].fecha)}</span>
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="event-info-img">
                    <span className="info-title-img">
                      <MdMoreTime /> Acredita
                    </span>
                    <span className="info-value-img">{evento.horas_acreditadas} horas</span>
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="event-info-img">
                    <span className="info-title-img">
                      <FaUsers /> Cupos
                    </span>
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
              <span className="info-title-der">
                <HiInformationCircle /> Información
              </span>
              <div className="container mt-2">
                <p className="event-info-desc"> {evento.descripcion} </p>
              </div>
            </p>
          </div>

          <div className="container mb-4 px-5">
            <div className="row justify-content-center px-5">
            {evento.cupos > 0 ? (
                <>
                  {evento.aceptada === null ?
                    <button className="btn btn-primary boton-modal" onClick={() => setShowModal(true)} disabled={isLoading}>
                      <FiUserPlus size={20} style={{ paddingRight: "5px" }} /> Inscribirse
                    </button> :
                    evento.aceptada === true ?
                      <button className="btn btn-success boton-modal" disabled>
                        <MdCheckCircle size={20} style={{ paddingRight: "5px" }} /> Inscrito
                      </button> :
                      evento.aceptada === false ?
                        <button className="btn btn-secondary boton-modal" disabled>
                          <MdOutlinePending size={20} style={{ paddingRight: "5px" }} /> Pendiente
                        </button> : <></>
                  }
                </>
              ) : (
                <>
                  <button className="btn btn-secondary boton-modal" disabled>
                    <MdBlock size={20} style={{ paddingRight: "5px" }} /> No hay cupos
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal con el formulario */}
      <DynamicFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        evento={evento}
        handleInscripcion={handleInscripcion}
      />
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
        <Toast.Body style={{ background: 'white' }}>Hubo un error al intentar inscribirse en el evento: {exito?.error}</Toast.Body>
      </Toast>
    </>
  );
};

export default ObservacionEvent;
