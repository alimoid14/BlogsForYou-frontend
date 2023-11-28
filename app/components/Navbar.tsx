"use client";
import Link from "next/link";
import { useState } from "react";

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
        <Link href="/">Home</Link>
        <Link href="/create">Create-blog</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
      <div className="md:hidden hover:cursor-pointer" onClick={toggleMenu}>
        {isMenuOpen ? <>❌</> : <>☰</>}
      </div>
      {/* Conditionally render the mobile menu based on the state */}
      {
        <div
          className={`md:hidden text-white absolute top-16 flex flex-col ${
            isMenuOpen ? "right-0" : "right-[-300px]"
          } duration-500 bg-transparent p-4`}
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
