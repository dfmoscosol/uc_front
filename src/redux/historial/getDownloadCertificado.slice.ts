import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { DownloadCertificadoState } from "../utils/historialState.model";

const initialState: DownloadCertificadoState = {
    loading: false,
    error: null,
};

export const DownloadCertificadoSlice = createSlice({
    name: "downloadCertificado",
    initialState,
    reducers: {
        DownloadCertificadoRequest: (state): DownloadCertificadoState => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        DownloadCertificadoSuccess: (state): DownloadCertificadoState => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        },
        DownloadCertificadoFailure: (
            state,
            action: PayloadAction<string>
        ): DownloadCertificadoState => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        DownloadCertificadoReset: (): DownloadCertificadoState => {
            return initialState;
        },
    },
});

export const downloadCertificado =
    (): AppThunk =>
    async (dispatch: AppThunkDispatch): Promise<void> => {
        dispatch(DownloadCertificadoRequest());
        try {
            const url = `/descargar/certificado`;
            const response: AxiosResponse<Blob> = await axiosInstance.get(url, {
                responseType: "blob", // Importante para manejar archivos
            });

            // Crear un enlace para descargar el archivo
            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "certificado.pdf"; // Nombre del archivo
            link.click();

            dispatch(DownloadCertificadoSuccess());
        } catch (error: any) {
            dispatch(
                DownloadCertificadoFailure(error.response?.data?.error || "Error desconocido")
            );
            console.log(error);
        }
    };

export const {
    DownloadCertificadoRequest,
    DownloadCertificadoSuccess,
    DownloadCertificadoFailure,
    DownloadCertificadoReset,
} = DownloadCertificadoSlice.actions;

export const DownloadCertificadoReducer = DownloadCertificadoSlice.reducer;