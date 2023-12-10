import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { AcreditacionesCapacitacionResponse, AcreditacionesCapacitacionState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: AcreditacionesCapacitacionState = {
    acreditaciones_capacitacion: [],
    isLoading: false
};

export const AcreditacionesCapacitacionGetAllSlice = createSlice({
    name: "getAllAcreditacionesCapacitaciones",
    initialState,
    reducers: {
        AcreditacionesCapacitacionGetAllRequest: (state): AcreditacionesCapacitacionState => {
            return {
                ...state,
                isLoading: true
            };
        },
        AcreditacionesCapacitacionGetAllSuccess: (
            state,
            action: PayloadAction<AcreditacionesCapacitacionResponse>
        ): AcreditacionesCapacitacionState => {
            return {
                ...state,
                acreditaciones_capacitacion: action.payload.respuesta.acreditaciones_capacitacion,
                isLoading: false
            };
        },
        AcreditacionesCapacitacionGetAllFail: (
            state,
        ): AcreditacionesCapacitacionState => {
            return {
                ...state,
                isLoading: false
            };
        },
        AcreditacionesCapacitacionGetAllReset: (): AcreditacionesCapacitacionState => {
            return initialState;
        },
    },
});

export const getAcreditacionesCapacitacion =
    (): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(AcreditacionesCapacitacionGetAllRequest());
            try {
                const { data }: AxiosResponse<AcreditacionesCapacitacionResponse> =
                    await axiosInstance.get("/info_acreditacion");
                dispatch(AcreditacionesCapacitacionGetAllSuccess(data));
            } catch (error) {
                dispatch(AcreditacionesCapacitacionGetAllFail())
                console.log(error)
            }
        };

export const {
    AcreditacionesCapacitacionGetAllSuccess,
    AcreditacionesCapacitacionGetAllRequest,
    AcreditacionesCapacitacionGetAllReset,
    AcreditacionesCapacitacionGetAllFail,
} = AcreditacionesCapacitacionGetAllSlice.actions;

export const AcreditacionesCapacitacionGetAllReducer = AcreditacionesCapacitacionGetAllSlice.reducer;