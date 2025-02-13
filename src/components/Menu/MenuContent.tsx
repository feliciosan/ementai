import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import classnames from "classnames";
import { TMenu } from "@/app/actions/menu.types";
import { TCompanyInfo } from "@/app/actions/company.types";
import classNames from "classnames";

export default function MenuContent({
  info,
  menu,
  isPreview,
}: {
  info: TCompanyInfo;
  menu: TMenu[];
  isPreview?: boolean;
}) {
  return (
    <main className="flex flex-col flex-grow">
      <section className="pt-8 pb-4 px-4">
        <h1 className="text-2xl font-bold px-2 pb-4 text-center w-full">
          {info.name}
        </h1>
        <span
          className="flex w-28 h-1 mx-auto"
          style={{
            backgroundColor: info.theme.primaryColor,
          }}
        ></span>
        <p className="text-md px-10 pt-4 text-center">{info.slogan}</p>
      </section>
      <section
        className={classNames(
          "py-6 flex justify-center items-center gap-2 sticky bottom-0 z-10",
          {
            "bg-neutral-900": info.theme.isDark,
            "bg-white": !info.theme.isDark,
          }
        )}
      >
        <h2 className="text-xl font-bold relative">
          <MdKeyboardDoubleArrowDown
            className="text-2xl mt-2 animate-bounce absolute -left-7 -top-0.5"
            style={{ color: info.theme.primaryColor }}
          />
          MENU
        </h2>
      </section>
      <section>
        <ul>
          {menu.map((category) => (
            <li key={category.category}>
              <div
                className={classnames(
                  "sticky overflow-hidden z-10 border-l-4 px-4 py-4",
                  {
                    "top-0": !isPreview,
                    "top-16": isPreview,
                    "bg-gray-50": !info.theme.isDark,
                    "bg-neutral-950": info.theme.isDark,
                  }
                )}
                style={{ borderColor: info.theme.primaryColor }}
              >
                <h2 className="text-2xl md:text-3xl font-extrabold relative z-10 w-2/3 line-clamp-2">
                  {category.category}
                </h2>
                <div className="absolute top-0 right-0 h-full w-1/3 bg-[url(/category-image.jpg)] bg-no-repeat bg-cover"></div>
              </div>
              <ul className="px-6">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className={classnames(
                      "flex justify-between py-6 gap-4 border-b last:border-b-0",
                      {
                        "border-gray-200": !info.theme.isDark,
                        "border-neutral-950": info.theme.isDark,
                      }
                    )}
                  >
                    <div className="flex-1">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm font-light mt-2">
                        {item.description}
                      </p>
                      {!!(item.bestSeller || item.new) && (
                        <div className="flex gap-2 mt-2">
                          {item.bestSeller && (
                            <span
                              className="text-xs font-bold px-1.5 py-1 rounded-full inline-block"
                              style={{
                                backgroundColor: info.theme.primaryColor,
                                color: "white",
                              }}
                            >
                              Mais Vendido
                            </span>
                          )}
                          {item.new && (
                            <span
                              className="text-xs font-bold px-1.5 py-1 rounded-full inline-block"
                              style={{
                                backgroundColor: info.theme.primaryColor,
                                color: "white",
                              }}
                            >
                              Novo
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {item.price
                        .sort((a, b) => a.value - b.value)
                        .map((price, index) => (
                          <div
                            key={`${price.label}_${price.value}_${index}`}
                            className="flex flex-col items-end"
                          >
                            <div className="flex">
                              <span className="text-xl ">
                                {price.value.toFixed(2).split(".")[0]}
                              </span>
                              <span className="text-sm relative top-0.5">
                                .{price.value.toFixed(2).split(".")[1]}
                              </span>
                            </div>
                            <p className="text-xs font-light">{price.label}</p>
                          </div>
                        ))}
                    </div>
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
