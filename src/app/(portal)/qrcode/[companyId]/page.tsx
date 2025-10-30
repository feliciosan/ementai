import CompanyService from "@/services/company";
import { redirect } from "next/navigation";

export default async function QrcodeReader({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const company = await CompanyService.getCompanyById(companyId);

  if (company && company.slug) {
    redirect(`/menu/${company.slug}`);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Empresa não encontrada</h1>
        <p className="text-gray-600">
          O QR Code que você escaneou não corresponde a uma empresa válida.
        </p>
      </div>
    </div>
  );
}
