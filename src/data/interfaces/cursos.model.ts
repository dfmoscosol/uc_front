import { BlobOptions } from "buffer";

export interface Info {
    total: number;
    total_pages: number;
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: any;
    hasNextPage: boolean;
    nextPage: any;
    limit: number;
}

export interface Curso {
    titulo: string;
    descripcion: string;
    skills: string[];
    urlimagen: string;
    url: string;
    ofertante: string;
    urllogo: string;
    puntuacion: number;
    keywords: string[];
    momento: string
}

export interface KeyWordsForm {
    keywords: string[],
    isValid: boolean,
    competencia: string,
}

export interface PdfForm {
    file: File;
    id_curso: number;
  }