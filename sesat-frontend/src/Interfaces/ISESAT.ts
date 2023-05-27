export namespace SESAT {
  /*------------------ USUARIO INTERFACE ------------------*/

  export interface Usuario {
    clave: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    password: string;
    id_rol: number;
    id_datos_alumno: number | null;
    correo: string;
    id_datos_asesorexterno: number | null;
  }

  export interface CreateUsuario {
    clave: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    password: string;
    id_rol: number;
    id_datos_alumno: number | null;
    correo: string;
    id_datos_asesorexterno: number | null;
  }

  export interface UpdateUsuario {
    clave: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    password: string;
    id_rol: number;
    id_datos_alumno: number | null;
    correo: string;
    id_datos_asesorexterno: number | null;
  }

  /*------------------ FUNCION INTERFACE ------------------*/

  export interface funcion {
    id_funcion: number;
    nombre: string;
  }

  export interface Createfuncion {
    nombre: string;
  }

  export interface Exportfuncion {
    id_funcion: number;
    nombre: string;
  }
  
  /*------------------ USUARIO INTERFACE ------------------*/

  

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

  /*------------------ DATOS ALUMNO INTERFACE ------------------*/

  export interface DatosAlumno {
    id_datos_alumno: number;
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
  }

  export interface CreateDatosAlumno {
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
  }

  export interface UpdateDatosAlumno {
    id_datos_alumno: number;
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
  }

  /*------------------ DATOS ASESOR EXTERNO INTERFACE ------------------*/

  export interface DatosAsesorExterno {
    id_datos_asesorexterno: number;
    telefono: string;
    institucion: string;
  }

  export interface CreateDatosAsesorExterno {
    telefono: string;
    institucion: string;
  }

  export interface UpdateDatosAsesorExterno {
    id_datos_asesorexterno: number;
    telefono: string;
    institucion: string;
  }

  /*------------------ ASIGNACION INTERFACE ------------------*/

  export interface Asignacion {
    id_asignacion: number;
    num_avance: number;
    titulo: string;
    descripcion: string;
    apertura: Date;
    cierre: Date;
    calificacion: number;
    documento: string;
    estado_entrega: number;
    retroalimentacion: string;
    id_formato_evaluacion: number;
    id_acta_evaluacion: number;
  }

  export interface CreateAsignacion {
    num_avance: number;
    titulo: string;
    descripcion: string;
    apertura: Date;
    cierre: Date;
    calificacion: number;
    documento: string;
    estado_entrega: number;
    retroalimentacion: string;
    id_formato_evaluacion: number;
    id_acta_evaluacion: number;
  }

  export interface UpdateAsignacion {
    id_asignacion: number;
    num_avance: number;
    titulo: string;
    descripcion: string;
    apertura: Date;
    cierre: Date;
    calificacion: number;
    documento: string;
    estado_entrega: number;
    retroalimentacion: string;
    id_formato_evaluacion: number;
    id_acta_evaluacion: number;
  }

  /*------------------ ASIGNACION-TESIS INTERFACE ------------------*/

  export interface AsignacionTesis {
    id_asignacion_tesis: number;
    id_asignacion: number;
    id_tesis: number;
  }

  export interface CreateAsignacionTesis {
    id_asignacion: number;
    id_tesis: number;
  }

  export interface UpdateAsignacionTesis {
    id_asignacion_tesis: number;
    id_asignacion: number;
    id_tesis: number;
  }

  /*------------------ PROGRAMA INTERFACE ------------------*/

  export interface Programa {
    id_programa: number;
    nombreprograma: string;
  }

  export interface CreatePrograma {
    nombreprograma: string;
  }

  export interface UpdatePrograma {
    id_programa: number;
    nombreprograma: string;
  }

  /*------------------ TESIS INTERFACE ------------------*/

  export interface Tesis {
    id_tesis: number;
    clave_alumno: number;
    titulo: string;
    fecharegistro: Date;
    generacion: string;
    registrada: boolean;
    ultimo_avance: number;
    estado_activo: boolean;
  }

  export interface CreateTesis {
    clave_alumno: number;
    titulo: string;
    fecharegistro: Date;
    generacion: string;
    registrada: boolean;
    ultimo_avance: number;
    estado_activo: boolean;
  }

  export interface UpdateTesis {
    id_tesis: number;
    clave_alumno: number;
    titulo: string;
    fecharegistro: Date;
    generacion: string;
    registrada: boolean;
    ultimo_avance: number;
    estado_activo: boolean;
  }

  /*------------------ COMENTARIO INTERFACE ------------------*/

  export interface Comentario {
    id_comentario: number;
    clave_usuario: number;
    //usuario: Usuario;
    id_asignacion: number;
    //asignacion: Asignacion;
    texto: string;
  }

  export interface CreateComentario {
    clave_usuario: number;
    id_asignacion: number;
    texto: string;
  }

  export interface UpdateComentario {
    id_comentario: number;
    clave_usuario: number;
    id_asignacion: number;
    texto: string;
  }

  /*------------------ RESPUESTA INTERFACE ------------------*/

  export interface Respuesta {
    id_respuesta: number;
    id_comentario: number;
    texto: string;
    clave_usuario: number;
  }

  export interface CreateRespuesta {
    id_comentario: number;
    texto: string;
    clave_usuario: number;
  }

  export interface UpdateRespuesta {
    id_respuesta: number;
    id_comentario: number;
    texto: string;
    clave_usuario: number;
  }

  /*------------------ NOTIFICATION INTERFACE ------------------*/

  export interface Notificacion {
    id_notificacion: number;
    clave_usuario: number;
    titulo: string;
    descripcion: string;
    fecha_expedicion: Date;
  }

  export interface CreateNotificacion {
    clave_usuario: number;
    titulo: string;
    descripcion: string;
    fecha_expedicion: Date;
  }

  export interface UpdateNotificacion {
    id_notificacion: number;
    clave_usuario: number;
    titulo: string;
    descripcion: string;
    fecha_expedicion: Date;
  }

  /*------------------ DATOS ALUMNO INTERFACE ------------------*/

  export interface DatosAlumno {
    id_datos_alumno: number;
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
  }

  export interface CreateDatosAlumno {
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
  }

  export interface UpdateDatosAlumno {
    id_datos_alumno: number;
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
  }

  /*------------------ UPLOAD PDF INTERFACE ------------------*/
  export interface UploadPDF {
    id_formatos: number;
    acta_evaluacion?: string; //array of unsigned int 8 bits
    formato_evaluacion?: string;
  }

  /*------------------ ACTA EVALUACION INTERFACE -----------*/
  //Debe contener todos los datos del formulario del acta
  //por ahora solo lo basico para pruebas
  export interface ActaEvalForm {
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

  export interface formato_evaluacion {
    id_formato_evaluacion: number;
    documento_rellenado: string;
    id_formato_vacio:number;
  }

  export interface ActaEvaluacionDoc {
    id_acta: number;
    documento_rellenado: string;
    id_acta_vacia: number;
  }

  /*------------------ MISCELANEOUS -----------*/

  export interface LoggedUser {
    message: string;
    usuario: Usuario;
    token: string;
  }

  export interface UsuarioPrueba {
    clave_unica: number;
    nombre: string;
    password: string;
    apellido_pat: string;
    apellido_mat: string;
    correo: string;
    grado_estudio: string;
  }
}
