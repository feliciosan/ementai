"use client";

import CompanyService from "@/services/company";
import { TCompanyInfo, TCompanyResponse } from "@/services/company.types";
import UploadService from "@/services/upload";
import { useAuth } from "@/hooks/use-auth.hook";
import { replaceSpecialCharacters } from "@/utils/validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ImageStorage from "../ImageStorage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Palette,
  Trash2,
  Image as ImageIcon,
  Pencil,
  SquarePen,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

  const form = useForm<ICompanyInfoForm>({
    defaultValues: {
      name: currentCompany?.info?.name || "",
      logo: currentCompany?.info?.logo || "",
      backgroundImage: currentCompany?.info?.backgroundImage || "",
      slogan: currentCompany?.info?.slogan || "",
      primaryColor: currentCompany?.info?.theme?.primaryColor || "#000000",
      isDark: currentCompany?.info?.theme?.isDark || false,
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  const logoField = watch("logo");
  const backgroundImageField = watch("backgroundImage");

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
  });

  const handleChangeImage = async (
    event: ChangeEvent<HTMLInputElement>,
    type: "logo" | "backgroundImage"
  ) => {
    const imageFile = event.target.files?.[0];

    if (imageFile) {
      setImagePreview((prev) => {
        const newImagePreview = { ...prev };
        newImagePreview[type] = imageFile;
        return newImagePreview;
      });

      setValue(type, URL.createObjectURL(imageFile), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleDeleteImage = async (type: "logo" | "backgroundImage") => {
    setImagePreview((prev) => {
      return {
        ...prev,
        [type]: null,
      };
    });

    setValue(type, "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (type === "logo" && inputLogoRef.current) {
      inputLogoRef.current.value = "";
    } else if (type === "backgroundImage" && inputBackgroundImageRef.current) {
      inputBackgroundImageRef.current.value = "";
    }
  };

  const onSubmit = async (data: ICompanyInfoForm) => {
    const companyInfo: Partial<TCompanyInfo> = {
      name: data.name,
      slogan: data.slogan,
      logo: data.logo,
      backgroundImage: data.backgroundImage,
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
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 relative"
      >
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex flex-1 p-1 border border-neutral-200 rounded-lg">
            <div className="flex items-center justify-center">
              <Input
                type="file"
                hidden
                onChange={(event) => handleChangeImage(event, "logo")}
                ref={(elementRef) => {
                  inputLogoRef.current = elementRef;
                }}
              />
              <div className="flex items-center justify-center rounded-md overflow-hidden border border-dashed border-neutral-200 hover:bg-neutral-100 bg-white h-24 w-24 relative">
                {(imagesPreview.logo || logoField) && (
                  <div className="absolute flex gap-2 top-1 left-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" size="icon">
                          <SquarePen />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-56"
                        side="right"
                        align="end"
                      >
                        <DropdownMenuItem
                          onClick={() => inputLogoRef.current?.click()}
                        >
                          <Pencil />
                          <span>Alterar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteImage("logo")}
                        >
                          <Trash2 />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {!!imagesPreview.logo ? (
                  <Image
                    src={URL.createObjectURL(imagesPreview.logo)}
                    alt="Logo"
                    width={96}
                    height={96}
                    className="object-cover aspect-square"
                  />
                ) : logoField ? (
                  <ImageStorage
                    path={logoField}
                    options={{
                      alt: "Logo",
                      width: 96,
                      height: 96,
                      className: "object-cover aspect-square",
                    }}
                  />
                ) : (
                  <div
                    onClick={() => inputLogoRef.current?.click()}
                    className="aspect-square h-24 w-24 flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <ImageIcon className="size-8" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center p-2 gap-1">
              <p className="text-xs font-semibold">Logotipo:</p>
              <p className="text-xs font-light">
                O logotipo é a identidade visual do seu negócio.
              </p>
            </div>
          </div>
          <div className="flex flex-1 p-1 border border-neutral-200 rounded-lg">
            <div className="flex items-center justify-center">
              <Input
                type="file"
                hidden
                onChange={(event) =>
                  handleChangeImage(event, "backgroundImage")
                }
                ref={(elementRef) => {
                  inputBackgroundImageRef.current = elementRef;
                }}
              />
              <div className="flex items-center justify-center rounded-md overflow-hidden border border-dashed border-neutral-200 hover:bg-neutral-100 bg-white cursor-pointer h-24 w-24 relative">
                {(imagesPreview.backgroundImage || backgroundImageField) && (
                  <div className="absolute flex gap-2 top-1 left-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" size="icon">
                          <SquarePen />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-56"
                        side="right"
                        align="end"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            inputBackgroundImageRef.current?.click()
                          }
                        >
                          <Pencil />
                          <span>Alterar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteImage("backgroundImage")}
                        >
                          <Trash2 />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {!!imagesPreview.backgroundImage ? (
                  <Image
                    src={URL.createObjectURL(imagesPreview.backgroundImage)}
                    alt="Background Image"
                    width={96}
                    height={96}
                    className="object-cover aspect-square"
                  />
                ) : !!backgroundImageField ? (
                  <ImageStorage
                    path={backgroundImageField}
                    options={{
                      alt: "Background Image",
                      width: 96,
                      height: 96,
                      className: "object-cover aspect-square",
                    }}
                  />
                ) : (
                  <div
                    onClick={() => inputBackgroundImageRef.current?.click()}
                    className="aspect-square h-24 w-24 flex flex-col items-center justify-center gap-1"
                  >
                    <ImageIcon className="size-8" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center p-2 gap-1">
              <p className="text-xs font-semibold">Imagem de fundo:</p>
              <p className="text-xs font-light">
                Imagem principal que será exibida no cardápio.
              </p>
            </div>
          </div>
        </div>
        <FormField
          control={control}
          name="name"
          rules={{ required: "O nome do negócio é obrigatório." }}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 justify-between">
                <FormLabel>Nome:</FormLabel>
                <FormDescription className="text-xs font-light leading-2">
                  www.ementai.com/menu/{replaceSpecialCharacters(watch("name"))}
                </FormDescription>
              </div>
              <FormControl>
                <Input
                  placeholder="O nome do seu negócio é o que os clientes verão primeiro."
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="slogan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slogan:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Um slogan é uma frase curta que descreve o seu negócio."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="isDark"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>Aplicar tema escuro?</FormLabel>
              <FormControl>
                <Checkbox
                  {...rest}
                  checked={value}
                  onCheckedChange={onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="primaryColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor principal da sua marca:</FormLabel>
              <FormControl className="relative">
                <div className="flex">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => inputPrimaryColorRef.current?.click()}
                  >
                    <span className="h-9 w-10 bg-white text-sm border border-neutral-300 rounded-l-md flex items-center justify-center">
                      <Palette />
                    </span>
                    <div
                      style={{ backgroundColor: field.value }}
                      className="h-9 w-10 rounded-r-md overflow-hidden flex items-center"
                    >
                      <Input
                        type="color"
                        {...field}
                        className="absolute top-0 h-9 w-full invisible"
                        ref={(elementRef) => {
                          inputPrimaryColorRef.current = elementRef;
                        }}
                      />
                    </div>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
