import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { FacultadesResponse, FacultadesState } from "../utils/encuestaState.model";

const initialState: FacultadesState = {
  data: [],
};

export const facusGetAllSlice = createSlice({
  name: "facusGetAll",
  initialState,
  reducers: {
    getFacultadesRequest: (state): FacultadesState => {
      return {
        ...state,
      };
    },
    getFacultadesSuccess: (
      state,
      action: PayloadAction<any>
    ): FacultadesState => {
      return {
        ...state,
        data: action.payload,
      };
    },
    getFacultadesFail: (
      state,
      action: PayloadAction<any>
    ): FacultadesState => {
      return {
        ...state,
      };
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
      dispatch(getFacultadesFail(err));
    }
  };

export const { getFacultadesSuccess, getFacultadesRequest, getFacultadesFail } =
facusGetAllSlice.actions;

export const facusGetAllReducer = facusGetAllSlice.reducer;
