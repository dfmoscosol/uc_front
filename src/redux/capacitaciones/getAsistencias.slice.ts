import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { AsistenciasResponse, AsistenciasState } from "../utils/capacitacionesState.model";
import { Capacitacion } from "../../data/interfaces/capacitaciones.model";
import { getJSON } from "jquery";

const initialState: AsistenciasState = {
    data: []
};

export const AsistenciasGetAllSlice = createSlice({
    name: "getAllCapacitaciones",
    initialState,
    reducers: {
        AsistenciasGetAllRequest: (state): AsistenciasState => {
            return {
                ...state,
            };
        },
        AsistenciasGetAllSuccess: (
            state,
            action: PayloadAction<AsistenciasResponse>
        ): AsistenciasState => {
            return {
                ...state,
                data: action.payload.respuesta.data
            };
        },
        AsistenciasGetAllReset: (): AsistenciasState => {
            return initialState;
        },
    },
});

export const getAsistencias =
    (): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(AsistenciasGetAllRequest());
            try {
                const { data }: AxiosResponse<AsistenciasResponse> =
                    await axiosInstance.get("/ver_inscripciones");
                dispatch(AsistenciasGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    AsistenciasGetAllSuccess,
    AsistenciasGetAllRequest,
    AsistenciasGetAllReset,
} = AsistenciasGetAllSlice.actions;

export const AsistenciasGetAllReducer = AsistenciasGetAllSlice.reducer;