import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Process_Order_Bulk } from "../entity/Process_Order_Bulk"

export class Process_Order_BulkController {

    private production_order_bulkRepository = AppDataSource.getRepository(Process_Order_Bulk)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.production_order_bulkRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/production_order_bulk", "");

        if(url == ""){
            return this.production_order_bulkRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const production_order_bulk = await this.production_order_bulkRepository.findOne({
            where: { id }
        })

        if (!production_order_bulk) {
            return "unregistered production order bulk"
        }
        return production_order_bulk
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, process_order_id, barcode, lpn_number, seq, total, created_on, created_by, transferred_on, transferred_by } = request.body;
        const production_order_bulkToUpdate = await this.production_order_bulkRepository.findOneBy({ id })
        const production_order_bulk = Object.assign(new Process_Order_Bulk(), {
            id,
            process_order_id,
            barcode,
            lpn_number,
            seq,
            total,
            created_on,
            created_by,
            transferred_on,
            transferred_by
        })

        if (!production_order_bulkToUpdate) {
            return await this.production_order_bulkRepository.save(production_order_bulk);
        }

        return this.production_order_bulkRepository.update(production_order_bulk.id, production_order_bulk)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/production_order_bulk", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let production_order_bulkToRemove = await this.production_order_bulkRepository.findOneBy({ id })

        if (!production_order_bulkToRemove) {
            return "this production order bulk not exist"
        }

        await this.production_order_bulkRepository.remove(production_order_bulkToRemove)

        return response.status(200).json({ message: "production order bulk has been removed" });
    }

}