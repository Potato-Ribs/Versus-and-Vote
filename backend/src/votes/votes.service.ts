import { Injectable } from '@nestjs/common';
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
}
