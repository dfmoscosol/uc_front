import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth'

// components
import Header from "../../shared/header.component";

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

// constants
import BREADCRUMBS_ITEMS from "../../data/constants/breadcrumbs.const";
import INTERNAL_ROUTES from "../../data/constants/internalRoutes";
import Loader from "../../shared/loader.component";
import YoutubeVideo from "../../shared/youtube";
import { Login } from "../../data/interfaces/auth.model";
import { login } from "../../redux/auth/login.slice";

const HomePage = (): JSX.Element => {
  // local variables
  // constants
  const {
    home: { pageTitle },
  } = BREADCRUMBS_ITEMS;


  return (
    <>
    <div style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3",borderTop:"1px solid #d7dfe3" }}>
      <Header title={pageTitle} />
      </div>
      {false ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
        <div className="pb-5" style={{ background: "#ffffff", borderRight: "1px solid #d7dfe3", borderLeft: "1px solid #d7dfe3", borderBottom: "1px solid #d7dfe3" }}>
          <YoutubeVideo></YoutubeVideo>
          </div>
        </>
      )}


    </>
  );
};

export default HomePage;
