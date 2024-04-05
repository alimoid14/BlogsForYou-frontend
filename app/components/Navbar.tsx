"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MdMenuOpen } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";

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
    <header className="sticky top-0 z-10 flex w-screen flex-row justify-between overflow-x-clip bg-[#CCC8AA] px-12 py-4 text-2xl text-black dark:bg-white">
      <h1>
        <Link href={"/"}>BlogsForYou</Link>
      </h1>
      <div className="hidden w-[32rem] flex-row justify-between px-2 md:flex">
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
      <div className="hover:cursor-pointer md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? (
          <>
            <TfiClose />
          </>
        ) : (
          <>
            <MdMenuOpen />
          </>
        )}
      </div>
      {/* Conditionally render the mobile menu based on the state */}
      {
        <div
          className={`main-height absolute top-16 flex w-screen flex-col justify-between bg-[#CCC8AA] p-4 text-black transition-transform duration-300 ease-in-out dark:bg-white md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-[100%]"
          }`}
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
