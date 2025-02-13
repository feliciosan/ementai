"use client";

import ConfigForms from "@/components/ConfigForms";
import MenuPreview from "@/components/MenuPreview";
import withProtected from "@/HOC/protected.route";

function PanelMenuPage() {
  return (
    <div className="md:flex md:justify-between">
      <div className="flex-1 px-4">
        <div className="py-4">
          <h2 className="text-xl md:text-2xl font-extrabold line-clamp-2">
            Personalise o seu menu ao seu gosto
          </h2>
        </div>
        <ConfigForms />
      </div>
      <div className="flex-1">
        <MenuPreview />
      </div>
    </div>
  );
}
export default withProtected(PanelMenuPage);
