import { twMerge } from 'tailwind-merge';

export const baseInput = " text-sm mb-4 px-4 border rounded-sm border-tableHeader-lgray text-form-text focus: outline-dark-blue ";

const baseLabel = " text-form-label mb-0.1 text-sm font ";

export default function Input( {label, name, type, className, max, min, placeholder, variant, size, disabled, onInput, ...props} ) {

  const variantLabelStyles = {
    addCase: " block uppercase ",
    searchCase: " hidden ",
  };

  const variantInputStyles = {
    addCase: ` block w-full ${disabled ? 'bg-hover-gray text-black cursor-not-allowed' : 'bg-white text-black'} `,
    searchCase: " min-w-full ",
  };

  const sizeStyles = {
    login: 'py-[2px] text-base '
  };

  return (
      <>
        <label htmlFor={name} className={twMerge(`${baseLabel} ${variantLabelStyles[variant]} ${sizeStyles[size]} ${className}`)} >{label}</label>
        <input className={twMerge(`${baseInput} ${variantInputStyles[variant]} ${sizeStyles[size]} ${className}`)} type={type} id={name} name={name} max={max} min={min} placeholder={placeholder && placeholder } onInput={onInput} disabled={disabled} {...props} />
      </>
  );
}
