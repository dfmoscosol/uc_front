import { Evento } from "../../data/interfaces/capacitaciones.model";

export interface CapacitacionResponse {
  error: string;
  estado: boolean;
  respuesta: CapacitacionState;
}

export interface CapacitacionState {
  evento: Evento | null;
}

export interface CapacitacionesOpenResponse {
  error: string;
  estado: boolean;
  respuesta: CapacitacionesOpenState;
}

export interface CapacitacionesOpenState {
  eventos: Evento[];
  isLoading: boolean;
}

export interface PostInscripcionResponse {
  estado: boolean;
  respuesta?: string;
  error?: string;
}

export interface PostInscripcionState {
  exito: PostInscripcionResponse | null;
  isLoading: boolean;
}