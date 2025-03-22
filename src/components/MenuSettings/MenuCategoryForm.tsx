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

type TMenuCategoryForm = {
  name: string;
};

export default function MenuCategoryForm() {
  const queryClient = useQueryClient();
  const { currentCompany } = useAuth();

  const { mutateAsync: createCategory } = useMutation({
    mutationKey: ["create-category", currentCompany?.id],
    mutationFn: (data: TMenuCategoryForm) =>
      MenuService.createMenuCategory(currentCompany?.id || "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-menu", currentCompany?.id],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });

  const form = useForm<TMenuCategoryForm>({
    defaultValues: {
      name: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TMenuCategoryForm) => {
    await createCategory(data);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={control}
          name="name"
          rules={{ required: "O nome da categoria é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adicionar categorias:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Hamburgueres, Pizzas, Bebidas..."
                  className="w-72"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="mt-5.5">
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
