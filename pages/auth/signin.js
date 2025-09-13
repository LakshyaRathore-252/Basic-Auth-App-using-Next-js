import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { BarLoader } from "react-spinners";
import { useSigninController } from "@/controllers/signin.controller";

const MdOutlineLogin = dynamic(
  () => import("react-icons/md").then((mod) => mod.MdOutlineLogin),
  { ssr: false }
);

const Signin = () => {
  const router = useRouter();
  const { validationSchema, initialValues, handleSubmit, loading } =
    useSigninController();

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center">
          <BarLoader width={"100%"} height={4} color="#07090d" />
        </div>
      )}

      <div className="text-center mt-2 space-y-5 max-w-md mx-auto">
        <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-sky-100">
          <MdOutlineLogin className="text-3xl text-sky-500" />
        </div>

        <h2 className="text-xl font-semibold">Sign in with email</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email and password
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <Input name="email" type="text" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />

            <div className="text-right text-sm">
              <button
                type="button"
                onClick={() => router.push("/auth/forgot-password")}
                className="text-sky-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gray-800 to-black text-white font-medium py-2 rounded-lg"
            >
              {loading ? "Signing in..." : "Get Started"}
            </Button>
          </Form>
        </Formik>

        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/auth/signup")}
            className="text-sky-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
};

export default Signin;
