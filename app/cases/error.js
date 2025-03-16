'use client';

export default function Error() {
  return (
    <main className=" mt-20 text-center ">
      <h1 className=" text-4xl m-3 font-semibold text-white/5 bg-gradient-to-r to-light_blue from-dark-blue bg-clip-text bg-cover bg-center ">An error occurred!</h1>
      <p className=" text-base font-normal ">Failed to fetch cases data. Please try again later.</p>
    </main>
  );
}