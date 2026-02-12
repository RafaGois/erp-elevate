"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import useAuth from "@/data/hooks/useAuth";
import User from "@/lib/models/User";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon, Home } from "lucide-react";
import Link from "next/link";
import InputForm from "@/components/layout/components/inputs/InputForm";
import { toast } from "sonner";
import useAppData from "@/data/hooks/useAppData";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

export default function Auth() {
  const { login } = useAuth();
  const { setLoading, loading } = useAppData();
  const form = useForm<User>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  //todo usar o react-hook-form
  async function submit(data: User) {
    try {
      setLoading(true);
      await login?.(data as User);
    } catch (error) {
      toast.error(
        error?.response?.data?.[0] ?? error?.message ?? "Erro ao fazer login.",
      );
      //toast.error(error instanceof Error ? error.message : "Erro ao fazer login.");
    }
  }

  useEffect(() => {
    if (loading) {
      toast("Carregando...", {
        description: "Aguarde enquanto o sistema é carregado.",
      });
    } else {
      toast.dismiss();
    }
  }, [loading]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="absolute top-5 left-5 z-50">
        <Link href="/">
          <span className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeftIcon size={16} />
            Voltar
          </span>
        </Link>
      </div>
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submit)}
                  className="p-6 md:p-8"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Bem vindo de volta</h1>
                      <p className="text-muted-foreground text-balance">
                        Informe os campos para acessar o sistema.
                      </p>
                    </div>

                    <InputForm
                      form={form}
                      name="username"
                      label="Usuário"
                      type="text"
                    />
                    <InputForm
                      form={form}
                      name="password"
                      label="Senha"
                      type="password"
                    />
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Login with Apple</span>
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Login with Google</span>
                      </Button>
                      <Link href="/">
                        <Button
                          variant="outline"
                          type="button"
                          className="w-full"
                        >
                          <Home />
                          <span className="sr-only">Login with Meta</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
              <div className="bg-muted relative hidden md:block">
                <Image
                  src="https://res.cloudinary.com/dn454izoh/image/upload/v1756823349/img-5_svixxi.jpg"
                  width={500}
                  height={500}
                  alt="img-auth"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.8] grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Clicando em continuar você concorda com os nossos
            <a href="#"> Termos de uso</a> e{" "}
            <a href="#">Politicas de Privacidade</a>.
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
