import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Status } from "../entity/Status"

export class StatusController {

    private userRepository = AppDataSource.getRepository(Status)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/users", "");

        if(url == ""){
            return this.userRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, name, seq, active } = request.body;
        const userToUpdate = await this.userRepository.findOneBy({ id })
        const user = Object.assign(new Status(), {
            id,
            name,
            seq,
            active
        })

        if (!userToUpdate) {
            return await this.userRepository.save(user);
        }

        return this.userRepository.update(user.id, user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/users", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return response.status(200).json({ message: "user has been removed" });
    }

}