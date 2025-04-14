"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirmation must match the password.",
  }),
});

export function register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <div>
      <Link
        to="/login"
        className="flex items-center gap-2 text-sm transition-colors duration-200 group hover:cursor-pointer"
      >
        <Button variant={"outline"} className="absolute top-4 left-4">
          <MoveLeft className="h-4 w-4" />
          <span>Vissza a belépéshez</span>
        </Button>
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Card className="w-[350px] ">
          <CardHeader className="flex justify-center">
            <CardTitle>Regisztráció</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Felhasználónév</FormLabel>
                      <FormControl>
                        <Input placeholder="your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jelszó</FormLabel>
                      <FormControl>
                        <Input placeholder="your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jelszó megerősítése</FormLabel>
                      <FormControl>
                        <Input placeholder="your password again" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="float-right hover:cursor-pointer"
                >
                  <Link to="/auth/register">Regisztráció</Link>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default register;
