"use client";

import CompanyService from "@/app/actions/company";
import { TCompanyResponse } from "@/app/actions/company.types";
import UploadService from "@/app/actions/upload";
import { useAuth } from "@/hooks/use-auth.hook";
import { useCompanyPreview } from "@/hooks/use-company-preview";
import { replaceSpecialCharacters } from "@/utils/validator";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
} from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoImageOutline } from "react-icons/io5";

type ICompanyInfoForm = {
  logo: string;
  backgroundImage: string;
  name: string;
  slogan: string;
  primaryColor: string;
  isDark: boolean;
};

export default function CompanyInfoForm() {
  const { currentCompany } = useAuth();
  const { setCompanyInfoPreview, companyInfoPreview } = useCompanyPreview();
  const queryClient = useQueryClient();
  const inputLogoRef = useRef<HTMLInputElement | null>(null);
  const inputBackgroundImageRef = useRef<HTMLInputElement | null>(null);
  const [imagesPreview, setImagePreview] = useState<{
    logo: File | null;
    backgroundImage: File | null;
  }>({
    logo: null,
    backgroundImage: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ICompanyInfoForm>({
    defaultValues: {
      logo: currentCompany?.info?.logo || "",
      backgroundImage: currentCompany?.info?.backgroundImage || "",
      name: currentCompany?.info?.name || "",
      slogan: currentCompany?.info?.slogan || "",
      primaryColor: currentCompany?.info?.theme?.primaryColor || "#000000",
      isDark: currentCompany?.info?.theme?.isDark || false,
    },
  });

  const watchLogo = watch("logo");
  const watchBackgroundImage = watch("backgroundImage");

  const { mutateAsync: uploadFile } = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: (file: File) =>
      UploadService.uploadFile(file, "images", { width: 1024, height: 1024 }),
  });

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

  const handleChangeImage = async (
    event: ChangeEvent<HTMLInputElement>,
    type: "logo" | "backgroundImage"
  ) => {
    const imageFile = event.target.files?.[0];

    if (imageFile) {
      setImagePreview((prev) => ({
        ...prev,
        [type]: imageFile,
      }));

      setValue(type, URL.createObjectURL(imageFile), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const onSubmit = async (data: ICompanyInfoForm) => {
    let { logo, backgroundImage } = data;

    if (imagesPreview.logo) {
      logo = await uploadFile(imagesPreview.logo);
    }

    if (imagesPreview.backgroundImage) {
      backgroundImage = await uploadFile(imagesPreview.backgroundImage);
    }

    await setCompanyInfo({
      slug: replaceSpecialCharacters(data.name),
      info: {
        name: data.name,
        logo: logo,
        backgroundImage: backgroundImage,
        slogan: data.slogan,
        theme: {
          primaryColor: data.primaryColor,
          isDark: data.isDark,
        },
      },
    });
  };

  const onPreview = async () => {
    const values = getValues();

    setCompanyInfoPreview({
      logo: values.logo,
      backgroundImage: values.backgroundImage,
      name: values.name,
      slogan: values.slogan,
      theme: {
        primaryColor: values.primaryColor,
        isDark: values.isDark,
      },
    });
  };

  const onResetChanges = () => {
    reset();
    setCompanyInfoPreview(null);
    setImagePreview({
      logo: null,
      backgroundImage: null,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4 relative"
      >
        <Fieldset className={"flex gap-4 flex-col md:flex-row"}>
          <Field>
            <Label className="text-sm/6 font-medium">Logotipo</Label>
            <div
              onClick={() => {
                inputLogoRef.current?.click();
              }}
              className={classNames(
                "mt-1 w-full rounded-lg border border-gray-300 p-2 gap-2",
                "flex flex-1 items-center justify-center cursor-pointer"
              )}
            >
              <Input
                type="file"
                {...register("logo", { required: "O logotipo é obrigatório." })}
                onChange={(event) => handleChangeImage(event, "logo")}
                ref={inputLogoRef}
                hidden
              />
              <div className="h-16 w-16 flex items-center justify-center rounded-md overflow-hidden">
                {!!watchLogo ? (
                  <Image
                    src={watchLogo}
                    alt="Logo"
                    className="object-cover w-full h-full"
                    width={64}
                    height={64}
                  />
                ) : (
                  <IoImageOutline className="size-14" />
                )}
              </div>
              <Description className="flex-1 text-xs font-light">
                Recomendamos que use uma imagem quadrada.
              </Description>
            </div>
            {!!errors.logo && (
              <p role="alert" className="text-red-700 text-xs mt-1">
                {errors.logo.message}
              </p>
            )}
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium">Imagem de fundo</Label>
            <div
              onClick={() => {
                inputBackgroundImageRef.current?.click();
              }}
              className={classNames(
                "mt-1 w-full rounded-lg border border-gray-300 p-2 gap-2",
                "flex flex-1 items-center justify-center cursor-pointer"
              )}
            >
              <Input
                type="file"
                {...register("backgroundImage")}
                onChange={(event) =>
                  handleChangeImage(event, "backgroundImage")
                }
                ref={inputBackgroundImageRef}
                hidden
              />
              <div className="h-16 w-16 flex items-center justify-center rounded-md overflow-hidden">
                {!!watchBackgroundImage ? (
                  <Image
                    src={watchBackgroundImage}
                    alt="Logo"
                    className="object-cover w-full h-full"
                    width={64}
                    height={64}
                  />
                ) : (
                  <IoImageOutline className="size-14" />
                )}
              </div>
              <Description className="flex-1 text-xs font-light">
                Uma imagem que represente o seu negócio.
              </Description>
            </div>
            {!!errors.backgroundImage && (
              <p role="alert" className="text-red-700 text-xs mt-1">
                {errors.backgroundImage.message}
              </p>
            )}
          </Field>
        </Fieldset>
        <Field>
          <Label className="text-sm/6 font-medium">Nome</Label>
          <Input
            type="text"
            placeholder="O nome do seu negócio é o que os clientes verão primeiro."
            {...register("name", {
              required: "O nome do negócio é obrigatório.",
            })}
            className={classNames(
              "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
              "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
            )}
          />
          {!!errors.name && (
            <p role="alert" className="text-red-700 text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium">Slogan (opcional)</Label>
          <Input
            type="text"
            placeholder="Um slogan é uma frase curta que descreve o seu negócio."
            {...register("slogan")}
            className={classNames(
              "mt-1 block w-full rounded-lg border border-gray-300 h-10 px-3 text-sm/6",
              "focus:outline-none focus:border-gray-500 data-[focus]:outline-1 data-[focus]:outline-offset-0 data-[focus]:outline-gray-500"
            )}
          />
        </Field>
        <Fieldset>
          <Field className="flex-1 flex items-center gap-2">
            <Label className="text-sm/6 font-medium">
              Cor principal da sua marca:
            </Label>
            <Input
              type="color"
              {...register("primaryColor")}
              className="h-8 w-full flex-1 cursor-pointer"
            />
            {!!errors.primaryColor && (
              <p role="alert" className="text-red-700 text-xs mt-1">
                {errors.primaryColor.message}
              </p>
            )}
          </Field>
          <Field className="flex-1 flex items-center gap-2">
            <Label className="text-sm/6 font-medium">Tema escuro:</Label>
            <div className="p-1 flex-1">
              <Input
                type="checkbox"
                {...register("isDark")}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
          </Field>
        </Fieldset>
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
    </div>
  );
}
