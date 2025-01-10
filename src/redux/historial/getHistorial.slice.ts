import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { HistorialResponse, HistorialState } from "../utils/historialState.model";

const initialState: HistorialState = {
    historial: {
        jornadas: [],
        charlas: [],
        microtalleres: [],
        observaciones: [],
        externos: [],
    },
    horas_competencia: {
        pedagogica: 0,
        comunicativa: 0,
        gestion: 0,
        investigativa: 0,
        tecnologica: 0,
    },
    horas_evento: {
        "Jornadas de Innovación": 0,
        "Microtalleres": 0,
        "Charlas": 0,
        "Acompañamiento Áulico": 0,
        "Externos": 0,
        "Total": 0,
    },
    loading: false,
    error: null,
};

export const HistorialSlice = createSlice({
    name: "getHistorial",
    initialState,
    reducers: {
        HistorialRequest: (state): HistorialState => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        HistorialSuccess: (
            state,
            action: PayloadAction<HistorialResponse>
        ): HistorialState => {
            return {
                ...state,
                historial: action.payload.respuesta.historial,
                horas_competencia: action.payload.respuesta.horas_competencia,
                horas_evento: action.payload.respuesta.horas_evento,
                loading: false,
                error: null,
            };
        },
        HistorialFailure: (
            state,
            action: PayloadAction<string>
        ): HistorialState => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        HistorialReset: (): HistorialState => {
            return initialState;
        },
    },
});

export const getHistorial =
    (): AppThunk =>
    async (dispatch: AppThunkDispatch): Promise<void> => {
        dispatch(HistorialRequest());
        try {
            const url = `/historial`;
            const { data }: AxiosResponse<HistorialResponse> = await axiosInstance.get(url);
            dispatch(HistorialSuccess(data));
        } catch (error: any) {
            dispatch(HistorialFailure(error.response?.data?.error || "Error desconocido"));
            console.log(error);
        }
    };

export const {
    HistorialRequest,
    HistorialSuccess,
    HistorialFailure,
    HistorialReset,
} = HistorialSlice.actions;

export const HistorialReducer = HistorialSlice.reducer;
