"use client";

import PageTitle from "@/components/PageTitle";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export const projects = [
  {
    title: "Event Booking",
    description:
      "A platform that allows users to book events, concerts, and shows.",
    link: "/events",
  },
  {
    title: "Expense Tracker",
    description:
      "A platform that allows users to track their expenses and manage their finances.",
    link: "https://netflix.com",
  },
];

export default function Dashboard() {
  return (
    <main className="flex w-full flex-col gap-5">
      <PageTitle title="Dashboard" className="px-5 md:px-0" />
      <div className="mx-auto max-w-5xl lg:px-8">
        <HoverEffect items={projects} />
      </div>
    </main>
  );
}
