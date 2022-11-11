import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthModule } from './oauth/oauth.module';
import { Users } from '../entity/Users.entity';
import { Balances } from '../entity/Balances.entity';
import { BalanceContents } from '../entity/BalanceContents.entity';
import { BalanceLikes } from '../entity/BalanceLikes.entity';
import { BalanceCounts } from '../entity/BalanceCounts.entity';
import { Boards } from '../entity/Boards.entity';
import { BoardLikes } from '../entity/BoardLikes.entity';
import { Topics } from '../entity/Topics.entity';
import { Comments } from '../entity/Comments.entity';
import { Votes } from '../entity/Votes.entity';
import { VoteLists } from '../entity/VoteLists.entity';
import { VoteRecords } from '../entity/VoteRecords.entity';
import { BalancesModule } from './balances/balances.module';
import { BalanceCategories } from '../entity/BalanceCategories.entity';
import { BoardsModule } from './boards/boards.module';

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
                    entities: [
                        Users,
                        Balances,
                        BalanceContents,
                        BalanceLikes,
                        BalanceCounts,
                        BalanceCategories,
                        Boards,
                        BoardLikes,
                        Topics,
                        Comments,
                        Votes,
                        VoteLists,
                        VoteRecords,
                    ],
                    autoLoadEntities: true,
                    charset: 'utf8mb4',
                    synchronize: true,
                    logging: true,
                };
            },
        }),
        OauthModule,
        BalancesModule,
        BoardsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
