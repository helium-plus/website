import { useState } from "react";

import CurrencyFormat from "react-currency-format";
import NavBar from "../components/core/NavBar";
import MetaTags from "../components/core/MetaTags";
import { getDataFromCache } from "../utils/getDataFromCache";

const hpGreen = `#42DE9F`;
const hpBlue = `#42D1E4`;
const hpLightGrey = `#CCC`;
const hpWhite = `#FFF`;

const EarningsCalculator = ({ priceData }) => {
  const [earningsPerDay, setEarningsPerDay] = useState(0.01);
  const [earningsPerDayInputIsEmpty, setEarningsPerDayInputIsEmpty] =
    useState(true);

  const [numberOfHotspots, setNumberOfHotspots] = useState(1);
  const [numberOfHotspotsInputIsEmpty, setNumberOfHotspotsInputIsEmpty] =
    useState(true);

  const handleNumberOfHotspotsChange = (event) => {
    const prevNumberOfHotspots = numberOfHotspots;

    if (event.target.value !== undefined && event.target.value !== "") {
      if (event.target.value % 1 === 0) {
        setNumberOfHotspots(+event.target.value);
        setNumberOfHotspotsInputIsEmpty(false);
      } else {
        setNumberOfHotspots(+prevNumberOfHotspots);
        setNumberOfHotspotsInputIsEmpty(false);
      }
    } else {
      setNumberOfHotspots(1);
      setNumberOfHotspotsInputIsEmpty(true);
    }
  };
  const handleEarningsPerDayChange = (event) => {
    const prevEarningsPerDay = earningsPerDay;

    if (event.target.value !== undefined && event.target.value !== "") {
      setEarningsPerDay(+event.target.value);
      setEarningsPerDayInputIsEmpty(false);
    } else {
      setEarningsPerDay(5);
      setEarningsPerDayInputIsEmpty(true);
    }
  };

  let hntUsdExchangeRate = 0.4;

  if (priceData.price.floatBalance !== undefined) {
    hntUsdExchangeRate = priceData.price.floatBalance;
  }

  const totalEstimate = earningsPerDay * numberOfHotspots * 365;
  const totalEstimateInUsd = totalEstimate * hntUsdExchangeRate;

  return (
    <>
      <NavBar />
      <MetaTags title={"Simple Helium Earnings Calculator — Helium Plus"} />
      <div className="flex align-center justify-center">
        <main className="max-w-xl px-5 pt-10">
          <h1 className="font-display text-white text-4xl tracking-tighter leading-tight pb-10">
            Helium Hotspot Earnings Calculator
          </h1>
          <input
            type="number"
            min="0"
            pattern="[0-9]"
            step="1"
            id="number-of-hotspots-input"
            placeholder={1}
            autoFocus
            onChange={handleNumberOfHotspotsChange}
            value={numberOfHotspotsInputIsEmpty ? "" : numberOfHotspots}
            className="mr-4 font-body px-2 py-1 rounded-lg outline-none border border-transparent focus:border-hpgreen-100 border-solid transition-all duration-100"
          />
          <input
            type="number"
            id="earnings-per-day-input"
            placeholder={0.01}
            value={earningsPerDayInputIsEmpty ? "" : earningsPerDay}
            onChange={handleEarningsPerDayChange}
            step="1"
            className="font-body px-2 py-1 rounded-lg outline-none border border-transparent focus:border-hpgreen-100 border-solid transition-all duration-100"
          />

          <p className="font-display text-white text-lg pt-4">
            With {numberOfHotspots} hotspot
            {numberOfHotspots === 1 ? "" : "s"}
            {numberOfHotspots === 1 ? "" : ", each one"} earning roughly{" "}
            {earningsPerDay}
            {" HNT "}
            per day, you'll make{" "}
            <CurrencyFormat
              value={totalEstimate}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={0}
              renderText={(value) => (
                <span className="font-display bg-black text-hpblue-100 px-2 py-1 rounded-lg">
                  {value}
                </span>
              )}
            />{" "}
            HNT per year.{" "}
          </p>
          <p className="font-display text-white text-lg pt-4">
            That's{" "}
            <CurrencyFormat
              value={totalEstimateInUsd}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"$"}
              renderText={(value) => (
                <span className="font-display bg-black text-hpgreen-100 px-2 py-1 rounded-lg">
                  {value}
                </span>
              )}
            />{" "}
            USD per year at an exchange rate of {hntUsdExchangeRate} USD per HNT
            token.
          </p>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const priceData = await getDataFromCache("hp-prices");

  return {
    revalidate: 60 * 30,
    props: { priceData },
  };
}

export default EarningsCalculator;
