import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boards } from './Boards.entity';

@Entity('topics')
export class Topics {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @OneToMany(() => Boards, boards => boards.Topics)
    Boards: Boards[];
}
