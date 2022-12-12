import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorator/user.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/createBoard.dto';
import { LikeBoardDto } from './dto/likeBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';
import { CreateCommentBoardDto } from './dto/createCommentBoard.dto';
import { UpdateCommentBoardDto } from './dto/updateCommentBoard.dto';

@ApiTags('자유게시판')
@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @ApiOperation({ summary: '자유게시글 생성하기' })
    @ApiBearerAuth('access-token')
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createBoard(@Body() body: CreateBoardDto, @User() user: { id: number }) {
        return await this.boardsService.createBoard(body, user);
    }

    @ApiOperation({ summary: '자유게시글 리스트 불러오기' })
    @ApiBearerAuth('access-token')
    @Get('list')
    @UseGuards(AuthGuard('jwt'))
    async getBoardList(@User() user: { id: number }) {
        return await this.boardsService.getBoardList(user);
    }

    @ApiOperation({ summary: '특정 자유게시글 불러오기' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'boardId',
        example: '2',
        description: '밸런스게임 아이디',
        required: true,
    })
    @Get(':boardId')
    @UseGuards(AuthGuard('jwt'))
    async getBoard(@Param('boardId') boardId: number, @User() user: { id: number }) {
        return await this.boardsService.getBoard(boardId, user);
    }

    @ApiOperation({ summary: '특정 자유게시글 수정' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'boardId',
        example: '2',
        description: '자유게시글 아이디',
        required: true,
    })
    @Put(':boardId')
    @UseGuards(AuthGuard('jwt'))
    async editBoard(@Param('boardId') boardId: number, @User() user: { id: number }, @Body() body: UpdateBoardDto) {
        return await this.boardsService.editBoard(boardId, user, body);
    }

    @ApiOperation({ summary: '특정 자유게시글 삭제' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'boardId',
        example: '2',
        description: '밸런스게임 아이디',
        required: true,
    })
    @Delete(':boardId')
    @UseGuards(AuthGuard('jwt'))
    async deleteBoard(@Param('boardId') boardId: number, @User() user: { id: number }) {
        return await this.boardsService.deleteBoard(boardId, user);
    }

    @ApiOperation({ summary: '자유게시글 좋아요' })
    @ApiBearerAuth('access-token')
    @Post('like')
    @UseGuards(AuthGuard('jwt'))
    async clickLike(@Body() body: LikeBoardDto, @User() user: { id: number }) {
        return await this.boardsService.clickLike(body, user);
    }

    @ApiOperation({ summary: '자유게시글 댓글 작성하기' })
    @ApiBearerAuth('access-token')
    @Post('comment')
    @UseGuards(AuthGuard('jwt'))
    async createBoardComment(@Body() body: CreateCommentBoardDto, @User() user: { id: number }) {
        return await this.boardsService.createBoardComment(body, user);
    }

    @ApiOperation({ summary: '특정 자유게시글 댓글 수정하기' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'boardCommentId',
        example: 1,
        description: '자유게시글 댓글 아이디',
        required: true,
    })
    @Put('comment/:boardCommentId')
    @UseGuards(AuthGuard('jwt'))
    async editBoardComment(
        @Param('boardCommentId') boardCommentId: number,
        @User() user: { id: number },
        @Body() body: UpdateCommentBoardDto,
    ) {
        return await this.boardsService.editBoardComment(body, boardCommentId, user);
    }

    @ApiOperation({ summary: '특정 자유게시글 댓글 삭제' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'boardCommentId',
        example: 1,
        description: '자유게시글 댓글 아이디',
        required: true,
    })
    @Delete('comment/:boardCommentId')
    @UseGuards(AuthGuard('jwt'))
    async deleteBoardComment(@Param('boardCommentId') boardCommentId: number, @User() user: { id: number }) {
        return await this.boardsService.deleteBoardComment(boardCommentId, user);
    }
}
