export namespace SESAT {

  /*------------------ USUARIO INTERFACE ------------------*/

  export interface Usuario {
    clave: number;
    name: string;
    last_name: string;
    family_name: string;
    password: string;
    role: number;
    active_status: boolean;
  }

  export interface CreateUsuario {
    clave: number;
    name: string;
    last_name: string;
    family_name: string;
    password: string;
    role: number;
    active_status: boolean;
  }

  export interface UpdateUsuario {
    clave: number;
    name: string;
    last_name: string;
    family_name: string;
    password: string;
    role: number;
    active_status: boolean;
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
    clave: number;
    usuario: Usuario;
    id_asignacion: number;
    asignacion: Asignacion;
    texto: string;
  }

  export interface CreateComentario{
    clave: number;
    id_asignacion: number;
    texto: string;
  }

  export interface UpdateComentario{
    id_comentario: number;
    clave: number;
    id_asignacion: number;
    texto: string;
  }

  /*------------------ RESPUESTA INTERFACE ------------------*/

  export interface Respuesta{
    id_respuesta: number;
    id_comentario: number;
    texto: string;
    clave: number;
  }

  export interface CreateRespuesta{
    id_comentario: number;
    texto: string;
    clave: number;
  }

  export interface UpdateRespuesta{
    id_respuesta: number;
    id_comentario: number;
    texto: string;
    clave: number;
  }

/*------------------ NOTIFICATION INTERFACE ------------------*/

export interface Notification{
  notification_id: number;
  user_id: number;
  title: string;
  description: string;
  expediton_date: Date;
}

export interface CreateNotification{
  user_id: number;
  title: string;
  description: string;
  expediton_date: Date;
}

export interface UpdateNotification{
  notification_id: number;
  user_id: number;
  title: string;
  description: string;
  expediton_date: Date;
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
