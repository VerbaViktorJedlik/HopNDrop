import express from "express"
import { DataController } from "./controllers/data.controller"
import { AuthController } from "./controllers/auth.controller"

export const router = express.Router()

router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)


export default router
