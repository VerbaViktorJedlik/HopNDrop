import express, { Request, Response } from "express"
import { findPackage } from "./db/package"
import { Package } from "@prisma/client";

export const router = express.Router()

router.post("/package/:id/take", take)
//router.post("/package/:id/deliver", deliver)
//router.post("/package/:id/recieve", recive)


async function take(req: Request<{id:string}>, res: Response) {
    let pkg : Package[] | null = await findPackage(req.params.id);
    if(pkg == null){
        res.status(404).json({"message": "Nem létezik csomag ilyen azonosítóval."});
    }
    if(pkg![0].status != "Waiting" ){
        res.status(400).json({"message": "Nem megfelelő a csomag státusza."});
    }
    
}

export default router
