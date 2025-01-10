import { Evento } from "../../data/interfaces/capacitaciones.model";
import { Configuracion } from "../../data/interfaces/cursos.model";

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

export interface ConfiguracionResponse {
  estado: boolean;
  respuesta: {
      configuraciones: Configuracion;
      total_horas_certificados: number;
  };
  error: string;
}

export interface ConfiguracionState {
  configuraciones: Configuracion;
  totalHorasCertificados: number;
  loading: boolean;
  error: string | null;
}