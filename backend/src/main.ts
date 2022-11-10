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
        .setTitle('QU DEV BOARD API')
        .setDescription('QU DEV BOARD API Document')
        .setVersion('1.0')
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

    // whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
    // forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
    // transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
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
