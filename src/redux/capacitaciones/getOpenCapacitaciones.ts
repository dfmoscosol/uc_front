import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import {
  CapacitacionesOpenResponse,
  CapacitacionesOpenState,
} from "../utils/capacitacionesState.model";

const initialState: CapacitacionesOpenState = {
  eventos: [],
  isLoading: false, // Añadido el estado isLoading
};

export const CapacitacionesOpenGetAllSlice = createSlice({
  name: "getAllCapacitaciones",
  initialState,
  reducers: {
    CapacitacionesOpenGetAllRequest: (
      state
    ): CapacitacionesOpenState => {
      return {
        ...state,
        isLoading: true, // Establecer isLoading a true cuando se inicia la petición
      };
    },
    CapacitacionesOpenGetAllSuccess: (
      state,
      action: PayloadAction<CapacitacionesOpenResponse>
    ): CapacitacionesOpenState => {
      return {
        ...state,
        eventos: action.payload.respuesta.eventos,
        isLoading: false, // Establecer isLoading a false cuando la petición es exitosa
      };
    },
    CapacitacionesOpenGetAllFailure: (
      state
    ): CapacitacionesOpenState => {
      return {
        ...state,
        isLoading: false, // Establecer isLoading a false cuando la petición falla
      };
    },
    CapacitacionesOpenGetAllReset: (): CapacitacionesOpenState => {
      return initialState;
    },
  },
});

export const getCapacitacionesOpen =
  (): AppThunk =>
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(CapacitacionesOpenGetAllRequest());
    try {
      const { data }: AxiosResponse<CapacitacionesOpenResponse> =
        await axiosInstance.get("/eventos");
      dispatch(CapacitacionesOpenGetAllSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(CapacitacionesOpenGetAllFailure()); // Despachar acción de fallo
    }
  };

export const {
  CapacitacionesOpenGetAllSuccess,
  CapacitacionesOpenGetAllRequest,
  CapacitacionesOpenGetAllFailure, // Exportar la nueva acción
  CapacitacionesOpenGetAllReset,
} = CapacitacionesOpenGetAllSlice.actions;

export const CapacitacionesOpenGetAllReducer =
  CapacitacionesOpenGetAllSlice.reducer;
