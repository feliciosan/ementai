"use client";

import MenuService from "@/services/menu";
import MenuCategoryForm from "@/components/MenuSettings/MenuCategoryForm";
import MenuSortableCategory from "@/components/MenuSettings/MenuSortableCategory";
import { useAuth } from "@/hooks/use-auth.hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useEffect, useState } from "react";
import { TMenuCategory } from "@/services/menu.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function MenuSettingsPage() {
  const queryClient = useQueryClient();
  const { currentCompany } = useAuth();
  const [menuCategories, setMenuCategories] = useState<TMenuCategory[]>([]);
  const [allowSaveChanges, setAllowSaveChanges] = useState<boolean>(false);

  const { data: menuCategoriesResponse } = useQuery({
    queryKey: ["get-menu", currentCompany?.id],
    queryFn: async () =>
      MenuService.getMenuCategories(currentCompany?.id || ""),
    initialData: [],
    enabled: !!currentCompany?.id,
    throwOnError: true,
  });

  const { mutateAsync: updateMenuCategoryOrder } = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: (params: {
      companyId: string;
      orderedCategories: { id: string; index: number }[];
    }) => MenuService.updateMenuCategoryOrder(params),
    onSuccess: async () => {
      toast.success("Ordem das categorias atualizada com sucesso!");
      setAllowSaveChanges(false);

      await queryClient.invalidateQueries({
        queryKey: ["get-menu", currentCompany?.id],
      });
    },
  });

  const handleDranEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const activeIndex = menuCategories.findIndex(
      (category) => category.id === active.id
    );

    const overIndex = menuCategories.findIndex(
      (category) => category.id === over.id
    );

    setMenuCategories(arrayMove(menuCategories, activeIndex, overIndex));
    setAllowSaveChanges(true);
  };

  useEffect(() => {
    if (!menuCategoriesResponse.length) return;
    setMenuCategories(menuCategoriesResponse);
  }, [menuCategoriesResponse]);

  return (
    <div>
      <div className="my-4">
        <h2 className="text-xl md:text-2xl font-extrabold line-clamp-2">
          Gerencie as categorias do seu cardápio
        </h2>
      </div>
      <div className="mb-6">
        <MenuCategoryForm />
      </div>
      {!!menuCategories.length && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Categorias:</h3>
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDranEnd}
          >
            <SortableContext items={menuCategories}>
              <div className="w-full flex flex-col mt-3 gap-2">
                {menuCategories?.map((category) => (
                  <MenuSortableCategory key={category.id} category={category} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
      <div
        className={cn(
          "flex justify-end gap-2 sticky bottom-2 bg-neutral-900 p-4 rounded-lg shadow-md",
          {
            hidden: !allowSaveChanges,
          }
        )}
      >
        <Button
          type="submit"
          variant="outline"
          disabled={!allowSaveChanges}
          onClick={() =>
            updateMenuCategoryOrder({
              companyId: currentCompany?.id || "",
              orderedCategories: menuCategories.map((category, index) => ({
                id: category.id,
                index,
              })),
            })
          }
        >
          Salvar alterações
        </Button>
      </div>
    </div>
  );
}
