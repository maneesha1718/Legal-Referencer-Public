import { twMerge } from 'tailwind-merge';

const baseButton = " text-white bg-button_light font-normal cursor-pointer px-2 py-1 rounded-md ";

export default function Button ({onClick, formAction, type='button', disabled, className, variant, children, ...props}){

  const variantButtonStyles = {
    modalButton: " text-black text-base bg-white border-[1.5px] border-solid border-black/50 rounded-sm hover:bg-black hover:text-white px-1 py-0.5 ",
    formButton: " hover:bg-button_hover border-0 border-none ",
    loginButton: "  bg-black/30 transition-all duration-300 hover:scale-105 hover:bg-black border-0 border-none ",
    resetButton: " text-black bg-white border border-solid border-black/90 hover:bg-black hover:text-white ",
  };

  return(
    <button type={type} disabled={disabled} onClick={onClick} formAction={formAction} className={twMerge(` ${baseButton} ${variantButtonStyles[variant]} ${className}`)} {...props} >
      {children}
    </button>
  )
}