import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boards } from './Boards.entity';
import { Votes } from './Votes.entity';
import { VoteRecords } from './VoteRecords.entity';

@Entity('voteLists')
export class VoteLists {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'title' })
    title: string;

    @OneToMany(() => VoteRecords, voteRecords => voteRecords.VoteLists)
    VoteRecords: VoteRecords[];

    @Column('int', { name: 'VoteId', nullable: true })
    VoteId: number;

    @ManyToOne(() => Votes, votes => votes.VoteLists, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'VoteId', referencedColumnName: 'id' }])
    Votes: Votes;
}
