"use client";

import MenuService from "@/services/menu";
import { useAuth } from "@/hooks/use-auth.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type TMenuCategoryForm = { id?: string; name: string };

export default function MenuCategoryForm({
  category,
  onSubmitted,
}: {
  category?: TMenuCategoryForm;
  onSubmitted?: () => void;
}) {
  const isEditing = !!category?.id;
  const queryClient = useQueryClient();
  const { currentCompany } = useAuth();

  const { mutateAsync: createCategory } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: (data: TMenuCategoryForm) =>
      MenuService.createMenuCategory(currentCompany?.id || "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-menu", currentCompany?.id],
      });
    },
  });

  const { mutateAsync: updateCategory } = useMutation({
    mutationKey: ["update-category"],
    mutationFn: (data: TMenuCategoryForm) =>
      MenuService.updateMenuCategory(
        {
          companyId: currentCompany?.id || "",
          categoryId: category?.id || "",
        },
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-menu", currentCompany?.id],
      });
    },
  });

  const form = useForm<TMenuCategoryForm>({
    defaultValues: {
      name: category?.name || "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TMenuCategoryForm) => {
    if (isEditing) {
      await updateCategory(data);
    } else {
      await createCategory(data);
    }

    reset();
    onSubmitted?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex gap-2 sm:max-w-96", {
          "flex-col gap-4 sm:max-w-auto": isEditing,
        })}
      >
        <FormField
          control={control}
          name="name"
          rules={{ required: "O nome da categoria é obrigatório" }}
          render={({ field }) => (
            <FormItem className="flex-1">
              {!isEditing && <FormLabel>Adicionar categorias:</FormLabel>}
              <FormControl>
                <Input
                  placeholder="Ex: Hamburgueres, Pizzas, Bebidas..."
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn("mt-5.5", {
            "mt-0": isEditing,
          })}
        >
          {isEditing ? "Salvar alterações" : "Adicionar"}
        </Button>
      </form>
    </Form>
  );
}
