import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { PostInscripcionResponse, PostInscripcionState } from "../utils/capacitacionesState.model";
import { InscripcionForm } from "../../data/interfaces/capacitaciones.model";

const initialState: PostInscripcionState = {
  exito: false,
};

export const postInscripcionSlice = createSlice({
  name: "postInscripcion",
  initialState,
  reducers: {
    postInscripcionRequest: (state): PostInscripcionState => {
      return {
        ...state,
      };
    },
    postInscripcionSuccess: (
      state,
      action: PayloadAction<any>
    ): PostInscripcionState => {
      return {
        ...state,
        exito: action.payload,
      };
    },
    postInscripcionFail: (
      state,
      action: PayloadAction<any>
    ): PostInscripcionState => {
      return {
        ...state,
        exito: action.payload,
      };
    },
    postInscripcionReset: (state): PostInscripcionState => {
      return initialState;
    },
  },
});

export const postInscripcion =
  (form:InscripcionForm): AppThunk =>
  
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(postInscripcionRequest());
    try {
      const { data }: AxiosResponse<PostInscripcionResponse> = await axiosInstance.post(
        "/inscribirse",
        form
      );
      dispatch(postInscripcionSuccess(data.estado));
    } catch (err) {
      dispatch(postInscripcionFail(err));
    }
  };

export const { postInscripcionSuccess, postInscripcionRequest, postInscripcionFail,postInscripcionReset } =
postInscripcionSlice.actions;

export const postInscripcionReducer = postInscripcionSlice.reducer;