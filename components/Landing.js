import Link from "next/link";
import Button from "./util/Button";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";
import { Mail } from "lucide-react";

import HamburgerMenu from "../components/main-header/hamburgerMenu";
import logoImg from "../assets/images/Landing-logo.jpg";
import aboutImg from "../assets/images/about-img.png";
import gavel from "../assets/images/gavel.png";
import caseHistory from "../assets/images/cases-history.png";
import documents from "../assets/images/documents.png";
import clients from "../assets/images/clients.png";
import calendar from "../assets/images/calendar.png";
import Card from "./util/Card";

export default function LoginLoadingPage() {
  return (
    <main className="scroll-smooth">
      <header className="flex-no-wrap shadow-md bg-white fixed z-30 top-0 flex w-full font-poppins">
        <nav className=" top-0 flex justify-between align-middle w-full ">
          <div>
            <Link
              href="/"
              className=" text-xl m-1 flex min-w-44 items-center gap-1"
            >
              <Image
                className="ml-2 h-10 w-10"
                src={logoImg}
                alt="justice lady"
                priority
              />
              <div className=" hidden lg:block text-2xl font-ysabeau font-bold ">
                Legal Referencer
              </div>
            </Link>
          </div>
          <HamburgerMenu />
          <div className=" hidden lg:flex items-center">
            <ul className=" mr-10 text-sm font-bold uppercase text-tableHeader-lgray flex items-center justify-end gap-5 ">
              <li className=" hover:text-black active:text-black ">
                <a href="#home">Home</a>
              </li>
              <li className=" hover:text-black active:text-black ">
                <a href="#features">Features</a>
              </li>
              <li className=" hover:text-black active:text-black ">
                <a href="#about">About</a>
              </li>
              <li className=" hover:text-black active:text-black ">
                <a href="#contact">Contact</a>
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
        </nav>
      </header>

      <section className=" pt-[40px] " id="home">
        <div className=" bg-cover bg-[80%_60%] bg-landing-hero h-80 lg:h-[550px] text-white flex ">
          <div className=" flex flex-col flex-1 items-center justify-center p-2 gap-7 ">
            <h1 className="text-white text-2xl md:text-4xl font-bold w-11/12 md:w-3/5 text-center leading-normal ">
              Legal Practice Management for Attorneys & Firms
            </h1>
            <p className="bg-black/40 text-base px-3 rounded-md ">
              Designed to streamline case management, client details, and
              documents, all in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 flex flex-col items-center scroll-mt-12 overflow-hidden" id="features">
        <div className="flex items-center justify-center text-center space-x-4">
          <div className="h-px w-12 bg-form-label "></div>
          <h2 className="text-xl md:text-2xl font-bold uppercase text-black">
            Features we offer
          </h2>
          <div className="h-px w-12 bg-form-label "></div>
        </div>

        <div className="relative grid grid-cols-3 max-w-[375px] md:max-w-none gap-7 justify-items-center md:flex p-2 mx-0 my-3 md:p-5 md:gap-12 md:m-8 justify-center items-center">
          {/* First Item */}
          <div className="relative ">
            <div className="w-20 h-20 md:w-[120px] md:h-[120px] bg-tableHeader-lgray hover:bg-black rounded-full flex   justify-center items-center transition-colors duration-300">
              <Image
                className="w-16 h-16 p-2 md:w-28 md:h-28 md:p-7 invert sepia-[2%] saturate-0 hue-rotate-[124deg] brightness-[101%] contrast-[102%]"
                src={gavel}
                alt="Gavel vector"
              />
            </div>
            {/* Curve background */}
            <div className=" pointer-events-none absolute top-[-30%] left-[10%] w-[220%] h-[120%] md:top-[-45%] md:left-[-3%] md:w-[250%] md:h-[150%]   bg-arrow-start bg-no-repeat bg-contain bg-left invert-[100%] sepia-[0%] saturate-[0%] hue-rotate- [0deg] brightness-[100%] contrast-[100%]"></div>
            <div className=" flex mt-6 justify-center text-lg ">
              <h5>Cases</h5>
            </div>
          </div>

          {/* Middle Items */}
          <div className="relative">
            <div className="w-20 h-20 md:w-[120px] md:h-[120px] bg-tableBorder-dgray hover:bg-black transition-colors   duration-300 rounded-full flex justify-center items-center">
              <Image
                className="w-16 h-16 p-2 md:w-28 md:h-28 md:p-7 filter invert sepia-[2%] saturate-0 hue-rotate-[124deg]   brightness-[101%] contrast-[102%]"
                src={caseHistory}
                alt={`case History`}
              />
            </div>
            {/* Curve background */}
            <div className="absolute pointer-events-none top-[-26%] left-[10%] w-[200%] h-[110%] md:top-[-45%] md:left-[-3%] md:w-[250%] md:h-[150%] bg-arrow-middle bg-no-repeat bg-contain bg-left invert-[100%] sepia-[0%] saturate-[0%] hue-rotate-[0deg] brightness-[100%] contrast-[100%]"></div>
            <div className=" flex mt-6 justify-center capitalize font-poppins  text-base md:text-lg ">
              <h5>Case History</h5>
            </div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 md:w-[120px] md:h-[120px] bg-tableBorder-dgray hover:bg-black transition-colors   duration-300 rounded-full flex justify-center items-center">
              <Image
                className="w-16 h-16 p-2 md:w-28 md:h-28 md:p-7 filter invert sepia-[2%] saturate-0 hue-rotate-[124deg]   brightness-[101%] contrast-[102%]"
                src={documents}
                alt="Documents"
              />
            </div>
            {/* Curve background */}
            <div className="absolute hidden md:flex pointer-events-none top-[-16%] left-[10%] w-[200%] h-[100%] md:top-[-45%] md:left-[-3%] md:w-[250%] md:h-[150%]  bg-arrow-middle bg-no-repeat bg-contain bg-left invert-[100%] sepia-[0%] saturate-[0%]   hue-rotate-[0deg] brightness-[100%] contrast-[100%]"></div>
            <div className=" flex mt-6 justify-center capitalize font-poppins text-lg ">
              <h5>Documents</h5>
            </div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 md:w-[120px] md:h-[120px] bg-tableHeader-lgray hover:bg-black transition-colors   duration-300 rounded-full flex justify-center items-center">
              <Image
                className="w-16 h-16 p-2 md:w-28 md:h-28 md:p-7 invert sepia-[2%] saturate-0 hue-rotate-[124deg] brightness-  [101%] contrast-[102%]"
                src={clients}
                alt="Clients"
              />
            </div>
            {/* Curve background */}
            <div className="absolute pointer-events-none top-[-20%] left-[13%] w-[220%] h-[100%] md:top-[-45%] md:left-[-3%] md:w-[250%] md:h-[150%]  bg-arrow-end   bg-no-repeat bg-contain bg-left invert-[100%] sepia-[0%] saturate-[0%] hue-rotate-[0deg] brightness-  [100%] contrast-[100%]"></div>
            <div className=" flex mt-6 justify-center font-poppins text-lg ">
              <h5>Clients</h5>
            </div>
          </div>

          {/* Last Item */}
          <div className="flex flex-col">
            <div className="w-20 h-20 md:w-[120px] md:h-[120px] bg-tableBorder-dgray hover:bg-black transition-colors   duration-300 rounded-full flex justify-center items-center">
              <Image
                className="w-16 h-16 p-2 md:w-28 md:h-28 md:p-7 invert sepia-[2%] saturate-0 hue-rotate-[124deg] brightness-[101%]  contrast-[102%]"
                src={calendar}
                alt="Calendar"
              />
            </div>
            <div className="flex mt-6 justify-center text-lg">
              <h5>Calendar</h5>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col content-center items-center pb-4  ">
            <h3 className="text-lg font-semibold uppercase text-form-text pb-2 ">
              How they work??
            </h3>
            <p className="h-[2px] w-16 bg-black "></p>
          </div>
          <div className="flex flex-col text-center leading-4 w-3/4 md:w-1/2 text-sm text-form-text border border-r-[0.75px] rounded-md border-l-grey">
            <p className=" p-2 border border-r-[0.75px] border-l-grey">
              Create cases and add case details which will be organized at one
              place to help you get a clear view for reference{" "}
            </p>
            <p className=" p-2 border border-r-[0.75px] border-l-grey">
              A detailed view of cases history with all the details collectively
              together.
            </p>
            <p className=" p-2 border border-r-[0.75px] border-l-grey">
              Upload and download documents anytime from cloud database with no
              worry to lose.
            </p>
            <p className=" p-2 border border-r-[0.75px] border-l-grey">
              Calender view to get a view of scheduled cases to make your day
              plans easier.
            </p>
            <p className=" p-2 border border-r-[0.75px] border-l-grey">
              Search for cases by any details of the case
            </p>
            <p className=" p-2 border border-r-[0.75px] border-l-grey">
              All Data is kept confidential and fully secured.
            </p>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-12 flex flex-col md:flex-row py-14 px-8 gap-10 bg-black/30 "
        id="about"
      >
        <div className="relativer">
          <Image
            className=" w-full h-auto rounded-lg shadow-md "
            src={aboutImg}
            alt="working with laptop"
          />
        </div>
        <div className="text-center flex flex-col justify-center gap-5 md:text-left max-w-lg ">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-12 bg-form-label "></div>
            <h2 className="text-2xl font-bold uppercase text-black">
              About us
            </h2>
            <div className="h-px w-12 bg-form-label "></div>
          </div>
          <div>
            <p className=" leading-normal text-justify ">
              Our web app is a comprehensive tool designed to streamline case
              management for advocates and legal firms. With a user-friendly
              interface, stay organized and keep track of all the schedules.
              Whether you&apos;re handling multiple cases or coordinating with
              clients and colleagues, this app ensures that everything is in one
              place for easy access and seamless{" "}
            </p>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-12 flex sm:flex-col lg:flex-col md:flex-row items-center py-14 px-8 gap-8"
        id="contact"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row lg:flex-col gap-4">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="flex flex-row  items-center justify-center space-x-4 text-center">
                <div className="h-px w-12 bg-form-label "></div>
                <h2 className=" text-xl lg:text-2xl font-bold uppercase text-black">
                  Let&apos;s Get In Touch!
                </h2>
                <div className="h-px w-12 bg-form-label "></div>
              </div>
              <p className=" w-11/12 lg:w-1/2 md:w-2/3 text-center text-base font-poppins ">
                Ready to give it a try? That&apos;s great! Create your Account.
                In case of any issues, Give us a call or send us an email and we
                will get back to you as soon as possible!
              </p>
            </div>
            <div className="flex lg:flex-row flex-col gap-2 w-full items-center flex-wrap md:justify-evenly  ">
              <Card
                variant="contactCard"
                className="font-poppins text-base justify-start "
              >
                <div className="flex mb-3 lg:mb-5  gap-3 ">
                  <Phone className="size-5" />
                  <h3 className=" uppercase font-semibold ">Call us</h3>
                </div>
                <p className="text-sm">+91 8910111213</p>
                <p className="text-sm">+91 9812345678</p>
              </Card>
              <Card variant="contactCard" className="font-poppins ">
                <div className="flex mb-5 gap-3 ">
                  <MapPin className="size-5" />
                  <h3 className=" uppercase font-semibold ">Location</h3>
                </div>
                <p className="text-sm">
                  121 Rock Street, 21 Avenue, New York, 92103-9000
                </p>
              </Card>
              <Card variant="contactCard">
                <div className="flex mb-5 gap-3">
                  <Mail className="size-5" />
                  <h3 className=" uppercase font-semibold ">Mail</h3>
                </div>
                <p className="text-sm  ">legalreferencer2025@gmail.com</p>
              </Card>
            </div>
          </div>
          <p className=" text-center text-sm ">
            © 2025 All Rights Reserved By Legal Referencer
          </p>
        </div>
      </section>
    </main>
  );
}
