"use client";

import CompanyService from "@/services/company";
import { ICompanyAditional, TCompanyResponse } from "@/services/company.types";
import { useAuth } from "@/hooks/use-auth.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function CompanyAditionalInfoForm() {
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
        toast.error(error.message);
      }
    },
  });

  const form = useForm<ICompanyAditional>({
    defaultValues: currentCompany?.info?.aditicional,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ICompanyAditional) => {
    await setCompanyInfo({
      info: { aditicional: data },
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço do seu estabalecimento:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Rua, Número, Cidade, Código Postal."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone:</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Ex: 9xxxx-xxxx" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="meunegocio@gmail.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormField
            control={control}
            name="extra.label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Informações adicionais:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Título: Take Away, Desconto, etc..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="extra.value"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="10% OFF às quartas-feiras, use o cupom: TAKEAWAY."
                    className="h-16 resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
