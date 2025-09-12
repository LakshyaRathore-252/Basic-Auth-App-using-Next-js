import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Dashboard({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center  bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading user info...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    router.push("/auth/change-password");
  };

  return (
    <div className=" md:h-[650px] bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">


        {/* Profile Card */}
        <div className="bg-white sm:h-full lg:h-[580px] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Profile Header with Image */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center relative">
            <div className="absolute top-6 right-6 transform hover:scale-110 transition-transform">
              <span className="px-3 py-1 bg-white text-blue-600 text-sm font-semibold rounded-full">
                {user.status}
              </span>
            </div>

            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={user.profile.profilePic || "/default-profile.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {user.gender}
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</h2>
            <p className="text-blue-100">{user.email}</p>
          </div>

          {/* User Info */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Account Details</h3>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center">
                      <div className="w-5 h-5 text-blue-500 mr-3">
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Username: </span>
                      <span className="ml-2 text-gray-900">{user.username}</span>
                    </div>

                    <div className="flex items-center">
                      <div className="w-5 h-5 text-blue-500 mr-3">
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Email: </span>
                      <span className="ml-2 text-gray-900">{user.email}</span>
                    </div>

                    <div className="flex items-center">
                      <div className="w-5 h-5 text-blue-500 mr-3">
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Status: </span>
                      <span className="ml-2 text-gray-900 capitalize">{user.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Contact Information</h3>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center">
                      <div className="w-5 h-5 text-blue-500 mr-3">
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Phone: </span>
                      <span className="ml-2 text-gray-900">{user.profile.phone || 'Not provided'}</span>
                    </div>

                    <div className="flex">
                      <div className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0">
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Address: </span>
                        <p className="text-gray-900">
                          {user.profile.addressLine1} {user.profile.addressLine2 && `, ${user.profile.addressLine2}`}<br />
                          {user.profile.city}, {user.profile.state}<br />
                          {user.profile.country} - {user.profile.pin}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 pt-8 border-t border-gray-100">
              <button
                onClick={handleChangePassword}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
                Change Password
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-75 disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging out...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        

        
      </div>
    </div>
  );
}
Dashboard.layout = "wide";

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: { destination: "/auth/signin", permanent: false },
    };
  }

  try {
    const res = await axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { props: { user: res.data.data } };
  } catch (error) {
    console.error("Axios error:", error.response?.status, error.response?.data);
    return { props: { user: null } };
  }
}