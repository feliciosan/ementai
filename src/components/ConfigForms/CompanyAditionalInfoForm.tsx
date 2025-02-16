"use client";

import CompanyService from "@/app/actions/company";
import {
  ICompanyAditional,
  TCompanyResponse,
} from "@/app/actions/company.types";
import { useAuth } from "@/hooks/use-auth.hook";
import { useCompanyPreview } from "@/hooks/use-company-preview";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useForm } from "react-hook-form";

export default function CompanyAditionalInfoForm() {
  const queryClient = useQueryClient();
  const { currentCompany } = useAuth();
  const { setCompanyInfoPreview, companyInfoPreview } = useCompanyPreview();

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
    getValues,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ICompanyAditional>({
    defaultValues: currentCompany?.info?.aditicional,
  });

  const onSubmit = async (data: ICompanyAditional) => {
    await setCompanyInfo({
      info: { aditicional: data },
    });
  };

  const onPreview = async () => {
    const values = getValues();

    setCompanyInfoPreview({
      aditicional: values,
    });
  };

  const onResetChanges = () => {
    reset();
    setCompanyInfoPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-6 relative gap-4"
    >
      <Field>
        <Label className="text-sm/6 font-medium">
          Adicione a morada do seu estabalecimento:
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
        <Label className="text-sm/6 font-medium">Informações extras:</Label>
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
        {!!companyInfoPreview && (
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={onResetChanges}
            className="items-center min-w-24 gap-2 border border-red-700 rounded-md py-2 px-3 text-sm/6 font-semibold text-red-700 disabled:opacity-50 focus:outline-none data-[hover]:border-red-800 data-[hover]:text-red-800 data-[open]:bg-red-800 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Desfazer
          </Button>
        )}
        <Button
          type="button"
          disabled={isSubmitting || !isDirty}
          onClick={onPreview}
          className="items-center min-w-24 gap-2 border border-teal-600 rounded-md py-2 px-3 text-sm/6 font-semibold text-teal-600 disabled:opacity-50 focus:outline-none data-[hover]:border-teal-700 data-[hover]:text-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Visualizar
        </Button>
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
