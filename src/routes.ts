import { AuthController } from "./controller/AuthController"
import { UserController } from "./controller/UserController"
import { authentification } from "./middleware/authentification"

export const Routes = [/*{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
},*/

    //User
{
    method: "get",
    route: "/users",
    //authentification: authentification,
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users",
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
}

]