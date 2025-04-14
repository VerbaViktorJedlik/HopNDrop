import { Request, Response } from "express";
import { createPackage, findPackage, updatePackage } from "../db/package";
import { FindPackageResponse, PackageResponse } from "@common";
import { AuthController } from "./auth.controller";
import { findUser, updateUser } from "../db/user";

export class PackageController {
  static async create(
    req: Request,
    res: Response<PackageResponse>
  ): Promise<void> {
    try {
      const reqUser = await AuthController.validateUser(req);

      if (!reqUser) {
        res.status(403).json({result: "Error", msg: "Need to log in to access this function."})
        return;
      }

      const { toUId, fromPId, toPId, price } = req.body;

      if (!toUId || !fromPId || !toPId || !price) {
        res.status(400).json({ result: "Error", msg: "Missing fields" });
        return;
      }

      const user = (await findUser(reqUser.id))![0];
      
      await updateUser({id: reqUser.id, balance: user.balance - 400});      

      const createdPackage = await createPackage(
        reqUser.id,
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
      console.log(error);

      res.status(500).json({ result: "Error", msg: "Server error" });
      return;
    }
  }

  static async take(
    req: Request<{ id: string }>,
    res: Response<PackageResponse>
  ) {
    let user = await AuthController.validateUser(req);
    if(!user){
        res.status(403).json({result: "Error", msg: "Need to log in to access this function."})
        return;
    }

    let pkgs = await findPackage(req.params.id);
    if (pkgs == null) {
      res.status(404).json({
        result: "Error",
        msg: "Nem létezik csomag ilyen azonosítóval.",
      });
      return;
    }
    
    let pkg = pkgs[0];
    let users = await findUser(user.id);
    if(!users || users.length == 0){
        res.status(404).json({ result: "Error", msg: "Nem létezik user ilyen azonosítóval."});
        return;
    }
    let deliveryUser = users[0];


    if (pkg.status != "Waiting") {
      res
        .status(400)
        .json({ result: "Error", msg: "Nem megfelelő a csomag státusza." });
      return;
    }
    pkg.status = "EnRoute"
    pkg.deliveryUId = deliveryUser.id;
    deliveryUser.balance -= pkg.price;
    let updatedDeliveryUser = await updateUser(deliveryUser);

    const updatedPkg = await updatePackage({id: pkg.id, deliveryUId: deliveryUser.id, status: "EnRoute"});

    if (!updatedPkg) {
      res.status(400).json({
        result: "Error",
        msg: "Nem sikerült frissíteni a csomag státuszát.",
      });
      return;
    }

    res.status(200).json({ result: "Success", package: updatedPkg });
  }

static async deliver(req: Request<{id:string}>, res: Response<PackageResponse>) {
    let user = await AuthController.validateUser(req);
    if(!user){
        res.status(403).json({result: "Error", msg: "Need to log in to access this function."})
        return;
    }
    let pkgs = await findPackage(req.params.id);
    if(!pkgs || pkgs.length == 0){
        res.status(404).json({ result: "Error", msg: "Nem létezik csomag ilyen azonosítóval."});
        return;
    }
    let pkg = pkgs[0];

    let users = await findUser(user.id);
    if(!users || users.length == 0){
        res.status(404).json({ result: "Error", msg: "Nem létezik user ilyen azonosítóval."});
        return;
    }
    let deliveryUser = users[0];


    if(pkg.status != "EnRoute" ){
        res.status(400).json({result: "Error", msg: "Nem megfelelő a csomag státusza."});
        return;
    }
    pkg.status = "Delivered"
    pkg.deliveryUId = deliveryUser.id;
    deliveryUser.balance += pkg.price;
    deliveryUser.balance += pkg.reward;
    let updatedDeliveryUser = await updateUser(deliveryUser);
    const updatedPkg = await updatePackage({id: pkg.id, status: "Delivered"});


    if (!updatedPkg) {
      res.status(400).json({
        result: "Error",
        msg: "Nem sikerült frissíteni a csomag státuszát.",
      });
      return;
    }
    
    res.status(200).json({result: "Success", package: updatedPkg});
}
static async recieve(req: Request<{id:string}>, res: Response<PackageResponse>) {
    let user = await AuthController.validateUser(req);
    if(!user){
        res.status(403).json({result: "Error", msg: "Need to log in to access this function."})
        return;
    }

    let pkgs = await findPackage(req.params.id);
    if(!pkgs || pkgs.length == 0){
        res.status(404).json({ result: "Error", msg: "Nem létezik csomag ilyen azonosítóval."});
        return;
    }
    let pkg = pkgs[0];

    let users = await findUser(pkg.toUId);
    if(!users || users.length == 0){
        res.status(404).json({ result: "Error", msg: "Nem létezik user ilyen azonosítóval."});
        return;
    }
    let toUser = users[0];
    users = null;
    users = await findUser(pkg.fromUId);
    if(!users || users.length == 0){
        res.status(404).json({ result: "Error", msg: "Nem létezik user ilyen azonosítóval."});
        return;
    }
    let fromUser = users[0];

    if(pkg.status != "Delivered" ){
        res.status(400).json({result: "Error", msg: "Nem megfelelő a csomag státusza."});
        return;
    }
    pkg.status = "Completed"
    toUser.balance -= pkg.price;
    fromUser.balance += pkg.price;
    let updatedToUser = await updateUser(toUser);
    let updatedFromUser = await updateUser(fromUser);

    const updatedPkg = await updatePackage({id: pkg.id, status: "Completed"});

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
    if(!pkgs || !pkgs.length){
        res.status(404).json({ result: "Error", msg: "Nem létezik csomag ilyen azonosítóval."});
        return;
    }
    let pkg = pkgs[0];
    res.status(200).json({ result: "Success", package: pkg });
  }

  static async getAllPkg(req: Request, res: Response<FindPackageResponse>) {
    let pkgs = await findPackage();
    if(pkgs == null){
        res.status(404).json({ result: "Error", msg: "Nem létezik egy csomag se."});
        return;
    }
    res.status(200).json({ result: "Success", packages: pkgs });
  }

  static async getAvailablePkgs(
    req: Request,
    res: Response<FindPackageResponse>
  ) {
    let pkgs = await findPackage();
    if (!pkgs || !pkgs.length) {
      res.status(404).json({
        result: "Error",
        msg: "Nem létezik csomag ilyen azonosítóval.",
      });
      return;
    }
    res.status(200).json({
      result: "Success",
      packages: pkgs.filter((p) => !p.deliveryUId),
    });
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
