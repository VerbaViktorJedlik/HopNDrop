import { PublicPPP } from "./pickuppoint";
import { PublicUser } from "./user";

export type PublicPackage = {
  id: string;
  fromP: PublicPPP;
  toP: PublicPPP;
  fromU: PublicUser;
  toU: PublicUser;
  deliveryU: PublicUser | null;
  price: Number;
  reward: Number;

  status: "Waiting" | "EnRoute" | "Delivered" | "Completed";
};

export type NewPackageBody = {
  fromU: string;
  toU: string;
  fromP: string;
  toP: string;
  price: number;
  weight?: number;
  size?: number;
};

export type PackageResponse =
  | { package: PublicPackage; result: "Success" }
  | { result: "Error"; msg: string };
export type FindPackageResponse =
  | { packages: PublicPackage[]; result: "Success" }
  | { result: "Error"; msg: string };
