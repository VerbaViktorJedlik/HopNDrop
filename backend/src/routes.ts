import express from "express"
import { AuthController } from "./controllers/auth.controller"
import { PackageController } from "./controllers/package.controller"

export const router = express.Router()

router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)
router.post("/package/:id/take", PackageController.take)

export default router
