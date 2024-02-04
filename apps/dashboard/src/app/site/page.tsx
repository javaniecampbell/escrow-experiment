import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
        {/* grid */}

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

        <p className="text-center">Here's how our service works...</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center">Escrow.</h1>
        </div>
        <Link
          className=" bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 "
          href="/service-agreement"
        >
          Let's get started
        </Link>
        {/* <!-- Add mor  e content here --> */}
      </section>
    </>
  );
}
