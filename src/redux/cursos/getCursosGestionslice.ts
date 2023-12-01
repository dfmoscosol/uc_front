import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CursosGestionResponse, CursosGestionState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: CursosGestionState = {
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

export const CursosGestionGetAllSlice = createSlice({
    name: "getAllGestion",
    initialState,
    reducers: {
        CursosGestionGetAllRequest: (state): CursosGestionState => {
            return {
                ...state,
            };
        },
        CursosGestionGetAllSuccess: (
            state,
            action: PayloadAction<CursosGestionResponse>
        ): CursosGestionState => {
            return {
                ...state,
                cursos: action.payload.respuesta.cursos,
                info: action.payload.respuesta.info,
            };
        },
        CursosGestionGetAllReset: (): CursosGestionState => {
            return initialState;
        },
    },
});

export const getCursosGestion =
    (pagina: number = 1, competencia: string = "gestion"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CursosGestionGetAllRequest());
            try {
                const { data }: AxiosResponse<CursosGestionResponse> =
                await axiosInstance.get("/get_user_last_resultado_cursos",
                {
                    params: { pagina, competencia },
                });
                dispatch(CursosGestionGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    CursosGestionGetAllSuccess,
    CursosGestionGetAllRequest,
    CursosGestionGetAllReset,
} = CursosGestionGetAllSlice.actions;

export const CursosGestionGetAllReducer = CursosGestionGetAllSlice.reducer;