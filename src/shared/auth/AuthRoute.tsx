import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import LoginPage from "../../pages/login/LoginPage";
import INTERNAL_ROUTES from "../../data/constants/internalRoutes";
import { User } from "../../redux/utils/authState.model";
import { setUserLocalStorage } from "../../services/persistUser.service";
import { Login } from "../../data/interfaces/auth.model";
import { login } from "../../redux/auth/login.slice";
import { useAppDispatch } from "../../hooks/reduxHooks";

export interface IAuthRouteProps {children: React.ReactNode};
const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setLoading(false);
                const auxuser:User = {
                    correo: user.email,
                    id_universidad:1,
                    nombre:user.displayName,
                    uid:user.uid,
                    token: await user.getIdToken(),
                    photoUrl: user.photoURL,
                }
                const data:Login = {
                    correo:user.email,
                    firebase_uid:user.uid,
                    id_universidad_fk:1,
                    nombres:user.displayName,
                  }
                dispatch(login(data));
                setUserLocalStorage(auxuser);
                
            } else {
                navigate(INTERNAL_ROUTES.AUTH_LOGIN)
            }
        })
    }, [auth])

   

    return <>{loading?(<><LoginPage></LoginPage></>):(<>{children}</>)}</>
};

export default AuthRoute;