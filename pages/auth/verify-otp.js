import Button from '@/components/Button'
import GroupOtp from '@/components/otp/GroupOtp'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const VerifyOtp = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")

  useEffect(() => {
    // 👇 get email from localStorage (set during signup)
    const storedEmail = localStorage.getItem("pendingEmail")

    if (!storedEmail) {
      // 🚫 if no email, user came here manually → kick back to signup
      router.replace("/auth/signup")
    } else {
      setEmail(storedEmail)
    }
  }, [router])

  if (!email) {
    // while loading, show nothing or a loader
    return <p className="text-center">Loading...</p>
  }

  return (
    <Formik
      initialValues={{ otp: Array(6).fill('') }}
      onSubmit={async (values) => {
        const OTP = values.otp.join('')
        try {
          const res = await axios.post(
            'http://localhost:5000/api/auth/verify-otp',
            { otp: OTP, email },  // ✅ safe: from localStorage, not URL
            { withCredentials: true }
          )

          console.log('OTP verification response:', res.data)

          if (res.data.success === true) {
            // ✅ clear pendingEmail so user can’t reuse OTP page
            localStorage.removeItem("pendingEmail")

            toast.success("OTP verified successfully 🎉")
            router.push('/dashboard')
          } else {
            toast.error(res.data.message || "Invalid OTP")
          }
        } catch (error) {
          console.error(
            'Error verifying OTP:',
            error.response?.data || error.message
          )
          toast.error(error.response?.data?.message || "Something went wrong")
        }
      }}
    >
      <Form className="space-y-4">
        <h2 className="text-xl font-semibold">Verify OTP</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>

        <div className="flex gap-2 items-center justify-center">
          <GroupOtp otpLen={6} name="otp" />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium py-2 rounded-lg"
        >
          Submit Form
        </Button>
      </Form>
    </Formik>
  )
}

export default VerifyOtp

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
