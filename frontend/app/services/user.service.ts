import { AuthResponse, GetAllUsersResponse, GetSelfResponse, GetUserResponse, PublicSelf, PublicUser, TokenVerifyResponse } from "@common";
import { ConfigService } from "./config.service";

export class UserService{

    static async getUser(id: string): Promise<PublicUser | null>{
        try {
            const response = await fetch(`${ConfigService.apiUrl}/user/`+id,{
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
            const response = await fetch(`${ConfigService.apiUrl}/user/`,{
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

    static async getUsersByName(username:string): Promise<PublicUser[] | null>{
        try {
            const response = await fetch(`${ConfigService.apiUrl}/users/${username}`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: ConfigService.getToken()!
                }
            })
    
            const result: GetAllUsersResponse = await response.json()
            if (result.result == "Success") {
                return result.users;
            }
    
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}