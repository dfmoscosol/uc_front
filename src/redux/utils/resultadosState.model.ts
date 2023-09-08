import { Competencia, Periodo } from "../../data/interfaces/respuesta.model";

export interface PeriodosState {
    data: Periodo[];
    ok: boolean
}

export interface PeriodosResponse {
    error: string,
    estado: boolean,
    respuesta: PeriodosState,
}

export interface ResultadosState {
    data: {
        comunicativa: Competencia,
        gestion: Competencia,
        investigativa: Competencia,
        pedagogica: Competencia,
        tecnologica: Competencia
    }
}

export interface ResultadosResponse {
    error: string,
    estado: boolean,
    respuesta: ResultadosState,
}