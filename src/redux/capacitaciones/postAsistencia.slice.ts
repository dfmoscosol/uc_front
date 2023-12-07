import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { PostAsistenciaResponse, PostAsistenciaState } from "../utils/capacitacionesState.model";
import { AsistenciaForm } from "../../data/interfaces/capacitaciones.model";

const initialState: PostAsistenciaState = {
  exito: null,
  isLoading: false
};

export const postAsistenciaSlice = createSlice({
  name: "postAsistencia",
  initialState,
  reducers: {
    postAsistenciaRequest: (state): PostAsistenciaState => {
      return {
        ...state,
        isLoading:true,
      };
    },
    postAsistenciaSuccess: (
      state,
      action: PayloadAction<any>
    ): PostAsistenciaState => {
      return {
        ...state,
        isLoading:false,
        exito: action.payload,
      };
    },
    postAsistenciaFail: (
      state,
      action: PayloadAction<any>
    ): PostAsistenciaState => {
      return {
        ...state,
        isLoading:false,
        exito: action.payload,
      };
    },
    postAsistenciaReset: (state): PostAsistenciaState => {
      return initialState;
    },
  },
});

export const postAsistencia =
  (form:AsistenciaForm): AppThunk =>
  
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(postAsistenciaRequest());
    try {
      const { data }: AxiosResponse<PostAsistenciaResponse> = await axiosInstance.put(
        "/update_asistencia",
        form
      );
      dispatch(postAsistenciaSuccess(data.estado));
    } catch (err) {
      dispatch(postAsistenciaFail(err));
    }
  };

export const { postAsistenciaSuccess, postAsistenciaRequest, postAsistenciaFail,postAsistenciaReset } =
postAsistenciaSlice.actions;

export const postAsistenciaReducer = postAsistenciaSlice.reducer; 