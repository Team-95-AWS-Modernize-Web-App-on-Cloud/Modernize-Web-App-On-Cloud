import dynamic from "next/dynamic";
const SideNavbar = dynamic(() => import("@/components/SideNavbar"), {
  ssr: false,
});
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <SideNavbar />
      {/* Main page */}
      <div className="w-full py-8 md:p-8">{children}</div>
    </div>
  );
}
