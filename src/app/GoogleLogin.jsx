"use client";
import { useEffect } from "react";
import axios from "axios";

const GoogleLogin = () => {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		script.onload = () => {
			renderGoogleButton();
		};
		document.head.appendChild(script);

		window.gAuth = async (credential) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/google_login",
					{
						host: "demo23.emmagini.com",
						client_id:
							"861018734768-mm2f76o6bidnoplpck3i87vdm91vrbut.apps.googleusercontent.com",
						credential: credential,
						fcm_token: "",
						es_app: 0,
						id_plataforma: 3,
						lang: "es",
						timezone: -3,
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				//console.log("Respuesta de inicio de sesión con Google:", response.data);

				window.location.href = "/app";
			} catch (error) {
				//console.error("Error al hacer la solicitud:", error);
			}
		};

		return () => {
			document.head.removeChild(script);
		};
	}, []);

	const renderGoogleButton = () => {
		window.google.accounts.id.initialize({
			client_id:
				"861018734768-mm2f76o6bidnoplpck3i87vdm91vrbut.apps.googleusercontent.com",
			callback: (credential) => gAuth(credential),
			auto_select: true,
			prompt_parent_id: "g_id_onload",
		});
		window.google.accounts.id.renderButton(
			document.getElementById("btnGoogleLogin"),
			{
				theme: "outline",
				size: "large",
				text: "signin_with",
				shape: "pill",
				logo_alignment: "center",
			}
		);
	};

	return (
		<div>
			<div id="g_id_onload"></div>
			<div id="btnGoogleLogin"></div>
		</div>
	);
};

export default GoogleLogin;
