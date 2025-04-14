import { PublicPPP } from "./pickuppoint"
import { PublicUser } from "./user"

export type PublicPackage = {
  id: string,
  fromP: PublicPPP,
  toP: PublicPPP,
  fromU: PublicUser,
  toU: PublicUser,
  deliveryU: PublicUser | null,
  price: Number,
  reward: Number,

  status: "Waiting" | "EnRoute" | "Delivered" | "Completed"
}

/**
 * Client request body for creating a new package (reward calculated server-side)
 * 
 * @property fromU - ID of the sending User (must exist in User table)
 * @property toU - ID of the receiving User (must exist in User table)
 * @property fromP - ID of origin PickUpPoint (must exist in PickUpPoint table)
 * @property toP - ID of destination PickUpPoint (must exist in PickUpPoint table)
 * @property price - String representation of shipping cost
 * 
 * @note Server will automatically:
 * - Generate UUID for the package
 * - Calculate reward value 
 * - Set initial status to 'Waiting'
 * - Validate all referenced IDs exist
 * 
 * @see Package - Resulting database model
 * @relatedModel
 * - User (fromU/toU)
 * - PickUpPoint (fromP/toP)
 * 
 * @errorScenarios
 * - Invalid UUID formats
 * - Non-existent referenced IDs
 * - Malformed price string
 * - Negative price value
 */
export type NewPackageBody = {
  fromU: string,
  toU: string,
  fromP: string,
  toP: string,
  price: number,
}

export type PackageResponse = (PublicPackage & {result: "Success"}) | {result: "Error", msg: string}
export type FindPackageResponse = ({packages: PublicPackage[], result: "Success"}) | {result: "Error", msg: string}
