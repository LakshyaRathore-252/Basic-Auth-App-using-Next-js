"use client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useSignupController } from "@/controllers/signup.controller";

const SignupPage = () => {
  const router = useRouter();

  const { initialValues, validationSchema, handleSubmit, loading, countries, states, cities } =
    useSignupController();


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

