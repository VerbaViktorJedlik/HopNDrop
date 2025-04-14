import { NextFunction, Request, Response } from "express";
import { prisma } from "../main";
import { GetUserResponse } from "@common";

export class UserController{
    static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = req.params.id;

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!user) {
            const response: GetUserResponse = {
                result: "Error",
                msg: "This user doesn't exist!"
            }
            res.status(404).send(response);
            return;
        }
        else{
            
            const response: GetUserResponse = {
                self: user,
                result: "Success"
            };
            res.status(200).send(response);
        }
        return;
    }
}