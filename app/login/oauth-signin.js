'use client';

import GoogleButton from '@/components/util/google_oAuth';
import { oAuthSignIn } from "./actions";


export default function OAuthButtons() {
  const oAuthProviders = [
    {
      name: "google",
      displayName: "Google",
      icon: <GoogleButton/> ,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <button type='button' key={provider.name} className=" w-full p-0 m-auto text-center "
        onClick={async () => {
          await oAuthSignIn(provider.name);
        }}
        >
          {provider.icon}
        </button>
      ))}
    </>
  );
}
