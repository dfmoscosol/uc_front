import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { AcreditacionesCursosResponse,  AcreditacionesCursosState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: AcreditacionesCursosState = {
    acreditaciones_cursos: [],
    isLoading: false
};

export const AcreditacionesCursosGetAllSlice = createSlice({
    name: "getAllAcreditacionesCursos",
    initialState,
    reducers: {
        AcreditacionesCursosGetAllRequest: (state): AcreditacionesCursosState => {
            return {
                ...state,
                isLoading:true
            };
        },
        AcreditacionesCursosGetAllSuccess: (
            state,
            action: PayloadAction<AcreditacionesCursosResponse>
        ): AcreditacionesCursosState => {
            return {
                ...state,
                acreditaciones_cursos: action.payload.respuesta.acreditaciones_cursos,
                isLoading:false
            };
        },
        AcreditacionesCursosGetAllFail: (
            state,
        ): AcreditacionesCursosState => {
            return {
                ...state,
                isLoading: false
            };
        },
        AcreditacionesCursosGetAllReset: (): AcreditacionesCursosState => {
            return initialState;
        },
    },
});

export const getAcreditacionesCursos =
    (): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(AcreditacionesCursosGetAllRequest());
            try {
                const { data }: AxiosResponse<AcreditacionesCursosResponse> =
                await axiosInstance.get("/info_acreditacion_cursos");
                dispatch(AcreditacionesCursosGetAllSuccess(data));
            } catch (error) {
                dispatch(AcreditacionesCursosGetAllFail());
                console.log(error)
            }
        };

export const {
    AcreditacionesCursosGetAllSuccess,
    AcreditacionesCursosGetAllRequest,
    AcreditacionesCursosGetAllReset,
    AcreditacionesCursosGetAllFail,
} = AcreditacionesCursosGetAllSlice.actions;

export const AcreditacionesCursosGetAllReducer = AcreditacionesCursosGetAllSlice.reducer;