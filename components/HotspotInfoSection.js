import React from "react";
import { formatNumber } from "../lib/NumberFormatting";

const HotspotInfoSection = (props) => {
  return (
    <div className="flex flex-col border border-hpblue-700 rounded-lg bg-hpblue-800 p-2 justify-between">
      <div className="pt-2 px-2">
        <p className="text-sm font-display text-gray-500 text-right">
          {props.rewardName}
        </p>
        <p className="text-sm font-display text-gray-600 text-right">
          ({props.rewardName === "Data Transfer" ? "Up to " : ""}
          {formatNumber(props.rewardPercent, "%", 2)})
        </p>
        <p className="text-sm font-display text-hpblue-100 text-right">
          {formatNumber(props.rewardTotal * props.rewardPercent, "HNT", 0)}
        </p>
        {(props.rewardName === "Data Transfer" && props.dcUsage !== 0) ||
        (props.surplus !== 0 && props.surplus !== undefined) ? (
          <p
            className={`text-sm font-display ${
              props.surplus ? "text-green-300" : "text-red-300"
            } text-right`}
          >
            {props.surplus ? "+" : "-"}
            {props.surplus
              ? formatNumber(props.surplus, "HNT", 0)
              : formatNumber(props.dcUsage, "HNT", 0)}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row items-center justify-end px-2">
        <input
          id={`${props.rewardName.toLowerCase()}-input`}
          type="text"
          step="1"
          pattern="[0-9]*"
          className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-1/3 placeholder-gray-700 outline-none border-transparent focus:border-hpgreen-100 border-solid border transition-all duration-100"
          value={
            props.participationInputEmptyBoolean ? "" : props.participationValue
          }
          placeholder={props.participationValue}
          onChange={props.participationChangeHandler}
        />
        <label className="py-4 pl-1 w-24 text-right text-xs font-body text-gray-600 leading-tight">
          % of hotspots participating
        </label>
      </div>
    </div>
  );
};

export default HotspotInfoSection;
