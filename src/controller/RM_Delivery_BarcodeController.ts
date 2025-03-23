import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { RM_Delivery_Barcode } from "../entity/RM_Delivery_Barcode"

export class RM_Delivery_BarcodeController {

    private rm_delivery_barcodeRepository = AppDataSource.getRepository(RM_Delivery_Barcode)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.rm_delivery_barcodeRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/rm_delivery_barcode", "");

        if(url == ""){
            return this.rm_delivery_barcodeRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const rm_delivery_barcode = await this.rm_delivery_barcodeRepository.findOne({
            where: { id }
        })

        if (!rm_delivery_barcode) {
            return "unregistered rm delivery barcode"
        }
        return rm_delivery_barcode
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, process_order_id, kart, barcode, material_id, batch, quantity, created_on, created_by, updated_on, updated_by } = request.body;
        const rm_delivery_barcodeToUpdate = await this.rm_delivery_barcodeRepository.findOneBy({ id })
        const rm_delivery_barcode = Object.assign(new RM_Delivery_Barcode(), {
            id,
            process_order_id,
            kart,
            barcode,
            material_id,
            batch,
            quantity,
            created_on,
            created_by,
            updated_on,
            updated_by
        })

        if (!rm_delivery_barcodeToUpdate) {
            return await this.rm_delivery_barcodeRepository.save(rm_delivery_barcode);
        }

        return this.rm_delivery_barcodeRepository.update(rm_delivery_barcode.id, rm_delivery_barcode)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/rm_delivery_barcode", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let rm_delivery_barcodeToRemove = await this.rm_delivery_barcodeRepository.findOneBy({ id })

        if (!rm_delivery_barcodeToRemove) {
            return "this rm delivery barcode not exist"
        }

        await this.rm_delivery_barcodeRepository.remove(rm_delivery_barcodeToRemove)

        return response.status(200).json({ message: "rm delivery barcode has been removed" });
    }

}