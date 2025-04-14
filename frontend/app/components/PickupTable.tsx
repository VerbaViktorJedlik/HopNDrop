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
  PackageService.TakePackage(id).then((res) => {
    if (res) {
      alert("Csomag elvállalva!");
    } else {
      alert("Hiba történt a csomag elvállalásakor!");
    }
  },
  ).catch((err) => {
    alert("Hiba történt a csomag elvállalásakor!");
  });
}

function PickupTable({ packages }: { packages: PublicPackage[] }) {
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
        {packages.map((pkg) => (
          <TableRow key={pkg.id}>
            <TableCell className="font-medium">{pkg.fromP.location}</TableCell>
            <TableCell>{pkg.toP.location}</TableCell>
            <TableCell>{pkg.price.toString()}</TableCell>
            <TableCell>{pkg.reward.toString()}</TableCell>
            <TableCell className="text-right">
              <Button className="hover:cursor-pointer" onClick={takePackage(pkg.id)}>Elvállalom</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PickupTable;
