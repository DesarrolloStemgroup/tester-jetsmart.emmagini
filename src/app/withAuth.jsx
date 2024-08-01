import { useAuthContext } from "../context/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
	return (props) => {
		const { token, userId } = useAuthContext();
		const router = useRouter();

		useEffect(() => {
			if (!token || !userId) {
				router.push("/auth/login");
			}
		}, [token, userId, router]);

		if (!token || !userId) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
