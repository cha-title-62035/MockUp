import { AuthController } from "./controller/AuthController"
import { Material_TypeController } from "./controller/Material_TypeController"
import { MaterialController } from "./controller/MaterialController"
import { Process_Order_BulkController } from "./controller/Process_Order_BulkController"
import { Process_OrderController } from "./controller/Process_OrderController"
import { Production_StepController } from "./controller/Production_StepController"
import { RM_Delivery_BarcodeController } from "./controller/RM_Delivery_BarcodeController"
import { RoleController } from "./controller/RoleController"
import { StatusController } from "./controller/StatusController"
import { User_RoleController } from "./controller/User_RoleController"
import { UserController } from "./controller/UserController"
import { authentification } from "./middleware/authentification"

export const Routes = [/*{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
},*/

    // User
{
    method: "get",
    route: "/user",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/user",
    controller: UserController,
    action: "remove"
},

    // Auth
{
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login"
},
{
    method: "post",
    route: "/signup",
    controller: AuthController,
    action: "signup"
},
    // Role
{
    method: "get",
    route: "/role",
    controller: RoleController,
    action: "one"
}, {
    method: "post",
    route: "/role",
    controller: RoleController,
    action: "save"
}, {
    method: "delete",
    route: "/role",
    controller: RoleController,
    action: "remove"
},
    // User_Role
{
    method: "get",
    route: "/user_role",
    controller: User_RoleController,
    action: "one"
}, {
    method: "post",
    route: "/user_role",
    controller: User_RoleController,
    action: "save"
}, {
    method: "delete",
    route: "/user_role",
    controller: User_RoleController,
    action: "remove"
},
    // Material_Type
{
    method: "get",
    route: "/material_type",
    controller: Material_TypeController,
    action: "one"
}, {
    method: "post",
    route: "/material_type",
    controller: Material_TypeController,
    action: "save"
}, {
    method: "delete",
    route: "/material_type",
    controller: Material_TypeController,
    action: "remove"
},
    // Material
{
    method: "get",
    route: "/material",
    controller: MaterialController,
    action: "one"
}, {
    method: "post",
    route: "/material",
    controller: MaterialController,
    action: "save"
}, {
    method: "delete",
    route: "/material",
    controller: MaterialController,
    action: "remove"
},
    // Process_Order
{
    method: "get",
    route: "/process_order",
    controller: Process_OrderController,
    action: "one"
}, {
    method: "post",
    route: "/process_order",
    controller: Process_OrderController,
    action: "save"
}, {
    method: "delete",
    route: "/process_order",
    controller: Process_OrderController,
    action: "remove"
},
    // Production_Step
{
    method: "get",
    route: "/production_step",
    controller: Production_StepController,
    action: "one"
}, {
    method: "post",
    route: "/production_step",
    controller: Production_StepController,
    action: "save"
}, {
    method: "delete",
    route: "/production_step",
    controller: Production_StepController,
    action: "remove"
},
    // RM_Delivery_Barcode
{
    method: "get",
    route: "/rm_delivery_barcode",
    controller: RM_Delivery_BarcodeController,
    action: "one"
}, {
    method: "post",
    route: "/rm_delivery_barcode",
    controller: RM_Delivery_BarcodeController,
    action: "save"
}, {
    method: "delete",
    route: "/rm_delivery_barcode",
    controller: RM_Delivery_BarcodeController,
    action: "remove"
},
    // Process_Order_Bulk
{
    method: "get",
    route: "/process_order_bulk",
    controller: Process_Order_BulkController,
    action: "one"
}, {
    method: "post",
    route: "/process_order_bulk",
    controller: Process_Order_BulkController,
    action: "save"
}, {
    method: "delete",
    route: "/process_order_bulk",
    controller: Process_Order_BulkController,
    action: "remove"
},
    // Status
{
    method: "get",
    route: "/status",
    controller: StatusController,
    action: "one"
}, {
    method: "post",
    route: "/status",
    controller: StatusController,
    action: "save"
}, {
    method: "delete",
    route: "/status",
    controller: StatusController,
    action: "remove"
}

]