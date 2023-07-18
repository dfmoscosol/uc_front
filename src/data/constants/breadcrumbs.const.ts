import INTERNAL_ROUTES from "./internalRoutes";
import { Link } from 'react-router-dom';

const BREADCRUMBS_ITEMS = {
  home: {
    pageTitle: "Inicio",
    breadcrumbs: [
     
    ],
  },

  /* SELLERS */

  encuesta: {
    pageTitle: "Encuesta",
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
