/*------------------ USUARIO INTERFACE ------------------*/
export interface Usuario {
  id_usuario: number;
  id_rol: number;
  id_datos_alumno: number | null;
  id_datos_asesor_externo: number | null;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  password: string;
  correo: string;
  datos_alumno?: DatosAlumno;
}

export interface CreateUsuario {
  id_rol: number;
  id_datos_alumno: number | null;
  id_datos_asesor_externo: number | null;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  password: string;
  correo: string;
  datos_alumno?: DatosAlumno;
}

export interface UpdateUsuario {
  id_usuario: number;
  id_rol: number;
  id_datos_alumno: number | null;
  id_datos_asesor_externo: number | null;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  password: string;
  correo: string;
  datos_alumno?: DatosAlumno;
}

/*------------------ FUNCION INTERFACE ------------------*/

export interface Funcion {
  id_funcion: number;
  nombre_funcion: string;
}

export interface CreateFuncion {
  nombre_funcion: string;
}

export interface UpdateFuncion {
  id_funcion: number;
  nombre_funcion: string;
}

/*------------------ DATOS ALUMNO INTERFACE ------------------*/

export interface DatosAlumno {
  id_datos_alumno: number;
  id_modalidad: number;
  id_programa: number;
  id_grado_estudio: number;
  generacion: number;
  estado_activo: boolean;
  avance_previo: boolean;
  programa?: Programa;
}

export interface CreateDatosAlumno {
  id_modalidad: number;
  id_programa: number;
  id_grado_estudio: number;
  generacion: number;
  estado_activo: boolean;
  avance_previo: boolean;
}

export interface UpdateDatosAlumno {
  id_datos_alumno: number;
  id_modalidad: number;
  id_programa: number;
  id_grado_estudio: number;
  generacion: number;
  estado_activo: boolean;
  avance_previo: boolean;
}

/*------------------ DATOS ASESOR EXTERNO INTERFACE ------------------*/

export interface DatosAsesorExterno {
  id_datos_asesor_externo: number;
  telefono: string;
  institucion: string;
}

export interface CreateDatosAsesorExterno {
  telefono: string;
  institucion: string;
}

export interface UpdateDatosAsesorExterno {
  id_datos_asesor_externo: number;
  telefono: string;
  institucion: string;
}

/*------------------ ASIGNACION INTERFACE ------------------*/

export interface Asignacion {
  id_asignacion: number;
  id_formato_evaluacion: number;
  id_acta_evaluacion: number;
  id_tesis: number;
  id_modalidad: number;
  id_periodo: number;
  num_avance: number;
  titulo: string;
  descripcion: string;
  fecha_entrega: string;
  calificacion: number;
  documento: { type: string; data: Array<number> };
  estado_entrega: number;
  retroalimentacion: string;
  tipo: number;
  fecha_presentacion: string;
}

export interface AsignacionReview {
  id_asignacion: number;
  id_formato_evaluacion: number;
  id_acta_evaluacion: number;
  id_tesis: number;
  id_modalidad: number;
  id_periodo: number;
  num_avance: number;
  titulo: string;
  descripcion: string;
  fecha_entrega: string;
  calificacion: number;
  documento: { type: string; data: Array<number> };
  estado_entrega: number;
  retroalimentacion: string;
  tipo: number;
  fecha_presentacion: string;
  id_funcion: number;
}

export interface CreateAsignacion {
  id_formato_evaluacion: number | null;
  id_acta_evaluacion: number | null;
  id_tesis: number | null;
  id_modalidad: number | null;
  id_periodo: number;
  num_avance: number;
  titulo: string;
  descripcion: string;
  fecha_entrega: Date | null;
  calificacion: number | null;
  documento: string | null;
  estado_entrega: number;
  retroalimentacion: string | null;
  tipo: number;
  fecha_presentacion: Date | null;
}

