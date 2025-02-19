"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

export default function PortalHeader() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="w-full sticky top-0 z-20 bg-neutral-900">
      <nav className="flex items-center justify-between h-16 w-full max-w-6xl mx-auto px-6">
        {isAuthenticated && (
          <Fragment>
            <div className="flex items-center gap-8">
              <h1 className="text-white text-lg font-bold rounded-md bg-teal-600 px-2 py-1">
                Ementai
              </h1>
              <ul className="flex items-center gap-4 text-white text-md font-semibold">
                <li>
                  <Link href="/portal/menu">Meu menu</Link>
                </li>
              </ul>
            </div>
            <div>
              <Button
                type="submit"
                className="items-center gap-2 rounded-md py-2 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:border-teal-700 data-[hover]:text-teal-700"
                onClick={() => logout()}
              >
                Sair
              </Button>
            </div>
          </Fragment>
        )}
      </nav>
    </header>
  );
}
