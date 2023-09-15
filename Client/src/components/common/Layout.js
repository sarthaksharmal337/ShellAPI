import React from "react";

export default function AuthLayout(props) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src="/shell.png"
              alt="Shell Order"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {props.title}
            </h2>
          </div>
  
          <div className="mt-10">
            {props.children}
          </div>
        </div>
      </>
    )
  }
  