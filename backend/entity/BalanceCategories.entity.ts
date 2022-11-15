import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users.entity';
import { BalanceContents } from './BalanceContents.entity';
import { BalanceLikes } from './BalanceLikes.entity';

@Entity('balanceCategories')
export class BalanceCategories {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @OneToMany(() => BalanceLikes, balanceLikes => balanceLikes.BalanceCategories)
    BalanceLikes: BalanceLikes[];
}
