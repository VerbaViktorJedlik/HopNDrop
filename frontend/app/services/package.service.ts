import { PackageResponse, PublicPackage } from "@common";
import { ConfigService } from "./config.service";

export class PackageService{

    static async TakePackage(id:string): Promise<PublicPackage | null>{
        try {
            const response = await fetch(`http://localhost:3000/api/package/${id}/take`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": ConfigService.getToken()!
                }
            })
            const result: PackageResponse = await response.json()
            if (result.result == "Success") {
                return result.package
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        }

    }
}