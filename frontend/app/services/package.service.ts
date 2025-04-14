import { FindPackageResponse, PackageResponse, PublicPackage } from "@common";
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

    static async GetAllPackages(): Promise<PublicPackage[] | null>{
        try {
            const response = await fetch(`http://localhost:3000/api/package/get`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": ConfigService.getToken()!
                }
            })
            const result: FindPackageResponse = await response.json()
            if(result.result == "Success"){
                return result.packages
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async GetPackageById(id: number): Promise<PublicPackage | null>{
        try {
            const response = await fetch(`http://localhost:3000/api/package/get/${id}`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": ConfigService.getToken()!
                }
            })
            const result: PackageResponse = await response.json()
            if(result.result == "Success"){
                return result.package
            }
            console.log(result.msg)
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}