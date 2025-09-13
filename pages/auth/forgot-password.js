import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import dynamic from "next/dynamic";
import { useForgotPasswordController } from "@/controllers/forgot.password.controller";

const IoChevronBackSharp = dynamic(
  () => import("react-icons/io5").then((mod) => mod.IoChevronBackSharp),
  { ssr: true, loading: () => <span className="inline-block w-6 h-6" /> }
);

const ForgotPasswordPage = () => {
  const router = useRouter();

  const { initialValues, validationSchema, handleSubmit, loading } =
    useForgotPasswordController();


  return (
    <>
      {loading && <BarLoader color="#ed6d0b" height={4} width="100%" />}
      <button
        className="text-sky-500 flex space-x-1 items-center justify-center text-sm"
        onClick={() => router.back()}
      >
        <IoChevronBackSharp />
        <span>Back</span>
      </button>

      <div className="max-w-md mx-auto mt-1 p-6 text-center relative">
        <h2 className="text-2xl font-semibold mb-2">Reset your password</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email to receive an OTP
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Input name="email" type="email" placeholder="Email" />
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium py-2 rounded-lg disabled:opacity-60"
              >
                {isSubmitting || loading ? "Sending..." : "Send OTP"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
