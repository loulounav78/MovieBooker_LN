import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API MovieBooker') 
    .setDescription('Documentation de l\'API MovieBooker') 
    .setVersion('1.0') 
    .addBearerAuth(  {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Entrez votre token JWT ici',
    },
    'access-token',
) 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
