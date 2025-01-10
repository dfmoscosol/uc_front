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

export interface Odilo {
    titulo: string;
    descripcion: string;
    urlimagen: string;
    url: string;
    autor: string;
    urllogo: string;
    puntuacion: number;
    tipo: string;
}