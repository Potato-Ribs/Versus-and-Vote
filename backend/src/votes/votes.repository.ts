import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Votes } from '../../entity/Votes.entity';
import { Repository } from 'typeorm';
import { VoteLists } from '../../entity/VoteLists.entity';
import { VoteCategories } from '../../entity/VoteCategory.entity';
import { VoteRecords } from 'entity/VoteRecords.entity';

@Injectable()
export class VotesRepository {
    constructor(
        @InjectRepository(Votes) private votesRepository: Repository<Votes>,
        @InjectRepository(VoteLists) private voteListsRepository: Repository<VoteLists>,
        @InjectRepository(VoteCategories) private voteCategoriesRepository: Repository<VoteCategories>,
        @InjectRepository(VoteRecords) private voteRecordsRepository: Repository<VoteRecords>,
    ) {}

    async createVoteAndVoteList(voteTitle, voteListTitle, categoryId, id) {
        const { id: voteId } = await this.createVote(voteTitle, categoryId, id);

        for (let i = 0; i < voteListTitle.length; i++) {
            await this.createVoteList(voteListTitle[i], voteId);
        }
        return 'ok';
    }

    async createVote(title: string, categoryId: number, id: number) {
        const newVote = this.votesRepository.create();
        newVote.title = title;
        newVote.VoteCategoryId = categoryId;
        newVote.UserId = id;
        return await this.votesRepository.save(newVote);
    }

    async createVoteList(title: string, voteId: number) {
        const newVoteList = this.voteListsRepository.create();
        newVoteList.title = title;
        newVoteList.VoteId = voteId;
        return await this.voteListsRepository.save(newVoteList);
    }

    async getVoteList() {
        return await this.votesRepository
            .createQueryBuilder('vote')
            .innerJoin('vote.VoteCategories', 'voteCategories')
            .innerJoin('vote.Users', 'user')
            .select([
                'vote.id',
                'vote.title',
                'vote.createdAt',
                'VoteCategories.id',
                'VoteCategories.name',
                'user.nickname',
                'user.photo',
            ])
            .getMany();
    }

    async getVote(voteId: number) {
        return await this.votesRepository
            .createQueryBuilder('vote')
            .where('vote.id =:id', { id: voteId })
            .innerJoinAndSelect('vote.VoteCategories', 'voteCategory')
            .innerJoinAndSelect('vote.Users', 'user')
            .innerJoinAndSelect('vote.VoteLists', 'voteList')
            .leftJoinAndSelect('voteList.VoteRecords', 'voteRecord')
            .leftJoinAndSelect('vote.Comments', 'comment')
            .leftJoinAndSelect('comment.Users', 'commentUser')
            .getOne();
    }

    async findCategory(category: string) {
        return await this.voteCategoriesRepository.findOne({ name: category });
    }

    async findVoteRecord(id: number, voteListId: number) {
        return await this.voteRecordsRepository.findOne({ UserId: id, id: voteListId });
    }

    async createVoteRecord(voteListId: number, id: number) {
        const newVoteRecord = this.voteRecordsRepository.create();
        newVoteRecord.VoteListId = voteListId;
        newVoteRecord.UserId = id;
        return await this.voteRecordsRepository.save(newVoteRecord);
    }
}
