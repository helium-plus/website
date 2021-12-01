import React from "react";

const Button = (props) => {
  let icon = (
    <svg
      className={`ml-4 w-4 h-auto stroke-text text-${props.buttonForegroundColor}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  if (props.buttonIcon === "none") {
    icon = <></>;
  } else if (props.buttonIcon === "back") {
    icon = (
      <svg
        className={`mr-4 w-4 h-auto stroke-text text-${props.buttonForegroundColor}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    );
  } else if (props.buttonIcon === "plus") {
    icon = (
      <svg
        className={`ml-4 w-4 h-auto stroke-text text-${props.buttonForegroundColor}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    );
  } else if (props.buttonIcon === "edit") {
    icon = (
      <svg
        className={`ml-4 w-4 h-auto stroke-text text-${props.buttonForegroundColor}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    );
  } else if (props.buttonIcon === "refresh") {
    icon = (
      <svg
        className={`ml-4 w-4 h-auto stroke-text text-${props.buttonForegroundColor}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    );
  }

  return (
    <button
      className={`focus:outline-none font-body text-${
        props.buttonForegroundColor
      } px-4 py-1 mr-4 h-10 bg-${
        props.buttonBackgroundColor
      } rounded-md min-w-32 flex ${
        props.buttonIcon !== "back" ? "flex-row" : "flex-row-reverse"
      } items-center text-base leading-7`}
      onClick={props.onClick}
    >
      {props.buttonText}
      {icon}
    </button>
  );
};

export default Button;
