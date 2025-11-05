import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="hidden lg:flex items-center">
      <Link href="/">
        {/* 
          ✅ The `src` for next/image should start from /public 
          but you do NOT include `/public` in the path.
          Place your logo in /public/logo.svg 
        */}
        <Image
          src="/logo.svg"
          alt="Protocol Logo"
          width={100}
          height={70}
          priority
          className="h-10 w-auto"
        />
      </Link>
    </div>
  );
}
