import PickupTable from "~/components/PickupTable";
import { PublicPackage, PublicPPP, PublicUser } from "@common";
import { backendUrl } from "@common";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MoveLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

const packagePoint: PublicPPP = {
  id: "asd",
  location: "location",
};

const user: PublicUser = {
  id: "userName",
  username: "userName",
};

const packages: PublicPackage[] = [
  {
    id: "id",
    fromP: packagePoint,
    toP: packagePoint,
    fromU: user,
    toU: user,
    deliveryU: user,
    price: 400,
    reward: 450,

    status: "Waiting",
  },
];

function pickup() {
  return (
    <div>
      <div className="fixed left-8 top-8">
        <Link to="/profile">
          <Button className="flex cursor-pointer" variant={"outline"}>
            <MoveLeft />
            <span>Vissza a főoldalra</span>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Csomag szállításának elvállalása</CardTitle>
          </CardHeader>
          <CardContent>
            <PickupTable packages={packages} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default pickup;
