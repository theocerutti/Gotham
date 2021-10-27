import { PrimaryGeneratedColumn, Column, Entity} from 'typeorm';

@Entity()
export abstract class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, nullable: false})
    username: string;

    @Column({unique: true, nullable: false})
    email: string;
} 