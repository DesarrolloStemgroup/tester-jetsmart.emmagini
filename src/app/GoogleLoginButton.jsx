"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthContext } from "@/context/AuthProvider";

const GoogleLoginButton = ({ language, idTrivia }) => {
	const router = useRouter();

	const { setToken, setUserId } = useAuthContext();

	const handleGoogleLoginSuccess = useCallback(
		async (credentialResponse) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/google_login",
					{
						host: "demo5.emmagini.com",
						client_id: credentialResponse.clientId,
						credential: credentialResponse.credential,
						fcm_token: "",
						es_app: "0",
						id_plataforma: "3",
						lang: "es",
						timezone: "-3",
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				const { token, userid, error, mensaje } = response.data;

				if (error !== 0) {
					return { error, mensaje };
				}

				localStorage.setItem(TOKEN_KEY, token);
				localStorage.setItem(USER_ID_KEY, userid);

				setToken(token);
				setUserId(userid);
				router.push(`/${language}/trivia/${idTrivia}`);
				return { error, mensaje, token, userid };
			} catch (error) {
				console.error("Error al hacer la solicitud:", error);
				throw error;
			}
		},
		[router, language, idTrivia]
	);

	return (
		<div className="w-full rounded-full shadow-md border border-gray-200 cursor-pointer">
			<GoogleLogin
				onSuccess={handleGoogleLoginSuccess}
				onError={() => {
					console.log("Login failed");
				}}
				className="rounded-full w-full"
			/>
		</div>
	);
};

export default GoogleLoginButton;

/*const handleGoogleLoginSuccess = async (credentialResponse) => {
		const data = {
			host: "demo5.emmagini.com",
			client_id: credentialResponse.clientId,
			credential: credentialResponse.credential,
			fcm_token: "",
			es_app: "0",
			id_plataforma: "3",
			lang: "es",
			timezone: "-3",
		};

		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/google_login",
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("Login successful:", response.data);
		} catch (error) {
			console.error("Error logging in:", error);
		}
	}; */
