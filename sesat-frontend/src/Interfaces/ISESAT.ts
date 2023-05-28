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
    datos_alumno?: DatosAlumno;
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

  export interface Funcion {
    id_funcion: number;
    nombre: string;
  }

  export interface CreateFuncion {
    nombre: string;
  }

  export interface UpdateFuncion {
    id_funcion: number;
    nombre: string;
  }

  /*------------------ USUARIO INTERFACE ------------------*/

  /*------------------ DATOS ALUMNO INTERFACE ------------------*/

  export interface DatosAlumno {
    id_datos_alumno: number;
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
    generacion: string;
  }

  export interface CreateDatosAlumno {
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
    generacion: string;
  }

  export interface UpdateDatosAlumno {
    id_datos_alumno: number;
    grado_estudio: string;
    modalidad: string;
    estado_activo: boolean;
    id_programa: number;
    generacion: string;
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
    alumno: Usuario;
    titulo: string;
    fecharegistro: Date;
    generacion: string;
    registrada: boolean;
    ultimo_avance: number;
    estado_activo: boolean;
    asignaciones_tesis: AsignacionTesis[];
  }

  export interface CreateTesis {
    clave_alumno: number;
    titulo: string | null;
    fecharegistro: Date | null;
    generacion: string | null;
    registrada: boolean;
    ultimo_avance: number | null; //0 is lacking registry
    estado_activo: boolean;
  }

  export interface UpdateTesis {
    id_tesis: number;
    clave_alumno: number;
    titulo: string;
    fecharegistro: Date;
    generacion: string | undefined;
    registrada: boolean;
    ultimo_avance: number;
    estado_activo: boolean;
  }

  /*------------------ COMITE INTERFACE ------------------*/

  export interface Comite {
    id_comite: number;
    clave_asesor: number;
    id_tesis: number;
    id_funcion: number;
  }

  export interface CreateComite {
    clave_asesor: number;
    id_tesis: number;
    id_funcion: number;
  }

  export interface UpdateComite {
    id_comite: number;
    clave_asesor: number;
    id_tesis: number;
    id_funcion: number;
  }

  /*------------------ COMITE INTERFACE ------------------*/

  /*------------------ ROL INTERFACE ------------------*/

  export interface Rol {
    id_rol: number;
    nombre: string;
  }

  export interface CreateRol {
    id_rol: number;
    nombre: string;
  }

  export interface UpdateRol {
    id_rol: number;
    nombre: string;
  }

  /*------------------ ROL INTERFACE ------------------*/

  /*------------------ FORMATO EVALAUCION INTERFACE ------------------*/

  export interface FormatoEvaluacion {
    id_formato_evaluacion: number;
    documento_rellenado: string;
    id_formato_vacio: number;
  }

  export interface CreateFormatoEvaluacion {
    id_formato_evaluacion: number;
    documento_rellenado: string;
    id_formato_vacio: number;
  }

  export interface UpdateFormatoEvaluacion {
    id_formato_evaluacion: number;
    documento_rellenado: string;
    id_formato_vacio: number;
  }

  /*------------------ FORMATO EVALAUCION INTERFACE ------------------*/

  /*------------------ FORMATOS VACIOS INTERFACE ------------------*/

  export interface FormatosVacios {
    id_formatos_vacios: number;
    acta_avaluacion: string;
    formato_evaluacion: number;
  }

  export interface CreateFormatosVacios {
    id_formatos_vacios: number;
    acta_avaluacion: string;
    formato_evaluacion: number;
  }

  export interface UpdateFormatosVacios {
    id_formatos_vacios: number;
    acta_avaluacion: string;
    formato_evaluacion: number;
  }

  /*------------------ FORMATOS VACIOS INTERFACE ------------------*/

  /*------------------ ACTA EVALUACION INTERFACE ------------------*/

  export interface ActaEvaluacion {
    id_acta_evaluacion: number;
    documento_rellenado: string;
    id_acta_vacia: number;
  }

  export interface CreateActaEvaluacion {
    id_acta_evaluacion: number;
    documento_rellenado: string;
    id_acta_vacia: number;
  }

  export interface UpdateActaEvaluacion {
    id_acta_evaluacion: number;
    documento_rellenado: string;
    id_acta_vacia: number;
  }

  /*------------------ ACTA EVALUACION INTERFACE ------------------*/

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

  //!!! Modify?

  export interface ActaEvaluacion {
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
    generacion: string;
  }

  export interface VariablesSistema {
    id_variables_sistema: number;
    indice_clave_asesorexterno: number;
  }

  export interface CreateVariablesSistema {
    indice_clave_asesorexterno: number;
  }

  export interface UpdateVariablesSistema {
    id_variables_sistema: number;
    indice_clave_asesorexterno: number;
  }
}
