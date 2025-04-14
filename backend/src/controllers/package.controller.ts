import { Request, Response } from "express";
import { findPackage, updatePackage } from "../db/package";
import { Package } from "@prisma/client";
import { PackageResponse } from "@common";

export class PackageController {

    static async take(req: Request<{id:string}>, res: Response<PackageResponse>) {
    let pkgs = await findPackage(req.params.id);
    if(pkgs == null){
        res.status(404).json({ result: "Error", msg: "Nem létezik csomag ilyen azonosítóval."});
        return;
    }
    let pkg = pkgs[0];

    if(pkg.status != "Waiting" ){
        res.status(400).json({result: "Error", msg: "Nem megfelelő a csomag státusza."});
        return;
    }
    pkg.status = "EnRoute"
    const updatedPkg = await updatePackage(pkg);

    if (!updatedPkg) {
        res.status(400).json({result: "Error", msg: "Nem sikerült frissíteni a csomag státuszát."});
        return;
    }
    
    res.status(200).json({result: "Success", ...updatedPkg});
}
}