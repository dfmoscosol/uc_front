import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

//images import
import logo from "../assets/images/logo.png";

// const
/* import { INTERNAL_PATHS, INTERNAL_ROUTES } from "@/data/routes.const";
import { ROLES } from "@/data/app.const"; */
import INTERNAL_ROUTES from "../data/constants/internalRoutes";
// redux
/* 

import { getRole } from "@/utils/getRole.util"; */
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "../services/persistUser.service";
import { validateEncuesta } from "../redux/encuesta/validateEncuesta.slice";

const LeftSidebar = (): JSX.Element => {
  // local variables
  const navigate = useNavigate();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const auth = getAuth();
  const a = getUserFromLocalStorage()?.photoUrl;
  // get store data

  // local methods
  const handleSidebar = (): void => {
    setOpenSidebar(!openSidebar);
    let bodyElement = document.getElementsByClassName("theme-blush");
    bodyElement[0].className = openSidebar
      ? "theme-blush"
      : "theme-blush ls-toggle-menu";
  };

  const logoutHandler = (): void => {
    auth.signOut();
    removeUserFromLocalStorage()
  };

  // hooks
  useEffect((): void => {
    if (!auth) {
      handleSidebar()
    }
  }, [navigate, auth, location]);

    

  return (
    <>

      <div className="topbar row align-items-center" style={{ height: "78.66px" }}>
        <div className="col" style={{ zIndex: "100" }} >
          <button
            onClick={handleSidebar}
            className="btn-menu ls-toggle-btn"
            type="button" style={{ paddingLeft: "25px" }}
          >
            <i className="zmdi zmdi-menu"></i>
          </button>
          <Link className='logo' to={INTERNAL_ROUTES.HOME} style={{ paddingLeft: "11px" }} >
            <img src={logo} width="200" alt="Universidad de Cuenca" />
          </Link>
        </div>

        <div className="col text-end">
          <div className="dropdown">
            <a className="btn-img dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <img className="img-rounded" src={a} width="40" alt="" />
              <i className="zmdi zmdi-caret-down ps-3" style={{color:"#002856"}}/>
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a className="dropdown-item" onClick={logoutHandler}>Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      </div>



      <aside id="leftsidebar" className="sidebar" style={{ overflowY: "auto", paddingTop: "80px" }} >

        <div className="menu" >
          <ul className="list" >

            <li className="pt-2" >
              <NavLink
                to={INTERNAL_ROUTES.HOME}
                className={
                  location.pathname.includes(INTERNAL_ROUTES.HOME)
                    ? "navbar_item_active"
                    : ""
                }
              >
                <i className="zmdi zmdi-home" title="Inicio"></i>
                <span>Inicio</span>
              </NavLink>
            </li>
            <li >
              <NavLink
                to={INTERNAL_ROUTES.ENCUESTA}

                className={
                  location.pathname.includes(INTERNAL_ROUTES.ENCUESTA)
                    ? "navbar_item_active"
                    : ""
                }
              >
                <i className="zmdi zmdi-assignment" title="Encuesta"></i>
                <span>Encuesta</span>
              </NavLink>
            </li>
            <li >
              <NavLink
                to={INTERNAL_ROUTES.RESULTADOS}
                className={
                  location.pathname.includes(INTERNAL_ROUTES.RESULTADOS)
                    ? "navbar_item_active"
                    : ""
                }
              >
                <i className="zmdi zmdi-account-box" title="Resultados"></i>
                <span>Resultados</span>
              </NavLink>
            </li>

          </ul>
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;
