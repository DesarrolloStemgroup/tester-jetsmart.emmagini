"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/DataProvider";
import withAuth from "../withAuth";
import NavBar from "@/components/home/NavBar";
import Table from "@/components/home/Table";
import ButtonNav from "@/components/home/ButtonNav";
import banner from "../../../public/assets/banner.png";
import bannerChile from "../../../public/assets/banner-chile.png";
import bannerArgentina from "../../../public/assets/banner-argentina.png";
import "@/styles/styles.css";

function Home() {
	const { data, empresa, language } = useDataContext();
	const router = useRouter();

	const handleButtonTriviaClick = () => {
		router.push(`/${language}/auth/login`);
	};

	if (!empresa && !data) {
		return (
			<div className="mt-96">
				<section className="dots-container">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</section>
				<h1 className="text-blueEmmagini text-center mt-4 font-semibold">
					CARGANDO
				</h1>
			</div>
		);
	}

	return (
		<main>
			<NavBar logo={empresa.logo} />
			{empresa.header_activo_landing === 1 && (
				<Link href={`/${language}/trivia`} className="block mt-20">
					<div className="mt-20 w-full relative">
						<div className="relative w-full lg:max-h-[600px]">
							<Image
								src={language === "es-la" ? banner : banner}
								alt="Banner"
								className="w-full h-auto object-cover"
							/>
						</div>
					</div>
				</Link>
			)}

			<Table />
			<ButtonNav />
		</main>
	);
}

export default withAuth(Home);
