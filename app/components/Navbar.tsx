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
    <header className="text-2xl flex flex-row justify-between w-screen bg-[#CCC8AA] py-4 px-12 text-black sticky top-0 font-mono">
      <h1>BlogsForYou</h1>
      <div className="w-[32rem] hidden md:flex flex-row justify-between px-2">
        <Link
          className={
            usePathname() === "/" ? "text-2xl font-bold font-serif" : ""
          }
          href="/"
        >
          Home
        </Link>
        <Link
          className={
            usePathname() === "/create" ? "text-2xl font-bold font-serif" : ""
          }
          href="/create"
        >
          Create-blog
        </Link>
        <Link
          className={
            usePathname() === "/blogs" ? "text-2xl font-bold font-serif" : ""
          }
          href="/blogs"
        >
          Blogs
        </Link>
        <Link
          className={
            usePathname() === "/login" ? "text-2xl font-bold font-serif" : ""
          }
          href="/login"
        >
          Login
        </Link>
        <Link
          className={
            usePathname() === "/register" ? "text-2xl font-bold font-serif" : ""
          }
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
          className={`md:hidden bg-[#F4BF96] bg-opacity-60 text-black absolute top-16 flex flex-col ${
            isMenuOpen ? "right-0" : "hidden"
          } p-4`}
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
