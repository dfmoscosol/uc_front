import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { CapacitacionesOpenResponse, CapacitacionesOpenState } from "../utils/capacitacionesState.model";

const initialState: CapacitacionesOpenState = {
    eventos: []
};

export const CapacitacionesOpenGetAllSlice = createSlice({
    name: "getAllCapacitaciones",
    initialState,
    reducers: {
        CapacitacionesOpenGetAllRequest: (state): CapacitacionesOpenState => {
            return {
                ...state,
            };
        },
        CapacitacionesOpenGetAllSuccess: (
            state,
            action: PayloadAction<CapacitacionesOpenResponse>
        ): CapacitacionesOpenState => {
            return {
                ...state,
                eventos: action.payload.respuesta.eventos
            };
        },
        CapacitacionesOpenGetAllReset: (): CapacitacionesOpenState => {
            return initialState;
        },
    },
});

export const getCapacitacionesOpen =
    (): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CapacitacionesOpenGetAllRequest());
            try {
                const { data }: AxiosResponse<CapacitacionesOpenResponse> = await axiosInstance.get("/eventos");
                dispatch(CapacitacionesOpenGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    CapacitacionesOpenGetAllSuccess,
    CapacitacionesOpenGetAllRequest,
    CapacitacionesOpenGetAllReset,
} = CapacitacionesOpenGetAllSlice.actions;

export const CapacitacionesOpenGetAllReducer = CapacitacionesOpenGetAllSlice.reducer;