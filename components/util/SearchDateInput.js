'use client';
import React , { useRef } from "react";

import { baseInput } from "./Input";

export default function SearchDateInput({placeholder, name, value, onChange}) {
  const ref = useRef();
  return(
    <>
      <input
        className={`${baseInput}`}
        name={name}
        id={name}
        type="text"
        placeholder={placeholder}
        ref={ref}
        value={value}
        min="1990-01-01" max="2030-12-31"
        onChange={onChange}
        onFocus={() => (ref.current.type = "date")}
        onBlur={() => (ref.current.type = "text")}
      />
    </>
  )

}