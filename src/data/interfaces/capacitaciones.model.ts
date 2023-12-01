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

export interface InscripcionForm {
    id_capacitacion: number,
    id_taller: number | null,
}