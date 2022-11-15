import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    //Swagger 추가
    const config = new DocumentBuilder()
        .setTitle('VV API BOARD')
        .setDescription('VV API Document')
        .setVersion('VER : 0.01 ')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());

    if (process.env.NODE_ENV === 'production') {
        app.enableCors({
            origin: true,
            credentials: true,
        });
    } else {
        app.enableCors({
            origin: true,
            credentials: true,
        });
    }
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    await app.listen(3030);
}
bootstrap();
