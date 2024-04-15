import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col bg-blue-900 h-screen">
      <h1 className="text-4xl ">This is my home page</h1>
      <Link href={"/sign-up"} className="bg-black text-white p-3 mt-12">Sign up for full access </Link>
      <Toaster />
    </div>

  );
}
