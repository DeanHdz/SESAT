import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Optional, Inject } from '@nestjs/common';
import { ActaEvaluacionService } from './acta-evaluacion.service';
import { CreateActaEvaluacionDto } from './dto/create-acta-evaluacion.dto';
import { UpdateActaEvaluacionDto } from './dto/update-acta-evaluacion.dto';
import { PDFDocument } from "pdf-lib";
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
    var pdfBytes: Uint8Array;
    //obtener formato de la BD para rellenarlo (string base64)       
    var emptyFormat = await this.formatosRepository.findOne({where:{id_formatos: 111}});
    var base64String = emptyFormat.acta_evaluacion;
    

    var logger = new Logger('PDFDetails'); 
        
    //Decodificar base64 string, crear Buffer para PDF-LIB    
    const uint8Array = new Uint8Array(decode(base64String.toString()));
    
    try {      
        //logger.log(uint8Array);
        var pdfDoc = await PDFDocument.load(uint8Array);

        //Nombres de las variables de los campos del PDF
        const fieldNames = pdfDoc
          .getForm()
          .getFields()
          .map((f) => f.getName());

        logger.log('PDF Fields: ', fieldNames);
                
        //Editar campos del PDF
        var form = pdfDoc.getForm();
        form.getTextField('Text-num-reporte').setText(createFormulario.num_evaluacion.toString());
        form.getTextField('Text-Ap-Paterno').setText(createFormulario.ap_pat);
        form.getTextField('Text-Ap-Mat').setText(createFormulario.ap_mat);
        form.getTextField('Text-Nombres').setText(createFormulario.nombre);

        //Guardar cambios(en memoria)
        pdfBytes = await pdfDoc.save();

        //Codificar datos binarios a base64
        base64String = encode(pdfBytes);
                                        
      }catch (error) {
        logger.log(error);
      }
      //Crear DTO
      createActa = new CreateActaEvaluacionDto(100,parseInt(id),base64String,111);   
    
      //return this.actaEvaluacionService.create(createActa);
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
