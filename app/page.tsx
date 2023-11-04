import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center main-height">
      <div className="flex flex-col bg-[#0C356A] h-2/3 w-2/3 rounded-3xl p-12 text-white text-opacity-50 text-xl sm:text-2xl text-center">
        <p>
          Hello! And welcome to our website! We provide a platform for our users
          to write their own, and read the blogs written by others!
        </p>
        <button className="rounded-2xl px-2 self-center mt-auto">
          <a href="/create">Let&apos;s get started!</a>
        </button>
      </div>
    </main>
  );
}
