import { User } from "../redux/utils/authState.model";

export const setUserLocalStorage = (user: User): void =>
  localStorage.setItem("user", JSON.stringify({ ...user }));

export const setRuta = (ruta: string): void =>
  localStorage.setItem("ruta", ruta);

export const getRutaFromLocalStorage = (): string => {
  const ruta: any = localStorage.getItem("ruta")
     ? localStorage.getItem("ruta")
     : undefined;
  return ruta;
}

export const removeRutaFromLocalStorage = (): void =>
localStorage.removeItem("ruta");

export const removeUserFromLocalStorage = (): void =>
  localStorage.removeItem("user");

export const getUserFromLocalStorage = (): User | undefined => {
  const userInfo: User | undefined = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : undefined;
  return userInfo;

};
