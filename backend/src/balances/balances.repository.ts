import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balances } from '../../entity/Balances.entity';
import { Connection, Repository } from 'typeorm';
import { BalanceContents } from '../../entity/BalanceContents.entity';
import { BalanceCounts } from '../../entity/BalanceCounts.entity';
import { BalanceLikes } from '../../entity/BalanceLikes.entity';

@Injectable()
export class BalancesRepository {
    constructor(
        @InjectRepository(Balances) private balanceRepository: Repository<Balances>,
        @InjectRepository(BalanceContents) private balanceContentsRepository: Repository<BalanceContents>,
        @InjectRepository(BalanceCounts) private balanceCountsRepository: Repository<BalanceCounts>,
        @InjectRepository(BalanceLikes) private balanceLikesRepository: Repository<BalanceLikes>,
        private connection: Connection,
    ) {}

    async createBalanceAndContents(id: number, left: string, right: string, title: string) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const { id: balanceId } = await this.createBalance(id, title);
            await this.createBalanceContents(balanceId, left, 'left');
            await this.createBalanceContents(balanceId, right, 'right');

            await queryRunner.commitTransaction();
            return;
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async createBalance(id: number, title: string) {
        const newBalance = this.balanceRepository.create();
        newBalance.title = title;
        newBalance.UserId = id;
        return await this.balanceRepository.save(newBalance);
    }

    async createBalanceContents(balanceId: number, title: string, type: string) {
        const newBalanceContents = this.balanceContentsRepository.create();
        newBalanceContents.title = title;
        newBalanceContents.type = type;
        newBalanceContents.BalanceId = balanceId;
        return await this.balanceContentsRepository.save(newBalanceContents);
    }

    async getBalance(balanceId: number) {
        return await this.balanceRepository
            .createQueryBuilder('balance')
            .where('balance.id =:id', { id: balanceId })
            .innerJoinAndSelect('balance.BalanceContents', 'balanceContent')
            .innerJoin('balanceContent.BalanceCounts', 'balanceCount')
            .innerJoinAndSelect('balance.Users', 'user')
            .addSelect(['balanceCount.id'])

            .getOne();
    }

    async createBalanceCounts(balanceContentsId: number, id: number) {
        const newBalanceCount = this.balanceCountsRepository.create();
        newBalanceCount.BalanceContentId = balanceContentsId;
        newBalanceCount.UserId = id;
        await this.balanceCountsRepository.save(newBalanceCount);
        return 'ok';
    }

    async checkClickable(id: number) {
        return await this.balanceCountsRepository
            .createQueryBuilder('balanceCount')
            .where('balanceCount.UserId =:id', { id })
            .innerJoinAndSelect('balanceCount.BalanceContents', 'balanceContent')
            .getOne();
    }

    async checkLikable(balanceId: number, categoryId: number, id: number) {
        return await this.balanceLikesRepository.findOne({
            BalanceId: balanceId,
            BalanceCategoryId: categoryId,
            UserId: id,
        });
    }

    async clickLikes(balanceId: number, categoryId: number, id: number) {
        const newBalanceLikes = this.balanceLikesRepository.create();
        newBalanceLikes.BalanceId = balanceId;
        newBalanceLikes.BalanceCategoryId = categoryId;
        newBalanceLikes.UserId = id;
        await this.balanceLikesRepository.save(newBalanceLikes);
        return 'like ok';
    }

    async unClickLikes(balanceId: number, categoryId: number, id: number) {
        await this.balanceLikesRepository.delete({
            BalanceId: balanceId,
            BalanceCategoryId: categoryId,
            UserId: id,
        });
        return 'unlike ok';
    }

    async getBalanceList() {
        return await this.balanceRepository
            .createQueryBuilder('balance')
            .innerJoin('balance.BalanceContents', 'balanceContent')
            .innerJoin('balanceContent.BalanceCounts', 'balanceCount')
            .select(['balance.id', 'balance.title', 'balanceContent.title', 'balanceContent.type', 'balanceCount.id'])
            .getMany();
    }

    async deleteBalance(balanceId: number) {
        return await this.balanceRepository.delete({ id: balanceId });
    }
}
