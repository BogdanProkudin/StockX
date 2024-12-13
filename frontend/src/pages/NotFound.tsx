import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-6xl">404</h1>
        <h2 className="text-3xl">Uh-oh! Something went wrong.</h2>
        <p className="text-2xl">
          Try exploring a new search or shop other products below.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <Link to="/">
            <button className="rounded-2xl bg-black px-4 py-2 text-xl font-semibold text-white">
              Homepage
            </button>
          </Link>
          <Link to="/help">
            <button className="rounded-2xl border border-black px-4 py-2 text-xl font-semibold text-black">
              Help Center
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
