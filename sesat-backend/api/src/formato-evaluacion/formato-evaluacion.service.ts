import { Injectable, Logger } from "@nestjs/common";
import { CreateFormatoEvaluacionDto } from "./dto/create-formato-evaluacion.dto";
import { UpdateFormatoEvaluacionDto } from "./dto/update-formato-evaluacion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FormatoEvaluacion } from "./entities/formato-evaluacion.entity";
import { Repository } from "typeorm";
import { FilledFormat } from "./dto/create-formulario.dto";
import { FormatoVacio } from "src/formato-vacio/entities/formato-vacio.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { decode } from "base64-arraybuffer";
import { PDFDocument } from "pdf-lib";
import { shortFormatDate } from "src/utils/utils";
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FormatoEvaluacionService {
  constructor(
    @InjectRepository(FormatoEvaluacion)
    private formatoEvaluacionRepository: Repository<FormatoEvaluacion>,

    @InjectRepository(FormatoVacio)
    private readonly formatoVacioRepository: Repository<FormatoVacio>,

    @InjectRepository(Asignacion)
    private readonly asignacionRepository: Repository<Asignacion>,
  ) { }

  create(createFormatoEvaluacionDto: CreateFormatoEvaluacionDto) {
    return this.formatoEvaluacionRepository.save(createFormatoEvaluacionDto);
  }

  findAll() {
    return this.formatoEvaluacionRepository.find();
  }

  findOne(id: number) {
    return this.formatoEvaluacionRepository.findOne({
      where: { id_formato_evaluacion: id },
    });
  }

  async findDocumentData(id: number) {

    var document = await this.formatoEvaluacionRepository.findOne({
      where: { id_formato_evaluacion: id },
    });

    var buffer = document.documento_rellenado;

    //Ver en formato UTF-8, no lo reconoce por default 
    var base64 = new TextDecoder().decode(buffer);

    //Decodificar de base64, crea Buffer para PDF-LIB
    var uint8Array = new Uint8Array(decode(base64));

    try {
      var pdfDoc = await PDFDocument.load(uint8Array);
      var form = pdfDoc.getForm();

      const response = {
        titulo_reporte: form.getTextField('titulo_reporte').getText(),
        fecha_limite: form.getTextField('fecha_limite').getText()
      }

      return response;
    } catch (error) {
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async createActaAndfillDocument(idAsignacion: number, fillFormat: FilledFormat) {    
    //obtener formato de la BD para rellenarlo, el resultado 
    //por default se carga en un ArrayBuffer aunque sea un string       
    var emptyFormat = await this.formatoVacioRepository.findOne({ where: { id_formato_vacio: 2 } });
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
      });
      //FOR Testing:
      let textField = form.createTextField(`comite_member_${i}`);
      textField.setText(members[i]);
      form.addField(textField)
      */

      //Nombres de las variables de los campos del PDF (FOR DEBUG)
      /*const fieldNames = pdfDoc
        .getForm()
        .getFields()
        .map((f) => f.getName());

      logger.log('PDF Fields: ', fieldNames);
      logger.log('ID: ', idAsignacion);
      */
      //Editar campos del PDF

      let comite_members = "";      

      fillFormat.comite.forEach(elem => {
        if(elem.nombre_funcion !== 'Asesor' && elem.nombre_funcion !== 'Co-asesor'){
          comite_members += `${elem.nombre} ${elem.apellido_paterno} ${elem.apellido_materno}, `
        }
      });      
      
      comite_members = comite_members.substring(0, comite_members.length - 2)

      var form = pdfDoc.getForm();

      form.getTextField('titulo_reporte').setText(fillFormat.titulo_reporte);
      form.getTextField('grado').setText(fillFormat.grado);
      form.getTextField('estudiante').setText(fillFormat.estudiante);
      form.getTextField('asesor').setText(fillFormat.asesor);
      form.getTextField('coasesor').setText(fillFormat.coasesor);
      form.getTextField('comite').setText(comite_members);
      form.getTextField('titulo').setText(fillFormat.titulo_tesis);
      form.getTextField('fecha_comienzo').setText(shortFormatDate(fillFormat.fecha_comienzo));
      form.getTextField('fecha_limite').setText(shortFormatDate(fillFormat.fecha_limite));

      form.getTextField('titulo_reporte').enableReadOnly();
      form.getTextField('grado').enableReadOnly();
      form.getTextField('estudiante').enableReadOnly();
      form.getTextField('asesor').enableReadOnly();
      form.getTextField('coasesor').enableReadOnly();
      form.getTextField('comite').enableReadOnly();
      form.getTextField('titulo').enableReadOnly();
      form.getTextField('fecha_comienzo').enableReadOnly();
      form.getTextField('fecha_limite').enableReadOnly();






      //Codificar datos binarios a base64                
      base64 = await pdfDoc.saveAsBase64();

      //Crear DTO 
      var updateFormato = new UpdateFormatoEvaluacionDto();
      if(typeof fillFormat.id_formato_evaluacion === 'number'){
        updateFormato.id_formato_evaluacion = fillFormat.id_formato_evaluacion;
      }
      updateFormato.id_formato_vacio = 2;
      updateFormato.documento_rellenado = Buffer.from(base64);

      let result = await this.formatoEvaluacionRepository.save(updateFormato);

      const asignacion = await this.asignacionRepository.findOne({ where: { id_asignacion: idAsignacion } });
      const newAsignacion = {
        ...asignacion,
        id_formato_evaluacion: result.id_formato_evaluacion
      }
      await this.asignacionRepository.save(newAsignacion);
      return result;

    } catch (error) {
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //Pendientes
    //Actualizar calificacion en tabla asignacion



  }

  update(updateFormatoEvaluacionDto: UpdateFormatoEvaluacionDto) {
    return this.formatoEvaluacionRepository.save(updateFormatoEvaluacionDto);
  }

  remove(id: number) {
    return this.formatoEvaluacionRepository.delete(id);
  }
}
