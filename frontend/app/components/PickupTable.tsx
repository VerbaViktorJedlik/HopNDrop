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
              <Button>Elvállalom</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PickupTable;
