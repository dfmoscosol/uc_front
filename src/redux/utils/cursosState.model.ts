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
    exito: any;
    isLoading: boolean
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
    exito: any;
    isLoading: boolean;
}

export interface AcreditacionesCapacitacionResponse {
    error: string,
    estado: boolean,
    respuesta: AcreditacionesCapacitacionState,
}

export interface AcreditacionesCapacitacionState {
    acreditaciones_capacitacion: AcreditacionesCapacitacion[];
    isLoading:boolean;
}

export interface AcreditacionesCapacitacion {
    aprobado: boolean;
    asistencia: boolean;
    horas: number;
    nombre: string;
    presencial: boolean;
    tipo:string;
    observacion: string;
}

export interface AcreditacionesCursosResponse {
    error: string,
    estado: boolean,
    respuesta: AcreditacionesCursosState,
}

export interface AcreditacionesCursosState {
    acreditaciones_cursos: AcreditacionesCursos[];
    isLoading:boolean;
}

export interface AcreditacionesCursos {
    horas: number;
    titulo: string;
    isapproved: boolean;
    competencia:string;
    observacion: string;
}