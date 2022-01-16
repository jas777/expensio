import React from 'react';
import Link from 'next/link';

const Logout = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="py-4 bg-white shadow-lg text-center font-heading">
          <h1 className="font-heading text-gray-800 text-3xl flex justify-center py-2">
            You have been logged out
          </h1>
          <Link href="/">
            <a className="inline-block align-baseline font-normal text-xl text-primary hover:text-primary-darker">
              &larr; Go to homepage
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
