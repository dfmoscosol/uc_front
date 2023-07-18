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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // constants
  const {
    home: { pageTitle, breadcrumbs },
  } = BREADCRUMBS_ITEMS;


  return (
    <>
      <Header title={pageTitle} breadcrumbs={breadcrumbs} />
      {false ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <YoutubeVideo></YoutubeVideo>
        </>
      )}


    </>
  );
};

export default HomePage;
