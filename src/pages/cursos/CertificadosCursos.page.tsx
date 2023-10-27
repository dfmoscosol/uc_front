// components
import Header from "../../shared/header.component";
import { useEffect, useState } from "react";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import Loader from "../../shared/loader.component";

import { useAppDispatch } from "../../hooks/reduxHooks";
const CertificadosCursosPage = (): JSX.Element => {
  // local variables
  // constants
  const {
    certificados_cursos: { pageTitle },
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
          <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3" }} >
            
          </div>
        </>
      )}


    </>
  );
};

export default CertificadosCursosPage;
