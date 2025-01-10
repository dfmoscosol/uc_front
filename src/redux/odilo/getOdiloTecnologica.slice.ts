import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { OdiloTecnologicaResponse, OdiloTecnologicaState } from "../utils/odiloState.model";

const initialState: OdiloTecnologicaState = {
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
    loading:false
};

export const OdiloTecnologicaGetAllSlice = createSlice({
    name: "getAllTecnologica",
    initialState,
    reducers: {
        OdiloTecnologicaGetAllRequest: (state): OdiloTecnologicaState => {
            return {
                ...state,
                loading: true,
            };
        },
        OdiloTecnologicaGetAllSuccess: (
            state,
            action: PayloadAction<OdiloTecnologicaResponse>
        ): OdiloTecnologicaState => {
            return {
                ...state,
                odilo: action.payload.respuesta.odilo,
                info: action.payload.respuesta.info,
                loading: false
            };
        },
        OdiloTecnologicaGetAllReset: (): OdiloTecnologicaState => {
            return initialState;
        },
    },
});

export const getOdiloTecnologica =
    (pagina: number = 1, competencia: string = "tecnologica"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(OdiloTecnologicaGetAllRequest());
            try {
                const { data }: AxiosResponse<OdiloTecnologicaResponse> =
                    await axiosInstance.get("/odilo",
                        {
                            params: { pagina, competencia },
                        });
                dispatch(OdiloTecnologicaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    OdiloTecnologicaGetAllSuccess,
    OdiloTecnologicaGetAllRequest,
    OdiloTecnologicaGetAllReset,
} = OdiloTecnologicaGetAllSlice.actions;

export const OdiloTecnologicaGetAllReducer = OdiloTecnologicaGetAllSlice.reducer;