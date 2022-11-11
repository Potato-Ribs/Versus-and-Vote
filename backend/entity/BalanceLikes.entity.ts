import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users.entity';
import { BalanceContents } from './BalanceContents.entity';
import { Balances } from './Balances.entity';
import { BalanceCategories } from './BalanceCategories.entity';

@Entity('balanceLikes')
export class BalanceLikes {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number;

    @ManyToOne(() => Users, User => User.BalanceLikes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    Users: Users;

    @Column('int', { name: 'BalanceId', nullable: true })
    BalanceId: number;

    @ManyToOne(() => Balances, balance => balance.BalanceLikes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'BalanceId', referencedColumnName: 'id' }])
    Balances: Balances;

    @Column('int', { name: 'BalanceCategoryId', nullable: true })
    BalanceCategoryId: number;

    @ManyToOne(() => BalanceCategories, balanceCategory => balanceCategory.BalanceLikes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'BalanceCategoryId', referencedColumnName: 'id' }])
    BalanceCategories: BalanceCategories;
}
