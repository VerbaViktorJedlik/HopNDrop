import { PublicUser } from "@common";
import { JwtPayload } from "jsonwebtoken";

export interface JWTDecode extends JwtPayload {
    user: PublicUser
}