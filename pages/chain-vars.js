import { useEffect, useState, useRef } from "react";
import NavBar from "../components/core/NavBar";
import MetaTags from "../components/core/MetaTags";
import { formatDistanceToNow } from "date-fns";
import { getDataFromCache } from "../utils/getDataFromCache";

const ChainVars = ({ chainVars, timestamp }) => {
  const [filterText, setFilterText] = useState("");
  // const [chainVars, setchainVars] = useState([]);
  // const [sortSelection, setSortSelection] = useState(0);

  const input = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleKeydown = (event) => {
    // Disable the following keyboard shortcuts when the user is typing
    if (document.activeElement.tagName === "INPUT") return;
    if (document.activeElement.tagName === "TEXTAREA") return;

    if (event.key === "/") {
      event.preventDefault();
      focusSearchBar();
    }
  };

  const focusSearchBar = () => {
    input.current.focus();
  };

  // useEffect(() => {
  //   initialConvert();
  // }, []);

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const populateDescription = (key) => {
    // Default description
    let description = "[Default description]";

    switch (key) {
      case "min_score":
        description =
          "The minimum score for a hotspot to be eligible to get elected to a consensus group.";
        break;
      // TODO: add descriptions for the rest of the variables
      case "var_name":
        description = "Description.";
        break;
    }

    return description;
  };

  const copyText = (key) => {
    const el = document.createElement("textarea");
    el.value = chainVars.data[key];
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const copyLink = (key) => {
    const el = document.createElement("textarea");
    el.value = `https://hp.hn/cv/#${key}`;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  let resultCount = 0;

  return (
    <>
      <NavBar />
      <MetaTags
        title={"Helium Chain Variables — Helium Plus"}
        description={
          "All the chain variables and their current values as returned by the Helium API"
        }
        ogImageUrl={"https://helium.plus/images/og/c-v.png"}
        url="https://helium.plus/chain-vars"
      />
      <main className="flex items-center justify-center flex-col pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-start flex-col lg:flex-row w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-20">
          <div className="max-w-xl w-full flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-xl text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              Helium Chain Variables
            </h1>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              These are all of the current chain variables and the current
              values as returned by the API.
            </p>
            <div className="bg-gray-600 rounded-md mt-5 px-4 py-2">
              <p className="text-lg font-display text-black">
                Data last updated {formatDistanceToNow(timestamp)} ago
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gray-200 w-full flex items-center lg:items-start justify-end flex-col pb-64">
          <div className="max-w-xl w-full lg:max-w-4xl mx-auto p-4">
            <h2 className="font-display text-black text-3xl font-bold pt-6 pb-6">
              Chain Variables
            </h2>
            <div className="pb-5">
              <div className="lg:w-1/2 w-full relative">
                <button
                  className="absolute right-0 my-2 mx-2 py-1 px-1"
                  onClick={() => {
                    setFilterText("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-4 w-4 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* <img
                  src="/images/keyboard-icon.svg"
                  className="absolute right-0 mr-8 h-10 py-2 px-2"
                /> */}
                <input
                  className="p-2 w-full placeholder-opacity-50"
                  value={filterText}
                  autoFocus
                  ref={input}
                  onChange={handleFilterTextChange}
                  // placeholder={`Filter variables (press "/" to focus)`}
                  placeholder={`Filter variables`}
                />
                {/* <button
                  onClick={() => {
                    sortVars(0);
                  }}
                >
                  Alphabetize
                </button> */}
              </div>
            </div>
            {/* <div className="flex bg-gray-100 w-full mb-5 px-2 py-2">
              <div className="bg-gray-200 rounded-md w-1/3 p-5 mx-2">
                <p>Alphabetical</p>
              </div>
              <div className="bg-gray-200 rounded-md w-1/3 p-5 mx-2"></div>
              <div className="bg-gray-200 rounded-md w-1/3 p-5 mx-2">
              </div>
            </div> */}
            <div className="grid grid-cols-2 lg:grid-cols-4 lg:p-1 lg:bg-gray-300 lg:rounded-lg">
              {chainVars.map((chainVar, index) => {
                if (filterText === "" || chainVar.key.includes(filterText)) {
                  resultCount++;
                  return (
                    <>
                      <div
                        className={`${
                          index % 2 === 0 ? "lg:bg-gray-100" : ""
                        } col-span-4 lg:col-span-2 bg-white border px-4 py-2 text-hpgreen-100 font-display font-md break-normal relative`}
                      >
                        <div className="flex flex-row items-center justify-start">
                          <p className="pr-2">{chainVar.key}</p>
                          <button
                            className="focus:outline-none"
                            onClick={() => {
                              copyLink(chainVar.key);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="h-4 w-auto"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                          </button>
                        </div>

                        <p
                          className={`${
                            index % 2 === 0 ? "lg:bg-gray-100" : ""
                          } text-gray-500 font-body font-sm pb-12z pr-4 break-normal`}
                        >
                          {populateDescription(chainVar.key)}
                        </p>
                        <a
                          id={chainVar.key}
                          className="absolute invisible"
                          style={{ top: "-50px" }}
                        ></a>
                      </div>
                      <div className="mb-10 lg:mb-0 col-span-4 lg:col-span-2 flex flex-row justify-between bg-hpblue-900 border border-gray-900 px-4 py-2">
                        <span
                          className={`pr-4 pt-2 text-hpblue-100 font-body font-md break-normal w-full`}
                        >
                          {Array.isArray(chainVar.value) ? (
                            <div className="break-all">
                              {chainVar.value.map(
                                (dataArrayItem, index, { length }) => {
                                  return (
                                    <div
                                      key={`${dataArrayItem}-${index}`}
                                      className="py-2 flex flex-row"
                                    >
                                      <span className="text-gray-700 pr-2">
                                        {index}
                                      </span>
                                      <p
                                        className={`pb-3 ${
                                          index + 1 !== length
                                            ? "border-b border-gray-800 break-all"
                                            : ""
                                        }`}
                                      >
                                        {dataArrayItem}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : typeof chainVar?.value === "object" &&
                            !Array.isArray(chainVar?.value) &&
                            chainVar?.value !== null ? (
                            <>
                              {Object.keys(chainVar?.value).map(
                                (key, index) => {
                                  return (
                                    <div
                                      key={`${key}-${index}`}
                                      className={`py-2 grid grid-cols-2 border-b border-gray-800`}
                                    >
                                      <span
                                        id={key}
                                        className={`pr-4 break-all text-hpblue-100 font-body font-md break-normal w-full`}
                                      >
                                        {key}
                                      </span>
                                      <p className={`pb-3 break-all`}>
                                        {chainVar?.value[key]}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </>
                          ) : (
                            <p
                              id={chainVar.key}
                              className={`pr-4 pt-2 text-hpblue-100 font-body font-md break-all w-full`}
                            >
                              {chainVar?.value}
                            </p>
                          )}
                        </span>
                        <div className="p-1">
                          <button
                            className="px-2 py-0 bg-gray-800 hover:bg-gray-700 h-10 rounded-md font-xs text-gray-200"
                            onClick={() => copyText(chainVar.key)}
                          >
                            <svg
                              className="w-5 stroke-text text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
            <div>
              {resultCount === 0 && (
                <div className="bg-gray-300 w-full pb-2">
                  <p className="text-gray-500 text-sm text-center">
                    No results
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const chainVarsObj = await getDataFromCache("hp-vars");
  const stats = await getDataFromCache("hp-stats");

  let chainVars = [];
  Object?.keys(chainVarsObj.data).map((key) => {
    let chainVar = {
      key: key,
      value: chainVarsObj.data[key],
    };
    chainVars.push(chainVar);
  });

  chainVars.sort(function (a, b) {
    return a.key.localeCompare(b.key);
  });

  const timestamp = Date.now();

  return {
    props: { chainVars, stats, timestamp },
    revalidate: 60 * 30,
  };
}

export default ChainVars;
