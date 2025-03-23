import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Status } from "../entity/Status"

export class StatusController {

    private statusRepository = AppDataSource.getRepository(Status)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.statusRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/status", "");

        if(url == ""){
            return this.statusRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const status = await this.statusRepository.findOne({
            where: { id }
        })

        if (!status) {
            return "unregistered status"
        }
        return status
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, name, seq, active } = request.body;
        const statusToUpdate = await this.statusRepository.findOneBy({ id })
        const status = Object.assign(new Status(), {
            id,
            name,
            seq,
            active
        })

        if (!statusToUpdate) {
            return await this.statusRepository.save(status);
        }

        return this.statusRepository.update(status.id, status)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/status", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let statusToRemove = await this.statusRepository.findOneBy({ id })

        if (!statusToRemove) {
            return "this status not exist"
        }

        await this.statusRepository.remove(statusToRemove)

        return response.status(200).json({ message: "status has been removed" });
    }

}