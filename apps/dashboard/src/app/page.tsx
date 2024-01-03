import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="text-xl font-bold">Welcome to Our Escrow Service</h1>
      <p>Here's how our service works...</p>
      {/* <!-- Add more content here --> */}
      <Link className="text-xl font-bold" href="/service-agreement">
        Let's get started
      </Link>
    </main>
  );
}
