import { AuthResponse, GetSelfResponse, GetUserResponse, PublicSelf, PublicUser, TokenVerifyResponse } from "@common";
import { ConfigService } from "./config.service";

export class UserService{

    static async getUser(id: string): Promise<PublicUser | null>{
        try {
            const response = await fetch("http://localhost:3000/api/user/"+id,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
            })
    
            const result: GetUserResponse = await response.json()
            if (result.result == "Success") {
                return result.self;
            }
    
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // use for getting balance
    static async getSelf(): Promise<PublicSelf | null>{
        try {
            const response = await fetch("http://localhost:3000/api/user/",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
            })
    
            const result: GetSelfResponse = await response.json()
            if (result.result == "Success") {
                return result.self;
            }
    
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}