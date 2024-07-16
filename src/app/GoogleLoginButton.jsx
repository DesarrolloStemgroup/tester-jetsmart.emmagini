// components/GoogleLoginButton.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
	const handleGoogleLoginSuccess = async (credentialResponse) => {
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
	};

	return (
		<div className="flex flex-row gap-3 items-center justify-center rounded-full shadow-md border border-gray-200 cursor-pointer w-full">
			<GoogleLogin
				onSuccess={handleGoogleLoginSuccess}
				onError={() => {
					console.log("Login failed");
				}}
				className="flex flex-row gap-3 items-center justify-center rounded-full shadow-md border border-gray-200 cursor-pointer w-full"
			/>
		</div>
	);
};

export default GoogleLoginButton;
