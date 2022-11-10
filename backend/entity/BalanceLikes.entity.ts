import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users.entity';
import { BalanceContents } from './BalanceContents.entity';
import { Balances } from './Balances.entity';

@Entity('balanceLikes')
export class BalanceLikes {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

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
}
