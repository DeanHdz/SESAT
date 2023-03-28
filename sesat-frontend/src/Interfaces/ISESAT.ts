export namespace SESAT {

  /*------------------ USUARIO INTERFACE ------------------*/

  export interface Usuario {
    Clave: number;
  }

  export interface CreateUsuario {
    Clave: number;
  }

  export interface UpdateUsuario {
    Clave: number;
  }

  /*------------------ ALUMNO INTERFACE ------------------*/
  
  export interface Alumno{
    Clave: number;
    usuario: Usuario;
    Estado_Activo: number;
    Ultimo_Avance: number;
  }

  export interface CreateAlumno{
    Clave: number;
    usuario: Usuario;
    Estado_Activo: number;
    Ultimo_Avance: number;
  }

  export interface UpdateAlumno{
    Clave: number;
    usuario: Usuario;
    Estado_Activo: number;
    Ultimo_Avance: number;
  }

  /*------------------ ASESOR INTERFACE ------------------*/
  
  export interface Asesor{
    Clave: number;
    Sinodal: number;
  }

  export interface CreateAsesor{
    Clave: number;
    Sinodal: number;
  }

  export interface UpdateAsesor{
    Clave: number;
    Sinodal: number;
  }

  /*------------------ ASESOR EXTERNO INTERFACE ------------------*/
  
  export interface AsesorExterno{
    Clave: number;
    Telefono: string;
    Institucion: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Correo: string;
  }

  export interface CreateAsesorExterno{
    Clave: number;
    Telefono: string;
    Institucion: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Correo: string;
  }

  export interface UpdateAsesorExterno{
    Clave: number;
    Telefono: string;
    Institucion: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Correo: string;
  }

  /*------------------ PROGRAMA INTERFACE ------------------*/
  
  export interface Programa{
    id_programa: number;
    NombrePrograma: string;
  }

  export interface CreatePrograma{
    id_programa: number;
    NombrePrograma: string;
  }

  export interface UpdatePrograma{
    id_programa: number;
    NombrePrograma: string;
  }

  /*------------------ TESIS INTERFACE ------------------*/
  
  export interface Tesis{
    id_tesis: number;
    Clave_Alumno: number;
    Clave_Asesor: number;
    id_programa: number;
    Titulo: string;
    FechaRegistro: Date;
    Generacion: string;
    Modalidad: string;
  }

  export interface CreateTesis{
    id_tesis: number;
    Clave_Alumno: number;
    Clave_Asesor: number;
    id_programa: number;
    Titulo: string;
    FechaRegistro: Date;
    Generacion: string;
    Modalidad: string;
  }

  export interface UpdateTesis{
    id_tesis: number;
    Clave_Alumno: number;
    Clave_Asesor: number;
    id_programa: number;
    Titulo: string;
    FechaRegistro: Date;
    Generacion: string;
    Modalidad: string;
  }

  /*------------------ COASESOR INTERFACE ------------------*/
  
  export interface Tesis{
    id_tesis: number;
    Clave_Alumno: number;
    Clave_Asesor: number;
    id_programa: number;
    Titulo: string;
    FechaRegistro: Date;
    Generacion: string;
    Modalidad: string;
  }

  export interface CreateTesis{
    id_tesis: number;
    Clave_Alumno: number;
    Clave_Asesor: number;
    id_programa: number;
    Titulo: string;
    FechaRegistro: Date;
    Generacion: string;
    Modalidad: string;
  }

  export interface UpdateTesis{
    id_tesis: number;
    Clave_Alumno: number;
    Clave_Asesor: number;
    id_programa: number;
    Titulo: string;
    FechaRegistro: Date;
    Generacion: string;
    Modalidad: string;
  }

}
