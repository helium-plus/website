import Head from "next/head";

const MetaTags = ({ title, description, ogImageUrl, url }) => {
  const pageTitle = title ? title : "Helium Plus";
  const pageDescription = description
    ? description
    : "A set of mini utilities for users and builders of the Helium network";
  const pageOgImageUrl = ogImageUrl ? ogImageUrl : "https://helium.plus/og.png";
  const pageUrl = url ? url : "https://helium.plus";

  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageOgImageUrl} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageOgImageUrl} />
    </Head>
  );
};

export default MetaTags;
