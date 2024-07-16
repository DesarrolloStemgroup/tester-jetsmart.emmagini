"use client";

//import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthProvider";
import { DataProvider } from "@/context/DataProvider";
import "./globals.css";

const fonts = localFont({
	src: [
		{
			path: "../../public/assets/fonts/arial.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "../../public/assets/fonts/ariblk.ttf",
			weight: "900",
			style: "italic",
		},
		{
			path: "../../public/assets/fonts/comici.ttf",
			weight: "800",
			style: "normal",
		},
		{
			path: "../../public/assets/fonts/Courier New.ttf",
			weight: "800",
			style: "italic",
		},
		{
			path: "../../public/assets/fonts/Helvetica.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/assets/fonts/HelveticaNeue.ttf",
			weight: "700",
			style: "italic",
		},
		{
			path: "../../public/assets/fonts/Impact.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/assets/fonts/lucidagrande.ttf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../../public/assets/fonts/Tahoma.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/assets/fonts/Times New Roman.ttf",
			weight: "500",
			style: "italic",
		},
		{
			path: "../../public/assets/fonts/verdana.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-gilroy",
});

const clientId =
	"861018734768-mm2f76o6bidnoplpck3i87vdm91vrbut.apps.googleusercontent.com";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${fonts.variable} font-sans`}>
				<AuthProvider>
					<GoogleOAuthProvider clientId={clientId}>
						<DataProvider>{children}</DataProvider>
					</GoogleOAuthProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
