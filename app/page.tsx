import Image from "next/image";
import ParticlesBg from "./components/ParticlesBg";

export default function Home() {
  return (
    <main className="flex items-center justify-center main-height">
      <ParticlesBg />
      <div className="flex flex-col h-2/3 w-2/3 lg:w-[680px] p-12 text-black dark:text-white text-xl sm:text-2xl text-center overflow-hidden">
        <p>
          Hello! And welcome to our website! We provide a platform for our users
          to write their own, and read the blogs written by others!
        </p>
        <button className="rounded-2xl px-2 self-center mt-auto text-orange-600 font-bold">
          <a href="/create">Let&apos;s get started!</a>
        </button>
      </div>
    </main>
  );
}
