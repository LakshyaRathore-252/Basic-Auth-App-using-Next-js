"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { data } from "@/data/data";

const SignupPage = () => {
  const router = useRouter();
  const { countries, states, cities } = data;

  const [loading, setLoading] = useState(false);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    profilePic: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    pin: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    gender: Yup.string().oneOf(["male", "female", "other"], "Select a valid gender").required("Gender is required"),
    profilePic: Yup.string().url("Must be a valid URL"),
    phone: Yup.string().required("Phone is required"),
    addressLine1: Yup.string().required("Address Line 1 is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pin: Yup.string().required("PIN code is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        values,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        localStorage.setItem("pendingEmail", res.data.data.email);
        toast.success("Signup successful! Please verify OTP");
        router.push("/auth/verify-otp");
      } else {
        toast.error(res?.data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <BarLoader width="100%" height={4} color="#f11946" />}
      <div className="text-center space-y-5 max-w-3xl mx-auto">

        <h2 className="text-xl font-semibold">Create your account</h2>
        <p className="text-gray-500 text-sm mb-6">Join us today for free</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-3 gap-4">

              <Input name="username" placeholder="Username" />
              <Input name="firstName" placeholder="First Name" />
              <Input name="lastName" placeholder="Last Name" />
              <Input name="email" type="email" placeholder="Email" />
              <Input name="password" type="password" placeholder="Password" />

              <Select
                name="gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                placeholder="Select Gender"
              />

              <Input name="profilePic" placeholder="Profile Pic URL" />
              <Input name="phone" placeholder="Phone" />
              <Input name="addressLine1" placeholder="Address Line 1" />
              <Input name="addressLine2" placeholder="Address Line 2" />

              {/* Country Dropdown */}
              <Select
                name="country"
                options={countries}
                placeholder="Select Country"
                onChange={(option) => {
                  setFieldValue("country", option.value);

                  const statesForCountry = states.filter(s => s.country === option.value);
                  setFilteredStates(statesForCountry);

                  setFieldValue("state", "");
                  setFilteredCities([]);
                  setFieldValue("city", "");
                }}
              />

              {/* State Dropdown */}
              <Select
                name="state"
                options={states} // only states for country
                placeholder="Select State"

              />


              {/* City Dropdown */}
              <Select
                name="city"
                options={cities} // show only filtered cities
                placeholder="Select City"
              />

              <Input name="pin" placeholder="PIN Code" />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium py-2 rounded-lg col-span-3"
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-sm">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/signin")}
            className="text-sky-500 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </>
  );
};

SignupPage.layout = "wide";
export default SignupPage;

// Redirect if already signed in
export async function getServerSideProps(context) {
  const token = context.req.cookies?.token;
  if (token) {
    return {
      redirect: { destination: "/dashboard", permanent: false },
    };
  }
  return { props: {} };
}
