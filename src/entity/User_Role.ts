import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm"
import { User } from "./User"
import { Role } from "./Role"

@Entity()
export class User_Role {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    user_id: string

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    User_user_id: User

    @Column()
    role_id: string

    @ManyToOne((type) => Role, (role) => role.id)
    @JoinColumn({ name: "role_id" })
    Role: Role

    @Column({ type: "timestamptz" })
    created_on: Date

    @Column()
    created_by: string

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn({ name: "created_by" })
    User_created_by: User

}
