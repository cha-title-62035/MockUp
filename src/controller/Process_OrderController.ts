import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Process_Order } from "../entity/Process_Order"

export class Process_OrderController {

    private production_orderRepository = AppDataSource.getRepository(Process_Order)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.production_orderRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/production_order", "");

        if(url == ""){
            return this.production_orderRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const production_order = await this.production_orderRepository.findOne({
            where: { id }
        })

        if (!production_order) {
            return "unregistered production order"
        }
        return production_order
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, number, material_id, volume, plan_date, actual_date, finish_date, lpn_number, created_on, created_by, updated_on, updated_by } = request.body;
        const production_orderToUpdate = await this.production_orderRepository.findOneBy({ id })
        const production_order = Object.assign(new Process_Order(), {
            id,
            number,
            material_id,
            volume,
            plan_date,
            actual_date,
            finish_date,
            lpn_number,
            created_on,
            created_by,
            updated_on,
            updated_by
        })

        if (!production_orderToUpdate) {
            return await this.production_orderRepository.save(production_order);
        }

        return this.production_orderRepository.update(production_order.id, production_order)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/production_order", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let production_orderToRemove = await this.production_orderRepository.findOneBy({ id })

        if (!production_orderToRemove) {
            return "this production order not exist"
        }

        await this.production_orderRepository.remove(production_orderToRemove)

        return response.status(200).json({ message: "production order has been removed" });
    }

}