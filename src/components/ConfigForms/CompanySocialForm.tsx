"use client";

import CompanyService from "@/services/company";
import { ICompanySocial, TCompanyResponse } from "@/services/company.types";
import { useAuth } from "@/hooks/use-auth.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CompanySocialForm() {
  const queryClient = useQueryClient();
  const { currentCompany } = useAuth();

  const { mutateAsync: setCompanyInfo } = useMutation({
    mutationKey: ["set-company-info", currentCompany?.id],
    mutationFn: (data: Partial<TCompanyResponse>) =>
      CompanyService.setCompanyInfo(currentCompany?.id || "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-company-by-id", currentCompany?.id],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });

  const form = useForm<ICompanySocial>({
    defaultValues: currentCompany?.info?.social,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ICompanySocial) => {
    await setCompanyInfo({
      info: { social: data },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col relative gap-4"
      >
        <FormField
          control={control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Link do seu perfil do Instagram"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Link para a sua página do Facebook"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Número de telefone para o Whatsapp"
                  {...field}
                />
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
