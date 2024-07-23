import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { PostInscripcionResponse, PostInscripcionState } from "../utils/capacitacionesState.model";
import { InscripcionForm } from "../../data/interfaces/capacitaciones.model";

const initialState: PostInscripcionState = {
  exito: null,
  isLoading: false
};

export const postInscripcionSlice = createSlice({
  name: "postInscripcion",
  initialState,
  reducers: {
    postInscripcionRequest: (state): PostInscripcionState => {
      return {
        ...state,
        isLoading: true
      };
    },
    postInscripcionSuccess: (
      state,
      action: PayloadAction<any>
    ): PostInscripcionState => {
      return {
        ...state,
        exito: action.payload,
        isLoading: false
      };
    },
    postInscripcionFail: (
      state,
      action: PayloadAction<any>
    ): PostInscripcionState => {
      return {
        ...state,
        exito: action.payload,
        isLoading: false
      };
    },
    postInscripcionReset: (state): PostInscripcionState => {
      return initialState;
    },
  },
});

export const postInscripcion =
  (form: InscripcionForm): AppThunk =>
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(postInscripcionRequest());
    try {
      const { data }: AxiosResponse<PostInscripcionResponse> = await axiosInstance.post(
        "/eventos/inscripcion",
        form
      );
      dispatch(postInscripcionSuccess(data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const errorData = error.response.data;
          // Manejar el error de acuerdo a tus necesidades
          dispatch(postInscripcionFail(errorData));
        } else {
          console.error('Error:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

export const { postInscripcionSuccess, postInscripcionRequest, postInscripcionFail, postInscripcionReset } =
  postInscripcionSlice.actions;

export const postInscripcionReducer = postInscripcionSlice.reducer;
