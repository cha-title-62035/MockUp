import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Material_Type } from "../entity/Material_Type"

export class Material_TypeController {

    private material_typeRepository = AppDataSource.getRepository(Material_Type)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.material_typeRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/material_type", "");

        if(url == ""){
            return this.material_typeRepository.find()
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");



        const material_type = await this.material_typeRepository.findOne({
            where: { id }
        })

        if (!material_type) {
            return "unregistered material type"
        }
        return material_type
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, name, seq, active } = request.body;
        const material_typeToUpdate = await this.material_typeRepository.findOneBy({ id })
        const material_type = Object.assign(new Material_Type(), {
            id,
            name,
            seq,
            active
        })

        if (!material_typeToUpdate) {
            return await this.material_typeRepository.save(material_type);
        }

        return this.material_typeRepository.update(material_type.id, material_type)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const Rawurl = request.url;
        const url = Rawurl.replace("/material_type", "");

        if(url == "" || url == "?"){
            return response.status(400).json({ message: "Invalid URL" });
        }

        const urlParams = new URLSearchParams(url);
        
        if (urlParams.getAll.length == 0){
            return response.status(400).json({ message: "Invalid URL" });
        }
        const id = urlParams.get("id");

        let material_typeToRemove = await this.material_typeRepository.findOneBy({ id })

        if (!material_typeToRemove) {
            return "this material type not exist"
        }

        await this.material_typeRepository.remove(material_typeToRemove)

        return response.status(200).json({ message: "material type has been removed" });
    }

}