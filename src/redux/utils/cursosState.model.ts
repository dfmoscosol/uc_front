import { Curso, Info } from "../../data/interfaces/cursos.model";

export interface CursosPedagogicaResponse {
    error: string,
    estado: boolean,
    respuesta: CursosPedagogicaState,
}

export interface CursosPedagogicaState {
    info?: Info;
    cursos?: Curso[];
}

export interface CursosInvestigativaResponse {
    error: string,
    estado: boolean,
    respuesta: CursosInvestigativaState,
}

export interface CursosInvestigativaState {
    info?: Info;
    cursos?: Curso[];
}

export interface CursosTecnologicaResponse {
    error: string,
    estado: boolean,
    respuesta: CursosTecnologicaState,
}

export interface CursosTecnologicaState {
    info?: Info;
    cursos?: Curso[];
}

export interface CursosComunicativaResponse {
    error: string,
    estado: boolean,
    respuesta: CursosComunicativaState,
}

export interface CursosComunicativaState {
    info?: Info;
    cursos?: Curso[];
}

export interface CursosGestionResponse {
    error: string,
    estado: boolean,
    respuesta: CursosGestionState,
}

export interface CursosGestionState {
    info?: Info;
    cursos?: Curso[];
}

export interface PostPalabrasClaveResponse {
    error: string,
    estado: boolean,
    respuesta: PalabrasClavePostState,
  }

  export interface PalabrasClavePostState {
    exito: boolean;
  }

  export interface CursosTitulosResponse {
    error: string,
    estado: boolean,
    respuesta: CursosTitulosState,
}

export interface CursosTitulos {
    id_curso: number;
    titulo: string;
}

export interface CursosTitulosState {
    cursos_titulos?: CursosTitulos[];
}

export interface PostPdfResponse {
    error: string,
    estado: boolean,
    respuesta: PdfPostState,
  }

  export interface PdfPostState {
    exito: boolean;
  }