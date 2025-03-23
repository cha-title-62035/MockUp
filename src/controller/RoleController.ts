import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Role } from "../entity/Role"

export class RoleController {

    private roleRepository = AppDataSource.getRepository(Role)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.roleRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/role", "");

        if(url == ""){
            return this.roleRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const role = await this.roleRepository.findOne({
            where: { id }
        })

        if (!role) {
            return "unregistered role"
        }
        return role
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, name, seq, active } = request.body;
        const roleToUpdate = await this.roleRepository.findOneBy({ id })
        const role = Object.assign(new Role(), {
            id,
            name,
            seq,
            active
        })

        if (!roleToUpdate) {
            return await this.roleRepository.save(role);
        }

        return this.roleRepository.update(role.id, role)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/role", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let roleToRemove = await this.roleRepository.findOneBy({ id })

        if (!roleToRemove) {
            return "this role not exist"
        }

        await this.roleRepository.remove(roleToRemove)

        return response.status(200).json({ message: "role has been removed" });
    }

}