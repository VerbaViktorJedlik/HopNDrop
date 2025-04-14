import { Request, Response } from "express";
import { FindPPPResponse } from "@common";
import { findPickUpPoints } from "../db/pickuppoint";

export class PointController {
  static async getAllPPP(
    req: Request<{ location: string }>,
    res: Response<FindPPPResponse>
  ) {
    let points = await findPickUpPoints();

    const locationFilter = req.params.location || "";

    points = points.filter((p) =>
      p.location.toLowerCase().includes(locationFilter.toLowerCase())
    );

    res.status(200).json({ result: "Success", points });
  }
}
