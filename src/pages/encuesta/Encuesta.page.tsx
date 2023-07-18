import { useEffect, useState } from "react";
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
import { getFacus } from "../../redux/encuesta/getFacultades.slice";
import { getCarreras } from "../../redux/encuesta/getCarreras.slice";
import { getPreguntas } from "../../redux/encuesta/getPreguntas.slice";
import { postPreguntas } from "../../redux/encuesta/postRespuesta.slice";
import { getUserFromLocalStorage } from "../../services/persistUser.service";

const EncuestaPage = (): JSX.Element => {
  // local variables
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // constants
  const {
    encuesta: { pageTitle},
  } = BREADCRUMBS_ITEMS;
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EncuestaForm>();

  const onSubmit: SubmitHandler<EncuestaForm> = ({
    cedula,

  }): void => {
    console.log("carrera", selectCarrera)
    console.log("facultad", selectFacultad)
    console.log("cedula", cedula)
    console.log("uid", getUserFromLocalStorage()?.uid)
    const puntajes:Puntaje[] = selectedNumber.map((num,index) => ({id_pregunta:index+1, puntaje:num }));
    console.log("puntajes",puntajes)
     dispatch(postPreguntas(
      {
        cedula:cedula,
        id_carrera:selectCarrera,
        id_facultad:selectFacultad,
        puntajes:puntajes,
        uid_firebase_fk:getUserFromLocalStorage()?.uid
      })) 
  };

  const { data: dataFacus } = useAppSelector((state) => state.facus)
  const { data: dataCarreras } = useAppSelector((state) => state.carreras)
  const { num_preguntas, data: dataPreguntas } = useAppSelector((state) => state.preguntas)
  const [secondSelectOptions, setSecondSelectOptions] = useState<{ value: string; label: string; }[]>([]);
  const [selectFacultad, setselectFacultad] = useState(0);
  const [selectCarrera, setselectCarrera] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(Array(num_preguntas).fill(0));

  const handleFacultadSelectChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    dispatch(getCarreras(value))
    setselectFacultad(value)
  };

  const handleCarreraSelectChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setselectCarrera(value)
  };

  useEffect(() => {
    setSecondSelectOptions(dataCarreras.map((elemento) => {
      return { value: elemento.id_carrera, label: elemento.nombre }
    }))
  }, [dataCarreras]);

  useEffect(() => {
    dispatch(getFacus());
    dispatch(getPreguntas());

  }, [dispatch]);


  const handleNumberSelect = (event, index) => {
    const newArray = [...selectedNumber]; // Crear una copia del array
    newArray[index] = event.target.value; // Modificar el elemento deseado
    setSelectedNumber(newArray);
  };

  return (
    <>
      <Header title={pageTitle} />
      {!dataPreguntas ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div className="row justify-content-center">
            <div className="col-8">
              <h2 >Cuestionario de Competencias</h2>
              <p>El presente cuestionario tiene como objetivo evaluar la <b>comprensión</b>, el <b>uso</b> y la <b>aplicación</b> de las <b>Tecnologías de la Información y la Comunicación (TIC)</b> en el proceso educativo en relación a cinco competencias: Competencia Tecnológica, Competencia Pedagógica, Competencia Comunicativa, Competencia de Gestión y Competencia Investigativa. La información recopilada se utilizará como base para innovar las prácticas pedagógicas y lograr una educación de calidad con el apoyo de las TIC.</p>
              <p>Entiéndase como <b>competencia</b> al conjunto de conocimientos, habilidades, actitudes, comprensiones y disposiciones cognitivas, socioafectivas y psicomotoras apropiadamente relacionadas entre sí, para facilitar el desempeño efectivo y significativo de una actividad en contextos nuevos y desafiantes.</p>
              <p>La presente evaluacion es de carácter cualitativo por lo cual se emplea la siguiente escala de <b>likert</b>:</p>
              <h6 className="text-center"><b>1</b> = Nada Competente</h6>
              <h6 className="text-center"><b>2</b> = Poco Competente</h6>
              <h6 className="text-center"><b>3</b> = Competente</h6>
              <h6 className="text-center"><b>4</b> = Muy Competente</h6>
              <h6 className="text-center"><b>5</b> = Totalmente Competente</h6>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center pb-3">
              <div className="col-8">
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
                  <label className="error">{`Este campo es requerido`}</label>
                )}
                {errors.cedula?.type === "minLength" && (
                  <label className="error">{`Este campo  debe tener al menos 10 dígitos`}</label>
                )}
              </div>
            </div>

            <div className="row justify-content-center pb-3">
              <div className="col-8">
                <label className="form-label">Facultad:</label>
                <Select
                  placeholder="Elegir Facultad"
                  onChange={handleFacultadSelectChange}
                  options={dataFacus.map((elemento) => {
                    return { value: elemento.id_facultad, label: elemento.nombre } // Multiplicamos cada elemento por 2
                  })}
                />
              </div>
            </div>

            <div className="row justify-content-center pb-3">
              <div className="col-8">
                <label className="form-label">Carrera:</label>
                <Select
                  placeholder="Elegir Carrera"
                  onChange={handleCarreraSelectChange}
                  options={secondSelectOptions}
                />
              </div>
            </div>


            <div className="row justify-content-center pb-3">
              <div className="col-8">
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
                      <div className="col-8">
                        <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                        <div className="radio-group">
                          <label className="px-3 form-label">Nada Competente</label>
                          {[1, 2, 3, 4, 5].map((number) => (
                            <label className="radio-label">
                              <span className="number">{number}</span>
                              <input
                                type="radio"
                                placeholder={number + ""}
                                value={number}
                                checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1), console.log("selected aray", selectedNumber) }}
                              />
                            </label>

                          ))}
                          <label className="px-3 form-label">Totalmente Competente</label>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            <div className="row justify-content-center pb-3">
              <div className="col-8">
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
                      <div className="col-8">
                        <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                        <div className="radio-group">
                          <label className="px-3 form-label">Nada Competente</label>
                          {[1, 2, 3, 4, 5].map((number) => (
                            <label className="radio-label">
                              <span className="number">{number}</span>
                              <input
                                type="radio"
                                placeholder={number + ""}
                                value={number}
                                checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1), console.log("selected aray", selectedNumber) }}
                              />
                            </label>

                          ))}
                          <label className="px-3 form-label">Totalmente Competente</label>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            <div className="row justify-content-center pb-3">
              <div className="col-8">
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
                      <div className="col-8">
                        <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                        <div className="radio-group">
                          <label className="px-3 form-label">Nada Competente</label>
                          {[1, 2, 3, 4, 5].map((number) => (
                            <label className="radio-label">
                              <span className="number">{number}</span>
                              <input
                                type="radio"
                                placeholder={number + ""}
                                value={number}
                                checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1), console.log("selected aray", selectedNumber) }}
                              />
                            </label>

                          ))}
                          <label className="px-3 form-label">Totalmente Competente</label>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            <div className="row justify-content-center pb-3">
              <div className="col-8">
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
                      <div className="col-8">
                        <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                        <div className="radio-group">
                          <label className="px-3 form-label">Nada Competente</label>
                          {[1, 2, 3, 4, 5].map((number) => (
                            <label className="radio-label">
                              <span className="number">{number}</span>
                              <input
                                type="radio"
                                placeholder={number + ""}
                                value={number}
                                checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1), console.log("selected aray", selectedNumber) }}
                              />
                            </label>

                          ))}
                          <label className="px-3 form-label">Totalmente Competente</label>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            <div className="row justify-content-center pb-3">
              <div className="col-8">
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
                      <div className="col-8">
                        <label className="form-label">{pregunta.id_pregunta}. {pregunta.pregunta}</label><br></br>
                        <div className="radio-group">
                          <label className="px-3 form-label">Nada Competente</label>
                          {[1, 2, 3, 4, 5].map((number) => (
                            <label className="radio-label">
                              <span className="number">{number}</span>
                              <input
                                type="radio"
                                placeholder={number + ""}
                                value={number}
                                checked={selectedNumber[pregunta.id_pregunta - 1] == number}
                                onChange={(event) => { handleNumberSelect(event, pregunta.id_pregunta - 1), console.log("selected aray", selectedNumber) }}
                              />
                            </label>

                          ))}
                          <label className="px-3 form-label">Totalmente Competente</label>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            <div className="row justify-content-center text-center pb-3">
              <div className="col-8">
                <button
                  className="btn btn-success btn-lg"
                  type="submit"
                  disabled={false}
                >
                  {"GUARDAR ENCUESTA"} 
                </button>
              </div>
            </div>

            {/* <div className="col-12 col-md-6 col-lg-4">
                <div className="form-group pb-3">
                  <label className="form-label">Provincia:</label>
                  <Select
                    placeholder="Elegir Provincia"
                    options={Provincia}
                    onChange={handleSelectChange}
                    styles={selectCustomStyles}
                    value={
                      Provincia.find(pr => pr.value === watch("province"))
                    }

                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="form-group pb-3">
                  <label className="form-label">Ciudad:</label>
                  {
                    valorCiudad === 2 ? (
                      ""
                    ) : (
                      <>
                        <label className={`form-label`} style={{ color: "#F5F5F5" }}>Ciudad </label>
                        <Select
                          placeholder="Ciudad"
                          options={city}
                          onChange={handleSelectChangeCity}
                          styles={selectCustomStyles}
                          value={
                            city.find((cyt: any) => cyt.value === watch("city"))
                          }

                        />
                      </>
                    )
                  }
                </div>
              </div> */}


            {/* <div className="d-grid gap-2">
              <button
                className="btn btn-success btn-lg"
                type="submit"
                disabled={isLoading}
              >
                <span
                  className={`${isLoading && "spinner-border spinner-border-sm"
                    }`}
                ></span>{" "}
                {!isLoading ? "CREAR ADMINISTRADOR" : "Cargando..."}
              </button>
            </div> */}

          </form>

        </>
      )}


    </>
  );
};

export default EncuestaPage;
