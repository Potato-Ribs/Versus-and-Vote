import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users.entity';
import { Boards } from './Boards.entity';

@Entity('boardComments')
export class BoardComments {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'contents' })
    contents: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number;

    @ManyToOne(() => Users, User => User.BoardComments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    Users: Users;

    @Column('int', { name: 'BoardId', nullable: true })
    BoardId: number;

    @ManyToOne(() => Boards, board => board.BoardComments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'BoardId', referencedColumnName: 'id' }])
    Boards: Boards;
}
