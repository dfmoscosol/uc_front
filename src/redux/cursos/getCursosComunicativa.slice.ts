import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CursosComunicativaResponse, CursosComunicativaState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: CursosComunicativaState = {
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
    }

};

export const CursosComunicativaGetAllSlice = createSlice({
    name: "getAllComunicativa",
    initialState,
    reducers: {
        CursosComunicativaGetAllRequest: (state): CursosComunicativaState => {
            return {
                ...state,
            };
        },
        CursosComunicativaGetAllSuccess: (
            state,
            action: PayloadAction<CursosComunicativaResponse>
        ): CursosComunicativaState => {
            return {
                ...state,
                cursos: action.payload.respuesta.cursos,
                info: action.payload.respuesta.info,
            };
        },
        CursosComunicativaGetAllReset: (): CursosComunicativaState => {
            return initialState;
        },
    },
});

export const getCursosComunicativa =
    (pagina: number = 1, competencia: string = "comunicativa"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CursosComunicativaGetAllRequest());
            try {
                const { data }: AxiosResponse<CursosComunicativaResponse> =
                    await axiosInstance.get("/get_user_last_resultado_cursos",
                        {
                            params: { pagina, competencia },
                        });
                dispatch(CursosComunicativaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    CursosComunicativaGetAllSuccess,
    CursosComunicativaGetAllRequest,
    CursosComunicativaGetAllReset,
} = CursosComunicativaGetAllSlice.actions;

export const CursosComunicativaGetAllReducer = CursosComunicativaGetAllSlice.reducer;