import { AuthResponse, PublicSelf, PublicUser, TokenVerifyResponse } from "@common";
import { ConfigService } from "./config.service";

export class AuthService{

    static async registerUser(username:string,password:string): Promise<PublicUser | null>{
        try {
            const response = await fetch("http://localhost:3000/api/auth/register",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username:username,password:password})
            })
    
            const result: AuthResponse = await response.json()
            if (result.result == "Success") {
                ConfigService.setToken(result.jwt)
                return result.self;
            }
    
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async login(username:string,password:string): Promise<PublicUser | null>{
        try {
            const response = await fetch("http://localhost:3000/api/auth/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username:username,password:password})
            })
    
            const result: AuthResponse = await response.json()
            if (result.result == "Success") {
                ConfigService.setToken(result.jwt)
                return result.self;
            }
    
            return null
        } catch (error) {
            console.log(error)
            return null
        }

    }

    static async verifyToken(): Promise<boolean>{
        try {
            const response = await fetch("http://localhost:3000/api/auth/validate",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": ConfigService.getToken()!
                }
            })
    
            const result: TokenVerifyResponse = await response.json()
            if (result == "Success") {
                return true
            }
    
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }
}