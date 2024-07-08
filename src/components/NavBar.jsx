"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Lenguajes from "./extras/Lenguajes";
import { useDataContext } from "@/context/DataProvider";
import { RoundButton } from "./buttons/RoundButton";

//  TODO: Cambiar el INGRESAR del boton de la trivia por el texto que venga por api
const NavBar = ({ logo }) => {
	const { language } = useDataContext();
	const router = useRouter();

	const handleCardClick = () => {
		router.push(`/${language}`);
	};
	const handleButtonTriviaClick = () => {
		router.push(`/${language}/login`);
	};

	return (
		<div className="flex justify-between items-center fixed z-10 w-full h-20 py-4 px-[5px] md:py-5 md:px-7 lg:py-5 lg:px-8 text-sm font-light top-0 bg-blueEmmagini">
			<ul className="flex items-center gap-3">
				<li className="font-semibold text-lg text-white">
					<button onClick={handleCardClick}>
						<div className="w-[100px] h-[60px] lg:w-[123px] lg:h-[80px] align-middle">
							<Image
								src={logo}
								width={123}
								height={123}
								alt="logo"
								className="w-full h-full"
							/>
						</div>
					</button>
				</li>
			</ul>

			<div className="flex items-center ml-auto gap-3">
				<Lenguajes />

				<RoundButton
					buttonClassName="w-[135px] h-[30px] bg-white rounded-[50px] border-2 border-gray-300"
					text="INGRESAR"
					textClassName="text-blueEmmagini"
					onClick={handleButtonTriviaClick}
				/>
			</div>
		</div>
	);
};

export default NavBar;
