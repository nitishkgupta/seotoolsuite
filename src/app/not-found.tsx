import { Metadata } from "next";
import NotFoundImage from "@/assets/images/404.svg";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "404 | SEOToolSuite",
  description: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <Image src={NotFoundImage} alt="404" className="block max-w-[450px]" />
      <div className="mt-10 block text-4xl font-medium text-sky-950">
        Page Not Found
      </div>
      <div className="mt-6">
        <Link
          href="/"
          className="flex items-center gap-1 rounded-md border-2 border-sky-950 px-4 py-2 text-sm font-medium text-sky-950 transition hover:scale-105 active:scale-95 lg:text-base"
        >
          <HomeIcon size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
