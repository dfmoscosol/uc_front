import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { Configuracion } from "../../data/interfaces/cursos.model";
import { ConfiguracionResponse, ConfiguracionState } from "../utils/capacitacionesState.model";

const initialState: ConfiguracionState = {
    configuraciones: {
        porcentaje_programa: 0,
        porcentaje_certificado: 0,
        horas_programa: 0,
    },
    totalHorasCertificados: 0,
    loading: false,
    error: null,
};

export const ConfiguracionSlice = createSlice({
    name: "configuracion",
    initialState,
    reducers: {
        ConfiguracionRequest: (state): ConfiguracionState => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        ConfiguracionSuccess: (
            state,
            action: PayloadAction<{
                configuraciones: Configuracion;
                totalHorasCertificados: number;
            }>
        ): ConfiguracionState => {
            return {
                ...state,
                configuraciones: action.payload.configuraciones,
                totalHorasCertificados: action.payload.totalHorasCertificados,
                loading: false,
                error: null,
            };
        },
        ConfiguracionFailure: (
            state,
            action: PayloadAction<string>
        ): ConfiguracionState => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        ConfiguracionReset: (): ConfiguracionState => {
            return initialState;
        },
    },
});

export const {
    ConfiguracionRequest,
    ConfiguracionSuccess,
    ConfiguracionFailure,
    ConfiguracionReset,
} = ConfiguracionSlice.actions;

export const getConfiguraciones = (): AppThunk =>
    async (dispatch: AppThunkDispatch): Promise<void> => {
        dispatch(ConfiguracionRequest());
        try {
            const { data }: AxiosResponse<ConfiguracionResponse> =
                await axiosInstance.get("/configuracion");
            if (data.estado) {
                dispatch(ConfiguracionSuccess({
                    configuraciones: data.respuesta.configuraciones,
                    totalHorasCertificados: data.respuesta.total_horas_certificados,
                }));
            } else {
                dispatch(ConfiguracionFailure(data.error));
            }
        } catch (error) {
            dispatch(ConfiguracionFailure("Error al obtener la configuración."));
        }
    };

export const ConfiguracionReducer = ConfiguracionSlice.reducer;
