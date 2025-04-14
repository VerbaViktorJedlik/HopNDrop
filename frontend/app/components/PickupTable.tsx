import {
  Table,
  TableCaption,
  TableHeader,
  TableCell,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
} from "~/components/ui/table";
import { PublicPackage } from "@common";
import { Button } from "./ui/button";
import { PackageService } from "~/services/package.service";

const takePackage = (id: string) => async () => {
  const asdf = await PackageService.TakePackage(id);
  console.log(asdf);
};

function PickupTable({
  packages,
  refresh,
}: {
  packages: PublicPackage[];
  refresh: () => void;
}) {
  const takePackage = (id: string) => async () => {
    await PackageService.TakePackage(id);
    refresh();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Honnan</TableHead>
          <TableHead>Hová</TableHead>
          <TableHead>Érték</TableHead>
          <TableHead>Jutattás</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.map(
          (pkg) =>
            pkg.status === "Waiting" && (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">
                  {pkg.fromP.location}
                </TableCell>
                <TableCell>{pkg.toP.location}</TableCell>
                <TableCell>{pkg.price.toString()}</TableCell>
                <TableCell>{pkg.reward.toString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    className="hover:cursor-pointer"
                    onClick={takePackage(pkg.id)}
                  >
                    Elvállalom
                  </Button>
                </TableCell>
              </TableRow>
            )
        )}
      </TableBody>
    </Table>
  );
}

export default PickupTable;
