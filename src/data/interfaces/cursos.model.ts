export interface Info {
    total: number;
    totalPages: number;
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
    url_img: string;
    url: string;
    ofertante: string;
    url_img_logo: string;
}