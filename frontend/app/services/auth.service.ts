import { AuthResponse, PublicSelf } from "@common";
import { ConfigService } from "./config.service";

export class AuthService{

    static async registerUser(username:string,password:string): Promise<PublicSelf | null>{
        const response = await fetch("http://localhost:3000/api/auth/register",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username:username,password:password})
        })

        const result: AuthResponse = await response.json()
        if (result.result == "Success") {
            ConfigService.setToken(result.self.jwt)
            return result.self
        }

        return null
    }

    static async login(username:string,password:string): Promise<PublicSelf | null>{
        const response = await fetch("http://localhost:3000/api/auth/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username:username,password:password})
        })

        const result: AuthResponse = await response.json()
        if (result.result == "Success") {
            ConfigService.setToken(result.self.jwt)
            return result.self;
        }

        return null
    }
}