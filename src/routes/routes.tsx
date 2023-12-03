import { Route, Routes, Navigate } from "react-router-dom";

// constants
import INTERNAL_ROUTES from "../data/constants/internalRoutes";

// components
import Skeleton from "../layout/skeleton.layout";

// Pages
import HomePage from "../pages/home/Home.page";
import EncuestaPage from "../pages/encuesta/Encuesta.page";
import ResultadosPage from "../pages/resultados/Resultados.page";
import CoursesPage from "../pages/cursos/Cursos.page";
import InscripcionesPage from "../pages/capacitaciones/Inscripciones.page";
import CertificadosPage from "../pages/capacitaciones/Certificados.page";
import CertificadosCursosPage from "../pages/cursos/CertificadosCursos.page";
import AsistenciaPage from "../pages/capacitaciones/Asistencia.page";


const RoutesApp = () => {
  return (
    <Skeleton>
      <Routes>
        <Route path={INTERNAL_ROUTES.HOME} element={<HomePage />} />
        <Route path={INTERNAL_ROUTES.ENCUESTA} element={<EncuestaPage />} />
        <Route path={INTERNAL_ROUTES.RESULTADOS} element={<ResultadosPage />} />
        <Route path={INTERNAL_ROUTES.COURSES} element={<CoursesPage />} />
        <Route path={INTERNAL_ROUTES.INSCRIPCIONES} element={<InscripcionesPage />} />
        <Route path={INTERNAL_ROUTES.CERTIFICADOS} element={<CertificadosPage />} />
        <Route path={INTERNAL_ROUTES.COURSES_CERTIFICADOS} element={<CertificadosCursosPage/>} />
        <Route path={INTERNAL_ROUTES.ASISTENCIA} element={<AsistenciaPage/>} />
      </Routes>
    </Skeleton>
  );
};

export default RoutesApp;
