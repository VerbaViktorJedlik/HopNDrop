import {
  AuthResponse,
  PublicSelf,
  PublicUser,
  TokenVerifyResponse,
} from "@common";
import { ConfigService } from "./config.service";

export class AuthService {
  static async registerUser(
    username: string,
    password: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${ConfigService.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const result: AuthResponse = await response.json();
      if (result.result == "Success") {
        ConfigService.setToken(result.jwt);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${ConfigService.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const result: AuthResponse = await response.json();
      if (result.result == "Success") {
        ConfigService.setToken(result.jwt);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async verifyToken(): Promise<boolean> {
    try {
      const response = await fetch(`${ConfigService.apiUrl}/auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ConfigService.getToken()!,
        },
      });

      const result: TokenVerifyResponse = await response.json();
      if (result == "Success") {
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
