import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CursosTitulosResponse, CursosTitulosState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: CursosTitulosState = {
    cursos_titulos: [],
};

export const CursosTitulosGetAllSlice = createSlice({
    name: "getAllTitulosCursos",
    initialState,
    reducers: {
        CursosTitulosGetAllRequest: (state): CursosTitulosState => {
            return {
                ...state,
            };
        },
        CursosTitulosGetAllSuccess: (
            state,
            action: PayloadAction<CursosTitulosResponse>
        ): CursosTitulosState => {
            return {
                ...state,
                cursos_titulos: action.payload.respuesta.cursos_titulos
            };
        },
        CursosTitulosGetAllReset: (): CursosTitulosState => {
            return initialState;
        },
    },
});

export const getCursosTitulos =
    (): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CursosTitulosGetAllRequest());
            try {
                const { data }: AxiosResponse<CursosTitulosResponse> =
                await axiosInstance.get("/get_cursos_titles");
                dispatch(CursosTitulosGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    CursosTitulosGetAllSuccess,
    CursosTitulosGetAllRequest,
    CursosTitulosGetAllReset,
} = CursosTitulosGetAllSlice.actions;

export const CursosTitulosGetAllReducer = CursosTitulosGetAllSlice.reducer;