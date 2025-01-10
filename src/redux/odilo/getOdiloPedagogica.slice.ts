import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { OdiloPedagogicaResponse, OdiloPedagogicaState } from "../utils/odiloState.model";

const initialState: OdiloPedagogicaState = {
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

export const OdiloPedagogicaGetAllSlice = createSlice({
    name: "getAllPedagogica",
    initialState,
    reducers: {
        OdiloPedagogicaGetAllRequest: (state): OdiloPedagogicaState => {
            return {
                ...state,
                loading: true,
            };
        },
        OdiloPedagogicaGetAllSuccess: (
            state,
            action: PayloadAction<OdiloPedagogicaResponse>
        ): OdiloPedagogicaState => {
            return {
                ...state,
                odilo: action.payload.respuesta.odilo,
                info: action.payload.respuesta.info,
                loading: false
            };
        },
        OdiloPedagogicaGetAllReset: (): OdiloPedagogicaState => {
            return initialState;
        },
    },
});

export const getOdiloPedagogica =
    (pagina: number = 1, competencia: string = "pedagogica"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(OdiloPedagogicaGetAllRequest());
            try {
                const { data }: AxiosResponse<OdiloPedagogicaResponse> =
                    await axiosInstance.get("/odilo",
                        {
                            params: { pagina, competencia },
                        });
                dispatch(OdiloPedagogicaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    OdiloPedagogicaGetAllSuccess,
    OdiloPedagogicaGetAllRequest,
    OdiloPedagogicaGetAllReset,
} = OdiloPedagogicaGetAllSlice.actions;

export const OdiloPedagogicaGetAllReducer = OdiloPedagogicaGetAllSlice.reducer;