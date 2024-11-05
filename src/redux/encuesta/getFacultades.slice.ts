import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { FacultadesResponse, FacultadesState } from "../utils/encuestaState.model";

// Definición de las interfaces


const initialState: FacultadesState = {
  lista: [],
  loading: false,
  error: null,
};

export const facusGetAllSlice = createSlice({
  name: "facusGetAll",
  initialState,
  reducers: {
    getFacultadesRequest: (state): FacultadesState => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    getFacultadesSuccess: (state, action: PayloadAction<any[]>): FacultadesState => {
      return {
        ...state,
        loading: false,
        lista: action.payload,
        error: null,
      };
    },
    getFacultadesFail: (state, action: PayloadAction<string>): FacultadesState => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getFacultadesReset: (state): FacultadesState => {
      return initialState;
    },
  },
});

export const getFacus =
  (): AppThunk =>
    async (dispatch: AppThunkDispatch): Promise<void> => {
      dispatch(getFacultadesRequest());
      try {
        const { data }: AxiosResponse<FacultadesResponse> = await axiosInstance.post(
          "/facultad_by_id_universidad",
          {
            id_universidad: 1,
          }
        );
        dispatch(getFacultadesSuccess(data.respuesta.data));
      } catch (err) {
        const errorMessage = 'Error al obtener facultades';
        dispatch(getFacultadesFail(errorMessage));
      }
    };

export const { getFacultadesSuccess, getFacultadesRequest, getFacultadesFail, getFacultadesReset } =
  facusGetAllSlice.actions;

  export const facusGetAllReducer = facusGetAllSlice.reducer;

