"use client";

import MenuService from "@/services/menu";
import MenuSortableProduct from "./MenuSortableProduct";
import UploadService from "@/services/upload";
import {
  TMenuCategoryItem,
  TMenuCategoryItemPayload,
} from "@/services/menu.types";
import { useAuth } from "@/hooks/use-auth.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { toast } from "sonner";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";

export type TMenuProductForm = {
  menu: TMenuCategoryItemPayload[];
};

const fieldsLimit = 30;

export default function MenuProductForm({
  categoryId,
  items,
}: {
  categoryId: string;
  items: TMenuCategoryItem[];
}) {
  const queryClient = useQueryClient();
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const [allowSaveChanges, setAllowSaveChanges] = useState<boolean>(false);
  const { currentCompany } = useAuth();

  const { mutateAsync: uploadFile } = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: (file: File) =>
      UploadService.uploadFile(file, "images", { width: 1024, height: 1024 }),
  });

  const { mutateAsync: setMenuItems } = useMutation({
    mutationKey: ["create-menu-items"],
    mutationFn: (data: TMenuCategoryItemPayload[]) =>
      MenuService.setMenuItems(currentCompany?.id || "", categoryId, data),
    onSuccess: async () => {
      toast.success("Itens salvos com sucesso!");
      setAllowSaveChanges(false);
      await queryClient.invalidateQueries({
        queryKey: ["get-category-items", currentCompany?.id, categoryId],
      });
    },
  });

  const { mutateAsync: deleteItems } = useMutation({
    mutationKey: ["delete-menu-items"],
    mutationFn: (data: string[]) =>
      MenuService.deleteMenuItems(currentCompany?.id || "", categoryId, data),
  });

  const form = useForm<TMenuProductForm>({
    defaultValues: {
      menu: items.length
        ? items
        : [
            {
              title: "",
              description: "",
              price: [
                { label: "", value: "" },
                { label: "", value: "" },
              ],
              new: false,
              bestSeller: false,
              imageUrls: [],
            },
          ],
    },
  });

  const {
    control,
    formState: { isSubmitting, isDirty },
  } = form;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "menu",
    keyName: "fieldId",
  });

  const handleDranEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const activeIndex = fields.findIndex(
      (field) => field.fieldId === active.id
    );

    const overIndex = fields.findIndex((field) => field.fieldId === over.id);

    move(activeIndex, overIndex);
    setAllowSaveChanges(true);
  };

  const onSubmit = async (values: TMenuProductForm) => {
    const currentItemsIds = values.menu
      .filter((item) => item.id)
      .map((item) => item.id);

    const itemsToDelete = items
      .filter((item) => !currentItemsIds.includes(item.id))
      .map((item) => item.id);

    const valuesPromises = values.menu.map(async (item, index) => {
      if (imagesToUpload[index]) {
        const imageUrl = await uploadFile(imagesToUpload[index]);
        return {
          ...item,
          imageUrls: [imageUrl],
        };
      }

      return item;
    });

    const menuValues = await Promise.all(valuesPromises);
    const promises = [setMenuItems(menuValues)];

    if (itemsToDelete.length) {
      promises.push(deleteItems(itemsToDelete));
    }

    await Promise.all(promises);
  };

  const handleAppend = () => {
    append(
      {
        title: "",
        description: "",
        price: [
          { label: "", value: "" },
          { label: "", value: "" },
        ],
        new: false,
        bestSeller: false,
        imageUrls: [],
      },
      { focusIndex: fields.length }
    );
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleChangeImage = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const imageFile = event.target.files?.[0];

    if (imageFile) {
      setImagesToUpload((prev) => {
        const newImageFiles = [...prev];
        newImageFiles[index] = imageFile;
        return newImageFiles;
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col relative gap-2 w-full"
      >
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDranEnd}
        >
          <SortableContext items={fields.map((item) => item.fieldId)}>
            {fields.map((item, index) => (
              <MenuSortableProduct
                key={item.fieldId}
                item={item}
                index={index}
                control={control}
                imagesToUpload={imagesToUpload}
                handleChangeImage={handleChangeImage}
                handleDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
        {fields.length < fieldsLimit && (
          <div className="flex justify-center rounded-lg p-6 border border-dashed border-gray-200">
            <Button type="button" variant="link" onClick={handleAppend}>
              <Plus />
              {fields.length === 0
                ? "Adicionar meu primeiro item"
                : "Adicionar mais"}
            </Button>
          </div>
        )}
        <div
          className={cn(
            "flex justify-end gap-2 sticky bottom-2 bg-neutral-900 p-4 rounded-lg shadow-md",
            {
              hidden: !allowSaveChanges && !isDirty,
            }
          )}
        >
          <Button type="submit" variant="outline" disabled={isSubmitting}>
            {!items.length ? "Adicionar items" : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
