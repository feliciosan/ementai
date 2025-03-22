"use client";

import CompanyService from "@/services/company";
import { TCompanyInfo, TCompanyResponse } from "@/services/company.types";
import UploadService from "@/services/upload";
import { useAuth } from "@/hooks/use-auth.hook";
import { replaceSpecialCharacters } from "@/utils/validator";
import {
  Button,
  Checkbox,
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
import { Controller, useForm } from "react-hook-form";
import { IoImageOutline } from "react-icons/io5";
import { RiCheckLine } from "react-icons/ri";
import ImageStorage from "../ImageStorage";

type ICompanyInfoForm = {
  logo?: string;
  backgroundImage?: string;
  name: string;
  slogan: string;
  primaryColor: string;
  isDark: boolean;
};

export default function CompanyInfoForm() {
  const { currentCompany } = useAuth();
  const queryClient = useQueryClient();
  const inputPrimaryColorRef = useRef<HTMLElement | null>(null);
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
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ICompanyInfoForm>({
    defaultValues: {
      name: currentCompany?.info?.name || "",
      slogan: currentCompany?.info?.slogan || "",
      primaryColor: currentCompany?.info?.theme?.primaryColor || "#000000",
      isDark: currentCompany?.info?.theme?.isDark || false,
    },
  });

  const primaryColorField = register("primaryColor");

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
    const companyInfo: Partial<TCompanyInfo> = {
      name: data.name,
      slogan: data.slogan,
      theme: {
        primaryColor: data.primaryColor,
        isDark: data.isDark,
      },
    };

    if (imagesPreview.logo) {
      companyInfo.logo = await uploadFile(imagesPreview.logo);
    }

    if (imagesPreview.backgroundImage) {
      companyInfo.backgroundImage = await uploadFile(
        imagesPreview.backgroundImage
      );
    }

    await setCompanyInfo({
      slug: replaceSpecialCharacters(data.name),
      info: companyInfo,
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
                {...register("logo")}
                onChange={(event) => handleChangeImage(event, "logo")}
                ref={inputLogoRef}
                hidden
              />
              <div className="h-16 w-16 flex items-center justify-center rounded-md overflow-hidden">
                {!!imagesPreview.logo ? (
                  <Image
                    src={URL.createObjectURL(imagesPreview.logo)}
                    alt="Logo"
                    className="object-cover w-full h-full"
                    width={64}
                    height={64}
                  />
                ) : !!currentCompany?.info?.logo ? (
                  <ImageStorage
                    path={currentCompany?.info?.logo || ""}
                    options={{
                      alt: "Logo",
                      width: 64,
                      height: 64,
                      className: "object-cover w-full h-full",
                    }}
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
                {!!imagesPreview.backgroundImage ? (
                  <Image
                    src={URL.createObjectURL(imagesPreview.backgroundImage)}
                    alt="Logo"
                    className="object-cover w-full h-full"
                    width={64}
                    height={64}
                  />
                ) : currentCompany?.info?.backgroundImage ? (
                  <ImageStorage
                    path={currentCompany?.info?.backgroundImage || ""}
                    options={{
                      alt: "Background Image",
                      width: 64,
                      height: 64,
                      className: "object-cover w-full h-full",
                    }}
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
          <div className="flex items-center justify-between">
            <Label className="text-sm/6 font-medium">Nome</Label>
            <Description className="text-xs font-light">
              www.ementai.com/menu/{replaceSpecialCharacters(watch("name"))}
            </Description>
          </div>
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
            <Label className="text-sm/6 font-medium" htmlFor="primary-color">
              Cor principal da sua marca:
            </Label>
            <div
              className={classNames(
                "h-8 rounded-md overflow-hidden cursor-pointer w-full flex-1"
              )}
              style={{ backgroundColor: watch("primaryColor") }}
              onClick={() => inputPrimaryColorRef.current?.click()}
            >
              <Input
                type="color"
                id="primary-color"
                {...primaryColorField}
                ref={(elementRef) => {
                  primaryColorField.ref(elementRef);
                  inputPrimaryColorRef.current = elementRef;
                }}
                className="h-8 w-8 invisible"
              />
            </div>
            {!!errors.primaryColor && (
              <p role="alert" className="text-red-700 text-xs mt-1">
                {errors.primaryColor.message}
              </p>
            )}
          </Field>
          <Field className="flex-1 flex items-center gap-2 mt-2">
            <Label className="text-sm/6 cursor-pointer">
              Aplicar tema escuro?
            </Label>
            <Controller
              control={control}
              name="isDark"
              render={({ field }) => (
                <div className="flex items-center gap-1">
                  <Checkbox
                    {...field}
                    checked={field.value}
                    className="group flex items-center justify-center size-5 border border-gray-200 cursor-pointer rounded-md bg-white ring-0 ring-white ring-inset data-[checked]:bg-teal-600 data-[checked]:border-teal-600"
                  >
                    <RiCheckLine className="hidden size-4 fill-white group-data-[checked]:block" />
                  </Checkbox>
                </div>
              )}
            />
          </Field>
        </Fieldset>
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
    </div>
  );
}
