import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/router";
import * as Yup from "yup";

export const useForgotPasswordController = () => {
    const router = useRouter();

    const { fn: forgotPassword, loading } = useFetch(
        { url: "/auth/forgot-password", method: "POST" },
        { manual: true }
    );


    const initialValues = { email: "" };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await forgotPassword({ data: values });

            if (res.success) {
                router.push("/auth/reset-password"); // ✅ redirect only
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return { initialValues, validationSchema, handleSubmit, loading };

}