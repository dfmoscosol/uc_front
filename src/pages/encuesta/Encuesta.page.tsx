import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../shared/header.component";
// redux
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Select from "react-select"
import Loader from "../../shared/loader.component";
import { SubmitHandler, useForm } from "react-hook-form";
import { EncuestaForm, Puntaje } from "../../data/interfaces/encuesta.model";
import { getFacultadesReset, getFacus } from "../../redux/encuesta/getFacultades.slice";
import { getCarreras, getCarrerasReset } from "../../redux/encuesta/getCarreras.slice";
import { getPreguntas, getPreguntasReset } from "../../redux/encuesta/getPreguntas.slice";
import { postPreguntas, postPreguntasReset } from "../../redux/encuesta/postRespuesta.slice";
import { getUserFromLocalStorage } from "../../services/persistUser.service";
import { Toast } from "react-bootstrap";
import encuestaRealizada from "../../assets/images/encuesta.png";
import { validateEncuesta, validateEncuestaReset } from "../../redux/encuesta/validateEncuesta.slice";
import { getResultadosReset } from "../../redux/resultados/getResultados.slice";
import { getPeriodosReset } from "../../redux/resultados/getPeriodos.slice";
import { FaSave } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";


const EncuestaPage = (): JSX.Element => {
  // local variables
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // constants
  const {
    encuesta: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EncuestaForm>();

  const { data: dataFacus } = useAppSelector((state) => state.facus)
  const { data: dataCarreras } = useAppSelector((state) => state.carreras)
  const { encuesta } = useAppSelector((state) => state.encuesta)
  const { exito, isLoading } = useAppSelector((state) => state.save_encuesta)
  const { num_preguntas, data: dataPreguntas } = useAppSelector((state) => state.preguntas)
  const [secondSelectOptions, setSecondSelectOptions] = useState<{ value: string; label: string; }[]>([]);
  const [selectFacultad, setselectFacultad] = useState(0);
  const [selectCarrera, setselectCarrera] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(Array(80).fill(0));
  const [errorPreguntas, setErrorPreguntas] = useState(Array(80).fill(false));
  const [errorSelectCarrera, setErrorSelectCarrera] = useState(false);
  const [errorSelectFacu, setErrorSelectFacu] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const toastRefError = useRef<HTMLDivElement>(null);
  const toastRefSuccess = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(validateEncuestaReset())
    dispatch(getResultadosReset())
    dispatch(getPeriodosReset())
    dispatch(getFacultadesReset())
    dispatch(getCarrerasReset())
    dispatch(postPreguntasReset())
    dispatch(validateEncuesta(getUserFromLocalStorage()?.uid))
    dispatch(getFacus());
    dispatch(getPreguntas());
  }, [dispatch, exito]);

  const onSubmit: SubmitHandler<EncuestaForm> = ({
    cedula,

  }): void => {

    const puntajes: Puntaje[] = selectedNumber.map((num: number, index) => ({ id_pregunta: index + 1, puntaje: Number(num) }));
    if (selectFacultad === 0) {
      setErrorSelectFacu(true)
      setShowErrorAlert(true)
    }
    if (selectCarrera === 0) {
      setErrorSelectCarrera(true)
      setShowErrorAlert(true)
    }
    if (selectedNumber.includes(0) || selectedNumber.length != num_preguntas) {
      setErrorPreguntas(selectedNumber.map((num) => (num === 0)))
      setShowErrorAlert(true)
    }
    if (!selectedNumber.includes(0) && selectedNumber.length === num_preguntas && selectCarrera != 0 && selectFacultad != 0) {
      dispatch(postPreguntas(
        {
          cedula: cedula,
          id_carrera: selectCarrera,
          id_facultad: selectFacultad,
          puntajes: puntajes,
          uid_firebase_fk: getUserFromLocalStorage()?.uid
        }))
      setShowSuccessAlert(true)

    }
  };

  const handleFacultadSelectChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    dispatch(getCarreras(value))
    setselectFacultad(value)
    setErrorSelectFacu(false)
  };

  const handleCarreraSelectChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setselectCarrera(value)
    setErrorSelectCarrera(false)
  };

  const handleCloseError = () => {
    setShowErrorAlert(false)
  };

  const handleCloseSuccess = () => {
    setShowSuccessAlert(false)
  };

  useEffect(() => {
    setSecondSelectOptions(dataCarreras.map((elemento) => {
      return { value: elemento.id_carrera, label: elemento.nombre }
    }))
  }, [dataCarreras]);

  useEffect(() => {
    // Enfocar el elemento del toast cuando se muestre
    if (showSuccessAlert && toastRefSuccess.current) {
      toastRefSuccess.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [showSuccessAlert]);

  useEffect(() => {
    // Enfocar el elemento del toast cuando se muestre
    if (showErrorAlert && toastRefError.current) {
      toastRefError.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [showErrorAlert]);

  const handleNumberSelect = (event, index) => {
    const newArrayPuntaje = [...selectedNumber]; // Crear una copia del array
    newArrayPuntaje[index] = event.target.value; // Modificar el elemento deseado
    setSelectedNumber(newArrayPuntaje);

    const newArrayError = [...errorPreguntas];
    newArrayError[index] = false; // Modificar el elemento deseado
    setErrorPreguntas(newArrayError);

  };

  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3", }}><Header title={pageTitle} /></div>

      {dataPreguntas?.comunicativa.length === 0 || dataPreguntas?.gestion.length === 0 || dataPreguntas?.investigativa.length === 0 || dataPreguntas?.pedagogica.length === 0 || dataPreguntas?.tecnologica.length === 0 ? (
        <>
          <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
            <div className="col-6">
              <Loader></Loader>
            </div>
          </div>

        </>
      ) : (
        <>
          {encuesta ? (
            <>
              <div className="row justify-content-center" style={{ paddingTop: "5%", paddingBottom: "10%", background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
                <div className="col-6" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <img
                    style={{ borderRadius: "8px" }}
                    src={encuestaRealizada}
                    width="350"
                    alt="Cargando Contenido"
                  />
                </div>
              </div>

            </>
          ) : (
            <>

              <div className="row justify-content-center pb-4" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
                <div className="col-xl-8 col-sm-12">
                  <p style={{ textAlign: "justify", paddingInline: "10px" }}>El presente cuestionario tiene como objetivo evaluar la <b>comprensión</b>, el <b>uso</b> y la <b>aplicación</b> de las <b>Tecnologías de la Información y la Comunicación (TIC)</b> en el proceso educativo en relación a cinco competencias: Competencia Tecnológica, Competencia Pedagógica, Competencia Comunicativa, Competencia de Gestión y Competencia Investigativa. La información recopilada se utilizará como base para innovar las prácticas pedagógicas y lograr una educación de calidad con el apoyo de las TIC.</p>
                  <p style={{ textAlign: "justify", paddingInline: "10px" }}>Entiéndase como <b>competencia</b> al conjunto de conocimientos, habilidades, actitudes, comprensiones y disposiciones cognitivas, socioafectivas y psicomotoras apropiadamente relacionadas entre sí, para facilitar el desempeño efectivo y significativo de una actividad en contextos nuevos y desafiantes.</p>
                  <p style={{ textAlign: "justify", paddingInline: "10px" }}>La presente evaluacion es de carácter cualitativo por lo cual se emplea la siguiente escala de <b>likert</b>:</p>
                  <h6 className="text-center"><b>1</b> = Nada Competente</h6>
                  <h6 className="text-center"><b>2</b> = Poco Competente</h6>
                  <h6 className="text-center"><b>3</b> = Competente</h6>
                  <h6 className="text-center"><b>4</b> = Muy Competente</h6>
                  <h6 className="text-center"><b>5</b> = Totalmente Competente</h6>

                </div>
              </div>

              <br></br>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
                  <div className="row justify-content-center pt-4 pb-4">
                    <div className="col-xl-8 col-sm-12" style={{ paddingInlineStart: "30px" }}>
                      <label className="form-label">Cédula:</label>
                      <input
                        type="text"
                        {...register("cedula", {
                          required: true,
                          minLength: 10,
                        })}
                        className={`form-control form-control-sm ${errors.cedula && `is-invalid`
                          }`}
                        placeholder=""
                      />
                      {errors.cedula?.type === "required" && (
                        <label className="error">{`Este campo es obligatorio`}</label>

                      )}
                      {errors.cedula?.type === "minLength" && (
                        <label className="error">{`Este campo  debe tener al menos 10 dígitos`}</label>
                      )}
                    </div>
                  </div>

                  <div className="row justify-content-center pb-3">
                    <div className="col-xl-8 col-sm-12" style={{ paddingInlineStart: "30px" }}>
                      <label className="form-label">Facultad:</label>
                      <Select
                        placeholder="Elegir Facultad"
                        onChange={handleFacultadSelectChange}
                        options={dataFacus.map((elemento) => {
                          return { value: elemento.id_facultad, label: elemento.nombre } // Multiplicamos cada elemento por 2
                        })}
                      />
                      {errorSelectFacu! ? (<><label className="error">{`Este campo es obligatorio`}</label></>) : (<></>)}
                    </div>
                  </div>

                  <div className="row justify-content-center pb-3">
                    <div className="col-xl-8 col-sm-12" style={{ paddingInlineStart: "30px" }}>
                      <label className="form-label">Carrera:</label>
                      <Select
                        placeholder="Elegir Carrera"
                        onChange={handleCarreraSelectChange}
                        options={secondSelectOptions}
                      />
                      {errorSelectCarrera! ? (<><label className="error">{`Este campo es obligatorio`}</label></>) : (<></>)}
                    </div>
                  </div>
                </div>
                <br></br>
                <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
                  <div className="row justify-content-center pt-3 pb-3">
                    <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                      <h5>Competencia Investigativa</h5>
                      <p>Esta competencia se define como la capacidad de <b>utilizar las TIC para la transformación</b> del saber <b>y la generación</b> de nuevos conocimientos.</p>
                      <p>Documenta observaciones de su práctica con TIC.</p>
                    </div>
                  </div>
                  {dataPreguntas &&
                    dataPreguntas.investigativa.map(
                      (pregunta, index): JSX.Element => (
                        <>
                          <div className="row justify-content-center pb-3">
                            <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                              <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                              <div className="radio-group">
                                <label className="px-1 form-label">Nada Competente</label>
                                {[1, 2, 3, 4, 5].map((number) => (
                                  <label className="radio-label">
                                    <span className="number">{number}</span>
                                    <input
                                      type="radio"
                                      placeholder={number + ""}
                                      value={number}
                                      checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                      onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1) }}
                                    />
                                  </label>

                                ))}
                                <label className="px-1 form-label">Totalmente Competente</label>
                              </div>
                              {errorPreguntas[pregunta.id_pregunta - 1] ? (<><label className="error">{`Este campo es obligatorio`}</label></>) : (<></>)}
                              <br></br>
                              <br></br>
                            </div>
                          </div>
                        </>
                      )
                    )}
                </div>
                <br></br>
                <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
                  <div className="row justify-content-center pt-3 pb-3">
                    <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                      <h5>Competencia de Gestión</h5>
                      <p>Esta competencia se define como la capacidad para <b>utilizar las TIC en la planeación, organización, administración y evaluación</b> de manera efectiva los procesos educativos; tanto a nivel de prácticas pedagógicas como de desarrollo institucional.</p>
                      <p>Utilización de TIC en actividades organizadas por la institución.</p>
                    </div>
                  </div>
                  {dataPreguntas &&
                    dataPreguntas.gestion.map(
                      (pregunta, index): JSX.Element => (
                        <>
                          <div className="row justify-content-center pb-3">
                            <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                              <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                              <div className="radio-group">
                                <label className="px-1 form-label">Nada Competente</label>
                                {[1, 2, 3, 4, 5].map((number) => (
                                  <label className="radio-label">
                                    <span className="number">{number}</span>
                                    <input
                                      type="radio"
                                      placeholder={number + ""}
                                      value={number}
                                      checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                      onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1)}}
                                    />
                                  </label>

                                ))}
                                <label className="px-1 form-label">Totalmente Competente</label>
                              </div>
                              {errorPreguntas[pregunta.id_pregunta - 1] ? (<><label className="error">{`Este campo es obligatorio`}</label></>) : (<></>)}
                              <br></br><br></br>
                            </div>
                          </div>
                        </>
                      )
                    )}
                </div>
                <br></br>
                <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
                  <div className="row justify-content-center pt-3 pb-3">
                    <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                      <h5>Competencia Comunicativa</h5>
                      <p>Esta competencia se define como la capacidad para <b>expresarse, establecer contacto y relacionarse</b> en espacios virtuales y audiovisuales a través de diversos medios y con el manejo de múltiples lenguajes, de manera sincrónica y asincrónica.</p>
                      <p>Comunicación adecuada con los integrantes de la comunidad educativa usando TIC.</p>
                    </div>
                  </div>
                  {dataPreguntas &&
                    dataPreguntas.comunicativa.map(
                      (pregunta, index): JSX.Element => (
                        <>
                          <div className="row justify-content-center pb-3">
                            <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                              <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                              <div className="radio-group">
                                <label className="px-1 form-label">Nada Competente</label>
                                {[1, 2, 3, 4, 5].map((number) => (
                                  <label className="radio-label">
                                    <span className="number">{number}</span>
                                    <input
                                      type="radio"
                                      placeholder={number + ""}
                                      value={number}
                                      checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                      onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1)}}
                                    />
                                  </label>

                                ))}
                                <label className="px-1 form-label">Totalmente Competente</label>
                              </div>
                              {errorPreguntas[pregunta.id_pregunta - 1] ? (<><label className="error">{`Este campo es obligatorio`}</label></>) : (<></>)}
                              <br></br><br></br>
                            </div>
                          </div>
                        </>
                      )
                    )}
                </div>
                <br></br>
                <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
                  <div className="row justify-content-center pt-3 pb-3">
                    <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                      <h5>Competencia Pedagógica</h5>
                      <p>Esta competencia se define como la capacidad de <b>utilizar</b> las TIC <b>para fortalecer los procesos de enseñanza y aprendizaje</b>, reconociendo alcances y limitaciones de la incorporación de estas tecnologías en la formación integral de los estudiantes y en su propio desarrollo profesional.</p>
                      <p>Uso de las TIC para actualizarse de forma autodidacta.</p>
                    </div>
                  </div>
                  {dataPreguntas &&
                    dataPreguntas.pedagogica.map(
                      (pregunta, index): JSX.Element => (
                        <>
                          <div className="row justify-content-center pb-3">
                            <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                              <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                              <div className="radio-group">
                                <label className="px-1 form-label">Nada Competente</label>
                                {[1, 2, 3, 4, 5].map((number) => (
                                  <label className="radio-label">
                                    <span className="number">{number}</span>
                                    <input
                                      type="radio"
                                      placeholder={number + ""}
                                      value={number}
                                      checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                      onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1)}}
                                    />
                                  </label>

                                ))}
                                <label className="px-1 form-label">Totalmente Competente</label>
                              </div>
                              {errorPreguntas[pregunta.id_pregunta - 1] ? (<><label className="error">{`Este campo es obligatorio`}</label></>) : (<></>)}
                              <br></br><br></br>
                            </div>
                          </div>
                        </>
                      )
                    )}
                </div>
                <br></br>
                <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" }}>
                  <div className="row justify-content-center pt-3 pb-3">
                    <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                      <h5>Competencia Teconológica</h5>
                      <p>Esta competencia se define como la capacidad para <b>seleccionar</b> y <b>utilizar</b> de forma pertinente, responsable y eficiente una variedad de <b>herramientas tecnológicas</b> entendiendo los principios que las rigen, la forma de combinarlas y su utilización en el contexto educativo.</p>
                      <p>Identificación de características, usos y oportunidades de las TIC en los procesos educativos.</p>
                    </div>
                  </div>
                  {dataPreguntas &&
                    dataPreguntas.tecnologica.map(
                      (pregunta, index): JSX.Element => (
                        <>
                          <div className="row justify-content-center pb-3">
                            <div className="col-xl-8 col-sm-12" style={{ textAlign: "justify", paddingInline: "25px" }}>
                              <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                              <div className="radio-group">
                                <label className="px-1 form-label">Nada Competente</label>
                                {[1, 2, 3, 4, 5].map((number) => (
                                  <label className="radio-label">
                                    <span className="number">{number}</span>
                                    <input
                                      type="radio"
                                      placeholder={number + ""}
                                      value={number}
                                      checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                      onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1) }}
                                    />
                                  </label>

                                ))}
                                <label className="px-1 form-label">Totalmente Competente</label>
                              </div>
                              {errorPreguntas[pregunta.id_pregunta - 1] ? (<><label className="error">{`Este campo es obligatorio`}</label></>) : (<></>)}
                              <br></br><br></br>
                            </div>
                          </div>
                        </>
                      )
                    )}

                  <div className="row justify-content-center text-center pb-3">
                    <div className="col-6" >
                      <button
                        className="btn btn-primary" 
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading?<ImSpinner size={20} className='rotating'/>:<FaSave style={{marginRight:"5px"}} size={20}/>}
                        ENVIAR ENCUESTA
                        
                      </button>
                    </div>
                  </div>
                </div>


                {showErrorAlert && (
                  <div
                    ref={toastRefError}
                    style={{
                      position: 'absolute',
                      top: 650, // Puedes ajustar esta posición para que se muestre donde desees
                      right: 20, // Puedes ajustar esta posición para que se muestre donde desees
                      zIndex: 1,
                    }}
                  >
                    <Toast style={{
                      background: '#fff', // Color de fondo
                      color: '#000', // Color del texto
                      maxWidth: '300px', // Ancho máximo del Toast
                    }} show={showErrorAlert} onClose={handleCloseError} autohide>
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
                        Todos los campos son obligatorios.
                      </Toast.Body>
                    </Toast>
                  </div>
                )}

              </form>

            </>
          )}

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
          }} show={showSuccessAlert} delay={3000} onClose={handleCloseSuccess} autohide>
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
              Las respuestas se registraron correctamente.
            </Toast.Body>
          </Toast>
        </div>
      )}
    </>
  );
};

export default EncuestaPage;
