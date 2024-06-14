"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlClose } from "react-icons/sl";
import { BsGift } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDataFrontContext } from "@/app/context/FrontProvider";

const SideMenu = () => {
	const { sideMenuOpen, setSideMenuOpen, setModalOpen } = useDataFrontContext();
	const { logOut } = useDataFrontContext();

	const router = useRouter();

	useEffect(() => {
		if (!router.events) return;

		const handleRouteChange = () => {
			setSideMenuOpen(false);
		};

		router.events.on("routeChangeComplete", handleRouteChange);

		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events, setSideMenuOpen]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sideMenuOpen && !event.target.closest(".side-menu")) {
				setSideMenuOpen(false);
			}
		};

		if (sideMenuOpen) {
			document.addEventListener("click", handleClickOutside);
		} else {
			document.removeEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [sideMenuOpen, setSideMenuOpen]);

	function handleClick() {
		setModalOpen(true);
	}

	const onClick = useCallback(async () => {
		try {
			await logOut();

			router.push("/auth/login");
		} catch (error) {
			console.error("Error al registrar el usuario:", error);
		}
	}, [logOut]);

	return (
		<>
			{sideMenuOpen && (
				<div className="bg-cyan-500 min-h-screen w-96 fixed top-16 right-0 p-2 flex flex-col items-center bg-gray-600/50 backdrop-blur-sm z-50 transition-all duration-300">
					<div className="absolute top-4 right-4">
						<button
							className="rounded-full bg-red-500 mr-4"
							style={{ backgroundColor: "red" }}
							onClick={() => {
								setSideMenuOpen(false);
							}}
						>
							<SlClose className="text-white" size={35} />
						</button>
					</div>

					<div className="mt-20">
						<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
							<div className="flex items-center">
								<AiOutlineTrophy className="mr-2" />
								<span className="text-black ml-2 font-bold text-sm">
									Premium
								</span>
							</div>
							<AiOutlineArrowRight />
						</button>

						<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
							<div className="flex items-center">
								<BsGift className="mr-2" />
								<span className="text-black ml-2 font-bold text-sm">
									Subastas
								</span>
							</div>
							<AiOutlineArrowRight />
						</button>

						<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
							<div className="flex items-center">
								<BsCartCheck className="mr-2" />
								<span className="text-black ml-2 font-bold text-sm">
									Compras
								</span>
							</div>
							<AiOutlineArrowRight />
						</button>

						<Link href="/app/perfil">
							<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
								<div className="flex items-center">
									<FaRegUserCircle className="mr-2" />
									<span className="text-black ml-2 font-bold text-sm">
										Perfil
									</span>
								</div>
								<AiOutlineArrowRight />
							</button>
						</Link>
					</div>

					<div className="mx-auto absolute bottom-28">
						<button
							className="w-[323px] h-12 bg-red mt-4 rounded-[50px] border-4 border-gray-500"
							onClick={onClick}
						>
							<span className="text-base font-bold text-white">
								Cerrar sesión
							</span>
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default SideMenu;
