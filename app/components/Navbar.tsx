"use client";
import React from "react";

export default function Navbar() {
  return (
    <header className="text-2xl flex flex-row justify-between w-screen bg-[#0C356A] py-4 px-12 text-white sticky">
      <h1>My-app</h1>
      <div className="w-96 hidden sm:flex flex-row justify-between px-2">
        <a href="/">Home</a>
        <a href="#">Blogs</a>
        <a href="/create">Create-blog</a>
      </div>
      <div className="sm:hidden">☰</div>
    </header>
  );
}
