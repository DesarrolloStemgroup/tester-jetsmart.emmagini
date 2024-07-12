"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthContext } from "@/context/AuthProvider";
import { LockKeyhole, User } from "lucide-react";
import { RoundButton } from "@/components/buttons/RoundButton";
import { ToggleInputVisionButton } from "@/components/buttons/ToggleInputVisionButton";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/DataProvider";
import { FaArrowLeft } from "react-icons/fa";

const formSchema = z.object({
	username: z.string().min(1),
	email: z.string().email().min(1),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const router = useRouter();

	const { singUpNewUser } = useAuthContext();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const { register, handleSubmit, formState } = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = useCallback(
		async (data: FormSchema) => {
			try {
				await singUpNewUser(
					data.username,
					data.email,
					data.password,
					data.confirmPassword
				);

				router.push("/auth/login/email");
			} catch (error) {
				console.error("Error al registrar el usuario:", error);
			}
		},
		[singUpNewUser]
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	const handleButtonGoBackClick = () => {
		router.back();
	};

	return (
		<div className="w-full flex flex-col gap-5 justify-center items-center">
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-black font-bold text-center md:text-2xl text-xl">
					Registrate
				</h1>
			</div>

			<form
				className="flex flex-col gap-5 items-center justify-center w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full".concat(
						" ",
						formState.errors.username ? "border border-red-500" : ""
					)}
				>
					<User className="text-sky-400" size={23} />
					<input
						{...register("username")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full"
						placeholder="Nombre de Usuario"
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full".concat(
						" ",
						formState.errors.email ? "border border-red-500" : ""
					)}
				>
					<User className="text-sky-400" size={23} />
					<input
						{...register("email")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full"
						placeholder="Email"
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full h-[49px]".concat(
						" ",
						formState.errors.password ? "border border-red-500" : ""
					)}
				>
					<LockKeyhole className="text-sky-400" size={23} />
					<input
						{...register("password")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-[49px] border-0 focus:outline-none focus:ring-0"
						placeholder="Contraseña"
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full h-[49px]".concat(
						" ",
						formState.errors.confirmPassword ? "border border-red-500" : ""
					)}
				>
					<LockKeyhole className="text-sky-400" size={23} />
					<input
						{...register("confirmPassword")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-[49px] border-0  focus:outline-none focus:ring-0"
						placeholder="Confirmar contraseña"
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				<RoundButton
					type="submit"
					text={"Registrarse"}
					buttonClassName="border border-sky-700 bg-blueEmmagini w-full py-3 px-3"
					textClassName="text-white"
				/>
			</form>

			<div className="w-full flex flex-row items-center justify-center">
				<p className="text-gray-400 font-regular text-center text-md">
					Ya tienes una cuenta? Ingresa{" "}
					<span className="text-blue-400 hover:text-blue-500">
						<Link href="./login">aca</Link>
					</span>
				</p>
			</div>
			<div className="flex justify-center items-center">
				<RoundButton
					logo={<FaArrowLeft size={18} className="text-blueEmmagini" />}
					text={"Volver"}
					buttonClassName="py-4 px-8 w-[150px] h-[40px]"
					textClassName="text-blueEmmagini"
					onClick={handleButtonGoBackClick}
				/>
			</div>
		</div>
	);
}
