import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User_Role } from "../entity/User_Role"

export class User_RoleController {

    private user_roleRepository = AppDataSource.getRepository(User_Role)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.user_roleRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/user_role", "");

        if(url == ""){
            return this.user_roleRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const user = await this.user_roleRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user role"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, user_id, role_id, created_on, created_by, updated_on, updated_by } = request.body;
        const user_roleToUpdate = await this.user_roleRepository.findOneBy({ id })
        const user_role = Object.assign(new User_Role(), {
            id,
            user_id,
            role_id,
            created_on,
            created_by,
            updated_on,
            updated_by
        })

        if (!user_roleToUpdate) {
            return await this.user_roleRepository.save(user_role);
        }

        return this.user_roleRepository.update(user_role.id, user_role)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/user_role", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let user_roleToRemove = await this.user_roleRepository.findOneBy({ id })

        if (!user_roleToRemove) {
            return "this user role not exist"
        }

        await this.user_roleRepository.remove(user_roleToRemove)

        return response.status(200).json({ message: "user role has been removed" });
    }

}