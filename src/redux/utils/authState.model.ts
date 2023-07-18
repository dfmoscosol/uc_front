
export interface AuthResponse {
    error: string,
    estado: boolean,
    respuesta: AuthState,
  }

export interface AuthState {
    data: string;
  }

export interface User{
  uid:any,
  nombre:any,
  id_universidad:number,
  correo:any,
  token:any,
  photoUrl:any,
}
