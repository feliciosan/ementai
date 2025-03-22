"use client";

import CompanyService from "@/services/company";
import { ICompanyAditional, TCompanyResponse } from "@/services/company.types";
import { useAuth } from "@/hooks/use-auth.hook";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useForm } from "react-hook-form";

export default function CompanyAditionalInfoForm() {
  const queryClient = useQueryClient();
  const { currentCompany } = useAuth();

  const { mutateAsync: setCompanyInfo } = useMutation({
    mutationKey: ["set-company-info", currentCompany?.id],
    mutationFn: (data: Partial<TCompanyResponse>) =>
      CompanyService.setCompanyInfo(currentCompany?.id || "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-company-by-id", currentCompany?.id],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICompanyAditional>({
    defaultValues: currentCompany?.info?.aditicional,
  });

  const onSubmit = async (data: ICompanyAditional) => {
    await setCompanyInfo({
      info: { aditicional: data },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-6 relative gap-4"
    >
      <Field>
        <Label className="text-sm/6 font-medium">
          Adicione o endereço do seu estabalecimento:
        </Label>
        <Textarea
          placeholder="Ex: Rua, Número, Cidade, Código Postal"
          {...register("address")}
          className={classNames(
            "mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm/6 resize-none",
            "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
          )}
          rows={2}
        />
        {!!errors.address && (
          <p role="alert" className="text-red-700 text-xs mt-1">
            {errors.address?.message}
          </p>
        )}
      </Field>
      <Field>
        <Label className="text-sm/6 font-medium">Telefone:</Label>
        <Input
          type="tel"
          placeholder="Ex: 912345678"
          {...register("phone")}
          className={classNames(
            "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
            "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
          )}
        />
        {!!errors.phone && (
          <p role="alert" className="text-red-700 text-xs mt-1">
            {errors.phone?.message}
          </p>
        )}
      </Field>
      <Field>
        <Label className="text-sm/6 font-medium">E-mail:</Label>
        <Input
          type="email"
          placeholder="meunegocio@gmail.com"
          {...register("email")}
          className={classNames(
            "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
            "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
          )}
        />
        {!!errors.email && (
          <p role="alert" className="text-red-700 text-xs mt-1">
            {errors.email?.message}
          </p>
        )}
      </Field>
      <Field>
        <Label className="text-sm/6 font-medium">Informações adicionais:</Label>
        <Input
          type="text"
          placeholder="Título: Take Away, Desconto, etc..."
          {...register("extra.label")}
          className={classNames(
            "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
            "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
          )}
        />
        <Textarea
          rows={2}
          placeholder="10% OFF às quartas-feiras, use o cupom: TAKEAWAY"
          {...register("extra.value")}
          className={classNames(
            "mt-4 block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm/6 resize-none",
            "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
          )}
        />
      </Field>
      <Field className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="items-center min-w-24 gap-2 border rounded-md bg-teal-600 py-2 px-3 text-sm/6 font-semibold text-white disabled:opacity-50 focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Salvar
        </Button>
      </Field>
    </form>
  );
}
