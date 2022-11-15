import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { BalancesRepository } from './balances.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balances } from 'entity/Balances.entity';
import { BalanceContents } from '../../entity/BalanceContents.entity';
import { BalanceCounts } from '../../entity/BalanceCounts.entity';
import { BalanceLikes } from '../../entity/BalanceLikes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Balances, BalanceContents, BalanceCounts, BalanceLikes])],
    controllers: [BalancesController],
    providers: [BalancesService, BalancesRepository],
})
export class BalancesModule {}
