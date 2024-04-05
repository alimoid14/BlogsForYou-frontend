import Image from "next/image";
import ParticlesBg from "./components/ParticlesBg";

export default function Home() {
  return (
    <main className="main-height flex items-center justify-center">
      <ParticlesBg />
      <div className="flex h-2/3 w-2/3 flex-col overflow-hidden p-12 text-center text-xl text-black dark:text-white sm:text-2xl lg:w-[680px]">
        <p>
          Hello! And welcome to our website! We provide a platform for our users
          to write their own, and read the blogs written by others!
        </p>
        <button className="mt-auto self-center rounded-2xl px-2 font-bold text-orange-600">
          <a href="/create">Let&apos;s get started!</a>
        </button>
      </div>
    </main>
  );
}
