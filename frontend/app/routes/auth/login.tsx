"use client";

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
import { Link, useNavigate } from "react-router";
import { AuthService } from "~/services/auth.service";
import { ConfigService } from "~/services/config.service";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "~/components/ui/label";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    setError("");
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setLoading(true);
    try {
      const self = await AuthService.login(values.username, values.password);
      console.log(self);
      if (!self) {
        console.log("A bejelentkezés sikertelen");
        setError("A bejelentkezés sikertelen");
        setLoading(false);
        return;
      }
      ConfigService.setToken(self?.jwt);
      navigate("/profile");
      setLoading(false);
    } catch (error) {
      console.log("Nem sikerült az api hívás");
      setError("Nem sikerült az api hívás");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Card className="w-[350px] ">
        <CardHeader className="flex justify-center">
          <CardTitle>Bejelentkezés</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              {error && <Label className="text-destructive">{error}</Label>}
              <Button variant="outline" className="hover:cursor-pointer">
                <Link to="/register">Regisztráció</Link>
              </Button>
              <Button
                type="submit"
                className="float-right hover:cursor-pointer"
              >
                Bejelentkezés
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Button className="hover:cursor-pointer">
        <Link to="/tracker">Csomag nyomonkövetése</Link>
        {loading && <Loader2 className="animate-spin" />}
      </Button>
    </div>
  );
}
export default login;
