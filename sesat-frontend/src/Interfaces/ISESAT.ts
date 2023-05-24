export namespace SESAT {

  /*------------------ USUARIO INTERFACE ------------------*/

  export interface Usuario {
    clave: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    password: string;
    rol: number;
    estado_activo: boolean;
    modalidad: number;
  }

  export interface CreateUsuario {
    clave: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    password: string;
    rol: number;
    estado_activo: boolean;
    modalidad: number;
  }

  export interface UpdateUsuario {
    clave: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    password: string;
    rol: number;
    estado_activo: boolean;
    modalidad: number;
  }

/*------------------ USUARIO INTERFACE ------------------*/

export interface LoggedUser {
  clave: number;
  name: string;
  last_name: string;
  family_name: string;
  role: number;
  active_status: boolean;
  token: string;
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
    id_asesor_externo: number;
    clave: number;
    telefono: string;
    institucion: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
  }

  export interface CreateAsesorExterno{
    id_asesor_externo: number;
    clave: number;
    telefono: string;
    institucion: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
  }

  export interface UpdateAsesorExterno{
    id_asesor_externo: number;
    clave: number;
    telefono: string;
    institucion: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
  }

  /*------------------ ASIGNACION INTERFACE ------------------*/

  export interface Asignacion {
    asignacion_id: number;
    id_tesis: number;
    num_avance: number;
    titulo: string;
    descripcion: string;
    apertura: Date;
    cierre: Date;
    calificacion: number;
    documento: string;
    estado_entrega: number;
  }

  export interface CreateAsignacion {
    id_tesis: number;
    num_avance: number;
    titulo: string;
    descripcion: string;
    apertura: Date;
    cierre: Date;
    calificacion: number;
    documento: string;
    estado_entrega: number;
  }

  export interface UpdateAsignacion {
    asignacion_id: number;
    id_tesis: number;
    num_avance: number;
    titulo: string;
    descripcion: string;
    apertura: Date;
    cierre: Date;
    calificacion: number;
    documento: string;
    estado_entrega: number;
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
    ultimo_avance: number;
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


  /*------------------ COMENTARIO INTERFACE ------------------*/

  export interface Comentario{
    id_comentario: number;
    clave_usuario: number;
    usuario: Usuario;
    id_asignacion: number;
    asignacion: Asignacion;
    texto: string;
  }

  export interface CreateComentario{
    clave_usuario: number;
    id_asignacion: number;
    texto: string;
  }

  export interface UpdateComentario{
    id_comentario: number;
    clave_usuario: number;
    id_asignacion: number;
    texto: string;
  }

  /*------------------ RESPUESTA INTERFACE ------------------*/

  export interface Respuesta{
    id_respuesta: number;
    id_comentario: number;
    texto: string;
    clave_usuario: number;
  }

  export interface CreateRespuesta{
    id_comentario: number;
    texto: string;
    clave_usuario: number;
  }

  export interface UpdateRespuesta{
    id_respuesta: number;
    id_comentario: number;
    texto: string;
    clave_usuario: number;
  }

/*------------------ NOTIFICATION INTERFACE ------------------*/

export interface Notificacion{
  id_notificacion: number;
  clave_usuario: number;
  titulo: string;
  descripcion: string;
  fecha_expedicion: Date;
}

export interface CreateNotificacion{
  clave_usuario: number;
  titulo: string;
  descripcion: string;
  fecha_expedicion: Date;
}

export interface UpdateNotificacion{
  id_notificacion: number;
  clave_usuario: number;
  titulo: string;
  descripcion: string;
  fecha_expedicion: Date;
}

  /*------------------ UPLOAD PDF INTERFACE ------------------*/
  export interface UploadPDF{
    id_formatos: number;
    acta_evaluacion?: string;       //array of unsigned int 8 bits
    formato_evaluacion?: string;
  }

  /*------------------ ACTA EVALUACION INTERFACE -----------*/
  //Debe contener todos los datos del formulario del acta
  //por ahora solo lo basico para pruebas
  export interface ActaEvalForm{    
    
    fecha_eval: string;
    ap_pat: string;
    ap_mat: string;
    nombre: string;  

    programa: string;
    no_avance: number;

    titulo_tesis: string;
    total_avance: string;
    comentarios: string;

    cal_doc: number;
    cal_expo: number;
    cal_dom: number;
    grado_avance: number;
    promedio: number;
    fecha_toefl: string;
    puntaje_toefl: number;
    prox_toefl: string;
    observaciones: string;

    /*Pendiente comite de evaluacion a que se refiere? */
  }

  export interface ActaEvaluacionDoc{
    id_acta: number;
    id_asignacion: number;
    documento_rellenado: string;
    id_acta_vacia: number;
  }
  
  /*------------------ MISCELANEOUS -----------*/

  export interface LoggedUser {
    message: string;
    usuario: Usuario;
    token: string;
  }

  export interface UsuarioPrueba{
    clave_unica: number;
    nombre: string;
    password: string;
    apellido_pat: string;
    apellido_mat: string;
  }

}
