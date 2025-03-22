import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Material_Type } from "./Material_Type"
import { User } from "./User"
import { Material } from "./Material"

@Entity()
export class Process_Order {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    number: string

    @Column()
    material_id: string

    @ManyToOne((type) => Material, (material) => material.id)
    @JoinColumn({ name: "material_id" })
    Material: Material

    @Column({ type: "decimal" })
    volume: number

    @Column({ type: "timestamptz" })
    plan_date: Date

    @Column({ type: "timestamptz" })
    actual_date: Date

    @Column({ type: "timestamptz" })
    finish_date: Date

    @Column()
    lpn_number: string

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
