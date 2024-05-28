import React from "react";

import { CardContent } from "@/components/ui/card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import {
  Music,
  Clapperboard,
  Drama,
  Drum,
  Utensils,
  Camera,
  Guitar,
} from "lucide-react";

const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <Music className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <Clapperboard className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <Drama className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <Drum className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <Drum className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Culinary Delights",
    description: "Savor the journey through the world of exquisite cuisines.",
    header: <Skeleton />,
    icon: <Utensils className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Essence of Photography",
    description: "Capture the world through the lens of impactful photography.",
    header: <Skeleton />,
    icon: <Camera className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Harmony of Music",
    description: "Feel the universal language of melodies and harmonies.",
    header: <Skeleton />,
    icon: <Guitar className="h-4 w-4 text-neutral-500" />,
  },
];
const EventBooking = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <CardContent className="flex w-full flex-col gap-3 rounded-xl border p-5 shadow">
        <p className="p-4 font-semibold">Popular Events</p>
        <BentoGrid className="mx-auto max-w-4xl">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </CardContent>
    </div>
  );
};

export default EventBooking;
