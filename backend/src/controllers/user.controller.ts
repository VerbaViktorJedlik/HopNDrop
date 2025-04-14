import { NextFunction, Request, Response } from "express";
import { prisma } from "../main";

export class UserController{
    static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = req.params.id;

        const user = prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!user) {
            res.status(404).send({message: "Nincs ilyen felhasználó."})
            return;
        }
        res.status(200).send(user);
        return;
    }
}