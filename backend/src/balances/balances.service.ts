import { BadRequestException, Injectable } from '@nestjs/common';
import { BalancesRepository } from './balances.repository';
import { ClickBalance } from './dto/clickBalanceContents.dto';
import { ClickBalanceLike } from './dto/clickBalanceLike.dto';
import { CreateBalanceAndContents } from './dto/createBalanceAndContents.dto';

@Injectable()
export class BalancesService {
    constructor(protected balanceRepository: BalancesRepository) {}

    async createBalanceAndContents(body: CreateBalanceAndContents, user: { id: number }) {
        const { left, right, title } = body;
        const { id } = user;

        // id 검증 해야함

        return await this.balanceRepository.createBalanceAndContents(id, left, right, title);
    }

    async clickContents(body: ClickBalance, user: { id: number }) {
        const { balanceContentsId } = body;
        const { id } = user;

        // id 검증 해야함
        // 없는 balanceContentsId 들어왓을때도 핸들링해야함
        const clickable = await this.balanceRepository.checkClickable(id);

        if (clickable) {
            throw new BadRequestException('이미 선택했습니다');
        }

        return await this.balanceRepository.createBalanceCounts(balanceContentsId, id);
    }

    async getBalance(balanceId: number, user: { id: number }) {
        const { id } = user;

        // id 검증 해야함

        let isBalance = await this.balanceRepository.getBalance(balanceId);

        if (!isBalance) {
            throw new BadRequestException('삭제된 게시글입니다');
        }

        // @ts-ignore
        isBalance.BalanceContents[0].BalanceCounts = isBalance.BalanceContents[0].BalanceCounts.length;
        // @ts-ignore
        isBalance.BalanceContents[1].BalanceCounts = isBalance.BalanceContents[1].BalanceCounts.length;
        return isBalance;
    }

    async clickLikes(body: ClickBalanceLike, user: { id: number }) {
        const { balanceId, categoryId } = body;
        const { id } = user;

        const likable = await this.balanceRepository.checkLikable(balanceId, categoryId, id);

        if (!likable) {
            return await this.balanceRepository.clickLikes(balanceId, categoryId, id);
        }
        return await this.balanceRepository.unClickLikes(balanceId, categoryId, id);
    }

    async getBalanceList(user: { id: number }) {
        const { id } = user;

        //id 검증 필ㄷ요

        const isBalanceList = await this.balanceRepository.getBalanceList();

        if (!isBalanceList.length) {
            return isBalanceList;
        }

        for (let i = 0; i < isBalanceList.length; i++) {
            const count =
                isBalanceList[i].BalanceContents[0].BalanceCounts.length +
                isBalanceList[i].BalanceContents[1].BalanceCounts.length;

            // @ts-ignore
            isBalanceList[i].BalanceContents[0].BalanceCounts =
                isBalanceList[i].BalanceContents[0].BalanceCounts.length;
            // @ts-ignore
            isBalanceList[i].BalanceContents[1].BalanceCounts =
                isBalanceList[i].BalanceContents[1].BalanceCounts.length;
            // @ts-ignore"
            isBalanceList[i]['totalCount'] = count;
        }

        return isBalanceList;
    }

    async deleteBalance(balanceId: number, user: { id: number }) {
        const { id } = user;

        const isBalane = await this.balanceRepository.getBalance(balanceId);

        if (isBalane.UserId !== id) {
            throw new BadRequestException('권한이 없음');
        }

        return await this.balanceRepository.deleteBalance(balanceId);
    }
}
