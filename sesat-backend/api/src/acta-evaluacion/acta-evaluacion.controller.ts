import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ActaEvaluacionService } from './acta-evaluacion.service';
import { CreateActaEvaluacionDto } from './dto/create-acta-evaluacion.dto';
import { UpdateActaEvaluacionDto } from './dto/update-acta-evaluacion.dto';
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import { CreateFormulario } from './dto/create-formulario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormatosVacios } from 'src/formatos-vacios/entities/formatos-vacios.entity';
import { Logger } from '@nestjs/common';
import { decode, encode } from "base64-arraybuffer";


@Controller('acta-evaluacion')
export class ActaEvaluacionController {
  /*constructor(
    private readonly actaEvaluacionService: ActaEvaluacionService        
    ) {}

    @InjectRepository(FormatosVacios)
    private readonly formatosRepository: Repository<FormatosVacios>;
  
    @Post()
    createActaEvaluacion(@Body() createActaEvaluacion: CreateActaEvaluacionDto){
      return this.actaEvaluacionService.createActaEvaluacion(createActaEvaluacion);
    }

  //el id de acta
  @Put()
  async create(@Body() createFormulario: CreateFormulario) {
  
    var createActa: CreateActaEvaluacionDto;    
    //obtener formato de la BD para rellenarlo, el resultado 
    //por default se carga en un ArrayBuffer aunque sea un string       
    var emptyFormat = await this.formatosRepository.findOne({where:{id_formatos_vacios: 1}});
    var buffer = emptyFormat.acta_evaluacion;    

    var logger = new Logger('PDFDetails');               
    
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
          y: height/2 + 195,
          size: 10,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),          
        });
        //Nombres de las variables de los campos del PDF (FOR DEBUG)
        const fieldNames = pdfDoc
          .getForm()
          .getFields()
          .map((f) => f.getName());

        logger.log('PDF Fields: ', fieldNames);*/
        
        //Editar campos del PDF
      /*
        var form = pdfDoc.getForm();
        
        form.getTextField('posgrado').setText("Ciencias de la Computación");
        form.getTextField('fecha_eval').setText(createFormulario.fecha_eval);
        form.getTextField('ap_paterno').setText(createFormulario.ap_pat);
        form.getTextField('ap_materno').setText(createFormulario.ap_mat);
        form.getTextField('nombres_alumno').setText(createFormulario.nombre);

        form.getTextField('programa_posgrado').setText(createFormulario.programa);
        form.getTextField('no_avance').setText(createFormulario.no_avance.toString());
        form.getTextField('titulo_tesis').setText(createFormulario.titulo_tesis);
        form.getTextField('total_avance').setText(createFormulario.total_avance);
        form.getTextField('comentarios').setText(createFormulario.comentarios);                 

        form.getTextField('cal_doc_av').setText(createFormulario.cal_doc.toString());
        form.getTextField('cal_expo').setText(createFormulario.cal_expo.toString());
        form.getTextField('cal_dom').setText(createFormulario.cal_dom.toString());
        form.getTextField('grado_avance').setText(createFormulario.grado_avance.toString());
        form.getTextField('promedio').setText(createFormulario.promedio.toString());  

        form.getTextField('fecha_toefl').setText(createFormulario.fecha_toefl);
        form.getTextField('puntaje_toefl').setText(createFormulario.puntaje_toefl.toString());
        form.getTextField('prox_toefl').setText(createFormulario.prox_toefl);
        form.getTextField('observaciones').setText(createFormulario.observaciones);


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
        
        
        
            
        //Codificar datos binarios a base64                
        base64 = await pdfDoc.saveAsBase64();
                                        
      }catch (error) {
        logger.log(error);
      }  

      //Crear DTO    !!  

      createActa = new CreateActaEvaluacionDto(102,parseInt(id),base64,888);
        
      //insetar PDF en la base de datos 
      return this.actaEvaluacionService.create(createActa);        
  }*/

/*
  @Get()
  findAll() {
    return this.actaEvaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const logger = new Logger("GetRequestActa");
    logger.log('Requesting acta: id=' + id);
    return this.actaEvaluacionService.findOne(+id);
  }
  */
  /*@Put(':id')
  update(@Param('id') id: string, @Body() updateActaEvaluacionDto: UpdateActaEvaluacionDto) {
    return this.actaEvaluacionService.update(updateActaEvaluacionDto);
  }*/
/*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actaEvaluacionService.remove(+id);
  }*/
}
