import { BadRequestException, Injectable } from '@nestjs/common';
import { BalancesRepository } from './balances.repository';

@Injectable()
export class BalancesService {
    constructor(protected balanceRepository: BalancesRepository) {}

    async createBalanceAndContents(body, user) {
        const { left, right } = body;
        const { id } = user;

        // id 검증 해야함

        return await this.balanceRepository.createBalanceAndContents(id, left, right);
    }

    async clickContents(body, user) {
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
        console.log(balanceId);

        let isBalance = await this.balanceRepository.getBalance(balanceId);
        // @ts-ignore
        isBalance.BalanceContents[0].BalanceCounts = isBalance.BalanceContents[0].BalanceCounts.length;
        // @ts-ignore
        isBalance.BalanceContents[1].BalanceCounts = isBalance.BalanceContents[1].BalanceCounts.length;
        return isBalance;
    }

    async clickLikes(body, user) {
        const { balanceId, categoryId } = body;
        const { id } = user;

        const likable = await this.balanceRepository.checkLikable(balanceId, categoryId, id);

        if (!likable) {
            return await this.balanceRepository.clickLikes(balanceId, categoryId, id);
        }
        return await this.balanceRepository.unClickLikes(balanceId, categoryId, id);
    }

    async getBalanceList(user) {
        const { id } = user;

        //id 검증 필ㄷ요

        const isBalanceList = await this.balanceRepository.getBalanceList();
        const count =
            isBalanceList[0].BalanceContents[0].BalanceCounts.length +
            isBalanceList[0].BalanceContents[1].BalanceCounts.length;

        // @ts-ignore
        isBalanceList[0].BalanceContents[0].BalanceCounts = isBalanceList[0].BalanceContents[0].BalanceCounts.length;
        // @ts-ignore
        isBalanceList[0].BalanceContents[1].BalanceCounts = isBalanceList[0].BalanceContents[1].BalanceCounts.length;
        // @ts-ignore
        isBalanceList[0].BalanceContents.push({ totalCount: count });
        return isBalanceList;
    }
}
