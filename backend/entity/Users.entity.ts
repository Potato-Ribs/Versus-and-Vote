import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Balances } from './Balances.entity';
import { BalanceCounts } from './BalanceCounts.entity';
import { BalanceLikes } from './BalanceLikes.entity';
import { Boards } from './Boards.entity';
import { BoardLikes } from './BoardLikes.entity';
import { Votes } from './Votes.entity';
import { Comments } from './Comments.entity';
import { VoteRecords } from './VoteRecords.entity';
import { BoardComments } from './BoardComments.entity';

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

    @OneToMany(() => BoardComments, boardComments => boardComments.Users)
    BoardComments: BoardComments[];

    @OneToMany(() => Boards, boards => boards.Users)
    Boards: Boards[];

    @OneToMany(() => BoardLikes, boardLikes => boardLikes.Users)
    BoardLikes: BoardLikes[];

    @OneToMany(() => Votes, votes => votes.Users)
    Votes: Votes[];

    @OneToMany(() => VoteRecords, voteRecords => voteRecords.Users)
    VoteRecords: VoteRecords[];

    @OneToMany(() => Comments, comments => comments.Users)
    Comments: Comments[];
}
