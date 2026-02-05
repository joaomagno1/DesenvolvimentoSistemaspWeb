import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceCreate } from '../service/cidade.service.create';

@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerCreate {
  constructor(private readonly cidadeServiceCreate: CidadeServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.CIDADE.CREATE)
  async create(
    @Req() res: Request,
    @Body() cidadeRequest: CidadeRequest,
  ): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeServiceCreate.create(cidadeRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Cidade cadastrada com sucesso!',
      response,
      res.path,
      null,
    );
  }
}
