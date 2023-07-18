import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { FacultadesState, PreguntasResponse, PreguntasState, ValidarEncuestaState, ValidateEncuestaResponse } from "../utils/encuestaState.model";

const initialState: ValidarEncuestaState = {
  encuesta:false,
};

export const validateEncuestaSlice = createSlice({
  name: "validateEncuesta",
  initialState,
  reducers: {
    validateEncuestaRequest: (state): ValidarEncuestaState => {
      return {
        ...state,
      };
    },
    validateEncuestaSuccess: (
      state,
      action: PayloadAction<ValidateEncuestaResponse>
    ): ValidarEncuestaState => {
      return {
        ...state,
        encuesta: action.payload.resultado
      };
    },
    validateEncuestaFail: (
      state,
      action: PayloadAction<any>
    ): ValidarEncuestaState => {
      return {
        ...state,
      };
    },
  },
});

export const validateEncuesta =
  (uid:string): AppThunk =>
    async (dispatch: AppThunkDispatch): Promise<void> => {
      dispatch(validateEncuestaRequest());
      try {
        const { data }: AxiosResponse<ValidateEncuestaResponse> = await axiosInstance.post(
          "/verificar_by_uid",{uid:uid}
        );
        dispatch(validateEncuestaSuccess(data));
      } catch (err) {
        dispatch(validateEncuestaFail(err));
      }
    };

export const { validateEncuestaSuccess, validateEncuestaRequest, validateEncuestaFail } =
  validateEncuestaSlice.actions;

export const validateEncuestaReducer = validateEncuestaSlice.reducer;
