export interface Evento {
    id: number;
    nombre: string;
    tipo: number;
    horas_acreditadas: number;
    cupos: number;
    inscripcion: boolean;
    id_jornada?: number;
    nombre_jornada?: string;
    fechas: Fecha[];
    inscrito_jornada?: boolean;
    inscrito_taller?: boolean;
    inscrito?: boolean;
    aceptada?: boolean;
    horas?: number;
    tipo_modalidad: string;
    sesiones?: Sesion[];
    ponentes?: Ponente[];
    hora_inicio?: string;
    duracion?: number;
    modalidad?: string;
    ubicacion?: string;
    periodo?: string;
}

export interface Fecha {
    id: number;
    fecha: string; // Formato 'dd-mm-yyyy'
}

export interface Sesion {
    id: number;
    fecha: string; // Formato 'yyyy-mm-dd'
    fecha_id: number;
    hora_inicio: string; // Formato 'HH:MM'
    duracion: number;
    modalidad: string;
    ubicacion: string;
}

export interface Ponente {
    nombre: string;
    titulo_charla?: string; // Solo para charlas
}

export interface InscripcionForm {
    evento_id: number;
    taller_id?: number;
    aceptada?: boolean;
  }
  
  export interface ObservacionForm {
    numero_celular: string; 
    evento_id?: number;        
    anios_ejercicio: number;           
    facultad_id: number;              
    carrera_id: number;               
    asignatura: string;                
    ciclo_carrera: number;            
    numero_estudiantes: number;        
    campus: string;                   
    duracion_clase: number;            
    inclusion: boolean;               
    horariosDisponibles: {             
      dia: string;                     
      hora_inicio: string;             
      hora_fin: string;               
    }[];
    comentarios: string;               
  }
  