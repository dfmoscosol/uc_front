import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from 'axios';
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CarrerasResponse, CarrerasState } from "../utils/encuestaState.model";
import { Carrera } from "../../data/interfaces/encuesta.model";

const initialState: CarrerasState = {
  lista: [],
  loading: false,
  error: null,
};

export const carrerasGetAllSlice = createSlice({
  name: "carrerasGetAll",
  initialState,
  reducers: {
    getCarrerasRequest: (state): CarrerasState => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    getCarrerasSuccess: (
      state,
      action: PayloadAction<Carrera[]>
    ): CarrerasState => {
      return {
        ...state,
        loading: false,
        lista: action.payload,
        error: null,
      };
    },
    getCarrerasFail: (
      state,
      action: PayloadAction<string>
    ): CarrerasState => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getCarrerasReset: (): CarrerasState => {
      return initialState;
    },
  },
});

export const getCarreras =
  (id: number): AppThunk =>
    async (dispatch: AppThunkDispatch): Promise<void> => {
      dispatch(getCarrerasRequest());
      try {
        const { data }: AxiosResponse<CarrerasResponse> = await axiosInstance.post(
          "/carrera_by_id_facultad",
          {
            id_facultad: id,
          }
        );
        dispatch(getCarrerasSuccess(data.respuesta.data));
      } catch (err) {
        let errorMessage = 'Error al obtener carreras';
        dispatch(getCarrerasFail(errorMessage));
      }
    };

export const {
  getCarrerasSuccess,
  getCarrerasRequest,
  getCarrerasFail,
  getCarrerasReset,
} = carrerasGetAllSlice.actions;


export const carrerasGetAllReducer = carrerasGetAllSlice.reducer;
