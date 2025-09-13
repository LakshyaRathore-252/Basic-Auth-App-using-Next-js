import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/router";


export const useVerifyOtpController = () => {
    const router = useRouter();

    // ✅ Manual fetch for OTP verification
    const { fn: verifyOtp, loading, data } = useFetch({
        url: "/auth/verify-otp",
        method: "POST",
    });

    const handleSubmit = async (values) => {
        const OTP = values.otp.join("");

        try {
            const res = await verifyOtp({ data: { otp: OTP } });

            if (res.success) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.log("Error verifying OTP:", error);
        }
    }



    return {loading , data, handleSubmit};
}