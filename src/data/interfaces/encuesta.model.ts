 
  export interface Facultad {
    id_facultad: string;
    nombre: string;
  }

  export interface Carrera {
    id_carrera: string;
    nombre: string;
  }

  export interface Puntaje {
    id_pregunta: number;
    puntaje: number;
  }

  export interface Pregunta {
    id_pregunta:number;
    pregunta: string;
  }

  export interface EncuestaForm {
    id_facultad: number;
    id_carrera: number;
    cedula:string;
    uid_firebase_fk:string;
    puntajes:Puntaje[]
  }



  