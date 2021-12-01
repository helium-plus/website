import { useState } from "react";

import NavBar from "../components/core/NavBar";
import Footer from "../components/core/Footer";
import MetaTags from "../components/core/MetaTags";

import { formatNumber } from "../lib/NumberFormatting";
import NumberFormat from "react-number-format";

import HotspotCalculatorRow from "../components/HotspotCalculatorRow";
import HotspotInfoSection from "../components/HotspotInfoSection";
import Button from "../components/core/Button";
import classNames from "classnames";

import { formatDistanceToNow } from "date-fns";
import { getDataFromCache } from "../utils/getDataFromCache";

const EarningsCalculator = ({
  chainVars,
  priceData,
  stats,
  ath,
  timestamp,
}) => {
  let hntUsdExchangeRate = 0.0;

  if (priceData.price.floatBalance !== undefined) {
    hntUsdExchangeRate = priceData.price.floatBalance;
  }

  let ath_delta = (ath - hntUsdExchangeRate) / ath;

  const [warningMessage, setWarningMessage] = useState("");

  const [hotspots, setHotspots] = useState([
    {
      number: 1,
      name: `Hotspot 1`,
      hotspotDensityManual: false,
      hotspotDensityManualArray: [
        { name: `Nearby hotspot 1`, metersAway: 500 },
      ],
      hotspotDensitySelection: 0,
    },
  ]);

  const addRow = () => {
    let hotspotsArray = [...hotspots];

    hotspotsArray.push({
      number: hotspotsArray.length + 1,
      name: `Hotspot ${hotspotsArray.length + 1}`,
      hotspotDensityManual: false,
      hotspotDensityManualArray: [
        { name: `Nearby hotspot 1`, metersAway: 500 },
      ],
      hotspotDensitySelection: 0,
    });

    setHotspots(hotspotsArray);
  };

  const removeRow = (number) => {
    let hotspotsArray = [...hotspots];

    hotspotsArray.splice(number - 1, 1);

    hotspotsArray.map((hotspot, index) => {
      hotspot.number = index + 1;
      hotspot.name = `Hotspot ${index + 1}`;
    });

    setHotspots(hotspotsArray);
  };

  const setDensity = (hotspotDensity, hotspotIndex) => {
    let hotspotsArray = [...hotspots];

    hotspotsArray.map((hotspot, index) => {
      if (index + 1 === hotspotIndex)
        hotspot.hotspotDensitySelection = hotspotDensity;
    });
    setHotspots(hotspotsArray);
  };

  const [editingValues, setEditingValues] = useState(true);

  const flipBetweenEditingAndCalculating = () => {
    let noDensitySelected = false;

    hotspots.map((hotspot, index) => {
      if (hotspot.hotspotDensitySelection === 0) noDensitySelected = true;
    });

    if (!noDensitySelected) {
      setEditingValues(!editingValues);
      setWarningMessage("");
    } else {
      setWarningMessage(
        "Please make sure you've answered every question for each hotspot."
      );
    }
  };

  const restartEditing = () => {
    let resetHotspotsArray = [
      {
        number: 1,
        name: `Hotspot 1`,
        hotspotDensityManual: false,
        hotspotDensityManualArray: [
          { name: `Nearby hotspot 1`, metersAway: 500 },
        ],
        hotspotDensitySelection: 0,
      },
    ];

    setHotspots(resetHotspotsArray);

    setEditingValues(true);
  };

  // Rewards split
  const monthlyRewards = chainVars.data.monthly_reward;
  const monthlyRewardsInHnt = monthlyRewards / 100000000;
  const challengerPercent = chainVars.data.poc_challengers_percent;
  const challengeePercent = chainVars.data.poc_challengees_percent;
  const witnessPercent = chainVars.data.poc_witnesses_percent;
  const consensusPercent = chainVars.data.consensus_percent;
  const dcPercent = chainVars.data.dc_percent;

  // Constants from API
  const numberOfActiveHotspots = stats.counts?.hotspots;

  const monthlyDataSpendInDataCredits = stats?.state_channel_counts?.last_month
    ?.num_dcs
    ? stats?.state_channel_counts?.last_month?.num_dcs
    : 10000000 * 30;

  const yearForCalculatorInitialValue = 2021;
  const yearForCalculatorActualValue = new Date().getFullYear();
  const [yearForCalculator, setYearForCalculator] = useState(
    yearForCalculatorInitialValue
  );

  const [
    monthlyDataSpendInDataCreditsInput,
    setMonthlyDataSpendInDataCreditsInput,
  ] = useState(monthlyDataSpendInDataCredits);

  const [rewardScale, setRewardScale] = useState(0.5);
  const [uptime, setUptime] = useState(95);

  const uptimeFallback = 95;
  const rewardScaleFallback = 0.5;

  const [activeHotspotsInput, setActiveHotspotsInput] = useState(
    numberOfActiveHotspots
  );
  const [usdHntInput, setUsdHntInput] = useState(hntUsdExchangeRate);

  const dataCreditInputOrActual = (dataCredits) => {
    if (
      monthlyDataSpendInDataCreditsInput > 0 &&
      monthlyDataSpendInDataCreditsInput !== monthlyDataSpendInDataCredits
    ) {
      return monthlyDataSpendInDataCreditsInput;
    } else {
      return dataCredits;
    }
  };

  const hotspotsInputOrActual = (hotspots) => {
    if (
      activeHotspotsInput > 0 &&
      activeHotspotsInput !== numberOfActiveHotspots
    ) {
      return activeHotspotsInput;
    } else {
      return hotspots;
    }
  };

  const monthlyDataSpendInUsd =
    dataCreditInputOrActual(monthlyDataSpendInDataCredits) * 0.00001;

  const monthlyDataSpendInHnt =
    monthlyDataSpendInUsd / priceData.price.floatBalance;

  const challengerPercentAnnualChange = -0.0005;
  const challengeePercentAnnualChange = -0.01;
  const witnessPercentAnnualChange = -0.0045;
  const consensusPercentAnnualChange = 0;
  const dcPercentAnnualChange = 0.025;

  const calculateProjectedPercent = (initialPercent, annualChange) => {
    const userInputtedYear = !isNaN(yearForCalculator)
      ? Math.floor(yearForCalculator)
      : yearForCalculator;

    if (
      isNaN(userInputtedYear) ||
      userInputtedYear === undefined ||
      userInputtedYear <= yearForCalculatorInitialValue
    ) {
      // The inputted year is not a valid number, or it's < 2020, so use the distribution from 2020
      return initialPercent;
    } else {
      // The inputted year is a valid number, and it's > 2020
      if (userInputtedYear - yearForCalculatorInitialValue >= 20) {
        // The inputted year is a valid number, and it's > 2040
        return initialPercent * Math.pow(1 + annualChange, 20);
      }
      // The inputted year is a valid number, and it's between 2020 and 2040
      else
        return (
          initialPercent *
          Math.pow(
            1 + annualChange,
            userInputtedYear - yearForCalculatorInitialValue
          )
        );
    }
  };

  // Editable participation rates
  const initialChallengerParticipationPercent = 99;
  const [challengerParticipationPercent, setChallengerParticipationPercent] =
    useState(initialChallengerParticipationPercent);
  const [
    challengerParticipationInputEmpty,
    setChallengerParticipationInputEmpty,
  ] = useState(false);

  const initialChallengeeParticipationPercent = 75;
  const [challengeeParticipationPercent, setChallengeeParticipationPercent] =
    useState(initialChallengeeParticipationPercent);
  const [
    challengeeParticipationInputEmpty,
    setChallengeeParticipationInputEmpty,
  ] = useState(false);

  const initialWitnessParticipationPercent = 75;
  const [witnessParticipationPercent, setWitnessParticipationPercent] =
    useState(initialWitnessParticipationPercent);
  const [witnessParticipationInputEmpty, setWitnessParticipationInputEmpty] =
    useState(false);

  const initialConsensusParticipationPercent = 80;
  const [consensusParticipationPercent, setConsensusParticipationPercent] =
    useState(initialConsensusParticipationPercent);
  const [
    consensusParticipationInputEmpty,
    setConsensusParticipationInputEmpty,
  ] = useState(false);

  const initialDcParticipationPercent = 40;
  const [dcParticipationPercent, setDcParticipationPercent] = useState(
    initialDcParticipationPercent
  );
  const [dcParticipationInputEmpty, setDcParticipationInputEmpty] =
    useState(false);

  const monthlyDataUsagePercent =
    monthlyDataSpendInHnt / (dcPercent * monthlyRewardsInHnt);

  const monthlyUnusedDataRewardsSurplusInHnt =
    dcPercent * monthlyRewardsInHnt * (1 - monthlyDataUsagePercent) > 0
      ? dcPercent * monthlyRewardsInHnt * (1 - monthlyDataUsagePercent)
      : 0;

  const surplusRewardTypesCombinedPercentages =
    calculateProjectedPercent(
      challengerPercent,
      challengerPercentAnnualChange
    ) +
    calculateProjectedPercent(
      challengeePercent,
      challengeePercentAnnualChange
    ) +
    calculateProjectedPercent(witnessPercent, witnessPercentAnnualChange);

  const challengerSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (calculateProjectedPercent(
      challengerPercent,
      challengerPercentAnnualChange
    ) /
      surplusRewardTypesCombinedPercentages);

  const challengeeSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (calculateProjectedPercent(
      challengeePercent,
      challengeePercentAnnualChange
    ) /
      surplusRewardTypesCombinedPercentages);

  const witnessSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (calculateProjectedPercent(witnessPercent, witnessPercentAnnualChange) /
      surplusRewardTypesCombinedPercentages);

  let totalEarnings = 0;

  const participationChangeHandler = (e) => {
    if (e.target.id === "challenger-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setChallengerParticipationPercent(e.target.value);
        setChallengerParticipationInputEmpty(false);
      } else {
        setChallengerParticipationInputEmpty(true);
        setChallengerParticipationPercent(
          initialChallengerParticipationPercent
        );
      }
    } else if (e.target.id === "challengee-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setChallengeeParticipationPercent(e.target.value);
        setChallengeeParticipationInputEmpty(false);
      } else {
        setChallengeeParticipationInputEmpty(true);
        setChallengeeParticipationPercent(
          initialChallengeeParticipationPercent
        );
      }
    } else if (e.target.id === "witness-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setWitnessParticipationPercent(e.target.value);
        setWitnessParticipationInputEmpty(false);
      } else {
        setWitnessParticipationInputEmpty(true);
        setWitnessParticipationPercent(initialWitnessParticipationPercent);
      }
    } else if (e.target.id === "consensus-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setConsensusParticipationPercent(e.target.value);
        setConsensusParticipationInputEmpty(false);
      } else {
        setConsensusParticipationInputEmpty(true);
        setConsensusParticipationPercent(initialConsensusParticipationPercent);
      }
    } else if (e.target.id === "data transfer-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setDcParticipationPercent(e.target.value);
        setDcParticipationInputEmpty(false);
      } else {
        setDcParticipationInputEmpty(true);
        setDcParticipationPercent(initialDcParticipationPercent);
      }
    }
  };

  return (
    <>
      <NavBar />
      <MetaTags
        title={"Helium Hotspot Earnings Calculator — Helium Plus"}
        description={
          "A calculator to help give you a rough estimate of how much HNT a hotspot might be able to earn based on its situation and the current state of the Helium network and HNT reward distribution."
        }
        ogImageUrl={"https://helium.plus/images/og/e-c.png"}
        url="https://helium.plus/earnings-calculator"
      />

      <main className="flex items-center justify-center flex-col h-full pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-start flex-col lg:flex-row w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-64">
          <div className="max-w-2xl w-full flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-2xl text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              Helium Hotspot Earnings Calculator
            </h1>
            <div className="bg-gray-600 rounded-md mt-5 px-4 py-2">
              <p className="text-lg font-display text-black">
                Data last updated {formatDistanceToNow(timestamp)} ago
              </p>
            </div>
            <p className="max-w-2xl text-lg font-body pt-4 text-gray-500 text-left">
              This tool can be used to give a rough estimate of how much HNT a
              Helium hotspot might earn, based on its situation and the current
              state of the Helium network and the current HNT reward
              distribution.
            </p>
            <div className="bg-yellow-300 bg-opacity-75 rounded-xl mt-10 p-5">
              <div className="flex flex-row items-center justify-start mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-auto mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-sm font-bold font-display">DISCLAIMER</p>
              </div>
              <p className="text-md font-normal font-display">
                This website is not affiliated with Helium Inc., and nothing on
                this website should be construed as financial advice or used as
                the basis of any investment or financial decisions. There's also
                no guarantee that the numbers on this site will be up to date or
                accurate, so please do your own research and calculations.
              </p>
            </div>
            {/* <p className="max-w-2xl text-lg font-body pt-4 text-gray-500 text-left">
              A much simpler version of this tool can be found{" "}
              <Link href="/simple-earnings-calculator">
              <a className="text-hpgreen-100 focus:outline-none focus:border-none">
              here.
              </a>
              </Link>
            </p> */}
          </div>
        </section>
        <section className="md:bg-gray-400 flex-auto w-full flex items-center lg:items-start justify-end flex-col pb-20 lg:pb-32">
          <div className="max-w-xl w-full lg:max-w-5xl mx-auto px-0 lg:px-12 lg:-mt-48 mt-6">
            {editingValues ? (
              <div className="bg-hpblue-800 shadow-xl w-full rounded-xl">
                {hotspots.map((hotspot) => {
                  return (
                    <HotspotCalculatorRow
                      name={hotspot.name}
                      removeRowHandler={() => removeRow(hotspot.number)}
                      firstRow={hotspot.number === 1}
                      density1Handler={() => setDensity(1, hotspot.number)}
                      density2Handler={() => setDensity(2, hotspot.number)}
                      density3Handler={() => setDensity(3, hotspot.number)}
                      selectedDensity={hotspot.hotspotDensitySelection}
                    />
                  );
                })}
                <div className="px-4 lg:px-8 py-5 bg-hpblue-1000 rounded-b-xl">
                  {warningMessage !== "" && (
                    <p className="text-hpgreen-100 font-body font-bold pb-4">
                      {warningMessage}
                    </p>
                  )}
                  <div className="flex flex-row">
                    <Button
                      buttonForegroundColor="black"
                      buttonBackgroundColor="hpgreen-100"
                      onClick={flipBetweenEditingAndCalculating}
                      buttonText="See results"
                    />
                    <Button
                      buttonForegroundColor="gray-600"
                      buttonBackgroundColor="hpblue-800"
                      onClick={addRow}
                      buttonText="Add hotspot"
                      buttonIcon="plus"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-hpblue-800 w-full rounded-xl">
                {hotspots.map((hotspot, index) => {
                  let hotspotEarnings = 0;

                  let loneWolfness = hotspot.hotspotDensitySelection;

                  let challengerRewards =
                    (monthlyRewardsInHnt *
                      calculateProjectedPercent(
                        challengerPercent,
                        challengerPercentAnnualChange
                      )) /
                    (hotspotsInputOrActual(numberOfActiveHotspots) *
                      (challengerParticipationPercent / 100));

                  let challengeeRewards =
                    loneWolfness === 1
                      ? 0
                      : (monthlyRewardsInHnt *
                          calculateProjectedPercent(
                            challengeePercent,
                            challengeePercentAnnualChange
                          )) /
                        (hotspotsInputOrActual(numberOfActiveHotspots) *
                          (challengeeParticipationPercent / 100));

                  let witnessRewards =
                    loneWolfness === 1
                      ? 0
                      : (monthlyRewardsInHnt *
                          calculateProjectedPercent(
                            witnessPercent,
                            witnessPercentAnnualChange
                          )) /
                        (hotspotsInputOrActual(numberOfActiveHotspots) *
                          (witnessParticipationPercent / 100));

                  let consensusRewards = 0;
                  // loneWolfness < 3
                  //   ? 0
                  //   : monthlyRewardsInHnt *
                  //     calculateProjectedPercent(
                  //       consensusPercent,
                  //       consensusPercentAnnualChange
                  //     ) *
                  //     (1 /
                  //       (hotspotsInputOrActual(numberOfActiveHotspots) *
                  //         (consensusParticipationPercent / 100)));

                  let dataRewards =
                    (monthlyRewardsInHnt * dcPercent -
                      monthlyUnusedDataRewardsSurplusInHnt) /
                    (hotspotsInputOrActual(numberOfActiveHotspots) *
                      (dcParticipationPercent / 100));

                  hotspotEarnings += challengerRewards;
                  hotspotEarnings += challengeeRewards;
                  hotspotEarnings += witnessRewards;
                  hotspotEarnings += consensusRewards;
                  hotspotEarnings += dataRewards;

                  totalEarnings += hotspotEarnings;

                  return (
                    <>
                      <div>
                        <div className="flex flex-row">
                          <div className="bg-black p-3 rounded-b-lg ml-4 lg:ml-6 flex flex-row items-center">
                            <p className="font-display text-hpgreen-100">
                              Hotspot {hotspot.number}
                            </p>
                          </div>
                        </div>

                        {/* Challenger rewards */}
                        {/* TODO: turn this block into a HotspotRewardsRow component */}
                        <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Challenger rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {formatNumber(
                                calculateProjectedPercent(
                                  challengerPercent,
                                  challengerPercentAnnualChange
                                ),
                                "%",
                                2
                              )}{" "}
                              of the{" "}
                              {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                              minted every month, divided between{" "}
                              {formatNumber(
                                hotspotsInputOrActual(numberOfActiveHotspots) *
                                  (challengerParticipationPercent / 100),
                                "int",
                                0
                              )}{" "}
                              hotspots, plus a bonus from redistributed HNT from
                              data rewards.
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(challengerRewards, "HNT", 2)}
                          </p>
                        </div>

                        {/* Challengee rewards */}
                        <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Challengee rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {loneWolfness === 1 ? (
                                <>
                                  Since your hotspot won't have any others
                                  nearby, it likely isn't eligible for this
                                  reward type.
                                </>
                              ) : (
                                <>
                                  {formatNumber(
                                    calculateProjectedPercent(
                                      challengeePercent,
                                      challengeePercentAnnualChange
                                    ),
                                    "%",
                                    2
                                  )}{" "}
                                  of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, divided between{" "}
                                  {formatNumber(
                                    hotspotsInputOrActual(
                                      numberOfActiveHotspots
                                    ) *
                                      (challengeeParticipationPercent / 100),
                                    "int",
                                    0
                                  )}{" "}
                                  hotspots, plus a bonus from redistributed HNT
                                  from data rewards.
                                </>
                              )}
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(challengeeRewards, "HNT", 2)}
                          </p>
                        </div>

                        {/* Witness rewards */}
                        <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Witness rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {loneWolfness === 1 ? (
                                <>
                                  Since your hotspot won't have any others
                                  nearby, it likely isn't eligible for this
                                  reward type.
                                </>
                              ) : (
                                <>
                                  {formatNumber(
                                    calculateProjectedPercent(
                                      witnessPercent,
                                      witnessPercentAnnualChange
                                    ),
                                    "%",
                                    2
                                  )}{" "}
                                  of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, divided between{" "}
                                  {formatNumber(
                                    hotspotsInputOrActual(
                                      numberOfActiveHotspots
                                    ) *
                                      (witnessParticipationPercent / 100),
                                    "int",
                                    0
                                  )}{" "}
                                  hotspots, plus a bonus from redistributed HNT
                                  from data rewards.
                                </>
                              )}
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(witnessRewards, "HNT", 2)}
                          </p>
                        </div>

                        {/* Consensus rewards */}
                        {/* <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Consensus rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {loneWolfness < 3 ? (
                                <>
                                  Your hotspot likely won't have enough nearby
                                  hotspots in order to get elected to consensus
                                  groups.
                                </>
                              ) : (
                                <>
                                  {formatNumber(
                                    calculateProjectedPercent(
                                      consensusPercent,
                                      consensusPercentAnnualChange
                                    ),
                                    "%",
                                    2
                                  )}{" "}
                                  of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, assuming your hotspot has
                                  an equal chance of being elected as the other{" "}
                                  {formatNumber(
                                    hotspotsInputOrActual(
                                      numberOfActiveHotspots
                                    ) *
                                      (consensusParticipationPercent / 100) -
                                      1,
                                    "int",
                                    0
                                  )}{" "}
                                  hotspots.
                                </>
                              )}
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(consensusRewards, "HNT", 2)}
                          </p>
                        </div> */}

                        {/* Data transfer rewards */}
                        <div className="px-4 pb-5 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Data transfer rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {formatNumber(
                                calculateProjectedPercent(
                                  dcPercent,
                                  dcPercentAnnualChange
                                ),
                                "%",
                                2
                              )}{" "}
                              of the{" "}
                              {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                              minted every month, minus the HNT equivalent of
                              any Data Credit purchases required to meet the{" "}
                              {formatNumber(
                                calculateProjectedPercent(
                                  dcPercent,
                                  dcPercentAnnualChange
                                ),
                                "%",
                                2
                              )}{" "}
                              allocation, and divided between{" "}
                              {formatNumber(
                                hotspotsInputOrActual(numberOfActiveHotspots) *
                                  (dcParticipationPercent / 100),
                                "int",
                                0
                              )}{" "}
                              hotspots.
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(dataRewards, "HNT", 2)}
                          </p>
                        </div>
                      </div>
                      {hotspots.length > 1 && (
                        <div className="flex justify-end align-center bg-hpblue-900 mb-10">
                          <p className="text-right font-display text-gray-200 text-4xl p-5">
                            {formatNumber(hotspotEarnings, "HNT", 2)}
                          </p>
                        </div>
                      )}

                      {index + 1 !== hotspots.length && (
                        <div className="bg-hpblue-1000 w-full h-px" />
                      )}
                    </>
                  );
                })}
                <div className="flex flex-col lg:flex-col justify-end align-end bg-hpgreen-100 p-5 mt-10">
                  <p className="text-gray-900 font-display text-xl text-right lg:pr-0">
                    Based on the below assumptions,{" "}
                    {hotspots.length > 1 ? "these hotspots " : "this hotspot "}
                    could earn around
                  </p>
                  <div className="flex flex-col justify-end align-end">
                    <p className="text-black leading-tight font-bold font-display text-4xl text-right">
                      {formatNumber(
                        totalEarnings *
                          (rewardScale ? rewardScale : rewardScaleFallback) *
                          (uptime ? uptime / 100 : uptimeFallback / 100),
                        "HNT",
                        2
                      )}
                    </p>
                    <p className="font-display text-xl text-gray-900 text-right">
                      in total per month.
                    </p>
                    <p className="pt-5 font-display text-xl text-gray-900 text-right">
                      That's
                    </p>
                    <p className="text-black leading-tight font-bold font-display text-4xl text-right">
                      {formatNumber(
                        totalEarnings *
                          (rewardScale ? rewardScale : rewardScaleFallback) *
                          (uptime ? uptime / 100 : uptimeFallback / 100) *
                          (usdHntInput > 0 &&
                          usdHntInput !== undefined &&
                          usdHntInput !== ""
                            ? usdHntInput
                            : hntUsdExchangeRate),
                        "USD",
                        2
                      )}
                    </p>
                    <p className="font-display text-xl text-gray-900 text-right">
                      at{" "}
                      {usdHntInput > 0 &&
                      usdHntInput !== undefined &&
                      usdHntInput !== "" &&
                      usdHntInput !== hntUsdExchangeRate ? (
                        <>
                          an exchange rate of{" "}
                          {formatNumber(usdHntInput, "USD", 2)}/HNT
                        </>
                      ) : (
                        <>
                          the current HNT/USD exchange rate of{" "}
                          {formatNumber(hntUsdExchangeRate, "USD", 2)}/HNT
                        </>
                      )}
                      .
                    </p>
                  </div>
                </div>

                <div className="bg-hpblue-700 px-4 lg:px-8 py-8">
                  <p className="text-xl font-display text-gray-300 pb-4">
                    Calculator assumptions
                  </p>
                  <div className="pb-2">
                    <p className="text-md font-display text-gray-500">
                      Assumptions about{" "}
                      {hotspots.length > 1 ? "these hotspots" : "this hotspot"}
                    </p>
                  </div>
                  <div className="pb-6 grid gap-2 grid-cols-2">
                    <div className="flex flex-col border border-hpblue-700 rounded-lg col-span-2 lg:col-span-1 bg-hpblue-800 p-5 justify-between">
                      <p className="text-md pb-4 font-display text-gray-500 flex flex-row items-center">
                        Density scaling factor
                        <a
                          className="flex flex-row items-center justify-center ml-4 bg-hpblue-600 hover:bg-hpblue-700 duration-100 transition-all rounded-md px-2 py-1"
                          href="https://docs.helium.com/blockchain/proof-of-coverage/#poc-reward-scaling"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="text-xs">Read more</span>
                          <span className="text-gray-600 ml-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </span>
                        </a>
                      </p>
                      <p className="text-xs text-gray-400 mb-4 font-display h-full">
                        This number is essentially a measure of how much your
                        hotspot's earnings potential will be shared with those
                        around it. This number is closer to 0.00 the more dense
                        an area is, and closer to 1.00 the more you're providing
                        coverage in new areas.
                      </p>
                      <div className="flex flex-col lg:flex-row align-center justify-start">
                        <NumberFormat
                          type="text"
                          step="1"
                          className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full placeholder-gray-700 outline-none border-transparent focus:border-hpgreen-100 border-solid border transition-all duration-100"
                          value={rewardScale}
                          placeholder={0.5}
                          displayType={"input"}
                          thousandSeparator={false}
                          decimalScale={10}
                          onValueChange={(values) => {
                            // To get the non-formatted value
                            let { value } = values;
                            if (value > 1) value = 1;
                            if (value < 0) value = 0;
                            if (value && !isNaN(value)) {
                              setRewardScale(value);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col border border-hpblue-700 rounded-lg col-span-2 lg:col-span-1 bg-hpblue-800 p-5 justify-between">
                      <p className="text-md font-display text-gray-500 pb-4">
                        Uptime
                      </p>
                      <p className="text-xs text-gray-400 mb-4 font-display h-full">
                        If your hotspot goes offline or loses its connection to
                        the internet, it cannot earn anything until it comes
                        back online and synchronizes with the blockchain again.
                      </p>
                      <div className="flex flex-col lg:flex-row align-center justify-start w-full">
                        <NumberFormat
                          type="text"
                          step="1"
                          className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full placeholder-gray-700 outline-none border-transparent focus:border-hpgreen-100 border-solid border transition-all duration-100"
                          value={uptime}
                          placeholder={"95%"}
                          displayType={"input"}
                          thousandSeparator={false}
                          decimalScale={100}
                          suffix={"%"}
                          onValueChange={(values) => {
                            // To get the non-formatted value
                            let { value } = values;

                            if (value > 100) value = 100;
                            if (value < 0) value = 0;
                            if (value && !isNaN(value)) {
                              setUptime(value);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pb-2">
                    <p className="text-md font-display text-gray-500">
                      {!isNaN(yearForCalculator) &&
                      yearForCalculator > yearForCalculatorInitialValue
                        ? `HNT rewards distribution in ${yearForCalculator}`
                        : `Current HNT rewards distribution`}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 pb-4">
                    <HotspotInfoSection
                      rewardName="Challenger"
                      rewardPercent={calculateProjectedPercent(
                        challengerPercent,
                        challengerPercentAnnualChange
                      )}
                      participationValue={challengerParticipationPercent}
                      participationInputEmptyBoolean={
                        challengerParticipationInputEmpty
                      }
                      surplus={challengerSurplusInHnt}
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                    <HotspotInfoSection
                      rewardName="Challengee"
                      rewardPercent={calculateProjectedPercent(
                        challengeePercent,
                        challengeePercentAnnualChange
                      )}
                      participationValue={challengeeParticipationPercent}
                      participationInputEmptyBoolean={
                        challengeeParticipationInputEmpty
                      }
                      surplus={challengeeSurplusInHnt}
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                    <HotspotInfoSection
                      rewardName="Witness"
                      rewardPercent={calculateProjectedPercent(
                        witnessPercent,
                        witnessPercentAnnualChange
                      )}
                      participationValue={witnessParticipationPercent}
                      participationInputEmptyBoolean={
                        witnessParticipationInputEmpty
                      }
                      surplus={witnessSurplusInHnt}
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                    {/* <HotspotInfoSection
                      rewardName="Consensus"
                      rewardPercent={calculateProjectedPercent(
                        consensusPercent,
                        consensusPercentAnnualChange
                      )}
                      participationValue={consensusParticipationPercent}
                      participationInputEmptyBoolean={
                        consensusParticipationInputEmpty
                      }
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    /> */}
                    <HotspotInfoSection
                      rewardName="Data Transfer"
                      rewardPercent={calculateProjectedPercent(
                        dcPercent,
                        dcPercentAnnualChange
                      )}
                      participationValue={dcParticipationPercent}
                      participationInputEmptyBoolean={dcParticipationInputEmpty}
                      rewardTotal={monthlyRewardsInHnt}
                      dcUsage={monthlyUnusedDataRewardsSurplusInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                  </div>

                  <div className="pb-2">
                    <p className="text-md font-display text-gray-500">
                      Other data that influences calculations
                    </p>
                  </div>

                  <div className="pb-6 grid gap-2 grid-cols-2">
                    <div className="flex flex-col border border-hpblue-700 rounded-lg bg-hpblue-800 p-5 col-span-2 lg:col-span-1 justify-between">
                      <p className="text-md pb-4 font-display text-gray-500">
                        USD price of HNT
                      </p>
                      <div className="flex flex-col lg:flex-row align-center justify-end lg:space-x-4">
                        <NumberFormat
                          type="text"
                          step="1"
                          className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full lg:w-1/2 placeholder-gray-700 outline-none border-transparent focus:border-hpgreen-100 border-solid border transition-all duration-100"
                          value={usdHntInput}
                          prefix={"$"}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          placeholder={hntUsdExchangeRate}
                          displayType={"input"}
                          thousandSeparator={true}
                          onValueChange={(values) => {
                            // To get the non-formatted value
                            const { value } = values;
                            setUsdHntInput(value);
                          }}
                        />
                        <a
                          href="https://ath.ooo/HNT?ref=helium.plus"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black px-2 py-2 mt-2 lg:mt-0 w-full lg:w-1/2 outline-none border border-solid border-gray-700 hover:border-hpgreen-100 transition-all duration-100 rounded-lg flex"
                        >
                          <span className="flex flex-col w-1/2 justify-start items-start">
                            <span className="text-gray-600 text-xs font-display">
                              HNT ATH
                            </span>
                            <span className="text-white text-xl font-display">
                              ${ath}
                            </span>
                            <p
                              className={classNames(
                                "text-xs font-body text-center lg:text-left text-gray-600 leading-tight",
                                {
                                  "text-hpgreen-100": ath_delta < 0.025,
                                  "text-gray-200": ath_delta > 0.025,
                                  "text-red-200": ath_delta > 0.05,
                                  "text-red-300": ath_delta > 0.075,
                                  "text-red-400": ath_delta > 0.1,
                                  "text-red-500": ath_delta > 0.25,
                                  "text-red-600": ath_delta > 0.5,
                                }
                              )}
                            >
                              {ath_delta > 0 ? "-" : ""}
                              {(ath_delta * 100).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2,
                              })}
                              % off ATH
                            </p>
                          </span>
                          <span className="flex flex-col items-end justify-between w-1/2">
                            <span className="text-gray-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </span>
                            <img
                              src="/images/hnt_ath_svg.svg"
                              className="w-5 h-5 mb-1 mr-1"
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col border border-hpblue-700 rounded-lg col-span-2 lg:col-span-1 bg-hpblue-800 p-5 justify-between">
                      <p className="text-md pb-4 font-display text-gray-500">
                        Data Credit spend (30 days)
                      </p>
                      <div className="flex flex-col lg:flex-row align-center justify-end">
                        <NumberFormat
                          type="text"
                          step="1"
                          className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full lg:w-1/2 placeholder-gray-700 outline-none border-transparent focus:border-hpgreen-100 border-solid border transition-all duration-100"
                          value={monthlyDataSpendInDataCreditsInput}
                          placeholder={monthlyDataSpendInDataCredits}
                          displayType={"input"}
                          thousandSeparator={true}
                          onValueChange={(values) => {
                            // To get the non-formatted value
                            const { value } = values;
                            setMonthlyDataSpendInDataCreditsInput(value);
                          }}
                        />
                        <p className="pt-3 lg:py-1z lg:py-1 lg:mt-px px-4 w-full lg:w-1/2 text-md font-body text-center lg:text-left text-gray-600 leading-tight">
                          {formatNumber(monthlyDataSpendInUsd, "USD", 2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col border border-hpblue-700 rounded-lg bg-hpblue-800 p-5 justify-between">
                      <p className="text-md font-display text-gray-500">Year</p>
                      <NumberFormat
                        id={`year-for-calculator`}
                        type="text"
                        step="1"
                        className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full lg:w-1/2 placeholder-gray-700 outline-none border-transparent focus:border-hpgreen-100 border-solid border transition-all duration-100"
                        value={yearForCalculator}
                        decimalScale={0}
                        fixedDecimalScale={true}
                        placeholder={yearForCalculatorInitialValue}
                        onValueChange={(values) => {
                          // To get the non-formatted value
                          const { value } = values;
                          setYearForCalculator(value);
                        }}
                      />
                    </div>

                    <div className="flex flex-col border border-hpblue-700 rounded-lg bg-hpblue-800 p-5 justify-between">
                      <p className="text-md pb-4 font-display text-gray-500">
                        Active hotspots
                      </p>
                      <NumberFormat
                        id={`number-of-hotspots-input`}
                        type="text"
                        step="1"
                        className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full lg:w-1/2 placeholder-gray-700 outline-none border-transparent focus:border-hpgreen-100 border-solid border transition-all duration-100"
                        value={activeHotspotsInput}
                        placeholder={numberOfActiveHotspots}
                        displayType={"input"}
                        thousandSeparator={true}
                        onValueChange={(values) => {
                          const { value } = values;
                          setActiveHotspotsInput(value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-4 lg:px-8 py-5 bg-hpblue-1000 rounded-b-xl">
                  {warningMessage !== "" && (
                    <p className="text-hpgreen-100 font-body font-bold pb-4">
                      {warningMessage}
                    </p>
                  )}
                  <div className="flex flex-row">
                    <Button
                      buttonForegroundColor="black"
                      buttonBackgroundColor="hpgreen-100"
                      onClick={flipBetweenEditingAndCalculating}
                      buttonText="Edit hotspots"
                      buttonIcon="back"
                    />
                    <Button
                      buttonForegroundColor="gray-600"
                      buttonBackgroundColor="hpblue-800"
                      onClick={restartEditing}
                      buttonText="Restart"
                      buttonIcon="refresh"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export async function getStaticProps() {
  const timestamp = Date.now();
  // const chainVarsRes = await fetch(`https://api.helium.io/v1/vars`);
  // const chainVars = await chainVarsRes.json();

  const chainVars = await getDataFromCache("hp-vars");

  // const priceDataRes = await fetch(
  //   `https://api.helium.io/v1/oracle/prices/current`
  // );
  // const priceData = await priceDataRes.json();
  const priceData = await getDataFromCache("hp-prices");

  console.log(priceData);

  // const statsRes = await fetch(`https://api.helium.io/v1/stats`);
  // const stats = await statsRes.json();
  const stats = await getDataFromCache("hp-stats");

  const [{ ath }] = await (await fetch("https://ath.ooo/api/ath/hnt")).json();

  console.log("chainVars");
  // console.log("stats");
  // console.log(chainVars);

  return {
    revalidate: 60 * 30,
    props: {
      chainVars,
      priceData,
      stats,
      ath,
      timestamp,
    },
  };
}

export default EarningsCalculator;
