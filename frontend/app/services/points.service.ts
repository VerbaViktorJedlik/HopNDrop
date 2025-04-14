import { FindPPPResponse, PublicPPP } from "@common";
import { ConfigService } from "./config.service";

export class PointsService{


    static async GetAllPoints(): Promise<PublicPPP[] | null>{
            try {
              const response = await fetch(
                `${ConfigService.apiUrl}/points`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: ConfigService.getToken()!,
                  },
                }
              );
              const result: FindPPPResponse = await response.json();
              if (result.result == "Success") {
                return result.points;
              }
              console.log(result.msg);
              return null;
            } catch (error) {
              console.log(error);
              return null;
            }
    }

    static async GetPointByName(name:string): Promise<PublicPPP[]|null>{
        try {
            const response = await fetch(
              `${ConfigService.apiUrl}/points/${name}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: ConfigService.getToken()!,
                },
              }
            );
            const result: FindPPPResponse = await response.json();
            if (result.result == "Success") {
              return result.points;
            }
            console.log(result.msg);
            return null;
          } catch (error) {
            console.log(error);
            return null;
          }
    }
}