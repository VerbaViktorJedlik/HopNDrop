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

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await UserService.getSelf();
      const data = await PackageService.GetAllUserPackages(loggedInUser?.id!);
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {postages &&
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
                <button>asd</button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
