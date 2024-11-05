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
  
  export interface FacultadesState {
    lista: any[];
    loading: boolean;
    error: string | null;
  }
  
  export interface FacultadesResponse {
    respuesta: {
      data: Facultad[];
    };
  }

export interface CarrerasState {
  lista: Carrera[];
  loading: boolean;
  error: string | null;
}

export interface CarrerasResponse {
  respuesta: {
    data: Carrera[];
  };
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