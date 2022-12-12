import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dto/createBoard.dto';

@Injectable()
export class BoardsService {
    constructor(private boardsRepository: BoardsRepository) {}

    async createBoard(body: CreateBoardDto, user: { id: number }) {
        const { topicId, title, contents } = body;
        const { id } = user;

        // 유저 체크

        return await this.boardsRepository.createBoard(topicId, title, contents, id);
    }

    async getBoard(boardId: number, user) {
        const { id } = user;

        // 유저 체크

        const isBoard = await this.boardsRepository.getBoard(boardId);

        // @ts-ignore
        isBoard.BoardLikes = isBoard.BoardLikes.length;

        return isBoard;
    }

    async getBoardList(user) {
        const { id } = user;

        // 유저 체크

        return await this.boardsRepository.getBoardList();
    }

    async editBoard(boardId: number, user, body) {
        const { topicId, title, contents } = body;
        const { id } = user;

        const isBoard = await this.boardsRepository.getBoardByBoardId(boardId);
        if (isBoard.id !== boardId) {
            throw new BadRequestException('권한없음');
        }

        return await this.boardsRepository.editBoard(topicId, title, contents, isBoard);
    }

    async deleteBoard(boardId: number, user) {
        const { id } = user;

        const isBoard = await this.boardsRepository.getBoardByBoardId(boardId);
        if (isBoard.id !== boardId) {
            throw new BadRequestException('권한없음');
        }

        return await this.boardsRepository.deleteBoard(boardId);
    }

    async clickLike(body, user) {
        const { boardId } = body;
        const { id } = user;

        const likable = await this.boardsRepository.checkLikable(boardId, id);

        if (!likable) {
            return await this.boardsRepository.clickLikes(boardId, id);
        }
        return await this.boardsRepository.unClickLikes(boardId, id);
    }

    async createBoardComment(body, user) {
        const { contents, boardId } = body;
        const { id } = user;

        return await this.boardsRepository.createBoardComment(contents, boardId, id);
    }

    async editBoardComment(body, boardCommentId: number, user) {
        const { contents } = body;

        const { id } = user;

        const isBoardComment = await this.boardsRepository.findBoardComment(boardCommentId);

        if (isBoardComment.UserId !== id) {
            throw new BadRequestException('권한없음');
        }

        return await this.boardsRepository.editBoardComment(contents, boardCommentId);
    }

    async deleteBoardComment(boardCommentId: number, user) {
        const { id } = user;

        const isBoardComment = await this.boardsRepository.findBoardComment(boardCommentId);

        if (isBoardComment.UserId !== id) {
            throw new BadRequestException('권한없음');
        }

        return await this.boardsRepository.deleteBoardComment(boardCommentId);
    }
}
