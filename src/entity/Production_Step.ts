import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Material_Type } from "./Material_Type"
import { User } from "./User"
import { Material } from "./Material"
import { Process_Order } from "./Process_Order"

@Entity()
export class Production_Step {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    process_order_id: string

    @ManyToOne((type) => Process_Order, (process_order) => process_order.id)
    @JoinColumn({ name: "process_order_id" })
    Process_Order: Process_Order

    @Column()
    seq: number

    @Column()
    material_id: string

    @ManyToOne((type) => Material, (material) => material.id)
    @JoinColumn({ name: "material_id" })
    Material: Material

    @Column({ type: "decimal" })
    quantity: number

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
