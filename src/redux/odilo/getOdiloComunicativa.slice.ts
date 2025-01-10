import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { OdiloComunicativaResponse, OdiloComunicativaState } from "../utils/odiloState.model";

const initialState: OdiloComunicativaState = {
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

export const OdiloComunicativaGetAllSlice = createSlice({
    name: "getAllComunicativa",
    initialState,
    reducers: {
        OdiloComunicativaGetAllRequest: (state): OdiloComunicativaState => {
            return {
                ...state,
                loading: true,
            };
        },
        OdiloComunicativaGetAllSuccess: (
            state,
            action: PayloadAction<OdiloComunicativaResponse>
        ): OdiloComunicativaState => {
            return {
                ...state,
                odilo: action.payload.respuesta.odilo,
                info: action.payload.respuesta.info,
                loading: false
            };
        },
        OdiloComunicativaGetAllReset: (): OdiloComunicativaState => {
            return initialState;
        },
    },
});

export const getOdiloComunicativa =
    (pagina: number = 1, competencia: string = "comunicativa"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(OdiloComunicativaGetAllRequest());
            try {
                const { data }: AxiosResponse<OdiloComunicativaResponse> =
                    await axiosInstance.get("/odilo",
                        {
                            params: { pagina, competencia },
                        });
                dispatch(OdiloComunicativaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    OdiloComunicativaGetAllSuccess,
    OdiloComunicativaGetAllRequest,
    OdiloComunicativaGetAllReset,
} = OdiloComunicativaGetAllSlice.actions;

export const OdiloComunicativaGetAllReducer = OdiloComunicativaGetAllSlice.reducer;