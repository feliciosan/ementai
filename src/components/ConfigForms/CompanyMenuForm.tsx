"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import { useCompanyPreview } from "@/hooks/use-company-preview";
import { Button, Field, Fieldset, Input, Textarea } from "@headlessui/react";
import classNames from "classnames";
import { useFieldArray, useForm } from "react-hook-form";
import { RiAddCircleLine } from "react-icons/ri";

type ICompanyMenuForm = {
  menu: {
    title: string;
    description: string;
    tags: string[];
    price: { label: string; value: number }[];
  }[];
};

export default function CompanyMenuForm() {
  const { currentCompany } = useAuth();
  const { setCompanyInfoPreview, companyInfoPreview } = useCompanyPreview();

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ICompanyMenuForm>({
    defaultValues: {
      menu: [
        {
          title: "Frango",
          description: "Acompanha arroz, feijão e batata frita",
          tags: ["Mais vendido", "Novidade"],
          price: [{ label: "1/2 Dose", value: 12.9 }],
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "menu",
  });

  const onSubmit = (data: any) => {};

  const handleAppend = () => {
    append(
      {
        title: "",
        description: "",
        tags: [],
        price: [{ label: "", value: 0 }],
      },
      { focusName: `menu.${fields.length}.title` }
    );
  };

  const onPreview = async () => {
    // const values = getValues();
    // setCompanyInfoPreview({
    //   aditicional: values.aditionalInfo,
    // });
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
      {fields.map((item, index) => (
        <Fieldset key={item.id} className="flex flex-col gap-2">
          <Field>
            <Input
              type="text"
              placeholder="Título do item"
              {...register(`menu.${index}.title`)}
              className={classNames(
                "block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
                "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
              )}
            />
            {!!errors.menu?.[index]?.title && (
              <p role="alert" className="text-red-700 text-xs mt-1">
                {errors.menu[index].title?.message}
              </p>
            )}
          </Field>
          <Field>
            <Textarea
              placeholder="Informações sobre o item"
              {...register(`menu.${index}.description`)}
              className={classNames(
                "block w-full rounded-lg border border-gray-300 py-2 px-3 text-sm/6 resize-none",
                "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
              )}
              rows={2}
            />
          </Field>
          {index === fields.length - 1 && index !== 2 && (
            <div>
              <Button
                type="button"
                onClick={handleAppend}
                className="flex items-center gap-2 mt-1 text-sm/6 font-semibold text-teal-600 focus:outline-none data-[hover]:border-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <RiAddCircleLine className="size-5" />
                <span>Adicionar mais</span>
              </Button>
            </div>
          )}
        </Fieldset>
      ))}
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
