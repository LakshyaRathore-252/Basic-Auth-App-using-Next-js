import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import toast from "react-hot-toast";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import GroupOtp from "@/components/otp/GroupOtp";
import { useRouter } from "next/router";
import { useRestPasswordController } from "@/controllers/reset.password.controller";

const ResetPasswordPage = () => {
  const router = useRouter();

  const { initialValues, validationSchema, handleSubmit, loading } = useRestPasswordController();

  return (
    <>
      {loading && <BarLoader width="100%" height={4} color="#ed6d0b" />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4 max-w-md mx-auto mt-10 p-6">
          <h2 className="text-xl font-semibold">Reset Password</h2>
          <p className="text-gray-500 text-sm mb-6">Enter the OTP sent to your email</p>

          <GroupOtp otpLen={6} name="otp" />

          <Input
            placeholder="New Password"
            type="password"
            name="newPassword"
            className="mt-4 mb-4"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium py-2 rounded-lg"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ResetPasswordPage;
