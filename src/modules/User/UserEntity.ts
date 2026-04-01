import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Task } from "../Tasks/TaskEntity";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    birthDate!: Date;

    @Column()
    cellphone!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ default: false })
    isDisabled!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];
};