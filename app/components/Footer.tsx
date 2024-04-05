import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex bg-[#CCC8AA] dark:bg-slate-800 dark:text-white flex-row flex-wrap justify-evenly text-lg sm:text-xl font-semibold w-screen">
      <div className="py-4">
        <h2>
          Developed by: <br />
          Syed Ali Moid Rizvi
        </h2>
        <br />
      </div>

      <div className="py-4">
        <div className="flex flex-row flex-wrap">
          <span className=" pr-2">
            <a href="https://www.linkedin.com/in/syed-ali-moid-rizvi-022355226">
              <FaLinkedin />
            </a>
          </span>
          <span className="pr-2">
            <a href="https://twitter.com/alimoidrizvi">
              <CiTwitter />
            </a>
          </span>
          <span className="pr-2">
            <a href="https://github.com/alimoid14">
              <FaGithub />
            </a>
          </span>
        </div>

        <span>
          &#169; {new Date().getFullYear()} <br />
        </span>
      </div>
    </footer>
  );
}
