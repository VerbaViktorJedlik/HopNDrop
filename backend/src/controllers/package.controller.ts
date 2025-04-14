import { Request, Response } from "express";
import { createPackage, findPackage, updatePackage } from "../db/package";
import { FindPackageResponse, PackageResponse } from "@common";
import { AuthController } from "./auth.controller";
import { findUserById } from "../db/user";

export class PackageController {
  static async create(
    req: Request,
    res: Response<PackageResponse>
  ): Promise<void> {
    try {
      const reqUser = await AuthController.validateUser(req);
      if (!reqUser) {
        res.status(403);
        return;
      }
      const user = (await findUserById(reqUser.id))!;
      const { toUId, fromPId, toPId, price, reward } = req.body;
      if (!toUId || !fromPId || !toPId || !price || !reward) {
        res.status(400).json({ result: "Error", msg: "Missing fields" });
        return;
      }
      const createdPackage = await createPackage(
        user.id,
        toUId,
        fromPId,
        toPId,
        price,
        400
      );

      if (!createdPackage) {
        res
          .status(500)
          .json({ result: "Error", msg: "Failed to create package." });
        return;
      }
      res.json({ result: "Success", package: createdPackage });
      return;
    } catch (error) {
      res.status(500).json({ result: "Error", msg: "Server error" });
      return;
    }
  }

  static async take(
    req: Request<{ id: string }>,
    res: Response<PackageResponse>
  ) {
    let pkgs = await findPackage(req.params.id);
    if (pkgs == null) {
      res.status(404).json({
        result: "Error",
        msg: "Nem létezik csomag ilyen azonosítóval.",
      });
      return;
    }
    let pkg = pkgs[0];

    if (pkg.status != "Waiting") {
      res
        .status(400)
        .json({ result: "Error", msg: "Nem megfelelő a csomag státusza." });
      return;
    }
    pkg.status = "EnRoute";
    const updatedPkg = await updatePackage(pkg);

    if (!updatedPkg) {
      res.status(400).json({
        result: "Error",
        msg: "Nem sikerült frissíteni a csomag státuszát.",
      });
      return;
    }

    res.status(200).json({ result: "Success", package: updatedPkg });
  }

  static async deliver(
    req: Request<{ id: string }>,
    res: Response<PackageResponse>
  ) {
    let pkgs = await findPackage(req.params.id);
    if (pkgs == null) {
      res.status(404).json({
        result: "Error",
        msg: "Nem létezik csomag ilyen azonosítóval.",
      });
      return;
    }
    let pkg = pkgs[0];

    if (pkg.status != "EnRoute") {
      res
        .status(400)
        .json({ result: "Error", msg: "Nem megfelelő a csomag státusza." });
      return;
    }
    pkg.status = "Delivered";
    const updatedPkg = await updatePackage(pkg);

    if (!updatedPkg) {
      res.status(400).json({
        result: "Error",
        msg: "Nem sikerült frissíteni a csomag státuszát.",
      });
      return;
    }

    res.status(200).json({ result: "Success", package: updatedPkg });
  }
  static async recieve(
    req: Request<{ id: string }>,
    res: Response<PackageResponse>
  ) {
    let pkgs = await findPackage(req.params.id);
    if (pkgs == null) {
      res.status(404).json({
        result: "Error",
        msg: "Nem létezik csomag ilyen azonosítóval.",
      });
      return;
    }
    let pkg = pkgs[0];

    if (pkg.status != "Delivered") {
      res
        .status(400)
        .json({ result: "Error", msg: "Nem megfelelő a csomag státusza." });
      return;
    }
    pkg.status = "Completed";
    const updatedPkg = await updatePackage(pkg);

    if (!updatedPkg) {
      res.status(400).json({
        result: "Error",
        msg: "Nem sikerült frissíteni a csomag státuszát.",
      });
      return;
    }

    res.status(200).json({ result: "Success", package: updatedPkg });
  }

  static async getPkg(
    req: Request<{ id: string }>,
    res: Response<PackageResponse>
  ) {
    let pkgs = await findPackage(req.params.id);
    if (pkgs == null) {
      res.status(404).json({
        result: "Error",
        msg: "Nem létezik csomag ilyen azonosítóval.",
      });
      return;
    }
    let pkg = pkgs[0];
    res.status(200).json({ result: "Success", package: pkg });
  }
  static async getAllPkg(req: Request, res: Response<FindPackageResponse>) {
    let pkgs = await findPackage();
    if (pkgs == null) {
      res.status(404).json({
        result: "Error",
        msg: "Nem létezik csomag ilyen azonosítóval.",
      });
      return;
    }
    res.status(200).json({ result: "Success", packages: pkgs });
  }

  static async getAllUserPkg(
    req: Request<{ id: string }>,
    res: Response<FindPackageResponse>
  ) {
    try {
      let pkgs = await findPackage();

      pkgs = pkgs!.filter(
        (p) =>
          p.deliveryUId == req.params.id ||
          p.fromUId == req.params.id ||
          p.toUId == req.params.id
      );

      res.status(200).json({ result: "Success", packages: pkgs });
    } catch (error) {
      res.status(500);
    }
  }
}
