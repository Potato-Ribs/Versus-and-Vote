import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Balances } from './Balances.entity';
import { BalanceCounts } from './BalanceCounts.entity';
import { BalanceLikes } from './BalanceLikes.entity';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'nickname' })
    nickname: string;

    @Column('varchar', { name: 'email' })
    email: string;

    @Column('varchar', { name: 'photo' })
    photo: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Balances, balances => balances.Users)
    Balances: Balances[];

    @OneToMany(() => BalanceCounts, balanceCounts => balanceCounts.Users)
    BalanceCounts: BalanceCounts[];

    @OneToMany(() => BalanceLikes, balanceLikes => balanceLikes.Users)
    BalanceLikes: BalanceLikes[];
}
