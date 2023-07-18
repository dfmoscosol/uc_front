import { User } from "../redux/utils/authState.model";

export const setUserLocalStorage = (user: User): void =>
  localStorage.setItem("user", JSON.stringify({ ...user }));

export const removeUserFromLocalStorage = (): void =>
  localStorage.removeItem("user");

export const getUserFromLocalStorage = (): User | undefined => {
  const userInfo: User | undefined = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : undefined;
  return userInfo;
};
