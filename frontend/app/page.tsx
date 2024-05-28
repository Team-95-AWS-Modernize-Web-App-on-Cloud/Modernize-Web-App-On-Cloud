import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
const words = [
  {
    text: "Build",
  },
  {
    text: "awesome",
  },
  {
    text: "apps",
  },
  {
    text: "with",
  },
  {
    text: "AWS.",
    className: "text-orange-500 dark:text-orange-500",
  },
];

export default function Main() {
  return (
    <div className="flex h-[40rem] flex-col items-center justify-center  ">
      <p className="text-xs text-neutral-600 dark:text-neutral-200 sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Button variant={"default"}>
          <Link href="/auth/login">Join Us Now</Link>
        </Button>
        <Button variant={"outline"}>
          <Link href="/auth/register">Learn More</Link>
        </Button>
      </div>
    </div>
  );
}
