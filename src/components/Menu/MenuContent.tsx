import classnames from "classnames";
import { TCompanyInfo } from "@/services/company.types";
import { TMenuCategory } from "@/services/menu.types";
import { getSecondaryTextColor } from "@/utils/theme";
import ImageStorage from "../ImageStorage";

export default function MenuContent({
  info,
  menu,
}: {
  info: Partial<TCompanyInfo>;
  menu: TMenuCategory[];
}) {
  return (
    <main className="flex flex-col flex-grow">
      <section>
        <ul>
          {menu
            .filter((category) => !!category.items.length)
            .map((category) => (
              <li key={category.id}>
                <div
                  className={classnames(
                    "sticky overflow-hidden z-10 px-4 py-6 flex items-center gap-2 top-0",
                    {
                      "bg-gray-50": !info.theme?.isDark,
                      "bg-neutral-850": info.theme?.isDark,
                    }
                  )}
                >
                  <h2 className="text-2xl font-semibold leading-6 relative z-10 line-clamp-2 flex items-center gap-3">
                    <div
                      className="w-1.5 h-6 rounded-md"
                      style={{ backgroundColor: info.theme?.primaryColor }}
                    ></div>
                    {category.name}
                  </h2>
                </div>
                <ul className="px-4">
                  {category.items.map((item) => (
                    <li
                      key={item.id}
                      className={classnames(
                        "flex justify-between py-4 gap-3 border-b last:border-b-0",
                        {
                          "border-gray-200": !info.theme?.isDark,
                          "border-neutral-600/15": info.theme?.isDark,
                        }
                      )}
                    >
                      <div className="flex-1 flex flex-col gap-2">
                        {!!(item.bestSeller || item.new) && (
                          <div className="flex gap-2">
                            {item.bestSeller && (
                              <div>
                                <span
                                  className="text-xs font-medium px-1 py-0.5 rounded-md inline-block"
                                  style={{
                                    backgroundColor: info.theme?.primaryColor,
                                    color: "white",
                                  }}
                                >
                                  Mais Vendido
                                </span>
                              </div>
                            )}
                            {item.new && (
                              <div>
                                <span
                                  className="text-xs font-medium px-1 py-0.5 rounded-md inline-block"
                                  style={{
                                    backgroundColor: info.theme?.primaryColor,
                                    color: "white",
                                  }}
                                >
                                  Novo
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <p className="text-lg font-semibold">{item.title}</p>
                        {item.description && (
                          <p
                            className={classnames(
                              "text-sm line-clamp-2 leading-snug mb-1",
                              getSecondaryTextColor(info.theme?.isDark)
                            )}
                          >
                            {item.description}
                          </p>
                        )}
                        <div className="flex gap-4">
                          {item.price
                            .filter((price) => price.value)
                            .sort(
                              (prev, next) =>
                                parseFloat(prev.value) - parseFloat(next.value)
                            )
                            .map((price, index) => (
                              <div
                                key={`${price.label}_${price.value}_${index}`}
                                className="flex flex-col"
                              >
                                <div className="flex">
                                  <span className="text-xl">
                                    {price.value.split(",")[0]}
                                  </span>
                                  <span className="text-sm font-medium relative top-0.5">
                                    ,{price.value.split(",")[1]}
                                  </span>
                                </div>
                                <p
                                  className={classnames(
                                    "text-sm",
                                    getSecondaryTextColor(info.theme?.isDark)
                                  )}
                                >
                                  {price.label}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                      {item.imageUrls?.[0] && (
                        <div>
                          <figure className="w-20 h-20 rounded-lg overflow-hidden block">
                            <ImageStorage
                              path={item.imageUrls?.[0] || ""}
                              options={{
                                alt: "Imagem do produto",
                                width: 80,
                                height: 80,
                                className: "object-cover w-full h-full",
                              }}
                            />
                          </figure>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
