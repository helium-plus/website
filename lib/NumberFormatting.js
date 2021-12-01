import React from "react";
import NumberFormat from "react-number-format";

export const formatNumber = (incomingNumber, typeOfNumber, decimalScale) => {
  if (typeOfNumber === "HNT") {
    return (
      <NumberFormat
        value={parseFloat(incomingNumber)}
        suffix=" HNT"
        decimalScale={decimalScale}
        thousandSeparator={true}
        displayType={"text"}
      />
    );
  } else if (typeOfNumber === "%") {
    return (
      <NumberFormat
        value={parseFloat(incomingNumber * 100)}
        suffix="%"
        decimalScale={decimalScale}
        thousandSeparator={true}
        displayType={"text"}
      />
    );
  } else if (typeOfNumber === "USD") {
    return (
      <NumberFormat
        value={incomingNumber}
        thousandSeparator={true}
        fixedDecimalScale={decimalScale === 2 ? true : false}
        decimalScale={decimalScale}
        prefix={"$"}
        displayType={"text"}
      />
    );
  } else {
    return (
      <NumberFormat
        value={parseFloat(incomingNumber)}
        thousandSeparator={true}
        decimalScale={decimalScale}
        displayType={"text"}
      />
    );
  }
};
