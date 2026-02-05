import { NestFactory } from '@nestjs/core';
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

  await app.listen(process.env.PORT ?? 5000);
}
void bootstrap();
