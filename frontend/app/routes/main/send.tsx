import React from "react";
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

const formSchema = z.object({
  from: z.string().min(2, {
    message: "Ez a mező kötelező.",
  }),
  to: z.string().min(2, {
    message: "Ez a mező kötelező.",
  }),
  price: z
    .string()
    .regex(/^\d+$/, { message: "The price must contain only numbers." })
    .min(4, { message: "minimum 1000Ft értéknek kell lennie" }),
});
function send() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      price: "0",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Card className="w-[350px] ">
        <CardHeader className="flex justify-center">
          <CardTitle>Küldemény Feladása</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <SelectItem value="m@example.com">
                          RAAAAAAAAAH
                        </SelectItem>
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
                        <SelectItem value="m@example.com">
                          RAAAAAAAAAH
                        </SelectItem>
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
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="buttons flex justify-center gap-7">
                <Button variant={"outline"} type="submit">
                  Feladás
                </Button>
                <Button>
                  <a href="/profile">Mégse</a>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default send;
