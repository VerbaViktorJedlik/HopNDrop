import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { PackageService } from "~/services/package.service";
import { Link } from "react-router";
import { MoveLeft } from "lucide-react";
import { PointsService } from "~/services/points.service";
import { PublicPPP, PublicUser } from "@common";
import { Label } from "~/components/ui/label";
import { UserService } from "~/services/user.service";

const formSchema = z.object({
  from: z.string().min(2, {
    message: "Ez a mező kötelező.",
  }),
  to: z.string().min(2, {
    message: "Ez a mező kötelező.",
  }),
  price: z.string().min(1),
});
function send() {
  const [points, setPoints] = useState<PublicPPP[] | null>(null);
  const [users, setUsers] = useState<PublicUser[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  useEffect(() => {
    const getPoints = async () => {
      const points2 = await PointsService.GetAllPoints();
      setPoints(points2);
    };
    getPoints();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      price: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (selectedUserId) {
      const send = await PackageService.AddPackage(
        selectedUserId,
        values.from,
        values.to,
        Number(values.price)
      );
    }
    form.reset();
  };

  async function handleOnClick() {
    const users = await UserService.getUsersByName(search);
    setUsers(users);
  }

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
        <Card className="w-[350px] ">
          <CardHeader className="flex justify-center">
            <CardTitle>Küldemény Feladása</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-3">
              <Label>Felhasználó keresés</Label>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="felhasználó név"
              ></Input>
              <Button onClick={handleOnClick}>Felhasználó keresés</Button>
            </div>
            <Label>Kinek?</Label>
            <Select
              onValueChange={(val) => setSelectedUserId(val)}
              value={selectedUserId || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Válassz egy felhasználót" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-3"
              >
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Honnan?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Válassz egy autómatát" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {points?.map((point) => (
                            <SelectItem value={point.id}>
                              {point.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Ebbe az automatába kell betenned a csomagot.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hova?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Válassz egy autómatát" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {points?.map((point) => (
                            <SelectItem value={point.id}>
                              {point.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Ebbe az automatába fog megérkezni a csomagot.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Csomag értéke</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="buttons flex justify-center gap-7">
                  <Button type="submit">Feladás</Button>
                  <Button variant={"outline"}>
                    <a href="/profile">Mégse</a>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default send;
