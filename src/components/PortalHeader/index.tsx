"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "../ui/button";

export default function PortalHeader() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="w-full sticky top-0 z-20 bg-neutral-900">
      <nav className="flex items-center justify-between h-16 w-full max-w-6xl mx-auto px-6">
        {isAuthenticated && (
          <Fragment>
            <div className="flex items-center gap-8">
              <Link href="/admin/home">
                <h1 className="text-white text-lg font-bold rounded-md bg-teal-600 px-2 py-1">
                  Ementai
                </h1>
              </Link>
              <ul className="flex items-center divide-x divide-neutral-700">
                <li className="text-sm font-semibold text-white px-4">
                  <Link href="/admin/home">Informações do negócio</Link>
                </li>
                <li className="text-sm font-semibold text-white px-4">
                  <Link href="/admin/menu-settings">Meu cardápio</Link>
                </li>
              </ul>
            </div>
            <div>
              <Button type="submit" onClick={() => logout()}>
                Sair
              </Button>
            </div>
          </Fragment>
        )}
      </nav>
    </header>
  );
}
