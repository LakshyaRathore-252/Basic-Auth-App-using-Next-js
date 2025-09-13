import * as Yup from "yup";
import { useRouter } from "next/router";
import useFetch from "@/hooks/use-fetch";

export const useSigninController = () => {
    const router = useRouter();

    // ✅ Validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const initialValues = {
        email: "",
        password: "",
    };


    // ✅ Hook for signin API
    const { fn: signinUser, loading } = useFetch({
        url: "/auth/signin",
        method: "POST",
    });

    // ✅ Business logic
    const handleSubmit = async (values) => {
        try {
            const res = await signinUser({ data: values });
            console.log("Signin response:", res);
            if (res?.success) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.log("Signin failed:", error);
        }
    };



    return {
        validationSchema,
        initialValues,
        handleSubmit,
        loading,
    };

}