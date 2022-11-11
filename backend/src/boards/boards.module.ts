import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from '../../entity/Boards.entity';
import { BoardLikes } from '../../entity/BoardLikes.entity';
import { Topics } from '../../entity/Topics.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Boards, BoardLikes, Topics])],
    controllers: [BoardsController],
    providers: [BoardsService, BoardsRepository],
})
export class BoardsModule {}
