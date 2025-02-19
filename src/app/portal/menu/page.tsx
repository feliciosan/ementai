"use client";

import CompanyMenuForm from "@/components/ConfigForms/CompanyMenuForm";
import withProtected from "@/HOC/protected.route";

function MenuPage() {
  return (
    <div className="px-4">
      <div className="py-4">
        <h2 className="text-xl md:text-2xl font-extrabold line-clamp-2">
          Cadastre, edite e organize os itens do seu menu
        </h2>
      </div>
      <CompanyMenuForm />
    </div>
  );
}
export default withProtected(MenuPage);
