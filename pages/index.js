// pages/index.js
import SignIn from "./auth/signin";

export default function Home() {
    return <SignIn />
}

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