import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users.entity';
import { BalanceContents } from './BalanceContents.entity';
import { BalanceLikes } from './BalanceLikes.entity';

@Entity('balances')
export class Balances {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'title' })
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => BalanceContents, balanceContents => balanceContents.Balances)
    BalanceContents: BalanceContents[];

    @OneToMany(() => BalanceLikes, balanceLikes => balanceLikes.Balances)
    BalanceLikes: BalanceLikes[];

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number;

    @ManyToOne(() => Users, User => User.Balances, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    Users: Users;
}