export interface UpdateAsignacion {
  id_asignacion: number;
  id_formato_evaluacion: number | null;
  id_acta_evaluacion: number | null;
  id_tesis: number | null;
  id_modalidad: number | null;
  id_periodo: number;
  num_avance: number;
  titulo: string;
  descripcion: string;
  fecha_entrega: string | null;
  calificacion: number | null;
  documento: string | null;
  estado_entrega: number;
  retroalimentacion: string | null;
  tipo: number;
  fecha_presentacion: string | null;
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

/*------------------ TESIS INTERFACE ------------------*/

export interface InactiveTesisProps {
  titulo: string;
  fecha_registro: string;
  id_tesis: number;
  clave: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  programa_nombre_programa: string;
}

export interface Tesis {
  id_tesis: number;
  id_usuario: number;
  alumno: Usuario;
  titulo: string;
  fecha_registro: Date | null;
  generacion: number;
  ultimo_avance: number;
  estado_finalizacion: boolean;
  asignaciones: AsignacionTesis[];
}

export interface CreateTesis {
  id_usuario: number;
  titulo: string | null;
  fecha_registro: Date | null;
  generacion: number | null;
  ultimo_avance: number | null;
  estado_finalizacion: boolean;
}

export interface UpdateTesis {
  id_tesis: number;
  id_usuario: number;
  titulo: string;
  fecha_registro: Date;
  generacion: string | undefined;
  ultimo_avance: number;
  estado_finalizacion: boolean;
}

/*------------------ COMITE INTERFACE ------------------*/

export interface Comite {
  id_comite: number;
  id_usuario: number;
  id_tesis: number;
  id_funcion: number;
  asesor: Usuario;
  funcion: Funcion;
}

export interface CreateComite {
  id_usuario: number;
  id_tesis: number;
  id_funcion: number;
}

export interface UpdateComite {
  id_comite: number;
  id_usuario: number;
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

export interface FormatoEvaluacionFilled {
  id_formato_evaluacion: null | number;
  titulo_reporte: string;
  grado: string;
  estudiante: string;
  asesor: string;
  coasesor: string;
  comite: Array<{
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre_funcion: string;
  }>;
  titulo_tesis: string;
  fecha_comienzo: string;
  fecha_limite: string;
}

export interface CreateFormatoEvaluacion {
  documento_rellenado: string | null;
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
  acta_evaluacion: string | null;
  formato_evaluacion: string | null;
}

export interface CreateFormatosVacios {
  id_formatos_vacios: number;
  acta_evaluacion: string | null;
  formato_evaluacion: string | null;
}

export interface UpdateFormatoVacio {
  id_formato_vacio: number;
  acta_evaluacion: string | null;
  formato_evaluacion: string | null;
}

/*------------------ FORMATOS VACIOS INTERFACE ------------------*/

/*------------------ ACTA EVALUACION INTERFACE ------------------*/

export interface ActaEvaluacion {
  id_acta_evaluacion: number;
  documento_rellenado: string;
  id_acta_vacia: number;
}

export interface CreateActaEvaluacion {
  documento_rellenado: string | null;
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
  id_usuario: number;
  id_asignacion: number;
  texto: string;
  fecha_comentario: string;
}

export interface UpdateComentario {
  id_comentario: number;
  clave_usuario: number;
  id_asignacion: number;
  texto: string;
  fecha_comentario: string;
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
  id_usuario: number;
  titulo: string;
  descripcion: string;
  fecha_expedicion: string;
}

export interface CreateNotificacion {
  id_usuario: number;
  titulo: string;
  descripcion: string;
  fecha_expedicion: string;
}

export interface UpdateNotificacion {
  id_notificacion: number;
  id_usuario: number;
  titulo: string;
  descripcion: string;
  fecha_expedicion: string;
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
  id_asignacion: number;
  id_acta_evaluacion: number | null;
  grado_estudio: string;
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

/*------------------ MISCELANEOUS -----------*/

export interface LoggedUser {
  id_usuario: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
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

/*------------------ MODALIDAD INTERFACE ------------------*/

export interface Modalidad {
  id_modalidad: number;
  nombre_modalidad: string;
}

export interface CreateModalidad {
  nombre_modalidad: string;
}

export interface UpdateModalidad {
  id_modalidad: number;
  nombre_modalidad: string;
}

/*------------------ PROGRAMA INTERFACE ------------------*/

export interface Programa {
  id_programa: number;
  nombre_programa: string;
}

export interface CreatePrograma {
  nombre_programa: string;
}

export interface UpdatePrograma {
  id_programa: number;
  nombre_programa: string;
}

/*------------------ EVENTO INTERFACE ------------------*/

export interface Evento {
  id_evento: number;
  id_usuario: number;
  id_creador: number;
  titulo: string;
  fecha_inicio: Date;
  fecha_termino: Date | null;
}

/*------------------ Periodo INTERFACE ------------------*/
export interface CreatePeriodo {
  fecha_apertura: string;
  fecha_cierre: string;
  fecha_apertura_opc: string | null;
  fecha_cierre_opc: string | null;
}

export interface UpdatePeriodo {
  id_periodo: number;
  fecha_apertura: string;
  fecha_cierre: string;
  fecha_apertura_opc: string | null;
  fecha_cierre_opc: string | null;
}
export interface CreateEvento {
  id_usuario: number;
  id_creador: number;
  titulo: string;
  fecha_inicio: Date;
  fecha_termino: Date | null;
}

/*------------------ EXTERNAL USER INTERFACE ------------------*/
//In this context, external as in received from the external service
export interface ExternalUser {
  nombre: string;
  apellidos: string;
  email: string;
  dedicacion: string;
  programa: string;
  grado_estudio: string;
  gen: string;
  status: string;
}

export interface CreateExternalUser {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  dedicacion: string;
  programa: string;
  grado_estudio: string;
  gen: string;
  status: string;
  skipToAvance: number | null;
}

export interface ExternalAsesor {
  nombre: string;
  apellidos: string;
  email: string;
}

export interface CreateForeignAsesor {
  nombre: string;
  apellido_materno: string | null;
  apellido_paterno: string;
  telefono: number;
  correo: string;
  organizacion: string;
}

export interface ExternalAsesor {
  nombre: string;
  apellidos: string;
  email: string;
}

export interface CreateExternalAsesor {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
}

export interface CreateEventByType {
  users: Usuario[] | null;
  type: number;
  id: number;
  id_creador: number;
  title: string;
  start: Date;
  end: Date | null;
}

export interface GradedMailDto {
  usuario: Usuario;
  asignacion: Asignacion;
}

export interface RetrievedCommittee {
  asesor: Usuario | null,
  coasesor?: Usuario | null,
  sinodal1: Usuario | null,
  sinodal2: Usuario | null,
  sinodal3?: Usuario | null,
  sinodal4?: Usuario | null,
  suplente: Usuario | null,
}

export type ThesisFullHistory = {
  nombre_programa: string;
  id_tesis: number;
  titulo: string;
  avance: number;
  id_modalidad: number;
  grado: number;
  fecha_registro: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  estado_finalizacion: boolean;
  estado_activo: boolean;
}

export type Avance = {
  id_asignacion: number;
  num_avance: number;
  grado_estudio: string;
  modalidad: string;
};
