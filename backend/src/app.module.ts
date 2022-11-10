import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthModule } from './oauth/oauth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [],
                    autoLoadEntities: true,
                    charset: 'utf8mb4',
                    synchronize: true,
                    logging: true, // query 날리는것 로깅
                    // keepConnectionAlive: true, //hot reloading 할때 필요
                };
            },
        }),
        OauthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
