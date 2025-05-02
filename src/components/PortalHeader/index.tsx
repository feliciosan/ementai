"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

export default function PortalHeader() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="w-full sticky top-0 z-20 bg-neutral-900">
      <nav className="">
        {isAuthenticated && (
          <Fragment>
            <div className="flex items-center justify-between w-full h-16 max-w-6xl mx-auto px-6 ">
              <div className="flex items-center gap-8">
                <Link href="/admin/home">
                  <h1 className="text-white text-lg font-bold rounded-md bg-teal-600 px-2 py-1">
                    Ementai
                  </h1>
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
                <Button type="submit" onClick={() => logout()}>
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
    </header>
  );
}
