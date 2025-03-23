import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Production_Step } from "../entity/Production_Step"

export class Production_StepController {

    private production_stepRepository = AppDataSource.getRepository(Production_Step)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.production_stepRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/production_step", "");

        if(url == ""){
            return this.production_stepRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const production_step = await this.production_stepRepository.findOne({
            where: { id }
        })

        if (!production_step) {
            return "unregistered production step"
        }
        return production_step
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, process_order_id, seq, material_id, quantity, created_on, created_by, updated_on, updated_by } = request.body;
        const production_stepToUpdate = await this.production_stepRepository.findOneBy({ id })
        const production_step = Object.assign(new Production_Step(), {
            id,
            process_order_id,
            seq,
            material_id,
            quantity,
            created_on,
            created_by,
            updated_on,
            updated_by
        })

        if (!production_stepToUpdate) {
            return await this.production_stepRepository.save(production_step);
        }

        return this.production_stepRepository.update(production_step.id, production_step)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/production_step", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let production_stepToRemove = await this.production_stepRepository.findOneBy({ id })

        if (!production_stepToRemove) {
            return "this production step not exist"
        }

        await this.production_stepRepository.remove(production_stepToRemove)

        return response.status(200).json({ message: "production step has been removed" });
    }

}