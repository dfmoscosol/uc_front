import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CursosPedagogicaResponse, CursosPedagogicaState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: CursosPedagogicaState = {
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

export const CursosPedagogicaGetAllSlice = createSlice({
    name: "getAllPedagogica",
    initialState,
    reducers: {
        CursosPedagogicaGetAllRequest: (state): CursosPedagogicaState => {
            return {
                ...state,
            };
        },
        CursosPedagogicaGetAllSuccess: (
            state,
            action: PayloadAction<CursosPedagogicaResponse>
        ): CursosPedagogicaState => {
            return {
                ...state,
                cursos: action.payload.respuesta.cursos,
                info: action.payload.respuesta.info,
            };
        },
        CursosPedagogicaGetAllReset: (): CursosPedagogicaState => {
            return initialState;
        },
    },
});

export const getCursosPedagogica =
    (pagina: number = 1, competencia: string = "pedagogica"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CursosPedagogicaGetAllRequest());
            try {
                const { data }: AxiosResponse<CursosPedagogicaResponse> =
                    await axiosInstance.get("/get_user_last_resultado_cursos",
                        {
                            params: { pagina, competencia },
                        });
                dispatch(CursosPedagogicaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    CursosPedagogicaGetAllSuccess,
    CursosPedagogicaGetAllRequest,
    CursosPedagogicaGetAllReset,
} = CursosPedagogicaGetAllSlice.actions;

export const CursosPedagogicaGetAllReducer = CursosPedagogicaGetAllSlice.reducer;