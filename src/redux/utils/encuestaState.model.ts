import {  Carrera, Facultad, Pregunta } from "../../data/interfaces/encuesta.model";


export interface PreguntasResponse {
  error: string,
  estado: boolean,
  respuesta: PreguntasState,
}

export interface ValidateEncuestaResponse {
  resultado: boolean,
}

export interface PreguntasState {
    num_preguntas: number,
    data?: {
      comunicativa: Pregunta[];
      investigativa: Pregunta[];
      pedagogica: Pregunta[];
      gestion: Pregunta[];
      tecnologica: Pregunta[];
    };
  }

  export interface FacultadesResponse {
    error: string,
    estado: boolean,
    respuesta: FacultadesState,
  }

  export interface FacultadesState {
    data: Facultad[];
  }

  export interface CarrerasResponse {
    error: string,
    estado: boolean,
    respuesta: CarrerasState,
  }

  export interface CarrerasState {
    data: Carrera[];
  }

  export interface PostPreguntasResponse {
    error: string,
    estado: boolean,
    respuesta: any,
  }

  export interface RespuestaPostState {
    exito: boolean;
    isLoading: boolean;
  }
  
  export interface ValidarEncuestaState {
    encuesta: boolean;
  }