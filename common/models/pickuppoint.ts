export type PublicPPP = {
  id: string;
  location: string;
  name: string;
};

export type FindPPPResponse =
  | { points: PublicPPP[]; result: "Success" }
  | { result: "Error"; msg: string };
