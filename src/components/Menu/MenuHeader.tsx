"use client";

import { TCompanyInfo } from "@/services/company.types";
import { getSecondaryTextColor } from "@/utils/theme";
import ImageStorage from "../ImageStorage";
import UploadService from "@/services/upload";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export default function MenuHeader({ info }: { info: Partial<TCompanyInfo> }) {
  const { data: downloadedBackgroundImage } = useQuery({
    queryKey: ["get-file-url", info.backgroundImage],
    queryFn: () => {
      return UploadService.getFileUrl(info.backgroundImage || "");
    },
    initialData: null,
    enabled: !!info.backgroundImage,
  });

  return (
    <header className="flex flex-col">
      <div className="px-3">
        <p className="text-xs font-semibold text-center mt-2 mb-3">
          Cardápio by Ementai
        </p>
        <div
          className={cn(
            "aspect-square bg-no-repeat bg-cover bg-center relative rounded-xl",
            {
              "bg-gray-100": !info.theme?.isDark,
              "bg-neutral-800": info.theme?.isDark,
            }
          )}
          style={{
            backgroundImage: `url(${downloadedBackgroundImage})`,
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            {!downloadedBackgroundImage && (
              <div
                className={cn(
                  "w-full h-full rounded-xl flex items-center justify-center",
                  {
                    "bg-gray-100": !info.theme?.isDark,
                    "bg-neutral-800": info.theme?.isDark,
                  }
                )}
              >
                <span className="text-sm font-semibold">Imagem de fundo</span>
              </div>
            )}
            <figure className="w-20 h-20 rounded-lg overflow-hidden absolute bottom-4 left-4 shadow-2xl">
              {!!info?.logo ? (
                <ImageStorage
                  path={info.logo}
                  options={{
                    width: 80,
                    height: 80,
                    alt: "Company Name logo",
                    className: "object-cover w-full h-full",
                  }}
                />
              ) : (
                <div
                  className={cn(
                    "w-full h-full rounded-lg flex items-center justify-center",
                    {
                      "bg-gray-100": !info.theme?.isDark,
                      "bg-neutral-900": info.theme?.isDark,
                    }
                  )}
                >
                  <span className="text-sm font-semibold">Logotipo</span>
                </div>
              )}
            </figure>
          </div>
        </div>
      </div>
      <div className="flex px-4 gap-2 my-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold w-full">{info.name}</h1>
          <p className={cn(getSecondaryTextColor(info.theme?.isDark))}>
            {info.slogan}
          </p>
        </div>
      </div>
    </header>
  );
}
