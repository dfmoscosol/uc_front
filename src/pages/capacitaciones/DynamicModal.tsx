import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { HiInformationCircle } from 'react-icons/hi';
import { ObservacionForm } from '../../data/interfaces/capacitaciones.model';
import { MdAdd, MdCalendarMonth, MdCheck, MdClass, MdOutlineAutoDelete, MdOutlineDelete, MdPerson } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getFacus } from '../../redux/encuesta/getFacultades.slice';
import { getCarreras } from '../../redux/encuesta/getCarreras.slice';
import { RxCross2 } from 'react-icons/rx';
import { ImSpinner } from 'react-icons/im';
import { FaSave } from 'react-icons/fa';

const DynamicFormModal: React.FC<any> = ({ show, handleClose, evento, handleInscripcion }) => {
    const dispatch = useAppDispatch();
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<ObservacionForm>({
        defaultValues: {
            horariosDisponibles: [{ dia: '', hora_inicio: '', hora_fin: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'horariosDisponibles'
    });


    const { lista: facultades, loading: loadingFacultades, error: errorFacultades } = useAppSelector(state => state.facus);
    const { lista: carreras, loading: loadingCarreras, error: errorCarreras } = useAppSelector(state => state.carreras);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false); // Estado para la modal de confirmación
    const [formData, setFormData] = useState<ObservacionForm | null>(null); // Almacenar datos del formulario

    // Observa el campo 'facultad' y 'carrera'
    const selectedFacultad = watch('facultad_id');

    useEffect(() => {
        // Despacha la acción para obtener las facultades
        dispatch(getFacus());
    }, [dispatch]);

    useEffect(() => {
        if (selectedFacultad) {
            // Despacha la acción para obtener las carreras según la facultad seleccionada
            dispatch(getCarreras(Number(selectedFacultad)));
        }
    }, [dispatch, selectedFacultad]);


    const onSubmit: SubmitHandler<ObservacionForm> = (data) => {
        // Almacena los datos y abre la modal de confirmación
        setFormData(data);
        setShowConfirmModal(true);
    };

    const confirmInscripcion = () => {
        if (formData) {
            handleInscripcion(formData); // Realiza la inscripción final
        }
        setShowConfirmModal(false);
        handleClose(); // Cierra ambos modales después de la confirmación
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered size='lg'>
                <Modal.Header>
                    <Modal.Title>Encuesta de Inscripción</Modal.Title>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label="Cerrar"
                        onClick={handleClose}
                    />
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        {/* Sección de Información del Docente */}
                        <p className="event-info-der mb-4 mx-4">
                            <span className="info-title-der">
                                <MdPerson /> Información del Docente
                            </span>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Celular</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            {...register('numero_celular', {
                                                required: true,
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "El número debe tener exactamente 10 dígitos"
                                                }
                                            })}
                                            isInvalid={!!errors.numero_celular}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.numero_celular?.message || "Este campo es obligatorio"}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Años de Ejercicio</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('anios_ejercicio',
                                                {
                                                    required: true,
                                                    min: {
                                                        value: 0,
                                                        message: "El valor no puede ser menor que 0"
                                                    },
                                                    max: {
                                                        value: 100,
                                                        message: "El valor no puede ser mayor que 100"
                                                    }
                                                }
                                            )}
                                            isInvalid={!!errors.anios_ejercicio}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.anios_ejercicio?.message || "Este campo es obligatorio"}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </p>


                        {/* Sección de Información de Clase */}
                        <p className="event-info-der mb-4 mx-4">
                            <span className="info-title-der">
                                <SiGoogleclassroom /> Información de la Clase
                            </span>

                            <Row className="mt-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Facultad</Form.Label>
                                        <Form.Select
                                            isInvalid={!!errors.facultad_id}
                                            {...register('facultad_id', { required: true })}
                                        >
                                            <option value="">Seleccione</option>
                                            {facultades.map(fac => (
                                                <option key={fac.id_facultad} value={fac.id_facultad}>{fac.nombre}</option>
                                            ))}
                                        </Form.Select>
                                        {errors.facultad_id && <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Carrera</Form.Label>
                                        <Form.Select {...register('carrera_id', { required: true })} isInvalid={!!errors.carrera_id}>
                                            <option value="">Seleccione</option>
                                            {carreras.map(car => (
                                                <option key={car.id_carrera} value={car.id_carrera}>{car.nombre}</option>
                                            ))}
                                        </Form.Select>
                                        {errors.carrera_id && <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Asignatura</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('asignatura', {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "El texto no puede tener más de 100 caracteres"
                                                }
                                            })}
                                            isInvalid={!!errors.asignatura}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.asignatura?.message || "Este campo es obligatorio"}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Ciclo</Form.Label>
                                        <Form.Select isInvalid={!!errors.ciclo_carrera} {...register('ciclo_carrera', { required: true })}>
                                            <option value="">Seleccione</option>

                                            {[...Array(10).keys()].map(i => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </Form.Select>
                                        {errors.ciclo_carrera && <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nro. Estudiantes</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('numero_estudiantes',
                                                {
                                                    required: true,
                                                    min: {
                                                        value: 0,
                                                        message: "El valor no puede ser menor que 0"
                                                    },
                                                    max: {
                                                        value: 100,
                                                        message: "El valor no puede ser mayor que 100"
                                                    }
                                                }
                                            )}
                                            isInvalid={!!errors.numero_estudiantes}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.numero_estudiantes?.message || "Este campo es obligatorio"}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Campus</Form.Label>
                                        <Form.Select isInvalid={!!errors.campus} {...register('campus', { required: true })}>
                                            <option value="">Seleccione</option>
                                            <option value="Campus Central">Campus Central</option>
                                            <option value="Campus Paraíso">Campus Paraíso</option>
                                            <option value="Campus Balzay">Campus Balzay</option>
                                            <option value="Campus Yanuncay">Campus Yanuncay</option>
                                            <option value="Campus Centro Histórico">Campus Centro Histórico</option>
                                            <option value="Clases Virtuales">Clases Virtuales</option>
                                        </Form.Select>
                                        {errors.campus && <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Duración (minutos)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('duracion_clase',
                                                {
                                                    required: true,
                                                    min: {
                                                        value: 0,
                                                        message: "El valor no puede ser menor que 0"
                                                    },
                                                    max: {
                                                        value: 180,
                                                        message: "El valor no puede ser mayor que 180"
                                                    }
                                                }
                                            )}
                                            isInvalid={!!errors.duracion_clase}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.duracion_clase?.message || "Este campo es obligatorio"}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Estudiantes con necesidades de inclusión</Form.Label>
                                        <Form.Select isInvalid={!!errors.inclusion} {...register('inclusion', { required: true })}>
                                            <option value="">Seleccione</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                        </Form.Select>
                                        {errors.inclusion && <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </p>


                        {/* Sección de Horarios Disponibles */}
                        <p className="event-info-der mb-4 mx-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="info-title-der">
                                    <MdCalendarMonth /> Horarios de la Clase
                                </span>
                                <Button className="boton-modal" variant="primary" onClick={() => append({ dia: '', hora_inicio: '', hora_fin: '' })}>
                                    <MdAdd /> Agregar Horario
                                </Button>
                            </div>
                            {fields.map((field, index) => (
                                <Row key={field.id} className='mt-3 '>
                                    <Col xs={4}>
                                        <Form.Group>
                                            <Form.Label>Día</Form.Label>
                                            <Form.Select isInvalid={!!errors.horariosDisponibles?.[index]?.dia} {...register(`horariosDisponibles.${index}.dia`, { required: true })}>
                                                <option value="">Seleccione</option>
                                                <option value="Lunes">Lunes</option>
                                                <option value="Martes">Martes</option>
                                                <option value="Miércoles">Miércoles</option>
                                                <option value="Jueves">Jueves</option>
                                                <option value="Viernes">Viernes</option>
                                            </Form.Select>
                                            {errors.horariosDisponibles?.[index]?.dia && (
                                                <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group>
                                            <Form.Label>Hora Inicio</Form.Label>
                                            <Form.Control type="time" isInvalid={!!errors.horariosDisponibles?.[index]?.hora_inicio} {...register(`horariosDisponibles.${index}.hora_inicio`, { required: true })} />
                                            {errors.horariosDisponibles?.[index]?.hora_inicio && (
                                                <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group>
                                            <Form.Label>Hora Fin</Form.Label>
                                            <Form.Control type="time" isInvalid={!!errors.horariosDisponibles?.[index]?.hora_fin} {...register(`horariosDisponibles.${index}.hora_fin`, { required: true })} />
                                            {errors.horariosDisponibles?.[index]?.hora_fin && (
                                                <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} className=" px-1 d-flex justify-content-center align-items-center">
                                        {index > 0 ? <Button className="boton-modal" variant="danger" onClick={() => remove(index)}><MdOutlineAutoDelete size={"20px"} /></Button> : <></>}
                                    </Col>
                                </Row>
                            ))}

                        </p>

                        {/* Sección de Comentarios */}
                        <p className="event-info-der mx-4">
                            <span className="info-title-der">
                                <HiInformationCircle /> Comentarios
                            </span>
                            <Form.Group className="mt-4">
                                <Form.Control
                                    as="textarea" rows={3}
                                    {...register('comentarios', {
                                        maxLength: {
                                            value: 200,
                                            message: "El texto no puede tener más de 200 caracteres"
                                        }
                                    })}
                                    isInvalid={!!errors.comentarios}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.comentarios?.message || "Este campo es obligatorio"}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </p>

                        <Modal.Footer>
                            <Button className="boton-modal" variant="primary" type="submit"><FaSave size={20} style={{ paddingRight: '5px' }} /> Enviar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal de Confirmación */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar Inscripción</Modal.Title>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label="Cerrar"
                        onClick={() => setShowConfirmModal(false)}
                    />
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de que desea inscribirse en este evento?
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-modal boton-modal"
                        onClick={confirmInscripcion}
                    > <MdCheck style={{ marginRight: "10px" }} size={20} />
                        Confirmar</button>
                    <button
                        type="button"
                        className="btn boton-modal"
                        onClick={() => setShowConfirmModal(false)}
                    ><RxCross2 style={{ marginRight: "10px" }} size={20} />
                        Cancelar</button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DynamicFormModal;
