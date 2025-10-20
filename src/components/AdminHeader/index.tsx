"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import Link from "next/link";
import { Fragment, useRef } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";

export default function PortalHeader() {
  const { isAuthenticated, logout, currentCompany } = useAuth();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `${currentCompany?.info?.name} QR Code`,
  });

  return (
    <header className="w-full sticky top-0 z-20 bg-neutral-900">
      <nav className="">
        {isAuthenticated && (
          <Fragment>
            <div className="flex items-center justify-between w-full h-16 max-w-6xl mx-auto px-6 ">
              <div className="flex items-center gap-8">
                <Link href="/admin/home" className="flex items-center gap-2">
                  <Image
                    src="/logo-teal.svg"
                    alt="Ementai Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  {/* <h1 className="text-white text-lg font-bold rounded-md bg-teal-600 px-2 py-1">
                    Ementai
                  </h1> */}
                  <span className="text-lg font-bold text-white">Ementai</span>
                </Link>
                <ul className="hidden sm:flex items-center divide-x divide-neutral-700">
                  <li className="text-sm font-semibold text-white px-4">
                    <Link href="/admin/home">Informações do negócio</Link>
                  </li>
                  <li className="text-sm font-semibold text-white px-4">
                    <Link href="/admin/menu-settings">Meu cardápio</Link>
                  </li>
                </ul>
              </div>
              <div className="hidden sm:flex">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => null}
                    >
                      <QrCode />
                      Meu QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>QR Code</DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        Imprima o seu QR Code para compartilhar com seus
                        clientes.
                      </p>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center">
                      <div ref={contentRef} className="print-container">
                        <QRCode
                          style={{
                            height: "350px",
                            width: "350px",
                            padding: "1cm",
                          }}
                          value={`https://app.ementai.com/menu/${currentCompany?.slug}`}
                          viewBox={`0 0 256 256`}
                          className="qr-code"
                        />
                      </div>
                      <Button type="button" onClick={reactToPrintFn}>
                        Imprimir QR Code
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button type="button" onClick={() => logout()}>
                  Sair
                </Button>
              </div>
              <div className="sm:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button type="button" size="icon" variant={"outline"}>
                      <Menu />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <ul className="divide-y divide-neutral-100 px-4">
                      <li className="text-sm font-semibold p-4">
                        <SheetClose asChild>
                          <Link href="/admin/home">Informações do negócio</Link>
                        </SheetClose>
                      </li>
                      <li className="text-sm font-semibold p-4">
                        <SheetClose asChild>
                          <Link href="/admin/menu-settings">Meu cardápio</Link>
                        </SheetClose>
                      </li>
                      <li className="text-sm font-semibold p-4">
                        <SheetClose asChild>
                          <Button type="submit" onClick={() => logout()}>
                            Sair
                          </Button>
                        </SheetClose>
                      </li>
                    </ul>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </Fragment>
        )}
      </nav>
      <style jsx global>{`
        @media print {
          .print-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
        }
      `}</style>
    </header>
  );
}
