"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Lenguajes from "../extras/Lenguajes";
import { useDataContext } from "@/context/DataProvider";
import { RoundButton } from "../buttons/RoundButton";
import ConstantMovement from "@/components/animations/ConstantMovement";
import logoCoin from "../../../public/assets/coin.png";

//  TODO: Cambiar el INGRESAR del boton de la trivia por el texto que venga por api

interface ComponentProps {
	logo: string;
	showCoins?: boolean;
	textCoins?: string;
}
const NavBar = ({ logo, showCoins, textCoins }: ComponentProps) => {
	const { language } = useDataContext();
	const router = useRouter();

	const handleCardClick = () => {
		router.push(`/${language}`);
	};

	const handleButtonTriviaClick = () => {
		router.push(`/${language}/auth/login`);
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

				{showCoins && (
					<div className=" w-[90px] h-[35px] lg:w-28 h-11 bg-white rounded-3xl flex items-center justify-center">
						<ConstantMovement>
							<Image
								className="cursor-pointer w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]"
								src={logoCoin}
								width={32}
								height={32}
								alt="coins"
							/>
						</ConstantMovement>

						<span className="text-black font-semibold text-sm lg:text-base ml-2">
							{textCoins}
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default NavBar;
