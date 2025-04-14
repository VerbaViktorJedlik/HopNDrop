import { Request, Response } from "express";
import { findPackage } from "../db/package";
import { Package } from "@prisma/client";
import { PackageResponse } from "@common";

export class PackageController {

    static async take(req: Request<{id:string}>, res: Response<PackageResponse>) {
    let pkg : Package[] | null = await findPackage(req.params.id);
    if(pkg == null){
        res.status(404).json({ result: "Error", msg: "Nem létezik csomag ilyen azonosítóval."});
    }
    if(pkg![0].status != "Waiting" ){
        res.status(400).json({result: "Error", msg: "Nem megfelelő a csomag státusza."});
    }
}
}