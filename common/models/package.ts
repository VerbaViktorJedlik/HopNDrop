import { PublicPPP } from "./pickuppoint"
import { PublicUser } from "./user"

export type PublicPackage = {
    id: string,
    fromP: PublicPPP,
    toP: PublicPPP,
    fromU: PublicUser,
    toU: PublicUser,
    deliveryU: PublicUser,
    price: Number,
    reward: Number,

    status: "Waiting" | "En Route" | "Delivered" | "Completed"
}
