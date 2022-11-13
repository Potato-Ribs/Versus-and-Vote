import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boards } from '../../entity/Boards.entity';
import { Repository } from 'typeorm';
import { BoardLikes } from '../../entity/BoardLikes.entity';
import { BoardComments } from '../../entity/BoardComments.entity';

@Injectable()
export class BoardsRepository {
    constructor(
        @InjectRepository(Boards) private boardsRepository: Repository<Boards>,
        @InjectRepository(BoardLikes) private boardLikesRepository: Repository<BoardLikes>,
        @InjectRepository(BoardComments) private boardCommentsRepository: Repository<BoardComments>,
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
        return await this.boardsRepository
            .createQueryBuilder('board')
            .where('board.id =:id', { id: boardId })
            .innerJoinAndSelect('board.Topics', 'topic')
            .innerJoinAndSelect('board.Users', 'user')
            .leftJoinAndSelect('board.BoardComments', 'boardComment')
            .leftJoinAndSelect('boardComment.Users', 'boardCommentUser')
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

    async createBoardComment(contents, boardId, id) {
        const newBoardComment = this.boardCommentsRepository.create();
        newBoardComment.contents = contents;
        newBoardComment.UserId = id;
        newBoardComment.BoardId = boardId;
        return await this.boardCommentsRepository.save(newBoardComment);
    }

    async findBoardComment(boardCommentId) {
        return await this.boardCommentsRepository.findOne({ id: boardCommentId });
    }

    async editBoardComment(contents, boardCommentId) {
        const isBoardComment = await this.boardCommentsRepository.findOne({ id: boardCommentId });
        isBoardComment.contents = contents;
        return await this.boardCommentsRepository.save(isBoardComment);
    }

    async deleteBoardComment(boardCommentId) {
        return await this.boardCommentsRepository.delete({ id: boardCommentId });
    }
}
