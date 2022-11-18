import { BadRequestException, Injectable } from '@nestjs/common';
import { VotesRepository } from './votes.repository';

@Injectable()
export class VotesService {
    constructor(private votesRepository: VotesRepository) {}

    async createVote(body, user) {
        const { voteTitle, voteListTitle, category } = body;
        const { id } = user;

        const { id: categoryId } = await this.votesRepository.findCategory(category);

        return await this.votesRepository.createVoteAndVoteList(voteTitle, voteListTitle, categoryId, id);
    }

    async getVoteList(user) {
        const { id } = user;

        return await this.votesRepository.getVoteList();
    }

    async getVote(param, user) {
        const voteId = Number(param.voteId);
        const { id } = user;

        return await this.votesRepository.getVote(voteId);
    }

    async clickVote(body, user) {
        const { voteListId } = body;
        const { id } = user;

        // 이미 투표한 사람인지 확인 먼저

        const isVoteRecord = await this.votesRepository.findVoteRecord(id, voteListId);

        if (isVoteRecord) {
            throw new BadRequestException('이미 투표했습니다');
        }

        return await this.votesRepository.createVoteRecord(voteListId, id);
    }
}
