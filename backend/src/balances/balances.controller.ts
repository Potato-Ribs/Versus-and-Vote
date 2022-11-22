import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorator/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateBalanceAndContents } from './dto/createBalanceAndContents.dto';
import { ClickBalance } from './dto/clickBalanceContents.dto';
import { ClickBalanceLike } from './dto/clickBalanceLike.dto';

@ApiTags('밸런스게임')
@Controller('balances')
export class BalancesController {
    constructor(private balanceService: BalancesService) {}
    @ApiOperation({ summary: '밸런스게임 생성하기' })
    @ApiBearerAuth('access-token')
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createBalanceAndContents(@Body() body: CreateBalanceAndContents, @User() user: { id: number }) {
        return await this.balanceService.createBalanceAndContents(body, user);
    }

    @ApiOperation({ summary: '밸런스 게임 좌/우 클릭하기' })
    @ApiBearerAuth('access-token')
    @Post('click')
    @UseGuards(AuthGuard('jwt'))
    async clickContents(@Body() body: ClickBalance, @User() user: { id: number }) {
        return await this.balanceService.clickContents(body, user);
    }

    @ApiOperation({ summary: '밸런스 게임 모든 리스트 불러오기' })
    @ApiBearerAuth('access-token')
    @Get('list')
    @UseGuards(AuthGuard('jwt'))
    async getBalanceList(@User() user: { id: number }) {
        return await this.balanceService.getBalanceList(user);
    }

    @ApiOperation({ summary: '특정 밸런스게임 불러오기' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'balanceId',
        example: 2,
        description: '밸런스게임 아이디',
        required: true,
    })
    @Get(':balanceId')
    @UseGuards(AuthGuard('jwt'))
    async getBalance(@Param('balanceId') balanceId: number, @User() user: { id: number }) {
        return await this.balanceService.getBalance(balanceId, user);
    }

    @ApiOperation({ summary: '밸런스게임 좋아요 클릭하기' })
    @ApiBearerAuth('access-token')
    @Post('like')
    @UseGuards(AuthGuard('jwt'))
    async clickLikes(@Body() body: ClickBalanceLike, @User() user: { id: number }) {
        return await this.balanceService.clickLikes(body, user);
    }

    @ApiOperation({ summary: '특정 밸런스게임 삭제하기' })
    @ApiBearerAuth('access-token')
    @ApiParam({
        name: 'balanceId',
        example: 2,
        description: '밸런스게임 아이디',
        required: true,
    })
    @Delete(':balanceId')
    @UseGuards(AuthGuard('jwt'))
    async deleteBalance(@Param('balanceId') balanceId: number, @User() user: { id: number }) {
        return await this.balanceService.deleteBalance(balanceId, user);
    }
}
