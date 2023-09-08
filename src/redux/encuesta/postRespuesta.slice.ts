import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CarrerasState, PostPreguntasResponse, RespuestaPostState } from "../utils/encuestaState.model";
import { EncuestaForm } from "../../data/interfaces/encuesta.model";

const initialState: RespuestaPostState = {
  exito: false,
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
        exito: action.payload,
      };
    },
    postPreguntasFail: (
      state,
      action: PayloadAction<any>
    ): RespuestaPostState => {
      return {
        ...state,
        exito: action.payload,
      };
    },
    postPreguntasReset: (state): RespuestaPostState => {
      return initialState;
    },
  },
});

export const postPreguntas =
  (form:EncuestaForm): AppThunk =>
  
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(postPreguntasRequest());
    try {
      console.log(form)
      const { data }: AxiosResponse<PostPreguntasResponse> = await axiosInstance.post(
        "/save_form",
        form
      );
      dispatch(postPreguntasSuccess(data.estado));
    } catch (err) {
      dispatch(postPreguntasFail(err));
    }
  };

export const { postPreguntasSuccess, postPreguntasRequest, postPreguntasFail,postPreguntasReset } =
postPreguntasSlice.actions;

export const postPreguntasReducer = postPreguntasSlice.reducer;
