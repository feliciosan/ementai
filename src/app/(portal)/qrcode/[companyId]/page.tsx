"use client";

import Spinner from "@/components/Spinner";
import CompanyService from "@/services/company";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function QrcodeReader() {
  const params = useParams<{ companyId: string }>();
  const router = useRouter();

  const { data: company, isFetched: isCompanyFetched } = useQuery({
    queryKey: ["get-company-by-id", params.companyId],
    queryFn: async () => CompanyService.getCompanyById(params.companyId || ""),
    initialData: null,
    enabled: !!params.companyId,
  });

  useEffect(() => {
    if (isCompanyFetched && company) {
      router.push(`/menu/${company?.slug}`);
    }
  }, [company, isCompanyFetched, router]);

  if (isCompanyFetched && !company) {
    return null;
  }

  return (
    <div className="flex justify-center mt-32">
      <Spinner type="local" />
    </div>
  );
}
