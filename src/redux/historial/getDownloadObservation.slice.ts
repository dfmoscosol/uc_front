import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { DownloadInformeObservacionState } from "../utils/historialState.model";

const initialState: DownloadInformeObservacionState = {
    loading: false,
    error: null,
};

export const DownloadInformeObservacionSlice = createSlice({
    name: "downloadInformeObservacion",
    initialState,
    reducers: {
        DownloadRequest: (state): DownloadInformeObservacionState => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        DownloadSuccess: (state): DownloadInformeObservacionState => {
            return {
                ...state,
                loading: false,
                error: null,
            };
        },
        DownloadFailure: (
            state,
            action: PayloadAction<string>
        ): DownloadInformeObservacionState => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        DownloadReset: (): DownloadInformeObservacionState => {
            return initialState;
        },
    },
});

export const downloadInformeObservacion =
    (id: number): AppThunk =>
    async (dispatch: AppThunkDispatch): Promise<void> => {
        dispatch(DownloadRequest());
        try {
            const url = `/descargar/informe/${id}`;
            const response: AxiosResponse<Blob> = await axiosInstance.get(url, {
                responseType: "blob", // Importante para manejar archivos
            });

            // Crear un enlace para descargar el archivo
            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "informe_observacion.pdf"; // Nombre del archivo
            link.click();

            dispatch(DownloadSuccess());
        } catch (error: any) {
            dispatch(
                DownloadFailure(error.response?.data?.error || "Error desconocido")
            );
            console.log(error);
        }
    };

export const {
    DownloadRequest,
    DownloadSuccess,
    DownloadFailure,
    DownloadReset,
} = DownloadInformeObservacionSlice.actions;

export const DownloadInformeObservacionReducer = DownloadInformeObservacionSlice.reducer;
