import { twMerge } from 'tailwind-merge';

export function TableHeader ( {children} ) {
  return  <th className=" border border-white/30 border-spacing-0.5 border-collapse px-3 py-1 text-center text-white text-sm " >{children}</th>
}

export function TableBody({field, data, slug, children, ...props}){
  return <td  className={twMerge(`text-center text-sm lg:p-2 md:p-0 border border-tableHeader-lgray/50 border-spacing-0.5 border-collapse`, props.className)} >{children ? children : field}</td>
}