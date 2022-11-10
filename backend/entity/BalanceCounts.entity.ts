import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users.entity';
import { BalanceContents } from './BalanceContents.entity';

@Entity('balanceCounts')
export class BalanceCounts {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number;

    @ManyToOne(() => Users, User => User.BalanceCounts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    Users: Users;

    @Column('int', { name: 'BalanceContentId', nullable: true })
    BalanceContentId: number;

    @ManyToOne(() => BalanceContents, balanceContent => balanceContent.BalanceCounts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'BalanceContentId', referencedColumnName: 'id' }])
    BalanceContents: BalanceContents;
}
