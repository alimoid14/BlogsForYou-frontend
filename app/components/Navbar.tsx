"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="text-2xl flex flex-row justify-between w-screen bg-[#CCC8AA] dark:bg-slate-800 px-12 py-4 text-black dark:text-white sticky top-0 overflow-x-clip z-10">
      <h1>
        <Link href={"/"}>BlogsForYou</Link>
      </h1>
      <div className="w-[32rem] hidden md:flex flex-row justify-between px-2">
        <Link
          className={`${
            usePathname() === "/" ? "text-2xl font-semibold" : "hover:italic"
          }`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`${
            usePathname() === "/create"
              ? "text-2xl font-semibold"
              : "hover:italic"
          }`}
          href="/create"
        >
          Create
        </Link>
        <Link
          className={`${
            usePathname() === "/blogs"
              ? "text-2xl font-semibold"
              : "hover:italic"
          }`}
          href="/blogs"
        >
          Blogs
        </Link>
        <Link
          className={`${
            usePathname() === "/login"
              ? "text-2xl font-semibold"
              : "hover:italic"
          }`}
          href="/login"
        >
          Login
        </Link>
        <Link
          className={`${
            usePathname() === "/register"
              ? "text-2xl font-semibold"
              : "hover:italic"
          }`}
          href="/register"
        >
          Register
        </Link>
      </div>
      <div className="md:hidden hover:cursor-pointer" onClick={toggleMenu}>
        {isMenuOpen ? <>❌</> : <>☰</>}
      </div>
      {/* Conditionally render the mobile menu based on the state */}
      {
        <div
          className={`md:hidden bg-[#CCC8AA] dark:bg-slate-800 text-black dark:text-white absolute top-16 flex flex-col ${
            isMenuOpen ? "right-0" : "-right-[300px]"
          } p-4 duration-300`}
        >
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
          <hr />
          <Link href="/create" onClick={closeMenu}>
            Create-blog
          </Link>
          <hr />
          <Link href="/blogs" onClick={closeMenu}>
            Blogs
          </Link>
          <hr />
          <Link href="/login" onClick={closeMenu}>
            Login
          </Link>
          <hr />
          <Link href="/register" onClick={closeMenu}>
            Register
          </Link>
        </div>
      }
    </header>
  );
}
