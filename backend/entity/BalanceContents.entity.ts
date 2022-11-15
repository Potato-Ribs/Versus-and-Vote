/*
  ==============================================================================
    (c) 2022. quantum universe All rights reserved.
    author : JOOYOUNG KIM
    start date : 11/10/2022
  ==============================================================================
*/ import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BalanceCounts } from './BalanceCounts.entity';
import { Balances } from './Balances.entity';

@Entity('balanceContents')
export class BalanceContents {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'title' })
    title: string;

    @Column('varchar', { name: 'type' })
    type: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => BalanceCounts, balanceCounts => balanceCounts.BalanceContents)
    BalanceCounts: BalanceCounts[];

    @Column('int', { name: 'BalanceId', nullable: true })
    BalanceId: number;

    @ManyToOne(() => Balances, balance => balance.BalanceContents, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'BalanceId', referencedColumnName: 'id' }])
    Balances: Balances;
}
