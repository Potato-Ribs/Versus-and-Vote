import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VotesService } from './votes.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorator/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('투표게시판')
@Controller('votes')
export class VotesController {
    constructor(private votesService: VotesService) {}

    @ApiOperation({ summary: '투표게시글 생성하기' })
    @ApiBearerAuth('access-token')
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createVote(@Body() body, @User() user) {
        return await this.votesService.createVote(body, user);
    }

    @ApiOperation({ summary: '투표게시글 리스트 불러오기' })
    @ApiBearerAuth('access-token')
    @Get('list')
    @UseGuards(AuthGuard('jwt'))
    async getVoteList(@User() user) {
        return await this.votesService.getVoteList(user);
    }

    @ApiOperation({ summary: '특정 투표게시글 불러오기' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'voteId',
        example: '1',
        description: '투표게시글 아이디',
        required: true,
    })
    @Get(':voteId')
    @UseGuards(AuthGuard('jwt'))
    async getVote(@Param('voteId') voteId: number, @User() user) {
        return await this.votesService.getVote(voteId, user);
    }

    @ApiOperation({ summary: '투표하기!' })
    @ApiBearerAuth('access-token')
    @Post('click')
    @UseGuards(AuthGuard('jwt'))
    async clickVote(@Body() body, @User() user) {
        return await this.votesService.clickVote(body, user);
    }

    @ApiOperation({ summary: '투표게시글 삭제하기!' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'voteId',
        example: '1',
        description: '투표게시글 아이디',
        required: true,
    })
    @Delete(':voteId')
    @UseGuards(AuthGuard('jwt'))
    async deleteVote(@Param('voteId') voteId: number, @User() user) {
        return await this.votesService.deleteVote(voteId, user);
    }
}
