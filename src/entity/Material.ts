import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Material_Type } from "./Material_Type"
import { User } from "./User"

@Entity()
export class Material {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    code: string

    @Column()
    name: number

    @Column()
    type: string

    @ManyToOne((type) => Material_Type, (material_type) => material_type.id)
    @JoinColumn({ name: "type" })
    Material_Type: Material_Type

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
