import INTERNAL_ROUTES from "./internalRoutes";
import { Link } from 'react-router-dom';

const BREADCRUMBS_ITEMS = {
  home: {
    pageTitle: "Pentágono de Competencias para el Desarrollo Profesional Docente",
    breadcrumbs: [
     
    ],
  },

  /* SELLERS */

  encuesta: {
    pageTitle: "Cuestionario de Competencias",
    breadcrumbs: [
      {
        title: "Encuesta",
      },
    ],
  },
  resultados: {
    pageTitle: "Resultados",
    breadcrumbs: [
      {
        title: "Encuesta",
        link: INTERNAL_ROUTES.ENCUESTA,
      },
      {
        title: "Resultados",
      },
    ],
  },
  
};



export default BREADCRUMBS_ITEMS;
