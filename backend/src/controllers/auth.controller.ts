import { AuthResponse, PublicUser } from "@common";
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
            res.status(400).json({ message: "Felhasználónév és jelszó kötelező!" }); // "Username and password are required!"
            return;
        }

        try {
            // Find user by username
            const existingUser = await prisma.user.findUniqueOrThrow({
                where: { username }
            });

            // Compare the password with the hashed password in the database
            const validPassword = await bcrypt.compare(password, existingUser.password);

            if (!validPassword) {
                res.status(400).json({ message: "Hibás felhasználónév vagy jelszó!" }); // "Invalid username or password!"
                return;
            }

            // Generate JWT
            const jwtToken = AuthController.generateJWT(existingUser);

            const response: AuthResponse = {
                ...existingUser,
                jwt: jwtToken
            }

            // Return response with token
            res.status(200).json(response);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Hiba történt a bejelentkezés során!" }); // "An error occurred during login!"
            return;
        }
    }

    // Register handler
    static async register(req: Request, res: Response): Promise<void> {
        const username: string = req.body!.username;
        const password: string = req.body!.password;

        if (!username || !password) {
            res.status(400).json({ message: "Felhasználónév és jelszó kötelező!" }); // "Username and password are required!"
            return;
        }

        try {
            // Check if the user already exists
            const existingUser = await prisma.user.findUnique({
                where: { username }
            });

            if (existingUser) {
                res.status(400).json({ message: "Ilyen felhasználó már létezik!" }); // "A user with this username already exists!"
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
                ...newUser,
                jwt: jwtToken
            }

            // Return response with token
            res.status(201).json(response);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Hiba történt a regisztráció során!" }); // "An error occurred during registration!"
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
}
