import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import Button from "@/components/Button";
import GroupOtp from "@/components/otp/GroupOtp";
import { BarLoader } from "react-spinners";
import { useVerifyOtpController } from "@/controllers/verify.otp.controller";

const VerifyOtp = () => {
  const router = useRouter();

  const { loading, data, handleSubmit } = useVerifyOtpController();
 


  return (
    <Formik
      initialValues={{ otp: Array(6).fill("") }}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-6">
        {
          loading && (
            <div className="flex items-center justify-center">
              <BarLoader color="#f59e0b" width={"100%"} height={4} />
            </div>
          )
        }
        <h2 className="text-xl font-semibold">Verify OTP</h2>
        <p className="text-gray-500 text-sm">
          Enter the OTP sent to your email
        </p>

        <div className="flex gap-2 items-center justify-center">
          <GroupOtp otpLen={6} name="otp" />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Submit"}
        </Button>
      </Form>
    </Formik>
  );
};

export default VerifyOtp;

// 👇 Protect OTP page if already logged in
export async function getServerSideProps(context) {
  const token = context.req.cookies?.token;

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
