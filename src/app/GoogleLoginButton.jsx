"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthContext } from "@/context/AuthProvider";
import "../components/styles/buttonGoogle.css";

const GoogleLoginButton = ({ language, idTrivia }) => {
	const router = useRouter();

	const { token, userId, setToken, setUserId } = useAuthContext();

	const TOKEN_KEY = "token";
	const USER_ID_KEY = "user_id";

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
		<GoogleLogin
			onSuccess={handleGoogleLoginSuccess}
			onError={() => {
				console.log("Login failed");
			}}
			className="border border-sky-700 rounded-full w-full"
			theme="outline"
			size="large"
			shape="rectangular"
			text="continue_with"
			logo_alignment="center"
		/>
	);
};

export default GoogleLoginButton;
