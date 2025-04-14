import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { PublicPackage } from "@common";
import { PublicUser } from "@common";
import { PublicPPP } from "@common";

export function PostageTable() {
  const exampleUser: PublicUser = {
    id: "user1",
    username: "john_doe",
  };

  // Example data for PublicPPP
  const examplePPP: PublicPPP = {
    id: "ppp1",
    location: "123 Main St, Springfield",
  };

  // Example data for PublicPackage
  const postages: PublicPackage[] = [
    {
      id: "package1",
      fromP: examplePPP,
      toP: examplePPP,
      fromU: exampleUser,
      toU: exampleUser,
      deliveryU: exampleUser,
      price: 100,
      reward: 10,
      status: "Waiting",
    },
  ];
  return (
    <Table>
      <TableCaption>Aktuális Küldeményeid</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Honnan</TableHead>
          <TableHead>Hova</TableHead>
          <TableHead>Státusz</TableHead>
          <TableHead>Ár</TableHead>
          <TableHead>Juttatás</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {postages.map((postage) => (
          <TableRow key={postage.id}>
            <TableCell className="font-medium">
              {postage.fromP.location}
            </TableCell>
            <TableCell>{postage.toP.location}</TableCell>
            <TableCell>{postage.status}</TableCell>
            <TableCell>{postage.price.toString()}</TableCell>
            <TableCell>{postage.reward.toString()}</TableCell>
            <TableCell className="text-right">
              <button>asd</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
