import { configureStore } from "@reduxjs/toolkit";

import { facusGetAllReducer } from "./encuesta/getFacultades.slice"; 

import { carrerasGetAllReducer } from "./encuesta/getCarreras.slice";
import { preguntasGetAllReducer } from "./encuesta/getPreguntas.slice";
import { validateEncuestaReducer } from "./encuesta/validateEncuesta.slice";
import { postPreguntasReducer } from "./encuesta/postRespuesta.slice";
import { periodosGetAllReducer } from "./resultados/getPeriodos.slice";
import { ResultadosGetAllReducer } from "./resultados/getResultados.slice";

const store = configureStore({
  // Reducers allow us to modify/update the state of the application
  reducer: {
    

    facus: facusGetAllReducer,
    carreras: carrerasGetAllReducer,
    preguntas: preguntasGetAllReducer,
    encuesta: validateEncuestaReducer,
    save_encuesta: postPreguntasReducer,
    periodos: periodosGetAllReducer,
    resultados: ResultadosGetAllReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
