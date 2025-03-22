"use client";

import Menu from "@/components/Menu";
import CompanyService from "@/services/company";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useDynamicBG } from "@/hooks/use-dynamic-bg.hook";

export default function CompanyMenu() {
  const params = useParams<{ slug: string }>();

  const { data: company } = useQuery({
    queryKey: ["get-company-by-slug", params.slug],
    queryFn: async () => CompanyService.getCompanyBySlug(params.slug || ""),
    initialData: null,
    enabled: !!params.slug,
  });

  useDynamicBG({ isDark: !!company?.info?.theme?.isDark });

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {!!company && <Menu company={company} />}
    </div>
  );
}
