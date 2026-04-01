import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../User/UserEntity";

@Entity("tasks")
export class Task {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    date!: Date;

    @Column({ default: false })
    isCompleted!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: "userId" })
    user!: User;

    @Column()
    userId!: string;
};