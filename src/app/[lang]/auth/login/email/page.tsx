"use client";

import Image from "next/image";
import { LockKeyhole, User } from "lucide-react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthContext } from "@/context/AuthProvider";
import { useDataContext } from "@/context/DataProvider";
import { ToggleInputVisionButton } from "@/components/buttons/ToggleInputVisionButton";
import { RoundButton } from "@/components/buttons/RoundButton";
import { FaArrowLeft } from "react-icons/fa";
import login from "../../../../../../public/assets/login_icon.png";
const formSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const router = useRouter();
	const { language } = useDataContext();

	const { signInWithEmailAndPassword } = useAuthContext();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { register, handleSubmit, formState, setValue } = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	const idTrivia = "64776728-d5a0-11ee-a304-111c596b0bf7";

	const onSubmit = useCallback(
		async (data: FormSchema) => {
			const result = await signInWithEmailAndPassword(
				data.email,
				data.password
			);
			// @ts-ignore
			if (result) {
				// @ts-ignore
				if (result.error === 0) {
					router.push(`/${language}/trivia/${idTrivia}`);
				} else {
					// @ts-ignore
					setError(result.mensaje);
				}
			} else {
				setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
			}
		},
		[router, signInWithEmailAndPassword, language]
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	const handleInputChange = useCallback(() => {
		setError(null);
	}, []);
	const handleCardClick = () => {
		router.back();
	};

	return (
		<div className="w-full flex flex-col gap-5 justify-center items-center">
			<div className="flex flex-col items-center justify-center shadow-lg rounded-full p-3 w-14 h-14 bg-white">
				<Image
					className=""
					src={login}
					alt={"Login Icon"}
					width={40}
					height={40}
				/>
			</div>

			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-black font-bold text-center md:text-2xl text-xl">
					Ingresar
				</h1>
				<h6 className="text-gray-400 font-regular text-center md:text-sm">
					Ingresa tu email y contraseña
				</h6>
			</div>

			<form
				className="flex flex-col gap-5 items-center justify-center w-6/12 min-w-72"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full".concat(
						" ",
						formState.errors.email || error ? "border border-red-500" : ""
					)}
				>
					<User className="text-sky-400" size={23} />
					<input
						{...register("email", { onChange: handleInputChange })}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full"
						placeholder="Email"
					/>
				</div>
				{formState.errors.email && (
					<span className="text-red-500">Email es obligatorio</span>
				)}

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full h-[49px]".concat(
						" ",
						formState.errors.password || error ? "border border-red-500" : ""
					)}
				>
					<div>
						<LockKeyhole className="text-sky-400 ml-2" size={23} />
					</div>
					<input
						{...register("password", { onChange: handleInputChange })}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full border-none focus:outline-none focus:ring-0"
						placeholder="Contraseña"
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				{error && (
					<span className="text-red-500">Email o contraseña incorrecto</span>
				)}

				<RoundButton
					text={"Ingresar"}
					type="submit"
					buttonClassName="border border-sky-700 h-14 py-3 px-3 w-full bg-blueEmmagini"
					textClassName="text-white"
				/>
			</form>

			<div className="w-full flex flex-row items-center justify-center">
				<p className="text-gray-400 font-regular text-center text-md">
					Todavia no tienes una cuenta? Registrate{" "}
					<span className="text-blue-400 hover:text-blue-500">
						<Link href="../login">aca</Link>
					</span>
				</p>
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
	);
}
