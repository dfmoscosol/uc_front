import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";

/**
 * https://redux.js.org/usage/usage-with-typescript
 * 
 * export type ThunkAction<
    R, // Return type of the thunk function
    S, // state type used by getState
    E, // any "extra argument" injected into the thunk
    A extends Action // known types of actions that can be dispatched
  > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
 */

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
