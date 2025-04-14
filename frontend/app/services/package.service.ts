import { FindPackageResponse, PackageResponse, PublicPackage } from "@common";
import { ConfigService } from "./config.service";

export class PackageService {
  static async GetAllPackages(): Promise<PublicPackage[] | null> {
    try {
      const response = await fetch(`${ConfigService.apiUrl}/package/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ConfigService.getToken()!,
        },
      });
      const result: FindPackageResponse = await response.json();
      if (result.result == "Success") {
        return result.packages;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async GetPackageById(id: string): Promise<PublicPackage | null> {
    try {
      const response = await fetch(
        `${ConfigService.apiUrl}/package/get/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: ConfigService.getToken()!,
          },
        }
      );
      const result: PackageResponse = await response.json();
      if (result.result == "Success") {
        return result.package;
      }
      console.log(result.msg);
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async TakePackage(id: string): Promise<PublicPackage | null> {
    try {
      const response = await fetch(
        `${ConfigService.apiUrl}/package/${id}/take`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ConfigService.getToken()!,
          },
        }
      );
      const result: PackageResponse = await response.json();
      if (result.result == "Success") {
        return result.package;
      }
      console.log(result.msg);
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async ReceivePackage(id: string): Promise<PublicPackage | null> {
    try {
      const response = await fetch(
        `${ConfigService.apiUrl}/package/${id}/recieve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ConfigService.getToken()!,
          },
        }
      );
      const result: PackageResponse = await response.json();
      if (result.result == "Success") {
        return result.package;
      }
      console.log(result.msg);
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async DeliverPackage(id: string): Promise<PublicPackage | null> {
    try {
      const response = await fetch(
        `${ConfigService.apiUrl}/package/${id}/deliver`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ConfigService.getToken()!,
          },
        }
      );
      const result: PackageResponse = await response.json();
      if (result.result == "Success") {
        return result.package;
      }
      console.log(result.msg);
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
