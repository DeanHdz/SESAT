export namespace SESAT {

  /*------------------ USUARIO INTERFACE ------------------*/

  export interface Usuario {
    clave: number;
  }

  export interface CreateUsuario {
    clave: number;
  }

  export interface UpdateUsuario {
    clave: number;
  }

  /*------------------ ALUMNO INTERFACE ------------------*/
  
  export interface Alumno{
    clave: number;
    usuario: Usuario;
    estado_activo: number;
    ultimo_avance: number;
  }

  export interface CreateAlumno{
    clave: number;
    usuario: Usuario;
    estado_activo: number;
    ultimo_avance: number;
  }

  export interface UpdateAlumno{
    clave: number;
    usuario: Usuario;
    estado_activo: number;
    ultimo_avance: number;
  }

  /*------------------ ASESOR INTERFACE ------------------*/
  
  export interface Asesor{
    asesor_id: number;
    clave: number;
    sinodal: number;
    nombre: string;
  }

  export interface CreateAsesor{
    asesor_id: number;
    clave: number;
    sinodal: number;
    nombre: string;
  }

  export interface UpdateAsesor{
    asesor_id: number;
    clave: number;
    sinodal: number;
    nombre: string;
  }

  /*------------------ ASESOR EXTERNO INTERFACE ------------------*/
  
  export interface AsesorExterno{
    clave: number;
    telefono: string;
    institucion: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
  }

  export interface CreateAsesorExterno{
    clave: number;
    telefono: string;
    institucion: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
  }

  export interface UpdateAsesorExterno{
    clave: number;
    telefono: string;
    institucion: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
  }

  /*------------------ PROGRAMA INTERFACE ------------------*/
  
  export interface Programa{
    id_programa: number;
    nombreprograma: string;
  }

  export interface CreatePrograma{
    id_programa: number;
    nombreprograma: string;
  }

  export interface UpdatePrograma{
    id_programa: number;
    nombreprograma: string;
  }

  /*------------------ TESIS INTERFACE ------------------*/
  
  export interface Tesis{
    id_tesis: number;
    clave_alumno: number;
    clave_asesor: number;
    id_programa: number;
    titulo: string;
    fecharegistro: Date;
    generacion: string;
    modalidad: string;
  }

  export interface CreateTesis{
    clave_alumno: number;
    clave_asesor: number;
    id_programa: number;
    titulo: string;
    fecharegistro: Date;
    generacion: string;
    modalidad: string;
  }

  export interface UpdateTesis{
    id_tesis: number;
    clave_alumno: number;
    clave_asesor: number;
    id_programa: number;
    titulo: string;
    fecharegistro: Date;
    generacion: string;
    modalidad: string;
  }

  /*------------------ COASESOR INTERFACE ------------------*/
  

}
