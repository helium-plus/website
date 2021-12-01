import Link from "next/link";
import { FeedbackForm } from "feedback-fish";

const SubmitFeedbackButton = (props) => (
  <button
    className="focus:outline-none focus:border-none px-2 py-2  mr-3"
    {...props}
  >
    <svg
      className="stroke-current w-5 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  </button>
);

const NavBar = () => {
  return (
    <div
      className="-mt-12 flex h-12 w-full fixed"
      style={{
        background: "rgba(26, 26, 26, 0.75)",
        zIndex: 10,
        backdropFilter: "saturate(380%) blur(20px)",
      }}
    >
      <div className="flex flex-row items-between justify-start w-full	">
        <div className="flex mx-auto w-full max-w-xl lg:max-w-4xl p-4 ">
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <a className="focus:outline-none focus:border-none">
                <img src="/images/lockup.png" className="flex w-auto h-6" />
              </a>
            </Link>

            <div className="flex flex-row items-center justify-end">
              <FeedbackForm
                projectId="026947ff10733f"
                triggerComponent={SubmitFeedbackButton}
                // Optional: specify the submitter's id or email. If not specified, will be treated as anonymous.
                // userId={currentUser.email}
              />
              <Link href="/earnings-calculator">
                <a className="focus:outline-none focus:border-none font-display text-gray-200 text-xs px-2 py-2 mr-3">
                  Calculator
                </a>
              </Link>
              <Link href="/about">
                <a className="focus:outline-none focus:border-none font-display text-gray-200 text-xs px-2 py-2">
                  About
                </a>
              </Link>

              {/* <NavBarLink
                cta
                target="_blank"
                href="http://fbuy.me/v/danielcolinjames"
              >
                Buy Hotspot
              </NavBarLink> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
