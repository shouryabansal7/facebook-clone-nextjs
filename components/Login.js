import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/client";

function Login(props) {
  return (
    <div className="grid place-items-center">
      <Image
        height={400}
        objectFit="contain"
        width={400}
        src="https://links.papareact.com/5me"
      />
      <h1 className="p-5 bg-blue-500 rounded-full text-whie text-center cursor-pointer">
        Login with Facebook
      </h1>
    </div>
  );
}

export default Login;
