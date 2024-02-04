import React from "react";
import Image from "next/image";
import Link from "next/link";
type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2">
        <Image
          src={"/assets/freelance-escrow-logo.webp"}
          className="rounded-full"
          width={40}
          height={40}
          alt="logo"
        />
        <span className="text-xl font-bold">Escrow.</span>
      </aside>
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center gap-8">
          <li>
            <Link href={"#"}>Getting Started</Link>
          </li>
          <li>
            <Link href={"#"}>Pricing</Link>
          </li>
          <li>
            <Link href={"#"}>About</Link>
          </li>
          <li>
            <Link href={"#"}>Features</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={"/agency"}
          className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
      </aside>
    </div>
  );
};

export default Navigation;
