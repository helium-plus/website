import React from "react";

const HotspotCalculatorRow = (props) => {
  return (
    <>
      <div className="flex flex-row">
        <div className="bg-black p-3 rounded-b-lg ml-4 lg:ml-6 flex flex-row items-center">
          <p className="font-display text-hpgreen-100">{props.name}</p>

          {!props.firstRow && (
            <button
              className="font-body text-black text-sm font-bold p-1 ml-4 bg-gray-900 rounded-full focus:outline-none focus:border-none"
              onClick={props.removeRowHandler}
            >
              <svg
                className={`w-4 h-auto stroke-text text-gray-600`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="px-4 lg:px-8 pb-10 pt-2">
        <p className="font-body text-gray-300 pb-2 pt-4 text-md">
          How many hotspots are currently active near the location where you're
          planning on putting this hotspot?
        </p>
        <p className="opacity-25 font-body text-gray-300 pb-8 text-md">
          Tip: Not sure? Check{" "}
          <a
            target="_blank"
            href="https://network.helium.com/coverage"
            className="text-hpgreen-100 focus:outline-none focus:border-none"
          >
            the network coverage map
          </a>
          .
        </p>

        <div className="flex flex-col lg:flex-row justify-start align-start">
          <button
            className={`w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600  p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0 focus:border-solid focus:outline-none ${
              props.selectedDensity === 1
                ? "border-solid border-2 border-hpgreen-100 focus:shadow-none"
                : ""
            }`}
            onClick={props.density1Handler}
          >
            <p className="text-base font-display text-white">None</p>
          </button>
          <button
            className={`w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600  p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0 focus:border-solid focus:outline-none ${
              props.selectedDensity === 2
                ? "border-solid border-2 border-hpgreen-100 focus:shadow-none"
                : ""
            }`}
            onClick={props.density2Handler}
          >
            <p className="text-base font-display text-white">A few</p>
          </button>
          <button
            className={`w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600  p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0 focus:border-solid focus:outline-none ${
              props.selectedDensity === 3
                ? "border-solid border-2 border-hpgreen-100 focus:shadow-none"
                : ""
            }`}
            onClick={props.density3Handler}
          >
            <p className="text-base font-display text-white">Several</p>
          </button>
        </div>
      </div>
      <div className="bg-hpblue-1000 h-px w-full" />
    </>
  );
};

export default HotspotCalculatorRow;
