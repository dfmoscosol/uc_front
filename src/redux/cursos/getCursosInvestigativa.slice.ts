import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CursosInvestigativaResponse, CursosInvestigativaState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: CursosInvestigativaState = {
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

export const CursosInvestigativaGetAllSlice = createSlice({
    name: "getAllInvestigativa",
    initialState,
    reducers: {
        CursosInvestigativaGetAllRequest: (state): CursosInvestigativaState => {
            return {
                ...state,
                loading:true
            };
        },
        CursosInvestigativaGetAllSuccess: (
            state,
            action: PayloadAction<CursosInvestigativaResponse>
        ): CursosInvestigativaState => {
            return {
                ...state,
                cursos: action.payload.respuesta.cursos,
                info: action.payload.respuesta.info,
                loading:false
            };
        },
        CursosInvestigativaGetAllReset: (): CursosInvestigativaState => {
            return initialState;
        },
    },
});

export const getCursosInvestigativa =
    (pagina: number = 1, competencia: string = "investigativa"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CursosInvestigativaGetAllRequest());
            try {
                const { data }: AxiosResponse<CursosInvestigativaResponse> =
                    await axiosInstance.get("/cursos",
                        {
                            params: { pagina, competencia },
                        });
                dispatch(CursosInvestigativaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    CursosInvestigativaGetAllSuccess,
    CursosInvestigativaGetAllRequest,
    CursosInvestigativaGetAllReset,
} = CursosInvestigativaGetAllSlice.actions;

export const CursosInvestigativaGetAllReducer = CursosInvestigativaGetAllSlice.reducer;