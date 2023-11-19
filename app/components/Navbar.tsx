"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="text-2xl flex flex-row justify-between w-screen bg-[rgb(12,53,106)] py-4 px-12 text-white sticky">
      <h1>My-app</h1>
      <div className="w-[32rem] hidden md:flex flex-row justify-between px-2">
        <Link href="/">Home</Link>
        <Link href="/create">Create-blog</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
      <div className="md:hidden">☰</div>
    </header>
  );
}
