import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";

// Define the props type for the wrapped component
export type WithAuthProps = {
  // Add any custom props for the wrapped component here if needed
};

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return <div>Loading...</div>; // Optional loading state
    }

    if (!session) {
      // Redirect to login if not logged in
      router.push("/");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
