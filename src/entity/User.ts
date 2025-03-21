import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    username: string

    @Column({nullable:false,default:'admin'})
    password: string

    @Column()
    active: boolean

    @Column({ type: "timestamptz" })
    created_on: Date

    @Column()
    created_by: string

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn({ name: "created_by" })
    User_created_by: User

    @Column({ type: "timestamptz" })
    updated_on: Date

    @Column()
    updated_by: string

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn({ name: "updated_by" })
    User_updated_by: User

}
