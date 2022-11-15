import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from '../../entity/Boards.entity';
import { BoardLikes } from '../../entity/BoardLikes.entity';
import { Topics } from '../../entity/Topics.entity';
import { BoardComments } from '../../entity/BoardComments.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Boards, BoardLikes, BoardComments, Topics])],
    controllers: [BoardsController],
    providers: [BoardsService, BoardsRepository],
})
export class BoardsModule {}
