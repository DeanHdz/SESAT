import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActaEvaluacionDto } from './dto/create-acta-evaluacion.dto';
import { UpdateActaEvaluacionDto } from './dto/update-acta-evaluacion.dto';
import { ActaEvaluacion } from './entities/acta-evaluacion.entity';
import { FilledActDto } from './dto/create-formulario.dto';
import { PDFDocument } from 'pdf-lib';
import { decode } from 'base64-arraybuffer';
import { FormatoVacio } from 'src/formato-vacio/entities/formato-vacio.entity';
import { formatAsISODate, shortFormatDate } from 'src/utils/utils';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { Tesis } from 'src/tesis/entities/tesis.entity';
import { Comite } from 'src/comite/entities/comite.entity';
import { Funcion } from 'src/funcion/entities/funcion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class ActaEvaluacionService {
  constructor(
    @InjectRepository(ActaEvaluacion)
    private actaEvalRepo: Repository<ActaEvaluacion>,

    @InjectRepository(FormatoVacio)
    private readonly formatoVacioRepository: Repository<FormatoVacio>,

    @InjectRepository(Asignacion)
    private readonly asignacionRepository: Repository<Asignacion>,
  ) { }



  create(createActaEvaluacionDto: CreateActaEvaluacionDto) {
    return this.actaEvalRepo.save(createActaEvaluacionDto);
  }

  createActaEvaluacion(createActaEvaluacionDto: CreateActaEvaluacionDto) {
    return this.actaEvalRepo.save(createActaEvaluacionDto)
  }

  findAll() {
    return this.actaEvalRepo.find();
  }
  //cambiar a id asignacion
  findOne(id: number) {
    return this.actaEvalRepo.findOne({ where: { id_acta_evaluacion: id } });
  }

  async findDocumentData(idActaEvaluacion: number) {
    const document = await this.actaEvalRepo.findOne({ where: { id_acta_evaluacion: idActaEvaluacion } });

    var buffer = document.documento_rellenado;

    //Ver en formato UTF-8, no lo reconoce por default 
    var base64 = new TextDecoder().decode(buffer);

    //Decodificar de base64, crea Buffer para PDF-LIB
    var uint8Array = new Uint8Array(decode(base64));

    try {
      var pdfDoc = await PDFDocument.load(uint8Array);
      var form = pdfDoc.getForm();

      const response: FilledActDto = {
        id_asignacion: 0, //no es relevante
        id_acta_evaluacion: document.id_acta_evaluacion,
        grado_estudio: '',//no es relevante
        fecha_eval: form.getTextField('fecha_eval').getText(),
        ap_pat: form.getTextField('ap_paterno').getText(),
        ap_mat: form.getTextField('ap_materno').getText(),
        nombre: form.getTextField('nombres_alumno').getText(),
        programa: form.getTextField('programa_posgrado').getText(),
        no_avance: parseInt(form.getTextField('no_avance').getText()),
        titulo_tesis: form.getTextField('titulo_tesis').getText(),
        total_avance: form.getTextField('total_avance').getText(),
        comentarios: form.getTextField('comentarios').getText(),
        cal_doc: parseInt(form.getTextField('cal_doc_av').getText()),
        cal_expo: parseInt(form.getTextField('cal_expo').getText()),
        cal_dom: parseInt(form.getTextField('cal_dom').getText()),
        grado_avance: parseInt(form.getTextField('grado_avance').getText()),
        promedio: parseInt(form.getTextField('promedio').getText()),
        fecha_toefl: form.getTextField('fecha_toefl').getText(),
        puntaje_toefl: parseInt(form.getTextField('puntaje_toefl').getText()),
        prox_toefl: form.getTextField('prox_toefl').getText(),
        observaciones: form.getTextField('observaciones').getText()
      }
      return response;

    } catch (error) {
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(updateActaEvaluacionDto: UpdateActaEvaluacionDto) {
    return this.actaEvalRepo.save(updateActaEvaluacionDto);
  }

  async findComiteMembers(idAsignacion: number) {
    const result = await this.asignacionRepository.createQueryBuilder('a')
      .select([
        'u.nombre AS nombre',
        'u.apellido_paterno AS apellido_paterno',
        'u.apellido_materno AS apellido_materno',
        'f.nombre_funcion AS funcion'
      ])
      .innerJoin(Tesis, "t", "t.id_tesis = a.id_tesis")
      .innerJoin(Comite, "c", "c.id_tesis = t.id_tesis")
      .innerJoin(Usuario, "u", "u.id_usuario = c.id_usuario")
      .innerJoin(Funcion, "f", "f.id_funcion = c.id_funcion")
      .where('a.id_asignacion = :id_asignacion', { id_asignacion: idAsignacion })
      .getRawMany()
    return result;
  }

  async createActaAndfillDocument(idAsignacion: number, fillActa: FilledActDto) {
    //obtener formato de la BD para rellenarlo, el resultado 
    //por default se carga en un ArrayBuffer aunque sea un string      

    var comite = await this.findComiteMembers(fillActa.id_asignacion);
    //Nota el id_formato_vacio siempre es fijo ya que la tabla solo contiene 2 registros(acta y formato)
    var emptyFormat = await this.formatoVacioRepository.findOne({ where: { id_formato_vacio: 1 } });
    var buffer = emptyFormat.acta_evaluacion;

    var logger = new Logger('PDFDetails');
    logger.log('ID: ', idAsignacion)

    //Ver en formato UTF-8, no lo reconoce por default 
    var base64 = new TextDecoder().decode(buffer);

    //Decodificar de base64, crea Buffer para PDF-LIB
    var uint8Array = new Uint8Array(decode(base64));

    try {
      var pdfDoc = await PDFDocument.load(uint8Array);

      //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      //Editar PDF
      /*const pages = pdfDoc.getPages()
      const firstPage = pages[0]      
      const { width, height } = firstPage.getSize()
      firstPage.drawText('This text was added with JavaScript!', {
        x: 110,
        y: height / 2 + 195,
        size: 10,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });*/

      //Nombres de las variables de los campos del PDF (FOR DEBUG)
      /*const fieldNames = pdfDoc
        .getForm()
        .getFields()
        .map((f) => f.getName());

      logger.log('PDF Fields: ', fieldNames);
      logger.log('ID: ', idAsignacion);*/

      //Editar campos del PDF
      var form = pdfDoc.getForm();
      logger.log('PDF Fields: ', fillActa.fecha_toefl);
      logger.log('PDF Fields: ', shortFormatDate(fillActa.fecha_toefl));

      form.getTextField('posgrado').setText("POSGRADO EN COMPUTACIÓN");
      form.getTextField('fecha_eval').setText(shortFormatDate(fillActa.fecha_eval));
      form.getTextField('ap_paterno').setText(fillActa.ap_pat);
      form.getTextField('ap_materno').setText(fillActa.ap_mat);
      form.getTextField('nombres_alumno').setText(fillActa.nombre);

      form.getTextField('programa_posgrado').setText(fillActa.programa);
      form.getTextField('no_avance').setText(fillActa.no_avance.toString());
      form.getTextField('titulo_tesis').setText(fillActa.titulo_tesis);
      form.getTextField('total_avance').setText(fillActa.total_avance);
      form.getTextField('comentarios').setText(fillActa.comentarios);

      form.getTextField('cal_doc_av').setText(fillActa.cal_doc.toString());
      form.getTextField('cal_expo').setText(fillActa.cal_expo.toString());
      form.getTextField('cal_dom').setText(fillActa.cal_dom.toString());
      form.getTextField('grado_avance').setText(fillActa.grado_avance.toString());
      form.getTextField('promedio').setText(fillActa.promedio.toString());

      form.getTextField('fecha_toefl').setText(fillActa.fecha_toefl);
      form.getTextField('puntaje_toefl').setText(fillActa.puntaje_toefl.toString());
      form.getTextField('prox_toefl').setText(shortFormatDate(fillActa.prox_toefl));
      form.getTextField('observaciones').setText(fillActa.observaciones);

      comite.map((elem, i) => {
        form.getTextField(`nom_comite_${i + 1}`).setText(`${elem.nombre} ${elem.apellido_paterno} ${elem.apellido_materno}`);
        form.getTextField(`funcion_${i + 1}`).setText(elem.funcion);
      })

      form.getTextField('posgrado').enableReadOnly();
      form.getTextField('fecha_eval').enableReadOnly();
      form.getTextField('ap_paterno').enableReadOnly();
      form.getTextField('ap_materno').enableReadOnly();
      form.getTextField('nombres_alumno').enableReadOnly();

      form.getTextField('programa_posgrado').enableReadOnly();
      form.getTextField('no_avance').enableReadOnly();
      form.getTextField('titulo_tesis').enableReadOnly();
      form.getTextField('total_avance').enableReadOnly();
      form.getTextField('comentarios').enableReadOnly();

      form.getTextField('cal_doc_av').enableReadOnly();
      form.getTextField('cal_expo').enableReadOnly();
      form.getTextField('cal_dom').enableReadOnly();
      form.getTextField('grado_avance').enableReadOnly();
      form.getTextField('promedio').enableReadOnly();

      form.getTextField('fecha_toefl').enableReadOnly();
      form.getTextField('puntaje_toefl').enableReadOnly();
      form.getTextField('prox_toefl').enableReadOnly();
      form.getTextField('observaciones').enableReadOnly();

      for (let i = 0; i < 7; i++) {
        form.getTextField(`nom_comite_${i + 1}`).enableReadOnly();
        form.getTextField(`funcion_${i + 1}`).enableReadOnly();
      }

      //Codificar datos binarios a base64                
      base64 = await pdfDoc.saveAsBase64();

      //Crear DTO 
      //createActa = new CreateActaEvaluacionDto(Buffer.from(base64), 1);

      var acta = new UpdateActaEvaluacionDto()      
      if(typeof fillActa.id_acta_evaluacion === 'number'){
        acta.id_acta_evaluacion = fillActa.id_acta_evaluacion
      }            
      acta.id_acta_vacia = 1;
      acta.documento_rellenado = Buffer.from(base64);

      let result = await this.actaEvalRepo.save(acta);

      const asignacion = await this.asignacionRepository.findOne({ where: { id_asignacion: idAsignacion } });
      const newAsignacion = {
        ...asignacion,
        calificacion: fillActa.promedio,
        id_acta_evaluacion: result.id_acta_evaluacion,
        retroalimentacion: fillActa.comentarios
      }
      await this.asignacionRepository.save(newAsignacion);
      return result;

    } catch (error) {
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }



  }

  updateDocument(id: number, updateActaEvaluacionDto: UpdateActaEvaluacionDto) {
    return this.actaEvalRepo.findOne({ where: { id_acta_evaluacion: id } });
  }

  remove(id: number) {
    return this.actaEvalRepo.delete(id);
  }
}
