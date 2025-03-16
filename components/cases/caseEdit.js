'use client';

import { useRouter } from "next/navigation";
import { Pen } from "lucide-react";

export default function CaseEdit({slug}){

  const router = useRouter();
  const handleEditCase = (slug) => {
    router.push(`/add-case?slug=${slug}`);
  };

  return(
    <button onClick={() => handleEditCase(slug)}>
      <Pen className="size-[18px]" />
    </button>
  )
}