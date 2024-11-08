
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.scss";
// images
import logo from "../../assets/images/logo2.png";
import google from "../../assets/images/google.ico";
import fondo from "../../assets/images/fondo.png";

// firebase
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import INTERNAL_ROUTES from "../../data/constants/internalRoutes";

interface LocationState {
  from: {
    pathname: string;
  };
}

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authing, setAuthing] = useState(false);
  const auth = getAuth();

  const from = (location.state as LocationState)?.from?.pathname || INTERNAL_ROUTES.HOME;

  const signInWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        setAuthing(true);
        navigate(from); // Redirigir a la ruta almacenada
      })
      .catch((error) => {
        setAuthing(false);
      });
  };

  return (
    <div >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          opacity: 0.6,
          zIndex: -1,
        }}
      ></div>
      <div className="row justify-content-center" style={{ paddingTop: "30vh" }}>
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-center ">
          <div className="card auth_form" style={{ backgroundColor: "#002856", marginInline: "10px", boxShadow: "0 0 16px rgba(41, 42, 51, 0.04), 0 6px 20px rgba(41, 42, 51)" }}>
            <div className="row justify-content-center pt-3">

              <img className={`${styles.pagelogo}`} src={logo} alt="" />
            </div>
            <hr style={{ margin: "0.8rem", color: "white" }}></hr>
            <p style={{ fontSize: "12px", marginInline: "25px", color: "white" }}>Recuerde que el ingreso a la plataforma se lo realiza con su cuenta de correo institucional @ucuenca.edu.ec</p>

            <div className="row justify-content-center pb-3">

              <div className="col-6 justify-content-center">
                <div className="row justify-content-center">
                  <button
                    className={`${styles.btnLogin}`}
                    disabled={authing} onClick={() => signInWithGoogle()}
                  >
                    <img src={google} style={{ paddingInlineEnd: "10px" }} />

                    {!authing ? "Iniciar Sesión" : "Cargando..."}
                  </button>
                </div>

              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
