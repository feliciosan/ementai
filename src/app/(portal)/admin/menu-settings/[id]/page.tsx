"use client";

import MenuService from "@/services/menu";
import MenuProductForm from "@/components/MenuProductForm";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth.hook";
import { ChevronLeft } from "lucide-react";

export default function MenuSettingsCategoryPage() {
  const params = useParams<{ id: string }>();
  const { currentCompany } = useAuth();

  const { data: category } = useQuery({
    queryKey: ["get-category-items", currentCompany?.id, params.id],
    queryFn: async () =>
      MenuService.getMenuCategoryItems({
        companyId: currentCompany?.id || "",
        categoryId: params.id,
      }),
    initialData: null,
    enabled: !!currentCompany?.id && !!params.id,
  });

  return (
    <div>
      {!!category && (
        <div>
          <Link href="/admin/menu-settings">
            <span className="flex items-center space-x-1 text-neutral-500 hover:text-neutral-700">
              <ChevronLeft size={16} />
              <span className="text-sm">Voltar às categorias</span>
            </span>
          </Link>
          <div className="flex items-center justify-between my-4">
            <h3 className="text-xl md:text-2xl font-extrabold line-clamp-2">
              {category.name}
            </h3>
            <p className="text-neutral-500 text-sm">
              Itens cadastrados ({category.items.length})
            </p>
          </div>
          <MenuProductForm
            categoryId={params.id}
            items={category?.items || []}
          />
        </div>
      )}
    </div>
  );
}
