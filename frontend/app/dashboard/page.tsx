"use client";

import PageTitle from "@/components/PageTitle";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { projects } from "@/data/projects";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Dashboard" className="px-5 md:px-0" />
      <div className="mx-auto max-w-5xl lg:px-8">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
