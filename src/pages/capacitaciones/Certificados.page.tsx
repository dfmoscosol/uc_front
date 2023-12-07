// components
import Header from "../../shared/header.component";
import { useEffect, useState } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { GiTeamIdea } from "react-icons/gi";
import { Badge } from "react-bootstrap";
import { MdCheckCircle, MdContentPasteSearch, MdOutlineGroups, MdSchool } from "react-icons/md";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { GrWorkshop } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";
const CertificadosPage = (): JSX.Element => {
  // local variables
  // constants
  const {
    certificados: { pageTitle },
  } = BREADCRUMBS_ITEMS;
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <>
      <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderTop: "1px solid #d7dfe3" }}>
        <Header title={pageTitle} />
      </div>
      {false ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div className="table-container" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" , marginTop: "20px"}} >
            <h5 className="titulo-portafolio">Capacitaciones programa D360</h5>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Capacitacion</th>
                  <th scope="col">Horas Acreditadas</th>
                  <th scope="col">Modalidad</th>
                  <th scope="col">Asitió</th>
                  <th scope="col">Aprobó</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><div className="row"><GiTeamIdea /></div><div className="row pt-2" style={{ marginInline: "5px" }}><Badge className="badge-tipo" bg="primary">Jornada de Innovación</Badge></div></th>
                  <td>II JORNADAS DE INNOVACIÓN EDUCATIVA</td>
                  <td>20</td>
                  <td>Presencial</td>
                  <td><Badge className="badge-limpio" bg="primary"><MdCheckCircle size={20} /></Badge></td>
                  <td><Badge className="badge-limpio" style={{ color: "red" }} bg="primary"><RxCrossCircled size={20} /></Badge></td>
                </tr>
                <tr>
                  <th scope="row"><div className="row"><GrWorkshop /></div><div className="row pt-2" style={{ marginInline: "5px" }}><Badge className="badge-tipo" bg="primary">Taller</Badge></div></th>
                  <td>Diseño de actividades de aprendizaje para entornos digitales</td>
                  <td>20</td>
                  <td>Presencial</td>
                  <td><Badge className="badge-limpio" bg="primary"><MdCheckCircle size={20} /></Badge></td>
                  <td><Badge className="badge-limpio" style={{ color: "red" }} bg="primary"><RxCrossCircled size={20} /></Badge></td>
                </tr>
                <tr>
                  <th scope="row"><div className="row"><FaChalkboardTeacher /></div><div className="row pt-2" style={{ marginInline: "5px" }}><Badge className="badge-tipo" bg="primary">Charla</Badge></div></th>
                  <td>Inteligencia artificial</td>
                  <td>1</td>
                  <td>Virtual</td>
                  <td><Badge className="badge-limpio" bg="primary"><MdCheckCircle size={20} /></Badge></td>
                  <td><Badge className="badge-limpio" bg="primary"><MdCheckCircle size={20} /></Badge></td>
                </tr>
              </tbody>
            </table>

          </div>

          <div className="table-container" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3", borderTop: "2px solid #002856" , marginTop: "20px"}} >
            <h5 className="titulo-portafolio">Cursos recomendados</h5>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Titulo del Curso</th>
                  <th scope="col">Horas Acreditadas</th>
                  <th scope="col">Aprobado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><div className="row"><MdSchool /></div><div className="row pt-2" style={{ marginInline: "5px" }}><Badge className="badge-tipo" bg="primary">Competencia Pedagógica</Badge></div></th>
                  <td>Formación docente basada en la práctica para desarrollar habilidades del siglo XXI</td>
                  <td>50</td>
                  <td><Badge className="badge-limpio" style={{ color: "red" }} bg="primary"><RxCrossCircled size={20} /></Badge></td>
                </tr>
                <tr>
                  <th scope="row"><div className="row"><MdOutlineGroups /></div><div className="row pt-2" style={{ marginInline: "5px" }}><Badge className="badge-tipo" bg="primary">Competencia Comunicativa</Badge></div></th>
                  <td>Red de sentidos: Arte, educación y procesos creativos</td>
                  <td>20</td>
                  <td><Badge className="badge-limpio" bg="primary"><MdCheckCircle size={20} /></Badge></td>
                </tr>
                <tr>
                  <th scope="row"><div className="row"><MdContentPasteSearch /></div><div className="row pt-2" style={{ marginInline: "5px" }}><Badge className="badge-tipo" bg="primary">Competencia Investigativa</Badge></div></th>
                  <td>Transferencia tecnológica: De la investigación al mercado.</td>
                  <td>10</td>
                  <td><Badge className="badge-limpio" style={{ color: "red" }} bg="primary"><RxCrossCircled size={20} /></Badge></td>
                </tr>
              </tbody>
            </table>

          </div>
        </>
      )}


    </>
  );
};

export default CertificadosPage;
