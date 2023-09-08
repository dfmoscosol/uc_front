export interface Periodo {
  id_periodo: string;
  nombre: string;
}

export interface Competencia {
  competencia: string,
  competencia_short: string,
  d1: string,
  d2: string,
  d3: string,
  momento: string,
  momento_short: string,
  puntaje: number
}