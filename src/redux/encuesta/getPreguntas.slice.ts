import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { FacultadesState, PreguntasResponse, PreguntasState } from "../utils/encuestaState.model";

const initialState: PreguntasState = {
  num_preguntas:0,
  data: {
    comunicativa: [],
    gestion: [],
    investigativa: [],
    pedagogica: [],
    tecnologica: []
  },
};

export const preguntasGetAllSlice = createSlice({
  name: "preguntasGetAll",
  initialState,
  reducers: {
    getPreguntasRequest: (state): PreguntasState => {
      return {
        ...state,
      };
    },
    getPreguntasSuccess: (
      state,
      action: PayloadAction<PreguntasState>
    ): PreguntasState => {
      return {
        ...state,
        data: action.payload.data,
        num_preguntas: action.payload.num_preguntas
      };
    },
    getPreguntasFail: (
      state,
      action: PayloadAction<any>
    ): PreguntasState => {
      return {
        ...state,
      };
    },
  },
});

export const getPreguntas =
  (): AppThunk =>
    async (dispatch: AppThunkDispatch): Promise<void> => {
      dispatch(getPreguntasRequest());
      try {
        const { data }: AxiosResponse<PreguntasResponse> = await axiosInstance.get(
          "/preguntas"
        );
        dispatch(getPreguntasSuccess(data.respuesta));
      } catch (err) {
        dispatch(getPreguntasFail(err));
      }
    };

export const { getPreguntasSuccess, getPreguntasRequest, getPreguntasFail } =
  preguntasGetAllSlice.actions;

export const preguntasGetAllReducer = preguntasGetAllSlice.reducer;
