"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { CSSProperties, useRef } from "react";
import {
  GripVertical,
  Trash2,
  Image as ImageIcon,
  Pencil,
  SquarePen,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { formatMoneyInput } from "@/utils/validator";
import { Input } from "../ui/input";
import ImageStorage from "../ImageStorage";
import Image from "next/image";
import { Control, FieldArrayWithId } from "react-hook-form";
import { TMenuProductForm } from ".";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function MenuProductFormSortableItem({
  index,
  item,
  control,
  imagesToUpload,
  handleChangeImage,
  handleDelete,
  handleDeleteImage,
}: {
  index: number;
  item: FieldArrayWithId<TMenuProductForm, "menu", "fieldId">;
  control: Control<TMenuProductForm>;
  imagesToUpload: File[];
  handleChangeImage: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleDelete: (index: number) => void;
  handleDeleteImage: (index: number) => void;
}) {
  const imageUrlsInputRef = useRef<(HTMLElement | null)[]>([]);
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id: item.fieldId });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white border border-neutral-200 rounded-lg flex flex-col gap-2 relative overflow-hidden",
        {
          "z-10 bg-opacity-0 backdrop-blur-lg": active?.id === item.fieldId,
        }
      )}
    >
      <div className="flex items-center justify-between gap-2 bg-neutral-100 p-2">
        <div className="flex flex-1 items-center gap-2">
          <div {...attributes} {...listeners}>
            <Tooltip>
              <TooltipTrigger asChild>
                <GripVertical size={20} className="cursor-pointer mx-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Alterar posição</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center justify-between flex-1">
            <div className="flex sm:items-center gap-4 sm:flex-row flex-col">
              <FormField
                control={control}
                name={`menu.${index}.new`}
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        {...rest}
                        checked={value}
                        onCheckedChange={onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-none">Novidade</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`menu.${index}.bestSeller`}
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        {...rest}
                        checked={value}
                        onCheckedChange={onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-none">Mais vendido</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FormField
                control={control}
                name={`menu.${index}.unavailable`}
                defaultValue={false}
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch
                        id="item-unavailable"
                        {...rest}
                        checked={value}
                        onCheckedChange={onChange}
                      />
                    </FormControl>
                    <Label htmlFor="item-unavailable">Indisponível</Label>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" size="icon" variant="ghost">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja excluir este item?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não poderá ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Não</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(index)}>
                Sim
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="px-2">
        <FormField
          control={control}
          name={`menu.${index}.title`}
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input type="text" placeholder="Título do produto" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-2 px-2 pb-2 sm:flex-row flex-col">
        <div className="flex-1 flex flex-col gap-2">
          <FormField
            control={control}
            name={`menu.${index}.description`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Informações como ingredientes, acompanhamentos e etc."
                    className="h-16 resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2 sm:flex-row flex-col">
            <div className="flex flex-1 gap-2">
              <FormField
                control={control}
                name={`menu.${index}.price.0.label`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 1 pessoa/unidade"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`menu.${index}.price.0.value`}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0,00"
                        {...field}
                        onChange={(event) => {
                          formatMoneyInput(event);
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-1 gap-2">
              <FormField
                control={control}
                name={`menu.${index}.price.1.label`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: 2 pessoas/unidades"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`menu.${index}.price.1.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="0,00"
                        type="text"
                        {...field}
                        onChange={(event) => {
                          formatMoneyInput(event);
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center cursor-pointer rounded-lg border border-dashed border-neutral-200 w-27">
          <Input
            type="file"
            hidden
            onChange={(event) => handleChangeImage(event, index)}
            ref={(elementRef) => {
              imageUrlsInputRef.current[index] = elementRef;
            }}
          />
          <div className="flex items-center justify-center rounded-md overflow-hidden relative">
            {(!!imagesToUpload[index] || !!item.imageUrls?.length) && (
              <div className="absolute top-1 left-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" size="icon">
                      <SquarePen />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" side="left" align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        imageUrlsInputRef.current?.[index]?.click()
                      }
                    >
                      <Pencil />
                      <span>Alterar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteImage(index)}>
                      <Trash2 />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            {!!imagesToUpload[index] ? (
              <Image
                src={URL.createObjectURL(imagesToUpload[index])}
                alt="Imagem do produto"
                width={96}
                height={96}
                className="object-cover h-24 w-24"
              />
            ) : !!item.imageUrls?.length ? (
              <ImageStorage
                path={item.imageUrls?.[0] || ""}
                options={{
                  alt: "Imagem do produto",
                  width: 96,
                  height: 96,
                  className: "object-cover h-24 w-24",
                }}
              />
            ) : (
              <div
                onClick={() => imageUrlsInputRef.current?.[index]?.click()}
                className="h-24 w-24 flex flex-col items-center justify-center gap-1"
              >
                <ImageIcon className="size-8" />
                <span className="text-xs">Imagem</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
