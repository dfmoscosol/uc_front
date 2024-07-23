import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { CapacitacionResponse, CapacitacionState } from "../utils/capacitacionesState.model";

const initialState: CapacitacionState = {
    evento: null
};

export const CapacitacionGetOneSlice = createSlice({
    name: "getOneCapacitacion",
    initialState,
    reducers: {
        CapacitacionGetOneRequest: (state): CapacitacionState => {
            return {
                ...state,
            };
        },
        CapacitacionGetOneSuccess: (
            state,
            action: PayloadAction<CapacitacionResponse>
        ): CapacitacionState => {
            return {
                ...state,
                evento: action.payload.respuesta.evento
            };
        },
        CapacitacionGetOneReset: (): CapacitacionState => {
            return initialState;
        },
    },
});

export const getCapacitacion =
    (eventoId: number, tallerId?: number): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CapacitacionGetOneRequest());
            try {
                const url = tallerId 
                    ? `/eventos/${eventoId}?taller_id=${tallerId}` 
                    : `/eventos/${eventoId}`;
                const { data }: AxiosResponse<CapacitacionResponse> = await axiosInstance.get(url);
                dispatch(CapacitacionGetOneSuccess(data));
            } catch (error) {
                console.log(error);
            }
        };

export const {
    CapacitacionGetOneSuccess,
    CapacitacionGetOneRequest,
    CapacitacionGetOneReset,
} = CapacitacionGetOneSlice.actions;

export const CapacitacionGetOneReducer = CapacitacionGetOneSlice.reducer;
