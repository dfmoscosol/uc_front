import { Evento, Certificado, CompetenciasHoras, EventosHoras} from "../../data/interfaces/historial.model"


export interface HistorialResponse {
    estado: boolean;
    respuesta: {
        historial: HistorialState["historial"];
        horas_competencia: CompetenciasHoras;
        horas_evento: EventosHoras;
    };
    error: string | null;
}

export interface HistorialState {
    historial: {
        jornadas: Evento[];
        charlas: Evento[];
        microtalleres: Evento[];
        observaciones: Evento[];
        externos: Certificado[];
    };
    horas_competencia: CompetenciasHoras;
    horas_evento: EventosHoras;
    loading: boolean;
    error: string | null;
}

export interface DownloadInformeObservacionState {
    loading: boolean;
    error: string | null;
}

export interface DownloadCertificadoState {
    loading: boolean;
    error: string | null;
}