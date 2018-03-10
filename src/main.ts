import './env';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UncaughtExceptionFilter } from './filters/uncaught-exception.filter';
import { setupRequestMiddleware } from './middlewares/setup-request.middleware';

async function bootstrap() {
    const port: number = Number(process.env.PORT);
    const app: INestApplication = await NestFactory.create(ApplicationModule);

    app.useGlobalFilters(new UncaughtExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(setupRequestMiddleware);

    const options = new DocumentBuilder()
        .setTitle('TechDays API')
        .setVersion('1.0')
        .addBearerAuth('Authorization', 'header')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/swagger', app, document);

    app.enableCors();
    await app.listen(port);
}

bootstrap();
