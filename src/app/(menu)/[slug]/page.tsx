import { getCompanyBySlug } from "@/app/actions/company";
import { getMenuBySlug } from "@/app/actions/menu";
import Image from "next/image";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import {
  RiFacebookBoxLine,
  RiInstagramLine,
  RiWhatsappLine,
} from "react-icons/ri";

export default async function CompanyMenu({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const menu = await getMenuBySlug(slug);
  const company = await getCompanyBySlug(slug);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto">
      <header
        className=" min-h-[70vh] bg-[url(/company-bg.jpg)] bg-no-repeat bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundColor: company.theme.primaryColor, color: "white" }}
      >
        <span className="text-xs absolute mx-auto inline-block top-4 z-10 opacity-65">
          Cardápio online by Ementai
        </span>
        <div className="absolute inset-0 bg-black opacity-35"></div>
        <picture className="relative w-44 h-44 overflow-hidden rounded-2xl">
          <Image
            src="/company-logo.jpg"
            alt="Company Name logo"
            priority
            width={176}
            height={176}
          />
        </picture>
      </header>
      <main className="flex flex-col flex-grow">
        <section className="pt-8 pb-4 px-4">
          <h1 className="text-2xl font-bold px-2 pb-4 text-center w-full">
            {company.name}
          </h1>
          <span
            className="flex w-28 h-1 mx-auto"
            style={{
              backgroundColor: company.theme.primaryColor,
            }}
          ></span>
          <p className="text-md px-10 pt-4 text-center">
            Aqui você encontra as melhores carnes e peixes da região!
          </p>
        </section>
        <section className="py-6 flex justify-center items-center gap-2 sticky bottom-0 z-10 bg-background">
          <h2 className="text-xl font-bold relative">
            <MdKeyboardDoubleArrowDown
              className="text-2xl mt-2 animate-bounce absolute -left-7 -top-0.5"
              style={{ color: company.theme.primaryColor }}
            />
            MENU
          </h2>
        </section>
        <section>
          <ul>
            {menu.map((category) => (
              <li key={category.category} className="">
                <div
                  className="sticky overflow-hidden top-0 z-10 bg-gray-50 dark:bg-neutral-950 border-l-4 px-4 py-4"
                  style={{ borderColor: company.theme.primaryColor }}
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
                      className="flex justify-between py-6 gap-4 border-b border-gray-200 dark:border-neutral-950 last:border-b-0"
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
                                  backgroundColor: company.theme.primaryColor,
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
                                  backgroundColor: company.theme.primaryColor,
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
                              <p className="text-xs font-light">
                                {price.label}
                              </p>
                            </div>
                          ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="px-4 py-10 bg-gray-50 dark:bg-neutral-950">
            <p className="text-sm text-center">
              Observação: O IVA já está incluído nos preços. Não são permitidas
              taxas adicionais aos clientes.
            </p>
          </div>
        </section>
        <section className="px-6 py-10">
          <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-neutral-950 pb-10">
            <h3 className="text-lg font-bold">{company.name}</h3>
            <p className="text-sm">Rua do Estabelecimento, 1234</p>
            <p className="text-sm">
              <span className="inline-block mr-1">Telefone:</span>
              <a href="tel:+">123 456 789</a>
            </p>
            <p className="text-sm">
              Horário de Funcionamento: 12:00 - 15:00, 19:00 - 23:00
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-10 border-b border-gray-200 dark:border-neutral-950 pb-10">
            <h3 className="text-lg font-bold">Encomendas e Take Away</h3>
            <p className="text-sm">Telefone: 123 456 789</p>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <h3 className="text-lg font-bold">Visite-nos nas redes sociais:</h3>
            <div className="flex gap-4">
              <div className="bg-[#3b5998] text-white rounded-full p-2">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  className="text-3xl"
                >
                  <RiFacebookBoxLine />
                </a>
              </div>
              <div className="bg-[#c13584] text-white rounded-full p-2">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  className="text-3xl"
                >
                  <RiInstagramLine />
                </a>
              </div>
              <div className="bg-[#25d366] text-white rounded-full p-2">
                <a
                  href="https://www.whatsapp.com"
                  target="_blank"
                  className="text-3xl"
                >
                  <RiWhatsappLine />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-between pb-4 px-4 pt-4 text-center bg-gray-50 dark:bg-neutral-950">
        <a href="https://www.emantai.com" className="text-xs inline-block">
          Powered by Ementai
        </a>
        <p className="text-xs inline-block">
          Ementai ©{new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
}
