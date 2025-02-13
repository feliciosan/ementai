import Menu from "@/components/Menu";

export default async function CompanyMenu({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto">
      <Menu slug={slug} />
    </div>
  );
}
