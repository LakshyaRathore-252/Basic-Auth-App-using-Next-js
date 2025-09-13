import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/use-fetch";

export default function Dashboard() {
  const router = useRouter();

  // Fetch user profile
  const { data: apiResponse, loading, error, fn: fetchUser } = useFetch({
    url: "/users/me",
    method: "GET",
  });

  // Extract user from API response
  const user = apiResponse?.data;

  useEffect(() => {
    fetchUser();
  }, [router]);

  const { fn: logoutUser, loading: logoutLoading } = useFetch({
    url: "/auth/logout",
    method: "POST",
  });

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePassword = () => router.push("/auth/change-password");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading user info...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>Error loading profile: {error}</p>
      </div>
    );
  }

  // Helper function to display fallback
  const display = (value) => value ?? "Unavailable";

  return (
    <div className="md:h-[650px] xs:h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white xs:h-full lg:h-[630px] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center relative">
            <div className="absolute top-6 right-6 transform hover:scale-110 transition-transform">
              <span className="px-3 py-1 bg-white text-blue-600 text-sm font-semibold rounded-full">
                {display(user?.status)}
              </span>
            </div>

            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={display(user?.profile?.profilePic) || "/default-profile.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {display(user?.gender)}
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white">
              {display(user?.firstName)} {display(user?.lastName)}
            </h2>
            <p className="text-blue-100">{display(user?.email)}</p>
          </div>

          {/* Info */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Account Details
              </h3>
              <p>Username: {display(user?.username)}</p>
              <p>Status: {display(user?.status)}</p>
              <p>Verified: {user?.isVerified ? "Yes" : "No"}</p>
              <p>Created At: {user?.createdAt ? new Date(user?.createdAt).toLocaleDateString() : "Unavailable"}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </h3>
              <p>Phone: {display(user?.profile?.phone)}</p>
              <p>
                Address:{" "}
                {user?.profile?.addressLine1 || "Unavailable"}
                <br />
                {user?.profile?.addressLine2 ? `, ${user.profile.addressLine2}` : ""}
                <br />
                {display(user?.profile?.city)}, {display(user?.profile?.state)}
                <br />
                {display(user?.profile?.country)} - {display(user?.profile?.pin)}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col p-8 sm:flex-row mb-5 justify-center gap-4 mt-10 pt-8 border-t border-gray-100">
            <button
              onClick={handleChangePassword}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Change Password
            </button>

            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-75 disabled:transform-none"
            >
              {logoutLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.layout = "wide";
