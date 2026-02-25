import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './commons/exceptions/filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Accept'
  })

  const configSwagger = new DocumentBuilder()
    .setTitle('Sistema Acadêmico')
    .setDescription('API para gestão acadêmica')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('api-academico', app, document);

  await app.listen(process.env.PORT ?? 5000);
}
void bootstrap();