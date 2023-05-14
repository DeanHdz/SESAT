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
  constructor(
    private readonly actaEvaluacionService: ActaEvaluacionService        
    ) {}

    @InjectRepository(FormatosVacios)
    private readonly formatosRepository: Repository<FormatosVacios>;
  
  //el id de asignacion
  @Post(':id')
  async create(@Param('id') id: string, @Body() createFormulario: CreateFormulario) {
  
    var createActa: CreateActaEvaluacionDto;    
    //obtener formato de la BD para rellenarlo, el resultado 
    //por default se carga en un ArrayBuffer aunque sea un string       
    var emptyFormat = await this.formatosRepository.findOne({where:{id_formatos: 888}});
    var buffer = emptyFormat.acta_evaluacion;    

    var logger = new Logger('PDFDetails');               
    
    //Ver en formato UTF-8, no lo reconoce por default 
    var base64 = new TextDecoder().decode(buffer);  
        
    //Decodificar de base64, crea Buffer para PDF-LIB
    var uint8Array = new Uint8Array(decode(base64));

    try {              
        var pdfDoc = await PDFDocument.load(uint8Array);
        
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
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
        //Nombres de las variables de los campos del PDF
        const fieldNames = pdfDoc
          .getForm()
          .getFields()
          .map((f) => f.getName());

        logger.log('PDF Fields: ', fieldNames);*/
        
        //Editar campos del PDF
      
        var form = pdfDoc.getForm();
        //form.getTextField('location').setText(createFormulario.num_evaluacion.toString());
        form.getTextField('location').setText(createFormulario.ap_pat);
        form.getTextField('function').setText(createFormulario.ap_mat);
        form.getTextField('reason').setText(createFormulario.nombre);

        form.getTextField('location').enableReadOnly();        
        form.getTextField('function').enableReadOnly();
        form.getTextField('reason').enableReadOnly();
        
        
        
            
        //Codificar datos binarios a base64                
        base64 = await pdfDoc.saveAsBase64();
                                        
      }catch (error) {
        logger.log(error);
      }  

      //Crear DTO       
      createActa = new CreateActaEvaluacionDto(102,parseInt(id),base64,888);
        
      //insetar PDF en la base de datos 
      return this.actaEvaluacionService.create(createActa);        
  }


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
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateActaEvaluacionDto: UpdateActaEvaluacionDto) {
    return this.actaEvaluacionService.update(updateActaEvaluacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actaEvaluacionService.remove(+id);
  }
}
