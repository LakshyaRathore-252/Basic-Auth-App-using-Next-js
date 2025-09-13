import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Script from "next/script"; // ✅ for loading SDKs properly

export default function MyApp({ Component, pageProps }) {
  // Check if the page defines a layout type; default to "narrow"
  const layoutClass =
    Component.layout === "wide" ? "max-w-4xl p-8" : "max-w-md p-6";

  return (
    <>
      {/* Favicon and meta tags */}
      <Head>
        {/* Correct favicon path */}
        <link rel="icon" href="/vercel.svg" />

        {/* For Apple touch icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/vercel.svg" />

        <meta name="theme-color" content="#ffffff" />
      </Head>

      {/* ✅ Google SDK */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        async
        defer
      />

      {/* ✅ Facebook SDK */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function () {
              FB.init({
                appId: "${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}",
                cookie: true,
                xfbml: true,
                version: "v17.0"
              });
            };
          `,
        }}
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        async
        defer
        crossOrigin="anonymous"
      />

      {/* ✅ Apple SDK */}
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        strategy="afterInteractive"
        async
        defer
      />

      <div className="relative flex items-center justify-center w-full h-screen backgroundImage">
        <div className={`w-full bg-white rounded-2xl shadow-lg ${layoutClass}`}>
          <Component {...pageProps} />
        </div>
      </div>

      {/* ✅ Global toaster */}
      <Toaster
        position="top-right"
        toastOptions={{ duration: 5000 }}
        reverseOrder={false}
      />
    </>
  );
}
