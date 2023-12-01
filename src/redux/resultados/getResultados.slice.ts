import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { ResultadosResponse, ResultadosState } from "../utils/resultadosState.model";

export const initialState: ResultadosState = {
  data: {
    comunicativa: {
      competencia:"",
      competencia_short:"",
      d1:"",
      d2:"",
      d3:"",
      momento:"",
      momento_short:"",
      puntaje:0
    },
    gestion:{
      competencia:"",
      competencia_short:"",
      d1:"",
      d2:"",
      d3:"",
      momento:"",
      momento_short:"",
      puntaje:0
    },
    investigativa:{
      competencia:"",
      competencia_short:"",
      d1:"",
      d2:"",
      d3:"",
      momento:"",
      momento_short:"",
      puntaje:0
    },
    pedagogica:{
      competencia:"",
      competencia_short:"",
      d1:"",
      d2:"",
      d3:"",
      momento:"",
      momento_short:"",
      puntaje:0
    },
    tecnologica:{
      competencia:"",
      competencia_short:"",
      d1:"",
      d2:"",
      d3:"",
      momento:"",
      momento_short:"",
      puntaje:0
    }
  },
};

export const ResultadosGetAllSlice = createSlice({
  name: "ResultadosGetAll",
  initialState,
  reducers: {
    getResultadosRequest: (state): ResultadosState => {
      return {
        ...state,
      };
    },
    getResultadosSuccess: (
      state,
      action: PayloadAction<any>
    ): ResultadosState => {
      return {
        ...state,
        data: action.payload,
      };
    },
    getResultadosFail: (
      state,
      action: PayloadAction<any>
    ): ResultadosState => {
      return {
        ...state,
      };
    },
    getResultadosReset: (state): ResultadosState => {
      return initialState
    },
  },
});

export const getResultados =
  (id:number): AppThunk =>
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(getResultadosRequest());
    try {
      const { data }: AxiosResponse<ResultadosResponse> = await axiosInstance.post(
        "/resultados_individuales",
        {
        id_periodo: id,
        }
      );
      dispatch(getResultadosSuccess(data.respuesta.data));
    } catch (err) {
      dispatch(getResultadosFail(err));
    }
  };

  export const getUltimoResultado =
  (): AppThunk =>
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(getResultadosRequest());
    try {
      const { data }: AxiosResponse<ResultadosResponse> = await axiosInstance.get(
        "/get_user_last_resultado");

      dispatch(getResultadosSuccess(data.respuesta.data));
    } catch (err) {
      dispatch(getResultadosFail(err));
    }
  };

export const { getResultadosSuccess, getResultadosRequest, getResultadosFail,getResultadosReset } =
ResultadosGetAllSlice.actions;

export const ResultadosGetAllReducer = ResultadosGetAllSlice.reducer;
