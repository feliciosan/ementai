"use client";

import withProtected from "@/HOC/protected.route";

function MenuSettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-4">{children}</div>;
}

export default withProtected(MenuSettingsLayout);
