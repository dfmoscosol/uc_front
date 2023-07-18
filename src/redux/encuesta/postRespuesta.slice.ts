import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CarrerasState, RespuestaPostState } from "../utils/encuestaState.model";
import { EncuestaForm } from "../../data/interfaces/encuesta.model";

const initialState: RespuestaPostState = {
  Resultado: "",
};

export const postPreguntasSlice = createSlice({
  name: "postPreguntas",
  initialState,
  reducers: {
    postPreguntasRequest: (state): RespuestaPostState => {
      return {
        ...state,
      };
    },
    postPreguntasSuccess: (
      state,
      action: PayloadAction<any>
    ): RespuestaPostState => {
      return {
        ...state,
        Resultado: action.payload,
      };
    },
    postPreguntasFail: (
      state,
      action: PayloadAction<any>
    ): RespuestaPostState => {
      return {
        ...state,
      };
    },
  },
});

export const postPreguntas =
  (form:EncuestaForm): AppThunk =>
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(postPreguntasRequest());
    try {
      const { data }: AxiosResponse<RespuestaPostState> = await axiosInstance.post(
        "/save_form",
        form
      );
      dispatch(postPreguntasSuccess(data.Resultado));
    } catch (err) {
      dispatch(postPreguntasFail(err));
    }
  };

export const { postPreguntasSuccess, postPreguntasRequest, postPreguntasFail } =
postPreguntasSlice.actions;

export const carrerasGetAllReducer = postPreguntasSlice.reducer;
