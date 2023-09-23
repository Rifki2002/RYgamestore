import React from "react";
export default function Dashboard() {
  return (
    <div className="flex flex-row">

      <section className="bg-white w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
          <svg
            className="mx-auto mb-4 w-10 h-10 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z"
              clipRule="evenodd"
            />
          </svg>

          <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-black lg:mb-6 md:text-5xl xl:text-6xl">
            Welcome to Dashboard
          </h1>
          <p className="font-light text-black md:text-lg xl:text-xl">
            You can create, read, update, and delete data job here
          </p>
        </div>
      </section>
    </div>
  );
}
