import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boards } from './Boards.entity';
import { Votes } from './Votes.entity';
import { VoteRecords } from './VoteRecords.entity';

@Entity('voteCategories')
export class VoteCategories {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @OneToMany(() => Votes, votes => votes.VoteCategories)
    Votes: Votes[];
}
