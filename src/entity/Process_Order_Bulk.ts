import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Material_Type } from "./Material_Type"
import { User } from "./User"
import { Material } from "./Material"
import { Process_Order } from "./Process_Order"

@Entity()
export class Process_Order_Bulk {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    process_order_id: string

    @ManyToOne((type) => Process_Order, (process_order) => process_order.id)
    @JoinColumn({ name: "process_order_id" })
    Process_Order: Process_Order

    @Column()
    barcode: string

    @Column()
    lpn_number: string

    @Column()
    seq: number

    @Column() //{ type: "decimal" })
    total: number

    @Column({ type: "timestamptz" })
    created_on: Date

    @Column()
    created_by: string

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn({ name: "created_by" })
    User_created_by: User

    @Column({ type: "timestamptz" })
    transferred_on: Date

    @Column()
    transferred_by: string

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn({ name: "transferred_by" })
    User_transferred_by: User
    
}
