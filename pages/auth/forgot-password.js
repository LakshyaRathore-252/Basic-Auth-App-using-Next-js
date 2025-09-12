import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const ForgotPasswordPage = () => {
  const router = useRouter();

  // ✅ setup useFetch at top level
  const { fetchData: forgotPassword, loading } = useFetch(
    {
      url: "/auth/forgot-password",
      method: "POST",
    },
    { manual: true }
  );

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await forgotPassword({ data: values });

      if (res.success) {
        localStorage.setItem("email", values.email);
        toast.success(res.message);
        router.push("/auth/reset-password");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting form ====> ", error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ✅ Loader shown only while loading */}
      {loading && (
        <div className="w-full p-0 ">
          <BarLoader color="#ed6d0b" height={4} width={"100%"} />
        </div>
      )}

      <div className="max-w-md mx-auto mt-12 p-6  text-center relative">

        <h2 className="text-2xl font-semibold mb-2">Reset your password</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email to receive a Otp on mail
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium py-2 rounded-lg disabled:opacity-60"
              >
                {isSubmitting || loading ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
