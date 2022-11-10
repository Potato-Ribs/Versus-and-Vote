import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Topics } from './Topics.entity';
import { Users } from './Users.entity';
import { BoardLikes } from './BoardLikes.entity';

@Entity('boards')
export class Boards {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'title' })
    title: string;

    @Column('varchar', { name: 'contents' })
    contents: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => BoardLikes, boardLikes => boardLikes.Boards)
    BoardLikes: BoardLikes[];

    @Column('int', { name: 'TopicId', nullable: true })
    TopicId: number;

    @ManyToOne(() => Topics, topic => topic.Boards, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'TopicId', referencedColumnName: 'id' }])
    Topics: Topics;

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number;

    @ManyToOne(() => Users, user => user.Boards, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    Users: Users;
}
