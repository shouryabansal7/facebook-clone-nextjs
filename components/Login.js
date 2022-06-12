import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

function Login(props) {
  return (
    <div className="grid place-content-center mt-[17%]">
      <Image
        height="200"
        objectFit="contain"
        width="200"
        src="https://links.papareact.com/5me"
      />
      <h1
        onClick={signIn}
        className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer mt-5"
      >
        Login with Facebook
      </h1>
    </div>
  );
}

export default Login;
