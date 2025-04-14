import express from "express"
import routes from "./routes"
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const connectionString = "mongodb://localhost:27017/friends"



const app = express()
app.use(express.json())
app.use("/api",routes)

app.listen(3000,()=>{
    console.log("Server started")
})
