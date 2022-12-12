import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boards } from './Boards.entity';
import { Votes } from './Votes.entity';
import { VoteLists } from './VoteLists.entity';
import { Users } from './Users.entity';

@Entity('voteRecords')
export class VoteRecords {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'VoteListId', nullable: true })
    VoteListId: number;

    @ManyToOne(() => VoteLists, voteLists => voteLists.VoteRecords, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'VoteListId', referencedColumnName: 'id' }])
    VoteLists: VoteLists;

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number;

    @ManyToOne(() => Users, users => users.VoteRecords, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    Users: Users;
}
