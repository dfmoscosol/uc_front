import { Asistencia, Capacitacion } from "../../data/interfaces/capacitaciones.model";

export interface CapacitacionesOpenResponse {
    error: string,
    estado: boolean,
    respuesta: CapacitacionesOpenState,
}

export interface CapacitacionesOpenState {
    capacitaciones: Capacitacion[]
}

export interface AsistenciasResponse {
  error: string,
  estado: boolean,
  respuesta: AsistenciasState,
}

export interface AsistenciasState {
  data: Asistencia[]
}

export interface PostInscripcionResponse {
    error: string,
    estado: boolean,
    respuesta: PostInscripcionState,
  }

  export interface PostInscripcionState {
    exito: any;
    isLoading: boolean
  }

  export interface PostAsistenciaResponse {
    error: string,
    estado: boolean,
    respuesta: PostAsistenciaState,
  }

  export interface PostAsistenciaState {
    exito: any;
    isLoading: boolean;
  }