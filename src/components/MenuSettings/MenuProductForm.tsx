"use client";

import MenuService from "@/services/menu";
import {
  TMenuCategoryItem,
  TMenuCategoryItemPayload,
} from "@/services/menu.types";
import { useAuth } from "@/hooks/use-auth.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import UploadService from "@/services/upload";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { toast } from "sonner";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import MenuSortableProduct from "./MenuSortableProduct";

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
  // const imageUrlsInputRef = useRef<(HTMLElement | null)[]>([]);
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
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
    setValue,
    formState: { isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menu",
    keyName: "fieldId",
  });

  const handleDranEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const activeIndex = fields.findIndex((field) => field.id === active.id);

    const overIndex = fields.findIndex((field) => field.id === over.id);

    // arrayMove(fields, activeIndex, overIndex);
    setValue("menu", arrayMove(fields, activeIndex, overIndex));
    // move(activeIndex, overIndex);
    // setAllowSaveChanges(true);
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
        className="flex flex-col relative gap-6 w-full"
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
              // <div key={item.fieldId}>
              //   <div className="bg-white border border-neutral-200 p-2 rounded-lg flex flex-col gap-2">
              //     <div className="flex items-center justify-between gap-2">
              //       <div className="flex items-center gap-2">
              //         <Tooltip>
              //           <TooltipTrigger asChild>
              //             <GripVertical
              //               size={20}
              //               className="cursor-pointer mx-1"
              //             />
              //           </TooltipTrigger>
              //           <TooltipContent>
              //             <p>Alterar posição</p>
              //           </TooltipContent>
              //         </Tooltip>
              //         <div className="flex items-center gap-4 justify-end">
              //           <FormField
              //             control={form.control}
              //             name={`menu.${index}.new`}
              //             render={({ field: { onChange, value, ...rest } }) => (
              //               <FormItem className="flex items-center gap-2">
              //                 <FormControl>
              //                   <Checkbox
              //                     {...rest}
              //                     checked={value}
              //                     onCheckedChange={onChange}
              //                   />
              //                 </FormControl>
              //                 <FormLabel className="leading-none">
              //                   Novidade
              //                 </FormLabel>
              //               </FormItem>
              //             )}
              //           />
              //           <FormField
              //             control={form.control}
              //             name={`menu.${index}.bestSeller`}
              //             render={({ field: { onChange, value, ...rest } }) => (
              //               <FormItem className="flex items-center gap-2">
              //                 <FormControl>
              //                   <Checkbox
              //                     {...rest}
              //                     checked={value}
              //                     onCheckedChange={onChange}
              //                   />
              //                 </FormControl>
              //                 <FormLabel className="leading-none">
              //                   Mais vendido
              //                 </FormLabel>
              //               </FormItem>
              //             )}
              //           />
              //         </div>
              //       </div>
              //       <AlertDialog>
              //         <AlertDialogTrigger asChild>
              //           <Button type="button" size="icon" variant="secondary">
              //             <Trash2 />
              //           </Button>
              //         </AlertDialogTrigger>
              //         <AlertDialogContent>
              //           <AlertDialogHeader>
              //             <AlertDialogTitle>
              //               Tem certeza que deseja excluir este item?
              //             </AlertDialogTitle>
              //             <AlertDialogDescription>
              //               Esta ação não poderá ser desfeita.
              //             </AlertDialogDescription>
              //           </AlertDialogHeader>
              //           <AlertDialogFooter>
              //             <AlertDialogCancel>Não</AlertDialogCancel>
              //             <AlertDialogAction
              //               onClick={() => handleRemove(index)}
              //             >
              //               Sim
              //             </AlertDialogAction>
              //           </AlertDialogFooter>
              //         </AlertDialogContent>
              //       </AlertDialog>
              //     </div>
              //     <div>
              //       <FormField
              //         control={control}
              //         name={`menu.${index}.title`}
              //         rules={{ required: true }}
              //         render={({ field }) => (
              //           <FormItem className="flex-1">
              //             <FormControl>
              //               <Input
              //                 type="text"
              //                 placeholder="Título do produto"
              //                 {...field}
              //               />
              //             </FormControl>
              //           </FormItem>
              //         )}
              //       />
              //     </div>
              //     <div className="flex gap-2">
              //       <div className="flex-1 flex flex-col gap-2">
              //         <FormField
              //           control={control}
              //           name={`menu.${index}.description`}
              //           render={({ field }) => (
              //             <FormItem className="flex-1">
              //               <FormControl>
              //                 <Textarea
              //                   placeholder="Informações como ingredientes, acompanhamentos e etc."
              //                   className="h-16 resize-none"
              //                   {...field}
              //                 />
              //               </FormControl>
              //             </FormItem>
              //           )}
              //         />
              //         <div className="flex gap-2">
              //           <div className="flex flex-1 gap-2">
              //             <FormField
              //               control={control}
              //               name={`menu.${index}.price.0.label`}
              //               render={({ field }) => (
              //                 <FormItem className="flex-1">
              //                   <FormControl>
              //                     <Input
              //                       type="text"
              //                       placeholder="Ex: 1 pessoa/unidade"
              //                       {...field}
              //                     />
              //                   </FormControl>
              //                 </FormItem>
              //               )}
              //             />
              //             <FormField
              //               control={control}
              //               name={`menu.${index}.price.0.value`}
              //               rules={{
              //                 required: true,
              //               }}
              //               render={({ field }) => (
              //                 <FormItem className="flex-1">
              //                   <FormControl>
              //                     <Input
              //                       type="text"
              //                       placeholder="0,00"
              //                       {...field}
              //                       onChange={(event) => {
              //                         formatMoneyInput(event);
              //                         field.onChange(event);
              //                       }}
              //                     />
              //                   </FormControl>
              //                 </FormItem>
              //               )}
              //             />
              //           </div>
              //           <div className="flex flex-1 gap-2">
              //             <FormField
              //               control={control}
              //               name={`menu.${index}.price.1.label`}
              //               render={({ field }) => (
              //                 <FormItem className="flex-1">
              //                   <FormControl>
              //                     <Input
              //                       type="text"
              //                       placeholder="Ex: 2 pessoas/unidades"
              //                       {...field}
              //                     />
              //                   </FormControl>
              //                 </FormItem>
              //               )}
              //             />
              //             <FormField
              //               control={control}
              //               name={`menu.${index}.price.1.value`}
              //               render={({ field }) => (
              //                 <FormItem className="flex-1">
              //                   <FormControl>
              //                     <Input
              //                       placeholder="0,00"
              //                       type="text"
              //                       {...field}
              //                       onChange={(event) => {
              //                         formatMoneyInput(event);
              //                         field.onChange(event);
              //                       }}
              //                     />
              //                   </FormControl>
              //                 </FormItem>
              //               )}
              //             />
              //           </div>
              //         </div>
              //       </div>
              //       <div
              //         onClick={() =>
              //           imageUrlsInputRef.current?.[index]?.click()
              //         }
              //         className="flex items-center justify-center cursor-pointer rounded-lg border border-dashed border-neutral-200 w-27"
              //       >
              //         <Input
              //           type="file"
              //           hidden
              //           onChange={(event) => handleChangeImage(event, index)}
              //           ref={(elementRef) => {
              //             imageUrlsInputRef.current[index] = elementRef;
              //           }}
              //         />
              //         <div className="h-24 w-24 flex items-center justify-center rounded-md overflow-hidden">
              //           {!!imagesToUpload[index] ? (
              //             <Image
              //               src={URL.createObjectURL(imagesToUpload[index])}
              //               alt="Imagem do produto"
              //               width={96}
              //               height={96}
              //               className="object-cover w-full h-full"
              //             />
              //           ) : !!item.imageUrls?.length ? (
              //             <ImageStorage
              //               path={item.imageUrls?.[0] || ""}
              //               options={{
              //                 alt: "Imagem do produto",
              //                 width: 96,
              //                 height: 96,
              //                 className: "object-cover w-full h-full",
              //               }}
              //             />
              //           ) : (
              //             <ImageIcon className="size-8" />
              //           )}
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>
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
        <div className="flex justify-end gap-2 sticky bottom-2 bg-neutral-900 p-4 rounded-lg shadow-md">
          <Button type="submit" variant="outline" disabled={isSubmitting}>
            {!items.length ? "Adicionar items" : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
