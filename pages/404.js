import Head from "next/head";

import Card from "../components/core/Card";
import NavBar from "../components/core/NavBar";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>404 — Not Found</title>
      </Head>
      <NavBar />
      <main className="flex items-center justify-center flex-col pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-end flex-col w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-20">
          <div className="max-w-xl w-full lg:max-w-none flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-md lg:max-w-none text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              404 — Not Found
            </h1>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              Sorry about that. It's probably my fault. Maybe try one of the
              pages below?
            </p>
          </div>
        </section>
        <section className="w-full flex items-center lg:items-start justify-end flex-col pb-64">
          <div className="max-w-xl w-full lg:max-w-4xl mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-5">
              <Card
                link="/earnings-calculator"
                title="Hotspot Earnings Calculator"
                description="A calculator to help you get a sense of how much you can expect your Helium-compatible gateway to earn based on the current blockchain data and your situation"
              >
                <svg
                  className="stroke-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="hpblue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </Card>
              <Card
                link="/chain-vars"
                title="Chain Variables"
                description="The chain variables and their current values"
              >
                <svg
                  className="stroke-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"
                  />
                </svg>
              </Card>
              <Card
                link="/data-credits-calculator"
                title="Helium Data Credits Calculator"
                description="A calculator to help you convert between HNT and USD"
              >
                <svg
                  className="stroke-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="hpblue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </Card>
              <Card
                link="/simple-earnings-calculator"
                title="Simple Earnings Calculator"
                description="A simplified version of the earnings calculator"
              >
                <svg
                  className="stroke-current text-gray-500"
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
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFoundPage;
