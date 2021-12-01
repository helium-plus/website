import "../styles/index.css";

import React, { useState } from "react";

function checkIsBrave() {
  return typeof navigator.brave !== "undefined";
}

function DownloadBanner() {
  let isBrave = true;

  try {
    isBrave = checkIsBrave();
  } catch (err) {
    // console.log(err);
  }

  const [userHasClickedNoThankYou, setNoThankYou] = useState(false);

  return <></>;
  // !userHasClickedNoThankYou && !isBrave ? (
  //   <div className="hidden lg:block py-2 w-full bg-hpblue-800 shadow-md fixed bottom-0 z-10">
  //     <div className="lg:max-w-4xl mx-auto h-full flex justify-center align-center">
  //       <div className="w-full flex justify-between align-center">
  //         <div className="flex flex-row justify-start align-center">
  //           <BraveLogo />
  //           <div className="flex flex-col justify-start align-center">
  //             <p className="text-braveorange-100 font-display text-md">
  //               Like passive income? Get Brave: earn BAT just for browsing
  //             </p>
  //             <p className="text-xs text-gray-200 leading-tight font-body">
  //               Up to 8x faster than Chrome • Blocks ads and trackers • Supports
  //               Chrome Extensions
  //             </p>
  //           </div>
  //         </div>
  //         <div className="self-end flex flex-row justify-end align-center">
  //           <a
  //             className="transition duration-200 ease-in-out no-underline flex align-center justify-center px-5 py-2 mr-2 border-2 focus:outline-none focus:shadow-none border-braveorange-100 rounded-lg hover:bg-braveorange-100"
  //             onClick={() => setNoThankYou(true)}
  //             target="_blank"
  //             href="https://brave.com/hel465"
  //           >
  //             <p className="font-display h-full w-full text-white">Get Brave</p>
  //           </a>
  //           <button
  //             className="transition duration-200 ease-in-out font-display hover:bg-gray-900 px-5 py-2 rounded-lg text-gray-500 hover:cursor"
  //             onClick={() => {
  //               setNoThankYou(true);
  //             }}
  //           >
  //             No thanks
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ) : null;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <DownloadBanner />
    </>
  );
}
