import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { OdiloGestionResponse, OdiloGestionState } from "../utils/odiloState.model";

const initialState: OdiloGestionState = {
    odilo: [],
    info: {
        currentPage: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 0,
        nextPage: null,
        prevPage: null,
        total: 0,
        total_pages: 0
    },
    loading:true

};

export const OdiloGestionGetAllSlice = createSlice({
    name: "getAllGestion",
    initialState,
    reducers: {
        OdiloGestionGetAllRequest: (state): OdiloGestionState => {
            return {
                ...state,
                loading:true
            };
        },
        OdiloGestionGetAllSuccess: (
            state,
            action: PayloadAction<OdiloGestionResponse>
        ): OdiloGestionState => {
            return {
                ...state,
                odilo: action.payload.respuesta.odilo,
                info: action.payload.respuesta.info,
                loading:false
            };
        },
        OdiloGestionGetAllReset: (): OdiloGestionState => {
            return initialState;
        },
    },
});

export const getOdiloGestion =
    (pagina: number = 1, competencia: string = "gestion"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(OdiloGestionGetAllRequest());
            try {
                const { data }: AxiosResponse<OdiloGestionResponse> =
                await axiosInstance.get("/odilo",
                {
                    params: { pagina, competencia },
                });
                dispatch(OdiloGestionGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    OdiloGestionGetAllSuccess,
    OdiloGestionGetAllRequest,
    OdiloGestionGetAllReset,
} = OdiloGestionGetAllSlice.actions;

export const OdiloGestionGetAllReducer = OdiloGestionGetAllSlice.reducer;