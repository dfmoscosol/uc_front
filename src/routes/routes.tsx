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


const RoutesApp = () => {
  return (
    <Skeleton>
      <Routes>
        <Route path={INTERNAL_ROUTES.HOME} element={<HomePage />} />
        <Route path={INTERNAL_ROUTES.ENCUESTA} element={<EncuestaPage />} />
        <Route path={INTERNAL_ROUTES.RESULTADOS} element={<ResultadosPage />} />
        <Route path={INTERNAL_ROUTES.COURSES} element={<CoursesPage />} />
      </Routes>
    </Skeleton>
  );
};

export default RoutesApp;
