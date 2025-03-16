"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { signOut } from "@/app/login/actions"
import Button from "../util/Button";

const HamburgerMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Icon */}
      {user ? (
        < div className="z-[99999]">
          <div className="lg:hidden p-2 cursor-pointer" onClick={toggleMenu}>
            <div className="space-y-2">
              <div className="w-6 h-1 bg-white"></div>
              <div className="w-6 h-1 bg-white"></div>
              <div className="w-6 h-1 bg-white"></div>
            </div>
          </div>

          {/* Sidebar Navigation */}

          <div
            className={`fixed top-0 left-0 h-screen w-64 bg-black text-white transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-[100]`}
          >
            <div className="p-5 flex justify-between items-center border-b">
              <Link href="/" onClick={closeMenu} className="text-white block">
                <h2 className="text-lg font-ysabeau font-bold text-white">
                  LEGAL REFERENCER
                </h2>    
              </Link>
              
              <button onClick={toggleMenu} className="text-white text-2xl">
                &times;
              </button>
            </div>

            <ul className="space-y-4 p-3 text-sm font-poppins uppercase">
              <li>
                <Link href="/dashboard" onClick={closeMenu} className="text-white block">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/calendar" onClick={closeMenu} className="text-white block">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/cases" onClick={closeMenu} className="text-white block">
                  Cases
                </Link>
              </li>
              <li>
                <Link href="/add-case" onClick={closeMenu} className="text-white block">
                  Add Case
                </Link>
              </li>
              <li>
                <Link href="/search" onClick={closeMenu} className="text-white block">
                  Search
                </Link>
              </li>
              <li>
                <form action={signOut} method="POST">
                  <Button
                    type="submit"
                    className="bg-tableHeader-lgray text-white w-full mt-4 py-2 rounded-md"
                  >
                    Sign Out
                  </Button>
                </form>
              </li>
            </ul>
          </div>

          {/* Overlay (this should be placed right after the sidebar div) */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[99]"
              onClick={toggleMenu}
            ></div>
          )}
        </div>
      ) : (
        <>
          <div className="lg:hidden p-2 cursor-pointer  " onClick={toggleMenu}>
            <div className="space-y-2">
              <div className="w-6 h-1 bg-black"></div>
              <div className="w-6 h-1 bg-black"></div>
              <div className="w-6 h-1 bg-black"></div>
            </div>
          </div>
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-[100]`}
          >
            <div className="p-5 flex justify-between items-center border-b">
            <Link href="/" onClick={closeMenu} className="text-white block">
                <h2 className="text-lg font-ysabeau font-bold text-white">
                  LEGAL REFERENCER
                </h2>    
              </Link>
              <button onClick={toggleMenu} className="text-white text-2xl">
                &times;
              </button>
            </div>
        <ul className=" space-y-4 p-3 text-base font-medium font-poppins text-l-grey uppercase ">
          <li className=" active:text-black ">
            <a href="#home" onClick={closeMenu} >Home</a>
          </li>
          <li className=" active:text-black ">
            <a href="#features" onClick={closeMenu}>Features</a>
          </li>
          <li className=" active:text-black ">
            <a href="#about" onClick={closeMenu}>About</a>
          </li>
          <li className=" active:text-black ">
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </li>
          <li>
            <Link href="/login">
              <Button
                type="submit"
                variant="loginButton"
                className=" bg-black/50 transition-all duration-300 hover:scale-105 font-bold "
              >
                Login/SignUp
              </Button>
            </Link>
          </li>
        </ul>
        </div>
        {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[99]"
              onClick={toggleMenu}
            ></div>
          )}
        </>
      )}
    </>
  );
};

export default HamburgerMenu;
