import React from "react";

export default function Footer() {
  return (
    <footer className="flex bg-[#CCC8AA] dark:bg-slate-800 dark:text-white flex-col items-center sm:flex-row sm:justify-evenly text-xl font-semibold w-screen">
      <div className="py-4 w-96 sm:w-auto">
        <h2>
          Developed by: <br />
          Syed Ali Moid Rizvi
        </h2>
        <br />
        <p>
          View my{" "}
          <a href="https://www.linkedin.com/in/syed-ali-moid-rizvi-022355226">
            LinkedIn here!
          </a>
        </p>
      </div>

      <div className="py-4 w-96 sm:w-auto">
        <h2>
          Contact me:
          <br />
          Email: <br />
          syedalimoidrizvi@gmail.com
        </h2>
        <p>
          &#169; {new Date().getFullYear()} <br /> All rights reserved
        </p>
      </div>
    </footer>
  );
}
