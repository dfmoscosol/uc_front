import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../shared/header.component";

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import INTERNAL_ROUTES from "../../data/constants/internalRoutes";
import MapEcuador from "../../shared/map.component";
import Indicadores from "../../shared/indicadores.component";
import { getAllReport } from "../../redux/home/getAllReport.slice";
import Loader from "../../shared/loader.component";

const ResultadosPage = (): JSX.Element => {
  // local variables
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // constants
  const {
    resultados: { pageTitle, breadcrumbs },
  } = BREADCRUMBS_ITEMS;

  

  return (
    <>
      <Header title={pageTitle} breadcrumbs={breadcrumbs} />
      {0==0 ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div className="row align-items-center mx-1">
            <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 mt-1">


            </div>
            

          </div>
        </>
      )}


    </>
  );
};

export default ResultadosPage;
