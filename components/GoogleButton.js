import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";


const GoogleButton = () => {
  // Dynamically import FcGoogle to avoid hydration errors
  const FcGoogle = dynamic(() => import("react-icons/fc").then(mod => mod.FcGoogle), { ssr: false });
  const router = useRouter();

  useEffect(() => {
    // Load Google SDK only on client
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = () => {
    if (!window.google) return;

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: "openid profile email",
      callback: async (response) => {
        try {
          // 1️⃣ Get Google user info
          const userInfo = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
          ).then((res) => res.json());

          console.log("Google user info:", userInfo);

          // 2️⃣ Send info to backend (cookie will be set)
          const resBackend = await axios.post(
            "http://localhost:5000/api/auth/oauth/login",
            {
              provider: "google",
              providerId: userInfo.sub,
              email: userInfo.email,
              name: userInfo.name,
              given_name: userInfo.given_name,
              family_name: userInfo.family_name,
              picture: userInfo.picture,
            },
            { withCredentials: true }
          );


          console.log("Backend response:", resBackend.data);

          // 3️⃣ Redirect to dashboard
          router.push("/dashboard");
        } catch (err) {
          console.error("OAuth login error:", err);
        }
      },
    });

    // 4️⃣ Request Google access token
    client.requestAccessToken();
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all bg-white text-gray-700 font-medium"
    >
      <FcGoogle className="text-xl" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleButton;
