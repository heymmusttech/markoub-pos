import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  


  /**
   * Global Validation Pipe
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Enable CORS    
   * @param {*} app
   * @returns
   * @memberof bootstrap
   * @todo: Add CORS to the swagger docs
   * */
  app.enableCors({
    origin: '*',  // Specify your frontend domain exactly
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  // Include OPTIONS for preflight
    credentials: true,  // If you're using cookies/authentication
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',  // Common headers
  });

  /*
   * Start the server
   */
  app.setGlobalPrefix('api');


  /**
   * Swagger Setup
   */
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MARKOUB POS - Ticket Point of Sale System API')
    .setDescription('Use the base API URL as http://localhost:3300/')
    .setTermsOfService('http://localhost:3300/terms')
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addServer(process.env.SWAGGER_SERVER || 'http://localhost:3300')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  /**
   * Start the server
   */
  await app.listen(3300);
}
bootstrap();
