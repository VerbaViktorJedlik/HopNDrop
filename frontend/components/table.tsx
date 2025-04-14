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
import { PublicPackage, PublicSelf } from "@common";
import { PublicUser } from "@common";
import { PublicPPP } from "@common";
import { PackageService } from "~/services/package.service";
import { use, useEffect, useState } from "react";
import { UserService } from "~/services/user.service";
import { AuthService } from "~/services/auth.service";
import { Trash2 } from "lucide-react";
export function PostageTable() {
  const [postages, setPostages] = useState<PublicPackage[] | null>();
  const [self, setSelf] = useState<PublicSelf | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await UserService.getSelf();
      console.log(loggedInUser?.id);
      const data = await PackageService.GetAllUserPackages(loggedInUser?.id!);
      console.log(data);
      setPostages(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSelf = async () => {
      const self = await UserService.getSelf();
      setSelf(self);
    };
    fetchSelf();
  });

  async function handleDelivered(id: string) {
    const done = await PackageService.DeliverPackage(id);
  }

  async function handleReceive(id: string) {
    const done = await PackageService.ReceivePackage(id);
  }

  return (
    <Table>
      <TableCaption>Aktuális Küldeményeid</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Csomag tulajdonos</TableHead>
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
                {postage.fromU.id === self?.id ? "Tiéd" : "Idegené"}
              </TableCell>
              <TableCell className="font-medium">
                {postage.fromP.location}
              </TableCell>
              <TableCell>{postage.toP.location}</TableCell>
              <TableCell>{postage.status}</TableCell>
              <TableCell>{postage.price.toString()}</TableCell>
              <TableCell>{postage.reward.toString()}</TableCell>
              {postage.fromU.id !== self?.id &&
                postage.status === "EnRoute" && (
                  <TableCell>
                    <Button onClick={(e) => handleDelivered(postage.id)}>
                      Leszállítottam
                    </Button>
                  </TableCell>
                )}
              {postage.toU.id === self?.id &&
                postage.status === "Delivered" && (
                  <TableCell>
                    <Button onClick={(e) => handleReceive(postage.id)}>
                      Átvettem
                    </Button>
                  </TableCell>
                )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
