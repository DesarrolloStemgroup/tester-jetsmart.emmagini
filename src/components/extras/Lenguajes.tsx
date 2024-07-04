/*import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import chile from "../../../public/assets/chile.png";
import argentina from "../../../public/assets/argentina.png";
import uruguay from "../../../public/assets/uruguay.png";
import peru from "../../../public/assets/peru.png";
import colombia from "../../../public/assets/colombia.png";
import paraguay from "../../../public/assets/paraguay.png";

import { MdOutlineEmojiFlags } from "react-icons/md";

const Lenguajes = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleLanguageChange = (lang: string) => {
		router.push(`/${lang}`);

		setIsOpen(false);
	};

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const languages = [
		{ src: argentina, alt: "argentina", lang: "es-sr" },
		{ src: colombia, alt: "colombia", lang: "es-la" },
		{ src: uruguay, alt: "uruguay", lang: "es-sr" },
		{ src: paraguay, alt: "paraguay", lang: "es-la" },
		{ src: peru, alt: "peru", lang: "es-la" },
		{ src: chile, alt: "chile", lang: "es-la" },
	];

	return (
		<div className="relative">
			<div className="block sm:hidden">
				<button onClick={toggleMenu} className="flex items-center">
					<MdOutlineEmojiFlags
						size={18}
						className="text-white w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
					/>
				</button>

				{isOpen && (
					<div className="absolute right-0 mt-2 w-auto rounded-md  z-50">
						{languages.map((language) => (
							<button
								key={language.alt}
								className="flex items-center justify-between w-full p-0 text-sm text-gray-700  mt-2"
								onClick={() => handleLanguageChange(language.lang)}
							>
								<Image
									src={language.src}
									width={30}
									height={30}
									alt={language.alt}
									className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
								/>
							</button>
						))}
					</div>
				)}
			</div>

			<div className="hidden sm:flex flex-row flex-wrap gap-2">
				{languages.map((language) => (
					<button
						key={language.alt}
						className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center p-0 bg-white rounded-full"
						onClick={() => handleLanguageChange(language.lang)}
					>
						<Image
							src={language.src}
							width={30}
							height={30}
							alt={language.alt}
							className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9"
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default Lenguajes; */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import chile from "../../../public/assets/chile.png";
import argentina from "../../../public/assets/argentina.png";
import uruguay from "../../../public/assets/uruguay.png";
import peru from "../../../public/assets/peru.png";
import colombia from "../../../public/assets/colombia.png";
import paraguay from "../../../public/assets/paraguay.png";

const Lenguajes = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentFlag, setCurrentFlag] = useState({
		src: chile,
		alt: "chile",
		lang: "es-la",
	});
	const router = useRouter();

	useEffect(() => {
		const savedFlag = localStorage.getItem("selectedFlag");
		if (savedFlag) {
			setCurrentFlag(JSON.parse(savedFlag));
		}
	}, []);

	const handleLanguageChange = (
		lang: string,
		flag: { src: any; alt: string; lang: string }
	) => {
		router.push(`/${lang}`);
		setCurrentFlag(flag);
		localStorage.setItem("selectedFlag", JSON.stringify(flag));
		setIsOpen(false);
	};

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const languages = [
		{ src: argentina, alt: "argentina", lang: "es-sr" },
		{ src: colombia, alt: "colombia", lang: "es-la" },
		{ src: uruguay, alt: "uruguay", lang: "es-sr" },
		{ src: paraguay, alt: "paraguay", lang: "es-la" },
		{ src: peru, alt: "peru", lang: "es-la" },
		{ src: chile, alt: "chile", lang: "es-la" },
	];

	return (
		<div className="relative">
			<div className="block sm:hidden">
				<button
					className="w-10 h-10 flex items-center justify-center p-0 bg-white rounded-full"
					onClick={toggleMenu}
				>
					<Image
						src={currentFlag.src}
						width={30}
						height={30}
						alt={currentFlag.alt}
						className="w-8 h-8 "
					/>
				</button>

				{isOpen && (
					<div className="absolute right-0 mt-2 w-auto rounded-md z-50">
						{languages.map((language) => (
							<button
								key={language.alt}
								className="bg-white rounded-full w-[38px] h-[38px] flex items-center justify-center mb-2"
								onClick={() =>
									handleLanguageChange(language.lang, {
										src: language.src,
										alt: language.alt,
										lang: language.lang,
									})
								}
							>
								<Image
									src={language.src}
									width={32}
									height={32}
									alt={language.alt}
									className="inline-block align-middle"
								/>
							</button>
						))}
					</div>
				)}
			</div>

			<div className="hidden sm:flex flex-row flex-wrap gap-2">
				{languages.map((language) => (
					<button
						key={language.alt}
						className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center p-0 bg-white rounded-full"
						onClick={() =>
							handleLanguageChange(language.lang, {
								src: language.src,
								alt: language.alt,
								lang: language.lang,
							})
						}
					>
						<Image
							src={language.src}
							width={30}
							height={30}
							alt={language.alt}
							className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9"
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default Lenguajes;
