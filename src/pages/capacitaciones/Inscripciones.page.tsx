// components
import Header from "../../shared/header.component";
import { useEffect, useState } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { CapacitacionesOpenGetAllReset, getCapacitacionesOpen } from "../../redux/capacitaciones/getOpenCapacitaciones";
import { GrWorkshop } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeamIdea } from "react-icons/gi";
import { FaChalkboardTeacher, FaExternalLinkAlt } from "react-icons/fa";
import { MdBlock, MdCheck, MdCheckCircle, MdCheckCircleOutline, MdOutlineHomeWork, MdOutlineMoreTime, MdOutlinePending, MdPeopleOutline } from "react-icons/md";
import { RxCheck, RxCross2, RxCrossCircled } from "react-icons/rx";
import { FiUserPlus } from "react-icons/fi";
import { Capacitacion } from "../../data/interfaces/capacitaciones.model";
import ModalComponentInscripcion from "./ModalInscription.component";
import KPIView from "./KPI.component";
import { Badge } from "react-bootstrap";
import { postInscripcionReset } from "../../redux/capacitaciones/postInscripcion.slice";

const InscripcionesPage = (): JSX.Element => {
  // local variables
  const { capacitaciones } = useAppSelector((state) => state.capacitaciones);
  const { exito } = useAppSelector((state) => state.post_inscripcion);

  const [open, setOpen] = useState(false);
  const [capacitacion, setCapacitacion] = useState<Capacitacion>({
    cupo: 0,
    direccion: '',
    fechas: [],
    horas: 0,
    id_capacitacion: 0,
    id_taller: 0,
    nombre: '',
    nombre_taller: '',
    nombre_tutor: '',
    num_inscritos: 0,
    presencial: false,
    tipo: '',
    estado: 0
  });
  // constants
  const {
    inscripciones: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const dispatch = useAppDispatch();

  const handleOpenModal = (capacitacion) => {
    setCapacitacion(capacitacion)
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(CapacitacionesOpenGetAllReset())
    dispatch(getCapacitacionesOpen())
    if (exito) {
      dispatch(postInscripcionReset())
    }
  }, [dispatch, exito]);


  return (
    <>
      {open &&
        <ModalComponentInscripcion
          dispatch={dispatch}
          capacitacion={capacitacion}
          onClose={handleCloseModal}
        />
      }
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
        <p className="descripcion-cursos" style={{ textAlign: "justify", paddingBottom: "20px" }}></p>
      </div>
      {capacitaciones.length === 0 ? (
        <>
          <div className="row justify-content-center" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", }}>
            <div className="col-4">
              <Loader></Loader>
            </div>
          </div>
        </>
      ) : (
        <>

          <div className="row justify-content-center align-items-stretch pt-2" style={{ paddingRight: "15px" }}>
            {
              capacitaciones?.map(
                (capacitacion): JSX.Element => (
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 pb-3">
                    <div className="card-capacitacion text-center d-flex flex-column h-100" >
                      <div className="card-header">

                        {capacitacion.tipo === 'Jornada' ? <GiTeamIdea style={{ marginRight: "10px" }}></GiTeamIdea> :
                          capacitacion.tipo === 'Taller' ? <GrWorkshop style={{ marginRight: "10px" }}></GrWorkshop> :
                            capacitacion.tipo === 'Observación Aulica' ? <SiGoogleclassroom style={{ marginRight: "10px" }}></SiGoogleclassroom> :
                              capacitacion.tipo === 'Charla' ? <FaChalkboardTeacher style={{ marginRight: "10px" }}></FaChalkboardTeacher> : <></>
                        }
                        {capacitacion.tipo === 'Jornada' ? 'Jornada de Innovación' : capacitacion.tipo}
                      </div>
                      <div className="card-body d-flex flex-column flex-fill justify-content-around">
                        <h5 className="card-title">{capacitacion.tipo === 'Jornada' ? (capacitacion.nombre + ": " + capacitacion.nombre_taller) : capacitacion.nombre}</h5>
                        {capacitacion.estado == 1 ?
                          <>{console.log('aaa: ',capacitacion.cupo,'-',capacitacion.num_inscritos)}
                            {
                            capacitacion.cupo - capacitacion.num_inscritos > 0 ?
                              <>
                                <div className="row justify-content-center d-flex justify-content-center">
                                  <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                    <KPIView
                                      icon={<MdOutlineMoreTime size={40} />}
                                      title={"Horas"}
                                      title2={"Acreditadas"}
                                      description={capacitacion.horas}
                                      presencial={capacitacion.presencial}
                                    />
                                  </div>
                                  <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                    <KPIView
                                      icon={<MdPeopleOutline size={40} />}
                                      title={"Cupos"}
                                      title2={"Disponibles"}
                                      description={capacitacion.cupo - capacitacion.num_inscritos}
                                      presencial={capacitacion.presencial}
                                    /></div>
                                </div>
                                <button className="btn btn-primary" onClick={() => handleOpenModal(capacitacion)}><FiUserPlus size={20} style={{ paddingRight: "5px" }} /> Incribirse</button>

                              </>
                              :
                              <>
                                <div className="row justify-content-center d-flex justify-content-center">
                                  <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                    <KPIView
                                      icon={<MdOutlineMoreTime size={40} />}
                                      title={"Horas"}
                                      title2={"Acreditadas"}
                                      description={capacitacion.horas}
                                      presencial={capacitacion.presencial}
                                    />
                                  </div>
                                  <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                    <KPIView
                                      icon={<MdPeopleOutline size={40} />}
                                      title={"Cupos"}
                                      title2={"Disponibles"}
                                      description={0}
                                      presencial={capacitacion.presencial}
                                    /></div>
                                </div>
                                <Badge className="badge-sin-cupos" bg="primary"><RxCrossCircled size={20} style={{ paddingRight: "5px" }} />No hay Cupos</Badge>
                              </>
                            }
                          </>
                          :
                          <>
                            {capacitacion.estado == 2 ?
                              <>
                                {capacitacion.presencial ?
                                  <>
                                    <div className="row justify-content-center">
                                      <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                        <KPIView
                                          icon={<MdOutlineHomeWork size={40} />}
                                          title={capacitacion.direccion}
                                          title2={'i'}
                                          description={'Presencial'}
                                          presencial={true}
                                        />
                                      </div>
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div className="row justify-content-center">
                                      <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                        <KPIView
                                          icon={<FaExternalLinkAlt size={20} />}
                                          title={capacitacion.direccion}
                                          title2={'i'}
                                          description={'Virtual'}
                                          presencial={false}
                                        />
                                      </div>
                                    </div>
                                  </>
                                }
                                <Badge className="badge-pendiente" bg="primary"><MdOutlinePending size={20} style={{ paddingRight: "5px" }} />Pendiente</Badge>


                              </>
                              :
                              <>
                                {capacitacion.estado == 3 ?
                                  <>
                                    {capacitacion.presencial ?
                                      <>
                                        <div className="row justify-content-center">
                                          <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                            <KPIView
                                              icon={<MdOutlineHomeWork size={40} />}
                                              title={capacitacion.direccion}
                                              title2={'i'}
                                              description={'Presencial'}
                                              presencial={true}
                                            />
                                          </div>
                                        </div>
                                      </>
                                      :
                                      <>
                                        <div className="row justify-content-center">
                                          <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                            <KPIView
                                              icon={<FaExternalLinkAlt size={20} />}
                                              title={capacitacion.direccion}
                                              title2={'i'}
                                              description={'Virtual'}
                                              presencial={false}
                                            />
                                          </div>
                                        </div>
                                      </>
                                    }
                                    <Badge className="badge-inscrito" bg="primary"><MdCheckCircle size={20} style={{ paddingRight: "5px" }} /> Inscrito</Badge>
                                  </>
                                  :
                                  <>
                                    <div className="row justify-content-center d-flex justify-content-center">
                                      <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                        <KPIView
                                          icon={<MdOutlineMoreTime size={40} />}
                                          title={"Horas"}
                                          title2={"Acreditadas"}
                                          description={capacitacion.horas}
                                          presencial={capacitacion.presencial}
                                        />
                                      </div>
                                      <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4">
                                        <KPIView
                                          icon={<MdPeopleOutline size={40} />}
                                          title={"Cupos"}
                                          title2={"Disponibles"}
                                          description={capacitacion.cupo - capacitacion.num_inscritos}
                                          presencial={capacitacion.presencial}
                                        /></div>
                                    </div>
                                    <Badge className="badge-bloqueado" bg="primary"><MdBlock size={20} style={{ paddingRight: "5px" }} /> Bloqueado</Badge>
                                  </>
                                }
                              </>
                            }
                          </>
                        }

                      </div>
                      <div className="card-footer text-muted">
                        <b>Inicia: </b>{capacitacion.fechas[0]}
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

export default InscripcionesPage;
