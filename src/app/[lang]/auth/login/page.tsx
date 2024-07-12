"use client";

import Image from "next/image";
import Link from "next/link";
import { RoundButton } from "@/components/buttons/RoundButton";
import { CircleUser, Mail } from "lucide-react";
import { useCallback } from "react";
//import { signInWithPopup } from "firebase/auth";
//import { firebaseAuth } from "@/config/firebase/firebase";
//import { firebaseGoogleAuthProvider } from "@/config/firebase/google.provider";
import { useRouter } from "next/navigation";
//import CleanLocalStorageOnUnmount from "@/app/app/truco/CleanLocalStorageOnUnmount";
import { useAuthContext } from "@/context/AuthProvider";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
	const { signInWithGoogle } = useAuthContext();

	const router = useRouter();

	/*const onSignInWithGoogle = useCallback(async () => {
		try {
			const result = await signInWithPopup(
				firebaseAuth,
				firebaseGoogleAuthProvider
			);
			console.log("Respuesta de inicio de sesión con Google:", result.user);
			//console.log(result.user.accessToken);
			//signInWithGoogle(result.user.accessToken);
			router.push("/app");
		} catch (error) {
			console.error("Error al iniciar sesión con Google:", error);
		}
	}, [router]); */
	const handleCardClick = () => {
		router.back();
	};

	return (
		<>
			<div className="flex flex-col gap-5 ">
				<div className="w-full flex flex-col items-center justify-center">
					<h1 className="text-black font-bold text-center md:text-1xl text-xl">
						Registrate para participar de la encuesta.
					</h1>
					<h6 className="text-gray-400 font-regular text-center md:text-sm">
						Participa de un gran sorteo.
					</h6>
				</div>

				<div className="w-full max-w-sm flex flex-col gap-5 items-center justify-center">
					<Link className="w-full" href={"/auth/login/email"}>
						<RoundButton
							logo={<Mail className="text-white" size={20} />}
							text={"Continua con tu email"}
							buttonClassName="border border-sky-700 py-4 px-8 bg-blueEmmagini w-full"
							textClassName="text-white"
						/>
					</Link>

					<Link className="w-full" href={"/auth/sign-up"}>
						<RoundButton
							logo={<CircleUser className="text-white" size={20} />}
							text={"Crea una cuenta nueva"}
							buttonClassName="border border-sky-500 bg-blueEmmagini py-4 px-8 w-full"
							textClassName="text-white"
						/>
					</Link>
				</div>

				<div className="w-full flex flex-row items-center justify-center">
					{/*<p className="text-gray-400 font-regular text-center text-md">
						Olvidaste tu contraseña?{" "}
						<span className="text-blue-400 hover:text-blue-500">
							<Link href="">Hace click aqui</Link>
						</span>
					</p>*/}
				</div>

				<div className="flex justify-center items-center">
					<RoundButton
						logo={<FaArrowLeft size={18} className="text-blueEmmagini" />}
						text={"Volver"}
						buttonClassName="py-4 px-8 w-[150px] h-[40px]"
						textClassName="text-blueEmmagini"
						onClick={handleCardClick}
					/>
				</div>
			</div>
		</>
	);
}
