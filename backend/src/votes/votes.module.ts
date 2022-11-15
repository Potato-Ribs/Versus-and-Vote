import { Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { VotesRepository } from './votes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votes } from '../../entity/Votes.entity';
import { VoteLists } from '../../entity/VoteLists.entity';
import { VoteRecords } from '../../entity/VoteRecords.entity';
import { Comments } from '../../entity/Comments.entity';
import { VoteCategories } from '../../entity/VoteCategory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Votes, VoteLists, VoteRecords, VoteCategories, Comments])],
    controllers: [VotesController],
    providers: [VotesService, VotesRepository],
})
export class VotesModule {}
