import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Material } from "../entity/Material"

export class MaterialController {

    private materialRepository = AppDataSource.getRepository(Material)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.materialRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/material", "");

        if(url == ""){
            return this.materialRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const material = await this.materialRepository.findOne({
            where: { id }
        })

        if (!material) {
            return "unregistered material"
        }
        return material
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, code, name, type, active, created_on, created_by, updated_on, updated_by } = request.body;
        const materialToUpdate = await this.materialRepository.findOneBy({ id })
        const material = Object.assign(new Material(), {
            id,
            code,
            name,
            type,
            active,
            created_on,
            created_by,
            updated_on,
            updated_by
        })

        if (!materialToUpdate) {
            return await this.materialRepository.save(material);
        }

        return this.materialRepository.update(material.id, material)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/material", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let materialToRemove = await this.materialRepository.findOneBy({ id })

        if (!materialToRemove) {
            return "this material not exist"
        }

        await this.materialRepository.remove(materialToRemove)

        return response.status(200).json({ message: "material has been removed" });
    }

}