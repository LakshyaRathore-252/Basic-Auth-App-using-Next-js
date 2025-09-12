import '@/styles/globals.css';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  // Check if the page defines a layout type; default to "narrow"
  const layoutClass = Component.layout === "wide" ? "max-w-4xl p-8" : "max-w-md p-6";

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

      <div className="relative flex items-center justify-center w-full h-screen backgroundImage">
        <div className={`w-full bg-white rounded-2xl shadow-lg ${layoutClass}`}>
          <Component {...pageProps} />
        </div>
      </div>

      {/* ✅ Global toaster, available on every page */}
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} reverseOrder={false} />
    </>
  );
}
