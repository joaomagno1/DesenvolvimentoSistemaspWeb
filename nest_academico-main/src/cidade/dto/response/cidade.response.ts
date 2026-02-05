import { Expose } from 'class-transformer';

export class CidadeResponse {
  @Expose()
  idCidade?: number;

  @Expose()
  codCidade: string = '';

  @Expose()
  nomeCidade: string = '';
}
