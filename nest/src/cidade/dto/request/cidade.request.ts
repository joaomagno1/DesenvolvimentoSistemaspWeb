import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CidadeRequest {
  @Type(() => Number)
  @IsOptional()
  idCidade?: number;

  @IsNotEmpty({ message: 'Código da cidade deve ser informado' })
  @IsString({ message: 'O valor tem quer ser somente texto' })
  @MaxLength(10, {
    message: 'O tamanho máximo é de 10 caracteres para o código da cidade',
  })
  codCidade: string = '';

  @IsNotEmpty({ message: 'Nome da cidade deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome da cidade',
  })
  nomeCidade: string = '';

  constructor(data: Partial<CidadeRequest> = {}) {
    Object.assign(this, data);
  }
}
