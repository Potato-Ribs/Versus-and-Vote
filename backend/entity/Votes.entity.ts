import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Topics } from './Topics.entity';
import { Users } from './Users.entity';
import { BoardLikes } from './BoardLikes.entity';
import { VoteLists } from './VoteLists.entity';
import { Comments } from './Comments.entity';
import { VoteCategories } from './VoteCategory.entity';

@Entity('votes')
export class Votes {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'title' })
    title: string;

    @Column('varchar', { name: 'contents' })
    contents: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => VoteLists, voteLists => voteLists.Votes)
    VoteLists: VoteLists[];

    @OneToMany(() => Comments, comments => comments.Votes)
    Comments: Comments[];

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number;

    @ManyToOne(() => Users, user => user.Votes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    Users: Users;

    @Column('int', { name: 'VoteCategoryId', nullable: true })
    VoteCategoryId: number;

    @ManyToOne(() => VoteCategories, voteCategory => voteCategory.Votes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'VoteCategoryId', referencedColumnName: 'id' }])
    VoteCategories: VoteCategories;
}
