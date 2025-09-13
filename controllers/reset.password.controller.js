import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/router";
import * as Yup from "yup";

export const useRestPasswordController = () => {
    const router = useRouter();

    const initialValues = {
        otp: Array(6).fill(""),
        newPassword: "",
    };

    const validationSchema = Yup.object({
        otp: Yup.array()
            .of(Yup.string().length(1, "Must be 1 digit"))
            .required("OTP is required"),
        newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("New password is required"),
    });

    const { fn: resetPassword, loading } = useFetch({
        url: "/auth/reset-password",
        method: "POST",
    });

    const handleSubmit = async (values) => {
        const OTP = values.otp.join("");
        try {
            const res = await resetPassword({
                data: { otp: OTP, newPassword: values.newPassword },
            });

            if (res.success) {
                router.push("/auth/signin");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { initialValues, validationSchema, handleSubmit, loading };
};