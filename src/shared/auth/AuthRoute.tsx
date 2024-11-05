import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from "react-router-dom";
import INTERNAL_ROUTES from "../../data/constants/internalRoutes";
import { User } from "../../redux/utils/authState.model";
import { setUserLocalStorage } from "../../services/persistUser.service";
import { Login } from "../../data/interfaces/auth.model";
import { login } from "../../redux/auth/login.slice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import LoginPage from "../../pages/login/LoginPage";

interface LocationState {
  from: {
    pathname: string;
  };
}

export interface IAuthRouteProps { children: React.ReactNode };

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const auxuser: User = {
                    correo: user.email,
                    id_universidad: 1,
                    nombre: user.displayName,
                    uid: user.uid,
                    token: await user.getIdToken(),
                    photoUrl: user.photoURL,
                };
                const data: Login = {
                    correo: user.email,
                    firebase_uid: user.uid,
                    id_universidad_fk: 1,
                    nombres: user.displayName,
                };
                dispatch(login(data));
                setUserLocalStorage(auxuser);
                setLoading(false);
            } else {
                navigate(INTERNAL_ROUTES.AUTH_LOGIN, { state: { from: location } });
            }
        })
    }, [auth, navigate, location, dispatch]);

    return <>{loading ? <LoginPage></LoginPage> : children}</>;
};

export default AuthRoute;
