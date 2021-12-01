import { useState, useEffect } from "react";

import NavBar from "../components/core/NavBar";
import MetaTags from "../components/core/MetaTags";
import NumberFormat from "react-number-format";

const DataCreditsCalculator = () => {
  const [enteredAmount, setEnteredAmount] = useState(10);
  const [equivalentAmount, setEquivalentAmount] = useState(0);
  const [calculatorEnteringCurrency, setCalculatorEnteringCurrency] = useState(
    "usd"
  );

  const handleSwapCurrency = () => {
    if (calculatorEnteringCurrency === "dc") {
      setCalculatorEnteringCurrency("usd");
      setEnteredAmount((existing) => existing / 100000);
    } else {
      setCalculatorEnteringCurrency("dc");
      setEnteredAmount((existing) => existing * 100000);
    }
  };
  const handleEnteredAmountChange = (value) => {
    setEnteredAmount(value);
  };

  useEffect(() => {
    if (calculatorEnteringCurrency === "usd") {
      setEquivalentAmount(enteredAmount * 100000);
    } else {
      setEquivalentAmount(enteredAmount / 100000);
    }
  }, [enteredAmount, calculatorEnteringCurrency]);

  return (
    <>
      <NavBar />
      <MetaTags
        title={"Helium Data Credits Calculator — Helium Plus"}
        description={
          "A calculator to help you convert between USD and Helium Data Credits. Find out how many Data Credits you can get for a given number of U.S. Dollars, or vice versa."
        }
        ogImageUrl={"https://helium.plus/images/og/d-c-c.png"}
        url="https://helium.plus/data-credits-calculator"
      />

      <main className="flex items-center justify-center flex-col h-full pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-start flex-col lg:flex-row w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-64">
          <div className="max-w-2xl w-full flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-2xl text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              Helium Data Credits Calculator
            </h1>
            <div className="bg-gray-800 rounded-xl p-4 w-full mt-10">
              <div className="flex flex-row items-center justify-start">
                <NumberFormat
                  type="text"
                  step="1"
                  className="bg-white w-1/2 rounded-lg text-black text-2xl p-5"
                  value={enteredAmount}
                  placeholder={enteredAmount}
                  displayType={"input"}
                  thousandSeparator={true}
                  onValueChange={(values) => {
                    // To get the non-formatted value
                    const { value } = values;
                    handleEnteredAmountChange(value);
                  }}
                />
                <p className="text-gray-500 text-xl ml-5 w-10">
                  {calculatorEnteringCurrency === "dc" ? "DC" : "USD"}
                </p>
                <button
                  onClick={handleSwapCurrency}
                  className="bg-gray-700 rounded-lg w-10 ml-5 h-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-500 h-10 p-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
              </div>
              <p className="max-w-2xl pl-4 text-lg font-body pt-4 text-gray-500 text-left">
                is worth
              </p>
              <div className="rounded-lg bg-gray-900 p-5 mt-3">
                <div className="flex flex-row items-end justify-start">
                  <p className="max-w-5xl text-4xl font-body text-hpgreen-100 font-bold text-left break-all">
                    {calculatorEnteringCurrency === "usd"
                      ? equivalentAmount.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                        })
                      : equivalentAmount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                  </p>
                  <p className="text-gray-700 text-2xl pl-2 pb-1">
                    {calculatorEnteringCurrency === "dc" ? "USD" : "DC"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DataCreditsCalculator;
