const Footer = () => {
  return (
    <div className="flex w-full bg-hpblue-1000">
      <div className="flex flex-row items-between justify-start w-full opacity-75 px-5">
        <div className="flex mx-auto w-full max-w-xl lg:max-w-4xl p-4 ">
          <div className="flex flex-col items-center justify-between w-full break-all text-center">
            <p className="text-gray-700">Tips:</p>
            <p className="text-gray-600">
              HNT:{" "}
              <span className="font-bold">
                13iS8ZQJuMEDwkkGdScD2wHkWXXhhw5nsH9FFFp6C8zEqv9s5na
              </span>{" "}
              <span className="text-gray-700"> | dcj.eth</span>
            </p>
            <p className="text-gray-600 flex items-center justify-start">
              BAT:
              <a
                href="https://basicattentiontoken.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold h-5 w-5 rounded-full text-xs text-white flex items-center justify-center ml-1 opacity-50"
                style={{ backgroundColor: "#474dff" }}
              >
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
