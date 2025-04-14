import { AuthResponse, PublicSelf, PublicUser } from "@common";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { prisma } from "../main";
import { NextFunction, Request, Response } from "express";
import { JWTDecode } from "../types/jwtDecode";

// TODO: Replace this with a proper environment variable
const jwtSecret = "asd"; // This should ideally be stored in an environment variable for security

export class AuthController {
    // Function to generate JWT token
    static generateJWT(user: PublicUser) {
        const jwtToken = jwt.sign(
            { user: user },
            jwtSecret,
            { expiresIn: "1d" } // Token expires in 1 day
        );
        return jwtToken;
    }

    // Login handler
    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const username: string = req.body!.username;
        const password: string = req.body!.password;

        if (!username || !password) {
            const errorResponse: AuthResponse = {
                result: "Error",
                msg: "'username' and 'password' are required!" 
            };
            res.status(400).json(errorResponse); // "Username and password are required!"
            return;
        }

        try {
            // Find user by username
            const existingUser = await prisma.user.findUnique({
                where: { username }
            });

            if (!existingUser) {
                res.status(400).json({
                    result: "Error",
                    msg: "Incorrect username or password!" 
                }); // "Invalid username or password!"
                return;
            }

            // Compare the password with the hashed password in the database
            const validPassword = await bcrypt.compare(password, existingUser.password);

            if (!validPassword) {
                const errorResponse: AuthResponse = {
                    result: "Error",
                    msg: "Incorrect username or password!" 
                };
                res.status(400).json(errorResponse); // "Invalid username or password!"
                return;
            }

            // Generate JWT
            const jwtToken = AuthController.generateJWT(existingUser);

            const response: AuthResponse = {
                self: existingUser,
                result: "Success",
                jwt: jwtToken
            }

            // Return response with token
            res.status(200).json(response);
            return;
        } catch (error) {
            console.error(error);
            const errorResponse: AuthResponse = {
                result: "Error",
                msg: "An error occured during login!" 
            }
            res.status(500).json(errorResponse); // "An error occurred during login!"
            return;
        }
    }

    // Register handler
    static async register(req: Request, res: Response): Promise<void> {
        const username: string = req.body!.username;
        const password: string = req.body!.password;

        if (!username || !password) {
            const errorResponse: AuthResponse = {
                result: "Error",
                msg: "'username' and 'password' are required!" 
            };
            res.status(400).json(errorResponse); // "Username and password are required!"
            return;
        }

        try {
            // Check if the user already exists
            const existingUser = await prisma.user.findUnique({
                where: { username }
            });

            if (existingUser) {
                res.status(400).json({
                    result: "Error",
                    msg: "This user already exists!" 
                }); // "A user with this username already exists!"
                return;
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds of 10

            // Create a new user
            const newUser = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword
                }
            });

            // Generate JWT
            const jwtToken = AuthController.generateJWT(newUser);

            const response: AuthResponse = {
                self: newUser,
                result: "Success",
                jwt: jwtToken
            }

            // Return response with token
            res.status(201).json(response);
            return;
        } catch (error) {
            console.error(error);
            const errorResponse: AuthResponse = {
                result: "Error",
                msg: "An error occured during registration!" 
            }
            res.status(500).json(errorResponse); // "An error occurred during registration!"
            return;
        }
    }

    static async validateUser(req: Request, res: Response){
        const token = req.headers.authorization?.split(" ").pop()
        if (!token){
            return undefined
        }
        try {
            const decoded: JWTDecode = jwt.verify(token, jwtSecret) as JWTDecode;
            return decoded.user;
        } catch (error) {
            return undefined;
        }
    }

    static async validateToken(req: Request, res:Response): Promise<void>{
        const token = req.headers.authorization?.split(" ").pop()
        if (!token){
            res.status(400).json({result: "Error",msg: "No token sent"})
            return
        }
        try {
            const decoded: JWTDecode = jwt.verify(token, jwtSecret) as JWTDecode;

            res.status(200).json("Success")
            return 
        } catch (error) {
            res.status(400).json("Error")
            return 
        }
    }
}
