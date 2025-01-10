export interface Evento {
    nombre_evento: string;
    horas: number;
    taller?: string;
    competencia?: string;
    momento?: string;
    fecha: string | null;
    aprobacion?: boolean;
    comentario?: string;
    enlace_descarga?: string;
    id?:number;
}

export interface Certificado {
    nombre_curso: string;
    fecha_subida: string;
    horas_certificado: number;
    horas_acredita: number;
    aprobacion: boolean;
}

export interface CompetenciasHoras {
    pedagogica: number;
    comunicativa: number;
    gestion: number;
    investigativa: number;
    tecnologica: number;
}

export type EventosHoras = {
    [tipoEvento: string]: number; // Permite claves de tipo string y valores numéricos
  };
  