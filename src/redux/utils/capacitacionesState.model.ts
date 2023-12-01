import { Capacitacion } from "../../data/interfaces/capacitaciones.model";

export interface CapacitacionesOpenResponse {
    error: string,
    estado: boolean,
    respuesta: CapacitacionesOpenState,
}

export interface CapacitacionesOpenState {
    capacitaciones: Capacitacion[]
}

export interface PostInscripcionResponse {
    error: string,
    estado: boolean,
    respuesta: PostInscripcionState,
  }

  export interface PostInscripcionState {
    exito: boolean;
  }