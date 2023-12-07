import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { PdfPostState, PostPdfResponse } from "../utils/cursosState.model";
import { KeyWordsForm, PdfForm } from "../../data/interfaces/cursos.model";
import axiosInstanceFiles from "../../services/api.servicesfiles";

const initialState: PdfPostState = {
  exito: false,
  isLoading: false
};

export const postPdfSlice = createSlice({
  name: "postPdf",
  initialState,
  reducers: {
    postPdfRequest: (state): PdfPostState => {
      return {
        ...state,
        isLoading: true,

      };
    },
    postPdfSuccess: (
      state,
      action: PayloadAction<any>
    ): PdfPostState => {
      return {
        ...state,
        isLoading: false,
        exito: action.payload,
      };
    },
    postPdfFail: (
      state,
      action: PayloadAction<any>
    ): PdfPostState => {
      return {
        ...state,
        isLoading: false,
        exito: action.payload,
      };
    },
    postPdfReset: (state): PdfPostState => {
      return initialState;
    },
  },
});

export const postPdf =
  (form: PdfForm): AppThunk =>

    async (dispatch: AppThunkDispatch): Promise<void> => {
      dispatch(postPdfRequest());
      try {
        const { data }: AxiosResponse<PostPdfResponse> = await axiosInstanceFiles.post(
          "/subir_certificado",
          form
        );
        dispatch(postPdfSuccess(data.estado));
      } catch (err) {
        dispatch(postPdfFail(err));
      }
    };

export const { postPdfSuccess, postPdfRequest, postPdfFail, postPdfReset } =
  postPdfSlice.actions;

export const postPdfReducer = postPdfSlice.reducer;