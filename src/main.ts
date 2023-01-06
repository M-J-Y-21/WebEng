import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const handleNotFound = (request, response) => {
  response.status(404).send({ error: 'Not found' });
};


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  app.use(handleNotFound);
  await app.listen(3000);
}
bootstrap();
