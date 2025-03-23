"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TMenuCategory } from "@/services/menu.types";
import { cn } from "@/lib/utils";
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
import Link from "next/link";
import { CSSProperties } from "react";
import MenuService from "@/services/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth.hook";
import { toast } from "sonner";
import { GripVertical, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function MenuSortableCategory({
  category,
}: {
  category: TMenuCategory;
}) {
  const queryClient = useQueryClient();
  const { currentCompany } = useAuth();
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id: category.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { mutateAsync: deleteCategory } = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: (params: { categoryId: string; companyId: string }) =>
      MenuService.deleteMenuCategory(params),
    onSuccess: async () => {
      toast.success("Categoria excluída com sucesso!");
      await queryClient.invalidateQueries({
        queryKey: ["get-menu", currentCompany?.id],
      });
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "py-4 px-4 bg-white relative border border-neutral-200 rounded-lg",
        {
          "z-10 bg-opacity-75 backdrop-blur-lg": active?.id === category.id,
        }
      )}
    >
      <div className="flex items-center gap-x-4 w-full justify-between">
        <div className="flex items-center gap-x-4">
          <div {...attributes} {...listeners}>
            <Tooltip>
              <TooltipTrigger asChild>
                <GripVertical size={20} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Alterar posição</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <h4 className="text-lg">{category.name}</h4>
        </div>
        <div className="flex items-center gap-x-2">
          <Button variant="secondary" asChild>
            <Link href={`/admin/menu-settings/${category.id}`}>
              Gerenciar Itens
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" size="icon" variant="outline">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja excluir esta categoria?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Você perderá todos os items associados a esta categoria.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    deleteCategory({
                      categoryId: category.id,
                      companyId: currentCompany?.id || "",
                    })
                  }
                >
                  Sim
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
