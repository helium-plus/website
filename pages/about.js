import MetaTags from "../components/core/MetaTags";
import NavBar from "../components/core/NavBar";

const About = () => {
  return (
    <>
      <MetaTags title={"Helium Plus — About"} />
      <NavBar />
      <main className="flex items-center justify-center flex-col pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-end flex-col lg:flex-row-reverse w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-20">
          <div className="h-auto lg:pb-6 w-1/3 lg:w-1/2 lg:pt-12">
            <img className="w-full" src="/images/h+.png" />
          </div>
          <div className="max-w-xl w-full lg:max-w-none flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-md lg:max-w-none text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              About Helium+
            </h1>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              Hi there, and thanks for stopping by! I made this site as a
              passion project. It's{" "}
              <a
                href="https://github.com/helium-plus/website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300"
              >
                on GitHub
              </a>{" "}
              so you can go look at the code and report issues and make pull
              requests if you want. I apologize for how messy the code is.
            </p>

            <a
              href="https://twitter.com/helium_plus"
              target="_blank"
              className="focus:outline-none focus:border-none max-w-md text-lg font-body mt-4 bg-hpblue-100 rounded-xl text-black px-2 py-1 text-left"
            >
              Follow Helium+ on Twitter!
            </a>
            <a
              href="https://twitter.com/dcwj"
              target="_blank"
              className="focus:outline-none focus:border-none max-w-md text-lg font-body mt-4 bg-hpblue-100 rounded-xl text-black px-2 py-1 text-left"
            >
              Follow me on Twitter!
            </a>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              Or feel free to{" "}
              <a
                href="mailto:dcj@hey.com"
                className="text-hpgreen-100 focus:outline-none focus:border-none"
              >
                reach out
              </a>
              ! <span className="text-gray-700 font-body">(dcj@hey.com)</span>
            </p>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              And if you're feeling generous, I take HNT tips :)
              <p className="text-gray-700">
                13iS8ZQJuMEDwkkGdScD2wHkWXXhhw5nsH9FFFp6C8zEqv9s5na
              </p>
              <p className="text-gray-800">dcj.eth</p>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
