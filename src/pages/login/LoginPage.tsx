import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styles from "./Login.module.scss";
// images
import logo from "../../assets/images/logo.png";
import fondo from "../../assets/images/fondo.png";

// redux
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import ToastMessage from "../../shared/toast/Toast";
import INTERNAL_ROUTES from "../../data/constants/internalRoutes";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const auth = getAuth()

  const signInWithGoogle = async () => {
    setAuthing(false);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response)=>{
        console.log(response.user.uid);
        navigate(INTERNAL_ROUTES.HOME);
    })
    .catch((error)=>{
      console.log(error);
      setAuthing(false);
    });
  };


  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${fondo})`,
          backgroundSize:"cover",
          opacity: 0.6,
          zIndex: -1,
        }}
      ></div>
      <div className="authentication" >
      <div className="container" >
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-12">
            <div className="card auth_form">
              <div className="header">
                <img className={`${styles.pagelogo} logo`} src={logo} alt="" />
              </div>
              
              <div className="row justify-content-center mb-3">
                <div className="col-6 justify-content-center">
                  <div className="row justify-content-center">
                     <button
                      className={`btn btn-primary btn-sm ${styles.btnLogin}`}
                      disabled={authing} onClick={() => signInWithGoogle()}
                    >
                      <span
                        className={`${authing && "spinner-border spinner-border-sm"
                          }`}
                      ></span>{" "}
                      {!authing ? "Iniciar Sesión" : "Cargando..."}
                    </button> 
                  </div>

                </div>
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
