import Document, { Html, Head, Main, NextScript } from "next/document";
// import NavBar from "../components/NavBar";

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   const styles = extractCritical(initialProps.html);
  //   return {
  //     ...initialProps,
  //     styles: (
  //       <>
  //         {initialProps.styles}
  //         <style
  //           data-emotion-css={styles.ids.join(" ")}
  //           dangerouslySetInnerHTML={{ __html: styles.css }}
  //         />
  //       </>
  //     ),
  //   };
  // }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Oxygen:wght@200;400;600;800&family=Sora:wght@200;400;600;800&display=swap"
            rel="stylesheet"
          />
          {/* <meta
            property="og:image"
            content="https://helium.plus/images/og.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@helium_plus" />
          <meta name="twitter:creator" content="@dcwj" />
          <meta property="og:url" content="https://helium.plus" />
          <meta property="og:title" content="Helium Plus" />
          <meta
            property="og:description"
            content="Helium Plus is a collection of tools to help you get the most out of the Helium network"
          />
          <meta
            property="og:image"
            content="https://helium.plus/images/og.png"
          /> */}

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-73259800-4"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-73259800-4');
            `,
            }}
          />
        </Head>
        <body className="mt-12">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
