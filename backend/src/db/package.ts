import { Package } from "@prisma/client";
import { prisma } from "../main";

/**
 * Creates a new package with automatic UUID and default 'Waiting' status
 * 
 * @param fromUId - ID of the user sending the package (must exist in User table)
 * @param toUId - ID of the user receiving the package (must exist in User table)
 * @param fromPId - ID of origin pickup point (must exist in PickUpPoint table)
 * @param toPId - ID of destination pickup point (must exist in PickUpPoint table)
 * @param price - Shipping cost charged to sender
 * @param reward - Payout amount for successful delivery
 * @returns Promise resolving to:
 *          - Created Package object with generated UUID and default 'Waiting' status
 *          - null if creation fails
 * @throws {Prisma.PrismaClientKnownRequestError}
 *          - P2003: Foreign key constraint violation (invalid ID reference)
 *          - Other database errors
 * 
 * @relatedModel Package
 * @relationFields
 * - Connects to User through:
 *   - fromU (sender)
 *   - toU (receiver)
 *   - deliveryU (courier, optional)
 * - Connects to PickUpPoint through:
 *   - fromP (origin)
 *   - toP (destination)
 * @defaultValues
 * - status: 'Waiting'
 * - deliveryUId: null
 * - id: auto-generated UUID
 */
export async function createPackage(fromUId: string, toUId: string, fromPId: string, toPId: string, price: number, reward: number): Promise<Package | null> {
    try {
        const pkg = await prisma.package.create({
            data: {
                fromUId,
                toUId,
                fromPId,
                toPId,
                price,
                reward,
            }
        });

        return pkg;
    }
    catch(error) {
        console.error(error);

        return null;
    }
}

export async function findPackage(id?: string): Promise<Package[] | null> {
    try {
        const pkg = await prisma.package.findMany({
            where: {
                id,
            }
        });

        return pkg;
    }
    catch(error) {
        console.error(error);
        return null
    }
}
