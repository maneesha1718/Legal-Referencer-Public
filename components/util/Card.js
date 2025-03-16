import { twMerge } from "tailwind-merge";

const baseCard = "  text-white font-normal rounded-lg shadow-lg gap-4";

export default function Card({ className, variant, children, ...props }) {
  const variantCardStyles = {
    dashboardCard:
      "w-full xl:w-72 xl:max-w-72 xl:p-3 xl:h-40 xl:max-h-40 lg:w-60 lg:max-w-60 lg:p-3 lg:h-40 lg:max-h-40 p-1 mb-12 text-xl text-center bg-calendar_count_text -mt-10",
    contactCard: " z-10 relative bg-black/90 w-60 lg:p-4 lg:w-[290px] lg:h-36 text-left md:w-60 md:h-auto ",
  };

  return (
    <div
      className={twMerge(
        `${baseCard} ${variantCardStyles[variant]} ${className}`
      )}
      {...props}
    >
      <div className=" text-white p-1 sm:p-2 gap-1">{children}</div>
    </div>
  );
}
