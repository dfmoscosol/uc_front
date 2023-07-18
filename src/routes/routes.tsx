import { Route, Routes, Navigate } from "react-router-dom";

// constants
import INTERNAL_ROUTES from "../data/constants/internalRoutes";

// components
import Skeleton from "../layout/skeleton.layout";

// Pages
import HomePage from "../pages/home/Home.page";
import EncuestaPage from "../pages/encuesta/Encuesta.page";
import ResultadosPage from "../pages/resultados/Resultados.page";


const RoutesApp = () => {
  return (
    <Skeleton>
      <Routes>
      <Route path={INTERNAL_ROUTES.HOME} element={<HomePage />} />
      <Route path={INTERNAL_ROUTES.ENCUESTA} element={<EncuestaPage />} />
      <Route path={INTERNAL_ROUTES.RESULTADOS} element={<ResultadosPage />} />
      </Routes>
    </Skeleton>
  );
};

export default RoutesApp;
