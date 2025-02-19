"use client";

import CompanyService from "@/app/actions/company";
import { ICompanySocial, TCompanyResponse } from "@/app/actions/company.types";
import { useAuth } from "@/hooks/use-auth.hook";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useForm } from "react-hook-form";

export default function CompanySocialForm() {
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
    formState: { isSubmitting },
  } = useForm<ICompanySocial>({
    defaultValues: currentCompany?.info?.social,
  });

  const onSubmit = async (data: ICompanySocial) => {
    await setCompanyInfo({
      info: { social: data },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-6 relative gap-4"
    >
      <Field>
        <Label className="text-sm/6 font-medium">Instagram:</Label>
        <Input
          type="text"
          placeholder="Link do seu perfil do Instagram"
          {...register("instagram")}
          className={classNames(
            "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
            "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
          )}
        />
      </Field>
      <Field>
        <Label className="text-sm/6 font-medium">Facebook:</Label>
        <Input
          type="text"
          placeholder="Link para a sua página do Facebook"
          {...register("facebook")}
          className={classNames(
            "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
            "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
          )}
        />
      </Field>
      <Field>
        <Label className="text-sm/6 font-medium">Whatsapp:</Label>
        <Input
          type="tel"
          placeholder="Número de telefone para o Whatsapp"
          {...register("whatsapp")}
          className={classNames(
            "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
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
