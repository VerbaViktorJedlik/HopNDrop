import express from "express"
import routes from "./routes"
import { PrismaClient } from "@prisma/client";
import cors from "cors";

export const prisma = new PrismaClient();

const connectionString = "mongodb://localhost:27017/friends"



const app = express()

app.use(cors())
app.use(express.json())
app.use("/api",routes)

app.listen(3000,()=>{
    console.log("Server started on port "+3000)
})
