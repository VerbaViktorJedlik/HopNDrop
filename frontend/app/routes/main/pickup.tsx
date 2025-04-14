import PickupTable from "~/components/PickupTable";
import { PublicPackage, PublicPPP, PublicUser } from "@common";
import { backendUrl } from "@common";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MoveLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { PackageService } from "~/services/package.service";
import { useEffect, useState } from "react";

function pickup() {
  const [packages, setPackages] = useState<PublicPackage[] | null>(null);

  const getPackages = async () => {
    const packages: PublicPackage[] | null =
      await PackageService.GetAllPackages();
    setPackages(packages);
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div>
      <div className="fixed left-8 top-8">
        <Link to="/profile">
          <Button
            className="flex cursor-pointer hover:cursor-pointer"
            variant={"outline"}
          >
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
            {packages ? (
              <PickupTable packages={packages} refresh={getPackages} />
            ) : (
              <div className="text-center">Nincsenek elérhető csomagok</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default pickup;
