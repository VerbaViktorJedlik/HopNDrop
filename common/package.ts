import { PublicPPP } from "./pickuppoint"
import { PublicUser } from "./user"

export type PublicPackage = {
    id: string,
    fromP: PublicPPP,
    toP: PublicPPP,
    fromU: PublicUser,
    toU: PublicUser,
    status: "Waiting" | "En Route" | "Delivered" | "Completed"
}
