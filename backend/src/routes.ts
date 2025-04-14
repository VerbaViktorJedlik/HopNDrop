import express from "express";
import { AuthController } from "./controllers/auth.controller";
import { PackageController } from "./controllers/package.controller";
import { PointController } from "./controllers/point.controller";
import { UserController } from "./controllers/user.controller";

export const router = express.Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);
router.post("/auth/validate", AuthController.validateToken);
router.post("/package/:id/take", PackageController.take);
router.post("/package/:id/recieve", PackageController.recieve);
router.post("/package/:id/deliver", PackageController.deliver);
router.post("/package", PackageController.create);
router.get("/package/get", PackageController.getAllPkg);
router.get("/package/available", PackageController.getAvailablePkgs);
router.get("/package/get/:id", PackageController.getPkg);

router.get("/user/:id/package", PackageController.getAllUserPkg);

router.get("/points/:location", PointController.getAllPPP);
router.get("/points/", PointController.getAllPPP);

router.get("/users/:username", UserController.getUserByName);
router.get("/user", UserController.getSelf);
router.get("/user/:id", UserController.getById);

export default router;
