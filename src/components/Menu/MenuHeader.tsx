"use client";

import { TCompanyInfo } from "@/services/company.types";
import { getSecondaryTextColor } from "@/utils/theme";
import classNames from "classnames";
import ImageStorage from "../ImageStorage";
import UploadService from "@/services/upload";
import { useQuery } from "@tanstack/react-query";

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
          className="h-56 bg-no-repeat bg-cover bg-center relative rounded-xl"
          style={{
            backgroundImage: `url(${downloadedBackgroundImage})`,
            color: "white",
          }}
        >
          {!!info?.logo && (
            <div>
              <figure className="w-20 h-20 rounded-lg overflow-hidden absolute bottom-4 left-4 shadow-2xl">
                <ImageStorage
                  path={info.logo}
                  options={{
                    width: 80,
                    height: 80,
                    alt: "Company Name logo",
                    className: "object-cover w-full h-full",
                  }}
                />
              </figure>
            </div>
          )}
        </div>
      </div>
      <div className="flex px-4 gap-2 my-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold w-full">{info.name}</h1>
          <p className={classNames(getSecondaryTextColor(info.theme?.isDark))}>
            {info.slogan}
          </p>
        </div>
      </div>
    </header>
  );
}
