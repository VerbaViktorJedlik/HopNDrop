import { Prisma, PrismaClient } from "@prisma/client";
import { createPackage } from "../../src/db/package";
import { createPickUpPoint } from "../../src/db/pickuppoint";
import { createUser } from "../../src/db/user";
import data from "./data.json";

const prisma = new PrismaClient();

export async function seedDb() {
    try {
        await prisma.package.deleteMany();
        await prisma.user.deleteMany();
        await prisma.pickUpPoint.deleteMany();
    }
    catch {

    }
    
    const users = await Promise.all(data.users.map(async u => {
        return await createUser(u.username, u.password)!;
    }));

    const ppps = await Promise.all(
        data.ppps.map(async p => {
            return await createPickUpPoint(p.location)!;
        })
    );

    const packages = await Promise.all(
        data.packages.map(async p => {
            return createPackage(users[p.fromU]!.id, users[p.toU]!.id, ppps[p.fromP]!.id, ppps[p.toP]!.id, p.price, p.reward);
        })
    )
}

seedDb();