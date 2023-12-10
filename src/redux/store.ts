import { configureStore } from "@reduxjs/toolkit";

import { facusGetAllReducer } from "./encuesta/getFacultades.slice"; 

import { carrerasGetAllReducer } from "./encuesta/getCarreras.slice";
import { preguntasGetAllReducer } from "./encuesta/getPreguntas.slice";
import { validateEncuestaReducer } from "./encuesta/validateEncuesta.slice";
import { postPreguntasReducer } from "./encuesta/postRespuesta.slice";
import { periodosGetAllReducer } from "./resultados/getPeriodos.slice";
import { ResultadosGetAllReducer } from "./resultados/getResultados.slice";
import { CursosPedagogicaGetAllReducer } from "./cursos/getCursosPedagogica.slice";
import { CursosTecnologicaGetAllReducer } from "./cursos/getCursosTecnologica.slice";
import { CursosInvestigativaGetAllReducer } from "./cursos/getCursosInvestigativa.slice";
import { CursosGestionGetAllReducer } from "./cursos/getCursosGestionslice";
import { CursosComunicativaGetAllReducer } from "./cursos/getCursosComunicativa.slice";
import { postPalabrasClaveReducer } from "./cursos/postPalabrasClave.slice";
import { CursosTitulosGetAllReducer } from "./cursos/getTitulosCursos.slice";
import { postPdfReducer } from "./cursos/postPdfs.slice";
import { CapacitacionesOpenGetAllReducer } from "./capacitaciones/getOpenCapacitaciones";
import { postInscripcionReducer } from "./capacitaciones/postInscripcion.slice";
import { AsistenciasGetAllReducer } from "./capacitaciones/getAsistencias.slice";
import { postAsistenciaReducer } from "./capacitaciones/postAsistencia.slice";
import { AcreditacionesCapacitacionGetAllReducer } from "./cursos/getAcreditacionesCapacitaciones.slice";
import { AcreditacionesCursosGetAllReducer } from "./cursos/getAcreditacionesCursos.slice";

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
    cursosPedagogica: CursosPedagogicaGetAllReducer,
    cursosTecnologica: CursosTecnologicaGetAllReducer,
    cursosInvestigativa: CursosInvestigativaGetAllReducer,
    cursosGestion: CursosGestionGetAllReducer,
    cursosComunicativa: CursosComunicativaGetAllReducer,
    send_keywords: postPalabrasClaveReducer,
    titulos_cursos: CursosTitulosGetAllReducer,
    send_pdf: postPdfReducer,
    capacitaciones: CapacitacionesOpenGetAllReducer,
    post_inscripcion: postInscripcionReducer,
    asistencia: AsistenciasGetAllReducer,
    post_asistencia: postAsistenciaReducer,
    acreditaciones_capacitaciones: AcreditacionesCapacitacionGetAllReducer,
    acreditaciones_cursos: AcreditacionesCursosGetAllReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
