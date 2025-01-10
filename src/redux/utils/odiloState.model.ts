import { Info, Odilo } from "../../data/interfaces/odilo.model";

export interface OdiloComunicativaState {
    info?: Info;
    odilo?: Odilo[];
    loading: boolean
}

export interface OdiloComunicativaResponse {
    error: string,
    estado: boolean,
    respuesta: OdiloComunicativaState,
}

export interface OdiloPedagogicaState {
    info?: Info;
    odilo?: Odilo[];
    loading: boolean
}

export interface OdiloPedagogicaResponse {
    error: string,
    estado: boolean,
    respuesta: OdiloPedagogicaState,
}

export interface OdiloTecnologicaState {
    info?: Info;
    odilo?: Odilo[];
    loading: boolean
}

export interface OdiloTecnologicaResponse {
    error: string,
    estado: boolean,
    respuesta: OdiloTecnologicaState,
}

export interface OdiloGestionState {
    info?: Info;
    odilo?: Odilo[];
    loading: boolean
}

export interface OdiloGestionResponse {
    error: string,
    estado: boolean,
    respuesta: OdiloGestionState,
}

export interface OdiloInvestigativaState {
    info?: Info;
    odilo?: Odilo[];
    loading: boolean
}

export interface OdiloInvestigativaResponse {
    error: string,
    estado: boolean,
    respuesta: OdiloInvestigativaState,
}