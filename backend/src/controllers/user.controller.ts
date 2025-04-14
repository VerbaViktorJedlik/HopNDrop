import { NextFunction, Request, Response } from "express";
import { prisma } from "../main";
import { GetAllUsersResponse, GetSelfResponse, GetUserResponse, PublicUser } from "@common";
import { AuthController } from "./auth.controller";
import { findUsers } from "../db/user";

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

    static async getSelf(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        const userFromToken = await AuthController.validateUser(req, res);
        if (!userFromToken) {
            
            const response: GetUserResponse = {
                result: "Error",
                msg: "Unauthorized."
            }
            res.status(401).send(response);
            return;
        }

        const user = await prisma.user.findUnique({
            where:
            {
                id: userFromToken.id
            }
        })

        if (!user) {
            const response: GetUserResponse = {
                result: "Error",
                msg: "Unauthorized."
            }
            res.status(401).send(response);
            return;
        }
        else{
            const response: GetSelfResponse = {
                self: user,
                result: "Success"
            };
            res.status(200).send(response);
        }
        return;
    }

      static async getUserByName(
        req: Request<{ username: string }>,
        res: Response<GetAllUsersResponse>
      ) {
        let users = await findUsers();
    
        const usernameFilter = req.params.username || "";
    
        users = users.filter((u:PublicUser) =>
          u.username.toLowerCase().includes(usernameFilter.toLowerCase())
        );
    
        res.status(200).json({ result: "Success", users });
      }
}