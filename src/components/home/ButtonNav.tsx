/*import Link from "next/link";
import axios from "axios";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

interface ComponentProps {}

export const ButtonNav = ({}: ComponentProps) => {
	const router = useRouter();

	const handleCardClick = () => {
		router.back();
	};

	const logOut = useCallback(async () => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("user_id");
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/logout",
				{
					token: token,
					userid: userId,
					host: "demo9.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			localStorage.removeItem("token");
			localStorage.removeItem("user_id");

			router.push("/auth/login");

			return response.data;
		} catch (error) {
			console.error("Error al cerrar sesion", error);
			throw error;
		}
	}, []);

	return (
		<div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[300px]">
			<div className="relative flex justify-between items-center px-7 py-2 bg-blueEmmagini mt-4 rounded-full border-4 border-gray-100 shadow-xl h-20">
				<button
					className="flex flex-col items-center justify-center w-[100px] h-full rounded-xl p-1"
					onClick={handleCardClick}
				>
					<div className="flex flex-col items-center">
						<FaArrowLeft size={18} className="text-white" />
						<span className="mt-1 text-md text-white">Volver</span>
					</div>
				</button>

				<Link href="/">
					<button className="flex flex-col items-center justify-center w-[100px] h-full rounded-xl p-1">
						<div className="flex flex-col items-center">
							<IoHome size={18} className="text-white" />
							<span className="mt-1 text-md text-center text-white">
								Inicio
							</span>
						</div>
					</button>
				</Link>

				<button
					className="flex flex-col items-center justify-center w-[100px] h-full rounded-xl p-1"
					onClick={logOut}
				>
					<div className="flex flex-col items-center">
						<MdLogout size={18} className="text-white" />
						<span className="mt-1 text-md text-center text-white">Salir</span>
					</div>
				</button>
			</div>
		</div>
	);
};

export default ButtonNav; */

//comentario

import Link from "next/link";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import ConfirmModal from "@/components/extras/ConfirmModal";

interface ComponentProps {}

export const ButtonNav = ({}: ComponentProps) => {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCardClick = () => {
		router.back();
	};

	const logOut = useCallback(async () => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("user_id");
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/logout",
				{
					token: token,
					userid: userId,
					host: "demo9.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			localStorage.removeItem("token");
			localStorage.removeItem("user_id");

			router.push("/auth/login");

			return response.data;
		} catch (error) {
			console.error("Error al cerrar sesion", error);
			throw error;
		}
	}, [router]);

	const handleLogOutClick = () => {
		setIsModalOpen(true);
	};

	const handleConfirm = async () => {
		setIsModalOpen(false);
		await logOut();
	};

	return (
		<>
			<div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[300px]">
				<div className="relative flex justify-between items-center px-7 py-2 bg-blueEmmagini mt-4 rounded-full border-4 border-gray-100 shadow-xl h-20">
					<button
						className="flex flex-col items-center justify-center w-[100px] h-full rounded-xl p-1"
						onClick={handleCardClick}
					>
						<div className="flex flex-col items-center">
							<FaArrowLeft size={18} className="text-white" />
							<span className="mt-1 text-md text-white">Volver</span>
						</div>
					</button>

					<Link href="/">
						<button className="flex flex-col items-center justify-center w-[100px] h-full rounded-xl p-1">
							<div className="flex flex-col items-center">
								<IoHome size={18} className="text-white" />
								<span className="mt-1 text-md text-center text-white">
									Inicio
								</span>
							</div>
						</button>
					</Link>

					<button
						className="flex flex-col items-center justify-center w-[100px] h-full rounded-xl p-1"
						onClick={handleLogOutClick}
					>
						<div className="flex flex-col items-center">
							<MdLogout size={18} className="text-white" />
							<span className="mt-1 text-md text-center text-white">Salir</span>
						</div>
					</button>
				</div>
			</div>

			<ConfirmModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleConfirm}
			/>
		</>
	);
};

export default ButtonNav;
