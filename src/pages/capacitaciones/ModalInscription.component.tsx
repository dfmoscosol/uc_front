import { Modal, Button, Badge } from 'react-bootstrap';
import { RxCheck, RxCross2 } from "react-icons/rx";

import { Capacitacion } from '../../data/interfaces/capacitaciones.model';
import { postInscripcion } from '../../redux/capacitaciones/postInscripcion.slice';
import { useAppSelector } from '../../hooks/reduxHooks';
import { ImSpinner } from 'react-icons/im';


const ModalComponentInscripcion = ({ dispatch, capacitacion, onClose }: {
    dispatch: any;
    capacitacion: Capacitacion;
    onClose: any;
}) => {
    const { isLoading } = useAppSelector((state) => state.post_inscripcion)

    const handleSubmit = () => {
        dispatch(postInscripcion(
            {
                id_capacitacion: capacitacion.id_capacitacion,
                id_taller: capacitacion.id_taller
            }
        ))
        onClose()
    }

    return (
        <Modal show={true} backdrop="static" keyboard={false} onHide={onClose} centered>
            <Modal.Header >
                <Modal.Title>Confirmar Inscripción</Modal.Title>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Cerrar"
                    onClick={onClose}
                />
            </Modal.Header>
            <Modal.Body>
                {capacitacion.tipo === 'jornada' ?
                    <ul className='text-center' style={{ listStyleType: "none", padding: "0" }}>
                        <li><b>{capacitacion.nombre}</b></li>
                        <li><b>{capacitacion.nombre_taller}</b></li><br></br>
                        <li><b>Este taller se llevará a cabo los días:</b></li>
                        {capacitacion.fechas.map(
                            (fecha): JSX.Element => (<li>• {fecha}</li>)
                        )}<br></br>
                        <li><b>Modalidad: </b>{capacitacion.presencial ? 'Presencial' : 'Virtual'}</li><br></br>
                        <li>{capacitacion.presencial ? <><b>Lugar: </b> {capacitacion.direccion}</> : <>Una vez inscrito se compartirá el enlace</>}</li><br></br>
                        <li><b>No se podrá inscribir en otro taller de esta jornada</b></li>
                    </ul> :
                    capacitacion.tipo === 'taller' ?
                        <ul className='text-center' style={{ listStyleType: "none", padding: "0" }}>
                            <li><b>{capacitacion.nombre}</b></li><br></br>
                            <li><b>Este taller se llevará a cabo los días:</b></li>
                            {capacitacion.fechas.map(
                                (fecha): JSX.Element => (<li>• {fecha}</li>)
                            )}<br></br>
                            <li><b>Modalidad: </b>{capacitacion.presencial ? 'Presencial' : 'Virtual'}</li><br></br>
                            <li>{capacitacion.presencial ? <><b>Lugar: </b> {capacitacion.direccion}</> : <>Una vez inscrito se compartirá el enlace</>}</li><br></br>
                        </ul> :
                        capacitacion.tipo === 'observacion' ?
                            <ul className='text-center' style={{ listStyleType: "none", padding: "0" }}>
                                <li><b>{capacitacion.nombre}</b></li>
                            </ul> :
                            capacitacion.tipo === 'charla' ?
                                <ul className='text-center' style={{ listStyleType: "none", padding: "0" }}>
                                    <li><b>{capacitacion.nombre}</b></li><br></br>
                                    <li><b>Esta charla se llevará a cabo el día:</b></li>
                                    {capacitacion.fechas.map(
                                        (fecha): JSX.Element => (<li>• {fecha}</li>)
                                    )}<br></br>
                                    <li><b>Modalidad: </b>{capacitacion.presencial ? 'Presencial' : 'Virtual'}</li><br></br>
                                    <li>{capacitacion.presencial ? <><b>Lugar: </b> {capacitacion.direccion}</> : <>Una vez inscrito se compartirá el enlace</>}</li><br></br>
                                </ul> : <></>
                }

                <p className='text-center'><b>¿Desea confirmar la inscripción?</b></p>
                <div className="row justify-content-center ">

                    <button className="btn-confirm" onClick={handleSubmit}>
                    {isLoading ? <ImSpinner className='rotating' /> : <RxCheck />}</button>
                    <button className="btn-reject" onClick={onClose}>{<RxCross2></RxCross2>}</button>
                </div>

            </Modal.Body>


        </Modal>
    );
};

export default ModalComponentInscripcion;