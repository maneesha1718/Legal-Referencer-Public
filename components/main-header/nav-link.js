'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";

import '../../app/globals.css';

export default function NavLink({ href, children }) {

  const path = usePathname();
  return (
    <Link
      href={href}
      className=  { path.startsWith(href) ? " relative flex min-h-max max-h-max text-hover-gray bg-white/10 no-underline font-bold px-4 py-3 " : 'flex no-underline text-white font-bold px-4 py-3 hover:text-hover-gray hover:bg-white/10 '} 
    >
      {children}
    </Link>
  )
}