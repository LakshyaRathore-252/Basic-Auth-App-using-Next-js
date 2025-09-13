import { data } from "@/data/data";
import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/router"
import * as Yup from "yup";


export const useSignupController = () => {
    const { countries, states, cities } = data;

    const router = useRouter();

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
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone is required"),
        addressLine1: Yup.string().required("Address Line 1 is required"),
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        pin: Yup.string().required("PIN code is required"),
    });



    const { fn: signupUser, loading } = useFetch(
        { url: "/auth/signup", method: "POST" },
        { withCredentials: true }
    );

    const handleSubmit = async (values) => {
        try {
            const res = await signupUser({ data: values });
            console.log("Signup response:", res);

            if (res?.success) {
                localStorage.setItem("pendingEmail", res?.data?.email);
                router.push("/auth/verify-otp");
            }
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
        }
    };

    return { initialValues, validationSchema, handleSubmit, loading, countries, states, cities };

}