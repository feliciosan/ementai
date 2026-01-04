"use client";

import ConfigForms from "@/components/ConfigForms";
import Menu from "@/components/Menu";
import { Button } from "@/components/ui/button";
import UpgradeBanner from "@/components/UpgradeBanner";
import withProtected from "@/HOC/protected.route";
import { useAuth } from "@/hooks/use-auth.hook";
import { useSubscriptionSuccess } from "@/hooks/use-subscription-success.hook";
import Link from "next/link";

function PanelPage() {
  const { currentCompany, isAuthenticated } = useAuth();
  useSubscriptionSuccess();

  return (
    <div>
      <div className="px-4">
        <UpgradeBanner />
      </div>
      <div className="md:flex md:justify-between">
        <div className="flex-1 px-4">
          <div className="py-4">
            <h1 className="text-xl md:text-2xl font-extrabold line-clamp-2">
              Personalise o seu cardápio
            </h1>
          </div>
          <ConfigForms />
        </div>
        <div className="flex-1">
          <div className="py-6 px-4 text-center md:hidden">
            <h2 className="text-xl md:text-2xl font-extrabold line-clamp-2">
              Veja o seu cardápio abaixo
            </h2>
            <div className="mt-4">
              <Button variant="secondary" asChild>
                <Link href="/admin/menu-settings">
                  Gerenciar itens do cardápio
                </Link>
              </Button>
            </div>
          </div>
          <div className="sticky top-20 bg-neutral-850 pt-16 pb-18 px-1 rounded-4xl w-sm m-auto overflow-hidden">
            <div className="w-16 h-4 rounded-full bg-neutral-900 absolute top-6 mx-auto left-0 right-0 border-2 border-neutral-800/30"></div>
            <div className="h-auto md:h-[72vh] overflow-y-visible md:overflow-y-auto hide-scrollbar border-1 border-neutral-800/30">
              {!!currentCompany && (
                <Menu
                  company={currentCompany}
                  isAuthenticated={isAuthenticated}
                />
              )}
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-900 absolute bottom-4 mx-auto left-0 right-0 border-2 border-neutral-800/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withProtected(PanelPage);
