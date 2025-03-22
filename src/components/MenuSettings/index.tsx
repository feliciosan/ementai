"use client";

import MenuCategoryForm from "./MenuCategoryForm";
import MenuService from "@/services/menu";
import MenuSortableCategory from "./MenuSortableCategory";
import { useAuth } from "@/hooks/use-auth.hook";
import { useQuery } from "@tanstack/react-query";
import { Accordion } from "../ui/accordion";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useEffect, useState } from "react";
import { TMenuCategory } from "@/services/menu.types";

export default function MenuSettings() {
  const { currentCompany } = useAuth();
  const [menuCategories, setMenuCategories] = useState<TMenuCategory[]>([]);

  const { data: menuCategoriesResponse } = useQuery({
    queryKey: ["get-menu", currentCompany?.id],
    queryFn: async () =>
      MenuService.getMenuCategories(currentCompany?.id || ""),
    initialData: [],
    enabled: !!currentCompany?.id,
    throwOnError: true,
  });

  const handleDranEnd = ({ active, over }: DragEndEvent) => {
    if (!!over && active.id !== over.id) {
      const activeIndex = menuCategories.findIndex(
        (category) => category.id === active.id
      );
      const overIndex = menuCategories.findIndex(
        (category) => category.id === over.id
      );

      setMenuCategories(arrayMove(menuCategories, activeIndex, overIndex));
    }
  };

  useEffect(() => {
    if (!menuCategoriesResponse.length) return;
    setMenuCategories(menuCategoriesResponse);
  }, [menuCategoriesResponse]);

  return (
    <div>
      <MenuCategoryForm />
      {!!menuCategories.length && (
        <div className="mt-6">
          <h3 className="text-lg/6 font-semibold">Categorias e produtos:</h3>
          <Accordion
            type="single"
            collapsible
            className="w-full mt-4 bg-gray-50 rounded-xl"
          >
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDranEnd}
            >
              <SortableContext items={menuCategories}>
                {menuCategories?.map((category) => (
                  <MenuSortableCategory key={category.id} category={category} />
                ))}
              </SortableContext>
            </DndContext>
          </Accordion>
        </div>
      )}
    </div>
  );
}
