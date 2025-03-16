import Link from "next/link";
import Image from "next/image";
import { Ysabeau_SC } from "next/font/google";
import NavLink from "./nav-link";
import logoImg from "../../assets/images/Legal-Law.png";
import Button from "../util/Button";
import { signOut } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import HamburgerMenu from "./hamburgerMenu"; // Import updated component

const ysabeauSC = Ysabeau_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default async function MainHeader() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user){
    return (
    <header className="bg-[#282828] font-bold tracking-wide text-[#ffffff] z-50">
      <nav className=" top-0 flex justify-between items-center p-1">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image className="h-10 w-10" src={logoImg} alt="a law notepad" priority />
          <div className="hidden lg:block text-2xl font-ysabeau">Legal Referencer</div>
        </Link>

        {/* Mobile Sidebar Navigation */}
        <HamburgerMenu user={user} />

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex align-middle space-x-5 text-sm font-poppins uppercase">
          <li><NavLink href="/dashboard">Dashboard</NavLink></li>
          <li><NavLink href="/calendar">Calendar</NavLink></li>
          <li><NavLink href="/cases">Cases</NavLink></li>
          <li><NavLink href="/add-case">Add Case</NavLink></li>
          <li><NavLink href="/search">Search</NavLink></li>
          <li className=" relative flex min-h-max max-h-max px-4 py-2 ">
            {user && (
              <form action={signOut}>
                <Button type="submit" variant="loginButton" className="bg-black/30 transition-all duration-300 hover:scale-105">
                  Sign Out
                </Button>
              </form>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
  }
  
}
