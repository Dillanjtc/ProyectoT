import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateFormularioDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsString()
  @IsOptional()
  serie?: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  recomendado?: string;

}
