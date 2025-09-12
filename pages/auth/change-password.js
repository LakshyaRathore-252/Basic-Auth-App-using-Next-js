import Button from "@/components/Button";
import Input from "@/components/Input";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch"; // 
import { BarLoader } from "react-spinners";

const IoChevronBackSharp = dynamic(
  () => import("react-icons/io5").then((mod) => mod.IoChevronBackSharp),
  {
    ssr: true,
    loading: () => <span className="inline-block w-6 h-6" />,
  }
);

const ChangePassword = ({ token }) => {
  const router = useRouter();

  const { fetchData: changePassword, loading } = useFetch(
    {
      url: "/auth/change-password",
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, // 👈 attach token from getServerSideProps
    },
    { manual: true, successMessage: "Password updated successfully!" }
  );

  const { fetchData: logoutUser } = useFetch(
    {
      url: "/auth/logout",
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    },
    { manual: true }
  );

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    if (values.newPassword !== values.confirmPassword) return;

    try {
      await changePassword({ data: values }); // 👈 call custom hook

      // Logout user after password change
      await logoutUser();
      router.push("/auth/signin");
    } catch (err) {
      // error already handled with toast in hook
      console.error(err);
    }
  };

  return (
    <>
      {
        loading && (
          <div className="flex items-center justify-center">
           <BarLoader color="#7f5fde" width={"100%"} height={4}/>
          </div>
        )
      }
      <button
        className="flex text-sm items-center mt-4"
        onClick={() => router.push("/dashboard")}
      >
        <IoChevronBackSharp />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Change Password
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-5">
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Current Password
                </label>
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition duration-300"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </Form>
          </Formik>

          <p className="text-sm text-gray-500 text-center mt-6">
            Having trouble?{" "}
            <a
              href="/auth/forgot-password"
              className="text-indigo-600 font-medium hover:underline"
            >
              Reset here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

export async function getServerSideProps(context) {
  const token = context.req.cookies?.token;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return { props: { token } };
}
