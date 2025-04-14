import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Link } from "react-router";
import { MoveLeft } from "lucide-react";

const formSchema = z.object({
  packageId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function tracker() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageId: "",
    },
  });

  const pkg = {
    id: "id",
    fromP: "Feladó box címe",
    fromU: "Feladó neve",
    deliveryU: "Futár neve",
    price: 123,
    status: "Waiting",
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Link
        to="/login"
        className="flex items-center gap-2 text-sm transition-colors duration-200 group hover:cursor-pointer"
      >
        <Button variant={"outline"} className="absolute top-4 left-4">
          <MoveLeft className="h-4 w-4" />
          <span>Vissza a belépéshez</span>
        </Button>
      </Link>
      <Card className="w-[350px] ">
        <CardHeader className="flex justify-center">
          <CardTitle>Csomagkövetés</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="packageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Csomag azonosító</FormLabel>
                    <FormControl>
                      <Input placeholder="package id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="float-right">
                Követés
              </Button>
            </form>
          </Form>
          <div className="float-left">
            <div className="flex gap-4">
              <h4>Feladó:</h4>
              <p>{pkg.fromU}</p>
            </div>
            <Separator className="my-2" />
            <div className="flex gap-4">
              <h4>Feladó cím:</h4>
              <p>{pkg.fromP}</p>
            </div>
            <Separator className="my-2" />
            <div className="flex gap-4">
              <h4>Futár:</h4>
              <p>{pkg.deliveryU}</p>
            </div>
            <Separator className="my-2" />
            <div className="flex gap-4">
              <h4>Érték:</h4>
              <p>{pkg.price}</p>
            </div>
            <Separator className="my-2" />
            <div className="flex gap-4">
              <h4>Státusz:</h4>
              <p>{pkg.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default tracker;
