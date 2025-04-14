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
import { PackageService } from "~/services/package.service";
import { use, useEffect, useState } from "react";
import { UserService } from "~/services/user.service";

export function PostageTable() {
  const [postages, setPostages] = useState<PublicPackage[] | null>();
  const [loggedInUser, setLoggedInUser] = useState<PublicUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await UserService.getSelf();
      setLoggedInUser(user);
      const data = await PackageService.GetAllUserPackages(user?.id!);
      setPostages(data);
    };
    fetchData();
  }, []);

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
          <TableHead className="text-right">Művelet</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {postages &&
          loggedInUser &&
          postages.map((postage) => (
            <TableRow key={postage.id}>
              <TableCell className="font-medium">
                {postage.fromP.location}
              </TableCell>
              <TableCell>{postage.toP.location}</TableCell>
              <TableCell>{postage.status}</TableCell>
              <TableCell>{postage.price.toString()}</TableCell>
              <TableCell>{postage.reward.toString()}</TableCell>
              <TableCell className="text-right">
                {postage.toP.id === loggedInUser.id
                  ? "Érkező"
                  : postage.fromP.id === loggedInUser.id
                  ? "Elküldve"
                  : postage.deliveryU?.id === loggedInUser.id
                  ? "Kiszállítandó"
                  : ""}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
