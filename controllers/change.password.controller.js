import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/router"
import * as Yup from "yup";

export const useChangePasswordController = () => {
    const router = useRouter();

    const { fn: changePassword, loading } = useFetch(
        {
            url: "/auth/change-password",
            method: "POST",
        },
    );

    const { fn: logoutUser } = useFetch(
        {
            url: "/auth/logout",
            method: "POST",
        },
    );

    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required("Current password is required"),
        newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("New password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm password is required"),
    });

    const handleSubmit = async (values) => {
    if (values.newPassword !== values.confirmPassword) return;
        console.log(changePassword)
    try {
      await changePassword({ data: values }); // 👈 call custom hook

      // Logout user after password change
      await logoutUser();
      router.push("/auth/signin");
    } catch (err) {
      // error already handled with toast in hook
      console.error(err);
    }
  };

  return { initialValues, validationSchema, handleSubmit, loading };
}