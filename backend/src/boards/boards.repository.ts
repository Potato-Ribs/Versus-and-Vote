import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boards } from '../../entity/Boards.entity';
import { Repository } from 'typeorm';
import { BoardLikes } from '../../entity/BoardLikes.entity';

@Injectable()
export class BoardsRepository {
    constructor(
        @InjectRepository(Boards) private boardsRepository: Repository<Boards>,
        @InjectRepository(BoardLikes) private boardLikesRepository: Repository<BoardLikes>,
    ) {}

    async createBoard(topicId, title, contents, id) {
        const newBoard = this.boardsRepository.create();
        newBoard.title = title;
        newBoard.contents = contents;
        newBoard.UserId = id;
        newBoard.TopicId = topicId;
        return await this.boardsRepository.save(newBoard);
    }

    async getBoard(boardId) {
        console.log(boardId);
        return await this.boardsRepository
            .createQueryBuilder('board')
            .where('board.id =:id', { id: boardId })
            .innerJoinAndSelect('board.Topics', 'topic')
            .innerJoinAndSelect('board.Users', 'user')
            .leftJoin('board.BoardLikes', 'boardLike')
            .addSelect(['boardLike.id'])
            .getOne();
    }

    async editBoard(topicId, title, contents, isBoard) {
        isBoard.title = title;
        isBoard.contents = contents;
        isBoard.TopicId = topicId;
        return await this.boardsRepository.save(isBoard);
    }

    async getBoardByBoardId(boardId) {
        return await this.boardsRepository.findOne({ id: boardId });
    }

    async deleteBoard(boardId) {
        return await this.boardsRepository.delete({ id: boardId });
    }

    async checkLikable(boardId, id) {
        return await this.boardLikesRepository.findOne({ BoardId: boardId, UserId: id });
    }

    async clickLikes(boardId, id) {
        const newBoardLike = this.boardLikesRepository.create();
        newBoardLike.UserId = id;
        newBoardLike.BoardId = boardId;
        return await this.boardLikesRepository.save(newBoardLike);
    }

    async unClickLikes(boardId, id) {
        return await this.boardLikesRepository.delete({ BoardId: boardId, UserId: id });
    }

    async getBoardList() {
        return await this.boardsRepository
            .createQueryBuilder('board')
            .innerJoin('board.Topics', 'topic')
            .innerJoin('board.Users', 'user')
            .select([
                'board.id',
                'board.title',
                'board.createdAt',
                'topic.id',
                'topic.name',
                'user.nickname',
                'user.photo',
            ])
            .getMany();
    }
}
