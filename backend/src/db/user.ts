import { User } from "@prisma/client";
import { prisma } from "../main";

/**
 * Creates a new user in the database with automatic UUID and default balance
 *
 * @param username - Unique identifier for the user account
 * @param password - Authentication credential (should be pre-hashed)
 * @returns Promise resolving to:
 *          - Created User object with generated UUID and default balance (0)
 *          - null if creation fails
 * @throws {Prisma.PrismaClientKnownRequestError}
 *          - P2002: Unique constraint violation (username already exists)
 *          - Other database errors
 *
 * @relatedModel User
 * @relationFields
 * - Connects to Package model through:
 *   - sendingPackages (as sender)
 *   - receivingPackages (as recipient)
 *   - deliveringPackages (as courier)
 * @securityNote
 * - Passwords are stored as provided - caller should handle hashing
 * - Balance is initialized to 0 automatically
 */
export async function createUser(
  username: string,
  password: string
): Promise<User | null> {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    return user;
  } catch (error) {
    console.error(error);

        return null;
    }
}

export async function findUser(id?: string) {
    try {
        const pkg = await prisma.user.findMany({
            where: {
                id,
            }
        });
        console.log(id);
        
        return pkg;
    }
    catch(error) {
        console.error(error);
        return null
    }
}

export async function updateUser(user: Partial<User> & {id: string}) {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: user
        });

        return updatedUser;
    }
    catch(error) {
        console.error(error);
        return null
    }
}
