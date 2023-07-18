import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CarrerasState, RespuestaPostState } from "../utils/encuestaState.model";
import { EncuestaForm } from "../../data/interfaces/encuesta.model";
import { AuthResponse, AuthState } from "../utils/authState.model";
import { Login } from "../../data/interfaces/auth.model";

const initialState: AuthState = {
  data: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state): AuthState => {
      return {
        ...state,
      };
    },
    loginSuccess: (
      state,
      action: PayloadAction<any>
    ): AuthState => {
      return {
        ...state,
        data: action.payload,
      };
    },
    loginFail: (
      state,
      action: PayloadAction<any>
    ): AuthState => {
      return {
        ...state,
      };
    },
  },
});

export const login =
  (form:Login): AppThunk =>
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(loginRequest());
    try {
      const { data }: AxiosResponse<AuthResponse> = await axiosInstance.post(
        "/login",
        form
      );
      dispatch(loginSuccess(data.respuesta.data));
    } catch (err) {
      dispatch(loginFail(err));
    }
  };

export const { loginSuccess, loginRequest, loginFail } =
loginSlice.actions;

export const loginReducer = loginSlice.reducer;
