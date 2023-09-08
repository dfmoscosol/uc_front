import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { FacultadesResponse } from "../utils/encuestaState.model";
import { PeriodosResponse, PeriodosState } from "../utils/resultadosState.model";

const initialState: PeriodosState = {
  data: [],
  ok:false
};

export const periodosGetAllSlice = createSlice({
  name: "periodosGetAll",
  initialState,
  reducers: {
    getPeriodosRequest: (state): PeriodosState => {
      return {
        ...state,
      };
    },
    getPeriodosSuccess: (
      state,
      action: PayloadAction<PeriodosResponse>
    ): PeriodosState => {
      return {
        ...state,
        data: action.payload.respuesta.data,
        ok: action.payload.estado
      };
    },
    getPeriodosFail: (
      state,
      action: PayloadAction<any>
    ): PeriodosState => {
      return {
        ...state,
      };
    },
    getPeriodosReset: (state): PeriodosState => {
      return initialState;
    },
  },
});

export const getPeriodos =
  (): AppThunk =>
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(getPeriodosRequest());
    try {
      const { data }: AxiosResponse<PeriodosResponse> = await axiosInstance.post(
        "/get_periodos_by_user", 
      );
      dispatch(getPeriodosSuccess(data));
    } catch (err) {
      dispatch(getPeriodosFail(err));
    }
  };

export const { getPeriodosSuccess, getPeriodosRequest, getPeriodosFail, getPeriodosReset } =
periodosGetAllSlice.actions;

export const periodosGetAllReducer = periodosGetAllSlice.reducer;
