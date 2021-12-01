import React from "react";
import Link from "next/link";

const Card = (props) => {
  return (
    <Link href={props.link}>
      <a className="transition duration-300 ease-in-out transform hover:-translate-y-1 p-6 bg-gray-100 focus:border-none hover:bg-white w-full rounded-lg flex">
        <div className="pr-6">
          <div className="w-8 h-auto">
            {/* The SVG icon */}
            {/* TODO: find the best way to make an Icon component */}
            {props.children}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-gray-900 font-bold text-xl mb-2 pr-8 font-display">
            {props.title}
          </h3>
          <p className="text-gray-700 font-body max-w-sm pr-8">
            {props.description}
          </p>
        </div>
      </a>
    </Link>
  );
};
export default Card;
