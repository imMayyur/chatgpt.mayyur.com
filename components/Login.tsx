'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
function Login() {
  return (
    <div
      className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center
    "
    >
      <Image src="https://links.papareact.com/2i6" width={300} height={300} alt="Logo" />
      <button
        className="p-5 bg-white rounded-full text-[#11A37F] font-bold mt-10 hover:shadow-xl active:scale-90 animate-pulse hover:animate-none"
        onClick={() => {
          signIn('google');
        }}
      >
        Sign in to use ChatGPT
      </button>
    </div>
  );
}

export default Login;
