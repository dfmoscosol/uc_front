import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CursosTecnologicaResponse, CursosTecnologicaState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: CursosTecnologicaState = {
    cursos: [],
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

export const CursosTecnologicaGetAllSlice = createSlice({
    name: "getAllTecnologica",
    initialState,
    reducers: {
        CursosTecnologicaGetAllRequest: (state): CursosTecnologicaState => {
            return {
                ...state,
                loading:true
            };
        },
        CursosTecnologicaGetAllSuccess: (
            state,
            action: PayloadAction<CursosTecnologicaResponse>
        ): CursosTecnologicaState => {
            return {
                ...state,
                cursos: action.payload.respuesta.cursos,
                info: action.payload.respuesta.info,
                loading:false
            };
        },
        CursosTecnologicaGetAllReset: (): CursosTecnologicaState => {
            return initialState;
        },
    },
});

export const getCursosTecnologica =
    (pagina: number = 1, competencia: string = "tecnologica"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CursosTecnologicaGetAllRequest());
            try {
                const { data }: AxiosResponse<CursosTecnologicaResponse> =
                await axiosInstance.get("/cursos",
                {
                    params: { pagina, competencia },
                });
                dispatch(CursosTecnologicaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    CursosTecnologicaGetAllSuccess,
    CursosTecnologicaGetAllRequest,
    CursosTecnologicaGetAllReset,
} = CursosTecnologicaGetAllSlice.actions;

export const CursosTecnologicaGetAllReducer = CursosTecnologicaGetAllSlice.reducer;