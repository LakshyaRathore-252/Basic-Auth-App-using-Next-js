import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup"; // ✅ import Yup
import axios from "axios";
import { useRouter } from "next/router";
import GroupOtp from "@/components/otp/GroupOtp"; // ✅ adjust path if needed
import Input from "@/components/Input";
import toast from "react-hot-toast";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const RestPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    else {
      router.push("/auth/forgot-password");
    }
  }, []);



  // ✅ form initial values
  const initialValues = {
    otp: Array(6).fill(""),
    newPassword: "",
  };

  // ✅ validation schema
  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(Yup.string().length(1, "Must be 1 digit"))
      .required("OTP is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
  });

  const { fetchData: restPassword, loading } = useFetch(
    {
      url: "/auth/reset-password",
      method: "POST",
    },
    { manual: true }
  );

  // ✅ handle form submit
  const handleSubmit = async (values) => {
    const OTP = values.otp.join("");

    try {

      const res = await restPassword({
        data: {
          otp: OTP,
          newPassword: values.newPassword,
          email,
        }
      });

      console.log("OTP + Reset response:", res);

      if (res.success === true) {
        localStorage.removeItem("email");
        localStorage.clear();
        setEmail("");
        router.push("/auth/signin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong while verifying OTP");
      console.error("Error verifying OTP:", error.response?.data || error.message);
    }
  };

  return (
    <>
      {
        loading && (
          <div className="flex w-full  items-center justify-center">
            <BarLoader width={"100%"} height={4} color="#ed6d0b" />
          </div>
        )
      }
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4 max-w-md mx-auto mt-10 p-6">
          <h2 className="text-xl font-semibold">Reset Password</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter the OTP sent to <span className="font-medium">{email}</span>
          </p>

          <div className="flex gap-2 items-center justify-center">
            <GroupOtp otpLen={6} name="otp" />
          </div>

          <Input
            placeholder="New Password"
            type="password"     // ✅ fixed typo
            name="newPassword"  // ✅ fixed typo
            className="mt-4 mb-4"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium py-2 rounded-lg"
          >
            Submit Form
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default RestPasswordPage;
