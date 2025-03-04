import { configureStore } from "@reduxjs/toolkit";


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
import { CapacitacionGetOneReducer } from "./capacitaciones/getCapacitacion.slice";
import { facusGetAllReducer } from "./encuesta/getFacultades.slice";
import { HistorialReducer } from "./historial/getHistorial.slice";
import { DownloadInformeObservacionReducer } from "./historial/getDownloadObservation.slice";
import { DownloadCertificadoReducer } from "./historial/getDownloadCertificado.slice";
import { ConfiguracionReducer } from "./capacitaciones/getConfiguracion.slice";
import { OdiloComunicativaGetAllReducer } from "./odilo/getOdiloComunicativa.slice";
import { OdiloPedagogicaGetAllReducer } from "./odilo/getOdiloPedagogica.slice";
import { OdiloTecnologicaGetAllReducer } from "./odilo/getOdiloTecnologica.slice";
import { OdiloInvestigativaGetAllReducer } from "./odilo/getOdiloInvestigativa.slice";
import { OdiloGestionGetAllReducer } from "./odilo/getOdiloGestionslice";

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
    odiloPedagogica: OdiloPedagogicaGetAllReducer,
    odiloTecnologica: OdiloTecnologicaGetAllReducer,
    odiloInvestigativa: OdiloInvestigativaGetAllReducer,
    odiloGestion: OdiloGestionGetAllReducer, 
    odiloComunicativa: OdiloComunicativaGetAllReducer,
    send_keywords: postPalabrasClaveReducer,
    titulos_cursos: CursosTitulosGetAllReducer,
    send_pdf: postPdfReducer,
    eventos: CapacitacionesOpenGetAllReducer,
    evento: CapacitacionGetOneReducer,
    postIncripcion: postInscripcionReducer,
    historial: HistorialReducer,
    configuracion: ConfiguracionReducer,
    downloadInforme: DownloadInformeObservacionReducer,
    downloadCertificado: DownloadCertificadoReducer
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
