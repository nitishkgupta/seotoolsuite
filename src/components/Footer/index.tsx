import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import dfsLogoImage from "@/assets/images/dataforseo-logo.png";

function Footer() {
  return (
    <footer className="flex flex-col items-center border-t-2 border-slate-200 bg-white pt-4 text-base">
      <span>© 2026 SEOToolSuite.</span>
      <div className="mt-1 text-center">
        Made with ❤️ in{" "}
        <Image
          src="https://flagcdn.com/in.svg"
          className="mx-0.5 inline-block -translate-y-0.5"
          width={22}
          height={22}
          alt="India"
        ></Image>{" "}
        by{" "}
        <Link
          href="https://github.com/nitishkgupta"
          target="_blank"
          className="underline"
        >
          nitishkgupta
        </Link>
        .
      </div>
      <div className="mt-4 w-full border-t-2 border-slate-200 py-3 text-center text-base">
        Powered by{" "}
        <Link
          href="https://dataforseo.com/?aff=44560"
          rel="nofollow"
          target="_blank"
          className="underline"
        >
          <Image
            src={dfsLogoImage}
            alt="DataForSEO"
            className="inline-block w-28 -translate-y-0.5"
          />
        </Link>
      </div>
    </footer>
  );
}

export default memo(Footer);
