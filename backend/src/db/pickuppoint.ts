import { PickUpPoint, Prisma } from "@prisma/client";
import { prisma } from "../main";

/**
 * Creates a new pickup point in the database
 *
 * @param location - Physical location description (must be unique)
 * @returns Promise resolving to:
 *          - Created PickUpPoint object with UUID
 *          - null if creation fails
 * @throws {Prisma.PrismaClientKnownRequestError}
 *          - P2002: Unique constraint violation (location already exists)
 *          - Other database errors
 *
 * @relatedModel PickUpPoint
 * @relationFields
 * - Maintains connection with Package through fromPackages/toPackages relations
 * - Location field has unique constraint to prevent duplicates
 */
export async function createPickUpPoint(
  location: string
): Promise<PickUpPoint | null> {
  try {
    const ppp = await prisma.pickUpPoint.create({
      data: {
        location,
      },
    });

    return ppp;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findPickUpPoints() {
  try {
    const points = await prisma.pickUpPoint.findMany();
    return points;
  } catch (error) {
    console.error(error);
    return [];
  }
}
