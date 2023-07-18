import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CarrerasResponse, CarrerasState } from "../utils/encuestaState.model";

const initialState: CarrerasState = {
  data: [],
};

export const carrerasGetAllSlice = createSlice({
  name: "carrerasGetAll",
  initialState,
  reducers: {
    getCarrerasRequest: (state): CarrerasState => {
      return {
        ...state,
      };
    },
    getCarrerasSuccess: (
      state,
      action: PayloadAction<any>
    ): CarrerasState => {
      return {
        ...state,
        data: action.payload,
      };
    },
    getCarrerasFail: (
      state,
      action: PayloadAction<any>
    ): CarrerasState => {
      return {
        ...state,
      };
    },
  },
});

export const getCarreras =
  (id:number): AppThunk =>
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
      dispatch(getCarrerasFail(err));
    }
  };

export const { getCarrerasSuccess, getCarrerasRequest, getCarrerasFail } =
carrerasGetAllSlice.actions;

export const carrerasGetAllReducer = carrerasGetAllSlice.reducer;
