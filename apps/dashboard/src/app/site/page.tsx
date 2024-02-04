import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col bg-black text-white">
        {/* grid */}

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <h1 className="text-xl font-bold">Welcome to Our Escrow Service</h1>
        <p>Here's how our service works...</p>
        {/* <!-- Add mor  e content here --> */}
        <Link className="text-xl font-bold" href="/service-agreement">
          Let's get started
        </Link>
      </section>
    </>
  );
}
