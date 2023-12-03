export interface Capacitacion {
    cupo: number;
    direccion: string;
    fechas: string[];
    horas: number;
    id_capacitacion: number;
    id_taller: number | null; 
    nombre: string;
    nombre_taller: string | null;
    nombre_tutor: string;
    num_inscritos: number;
    presencial: boolean;
    tipo: string;
    estado: number
}

export interface Asistencia {
    id_asistencia:number,
    asiste_entrada:boolean,
    asiste_salida:boolean,
    fecha:string,
    id_inscripcion:number,
    nombre:string,
    allow_asistencia_entrada:boolean,
    allow_asistencia_salida:boolean,
    tipo:string,
}

export interface InscripcionForm {
    id_capacitacion: number,
    id_taller: number | null,
}