"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth.hook";
import { Button, Field, Input, Label } from "@headlessui/react";
import classNames from "classnames";
import withPublic from "@/HOC/public.route";

type TForgotPasswordForm = {
  email: string;
};

function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
    reValidateMode: "onChange",
  });

  async function onSubmit(values: TForgotPasswordForm) {
    await resetPassword(values.email);
    router.push("/admin");
  }

  return (
    <div className="flex flex-col max-w-md mx-auto px-4">
      <div className="py-4">
        <h2 className="text-xl md:text-2xl font-extrabold line-clamp-2">
          Recupere sua senha e volte a gerenciar seu cardápio!
        </h2>
      </div>
      <div className="w-full rounded-xl bg-gray-50 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <Label className="text-sm/6 font-medium">E-mail</Label>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full border rounded-md bg-teal-600 py-2 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            {isSubmitting ? "Enviando..." : "Enviar Link de Recuperação"}
          </Button>

          <Field className="text-center space-y-2">
            <Link
              href="/admin"
              className="text-sm font-medium text-teal-600 hover:text-teal-700 block"
            >
              Lembrou da senha? Fazer login
            </Link>
            <Label className="text-sm/6 font-medium w-full text-center block mt-4">
              Não tem conta?{" "}
              <Link
                href="/admin/signup"
                className="text-teal-600 hover:text-teal-700"
              >
                Cadastre-se
              </Link>
            </Label>
          </Field>
        </form>
      </div>
    </div>
  );
}

export default withPublic(ForgotPasswordPage);
