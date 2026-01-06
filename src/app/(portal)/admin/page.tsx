"use client";

import { Button, Field, Input, Label } from "@headlessui/react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth.hook";
import { FcGoogle } from "react-icons/fc";
import withPublic from "@/HOC/public.route";
import Link from "next/link";
import Image from "next/image";
import HeroInfo from "@/components/HeroInfo/HeroInfo";

type TSignupForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  async function onSubmit(values: TSignupForm) {
    await signIn(values.email, values.password);
  }

  return (
    <div className="flex flex-col mx-auto px-4">
      <div className="py-4">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/logo-teal.svg"
            alt="Ementai Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-lg font-bold">Ementai</span>
        </div>
      </div>
      <div className="md:flex md:space-x-10">
        <div className="flex-3">
          <HeroInfo
            titleStart="Acesse sua conta e gerencie"
            titleEndColored="seu cardápio digital"
            description="Atualize seus produtos, preços e informações em tempo real. Seu menu sempre atualizado e acessível para seus clientes."
          />
        </div>
        <div className="flex-2 mt-10 md:mt-2 mb-8">
          <div className="flex flex-col mb-2">
            <h2 className="text-xl font-bold line-clamp-2 mb-1">
              Entre agora e gerencie seu cardápio personalizado!
            </h2>
          </div>
          <div className="w-full rounded-xl bg-gray-50 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <Label className="text-sm/6 font-medium">E-mail</Label>
            <Input
              type="email"
              placeholder="E-mail"
              autoComplete="username"
              {...register("email", {
                required: "O e-mail é obrigatório.",
              })}
              className={classNames(
                "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
                "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
              )}
            />
            {!!errors.email && (
              <p role="alert" className="text-red-700 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium">Senha</Label>
            <Input
              type="password"
              placeholder="********"
              autoComplete="current-password"
              {...register("password", {
                required: "A senha de acesso é obrigatória.",
                minLength: {
                  value: 6,
                  message:
                    "A senha de acesso deve ter pelo menos 8 caracteres.",
                },
              })}
              className={classNames(
                "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
                "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
              )}
            />
          </Field>
          <Button
            type="submit"
            className="w-full border rounded-md bg-teal-600 py-2 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Entrar
          </Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            className="w-full flex justify-center gap-2 border rounded-md bg-red-500 py-2 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            <FcGoogle className="size-6 bg-white rounded-full" />
            <span>Entrar com Google</span>
          </Button>
          <Field className="text-center">
            <Label className="text-sm/6 font-medium w-full text-center block">
              Ainda não tem uma conta?{" "}
              <Link
                href="/admin/signup"
                className="text-teal-600 hover:text-teal-700"
              >
                Cadastre-se
              </Link>
            </Label>
            <Link
              href="/admin/forgot-password"
              className="text-sm font-medium text-teal-600 hover:text-teal-700 block mt-4"
            >
              Esqueceu a senha?
            </Link>
          </Field>
        </form>
      </div>
    </div>
  </div>
</div>
  );
}

export default withPublic(LoginPage);
