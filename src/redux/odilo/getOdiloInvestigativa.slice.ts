import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import axiosInstance from "../../services/api.services";
import { OdiloInvestigativaResponse, OdiloInvestigativaState } from "../utils/odiloState.model";

const initialState: OdiloInvestigativaState = {
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

export const OdiloInvestigativaGetAllSlice = createSlice({
    name: "getAllInvestigativa",
    initialState,
    reducers: {
        OdiloInvestigativaGetAllRequest: (state): OdiloInvestigativaState => {
            return {
                ...state,
                loading: true
            };
        },
        OdiloInvestigativaGetAllSuccess: (
            state,
            action: PayloadAction<OdiloInvestigativaResponse>
        ): OdiloInvestigativaState => {
            return {
                ...state,
                odilo: action.payload.respuesta.odilo,
                info: action.payload.respuesta.info,
                loading:false
            };
        },
        OdiloInvestigativaGetAllReset: (): OdiloInvestigativaState => {
            return initialState;
        },
    },
});

export const getOdiloInvestigativa =
    (pagina: number = 1, competencia: string = "investigativa"): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(OdiloInvestigativaGetAllRequest());
            try {
                const { data }: AxiosResponse<OdiloInvestigativaResponse> =
                    await axiosInstance.get("/odilo",
                        {
                            params: { pagina, competencia },
                        });
                dispatch(OdiloInvestigativaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    OdiloInvestigativaGetAllSuccess,
    OdiloInvestigativaGetAllRequest,
    OdiloInvestigativaGetAllReset,
} = OdiloInvestigativaGetAllSlice.actions;

export const OdiloInvestigativaGetAllReducer = OdiloInvestigativaGetAllSlice.reducer;