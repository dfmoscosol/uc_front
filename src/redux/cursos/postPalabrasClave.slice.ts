import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../services/api.services";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { PalabrasClavePostState, PostPalabrasClaveResponse } from "../utils/cursosState.model";
import { KeyWordsForm } from "../../data/interfaces/cursos.model";

const initialState: PalabrasClavePostState = {
  exito: null,
  isLoading: false
};

export const postPalabrasClaveSlice = createSlice({
  name: "postPalabrasClave",
  initialState,
  reducers: {
    postPalabrasClaveRequest: (state): PalabrasClavePostState => {
      return {
        ...state,
        isLoading:true
      };
    },
    postPalabrasClaveSuccess: (
      state,
      action: PayloadAction<any>
    ): PalabrasClavePostState => {
      return {
        ...state,
        exito: action.payload,
        isLoading: false
      };
    },
    postPalabrasClaveFail: (
      state,
      action: PayloadAction<any>
    ): PalabrasClavePostState => {
      return {
        ...state,
        exito: action.payload,
        isLoading: false
      };
    },
    postPalabrasClaveReset: (state): PalabrasClavePostState => {
      return initialState;
    },
  },
});

export const postPalabrasClave =
  (form:KeyWordsForm): AppThunk =>
  
  async (dispatch: AppThunkDispatch): Promise<void> => {
    dispatch(postPalabrasClaveRequest());
    try {
      const { data }: AxiosResponse<PostPalabrasClaveResponse> = await axiosInstance.post(
        "/save_keywords", 
        form
      );
      dispatch(postPalabrasClaveSuccess(data.estado));
    } catch (err) {
      dispatch(postPalabrasClaveFail(err));
    }
  };

export const { postPalabrasClaveSuccess, postPalabrasClaveRequest, postPalabrasClaveFail,postPalabrasClaveReset } =
postPalabrasClaveSlice.actions;

export const postPalabrasClaveReducer = postPalabrasClaveSlice.reducer;