"use client";

import ConfigForms from "@/components/ConfigForms";
import Menu from "@/components/Menu";
import withProtected from "@/HOC/protected.route";
import { useAuth } from "@/hooks/use-auth.hook";

function PanelPage() {
  const { currentCompany } = useAuth();

  return (
    <div className="md:flex md:justify-between">
      <div className="flex-1 px-4">
        <div className="py-4">
          <h1 className="text-xl md:text-2xl font-extrabold line-clamp-2">
            Personalise o seu menu ao seu gosto
          </h1>
        </div>
        <ConfigForms />
      </div>
      <div className="flex-1">
        <div className="sticky top-20 bg-neutral-850 py-16 px-1 rounded-4xl w-sm m-auto overflow-hidden">
          <div className="w-16 h-4 rounded-full bg-neutral-800 absolute top-6 mx-auto left-0 right-0"></div>
          <div className="h-[72vh] overflow-y-auto hide-scrollbar">
            {!!currentCompany && <Menu company={currentCompany} />}
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-800 absolute bottom-4 mx-auto left-0 right-0"></div>
        </div>
      </div>
    </div>
  );
}
export default withProtected(PanelPage);
