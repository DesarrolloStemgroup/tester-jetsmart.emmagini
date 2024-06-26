import { useRouter } from "next/navigation";
import Image from "next/image";
import chile from "../../../public/assets/chile.png";
import argentina from "../../../public/assets/argentina.png";
import uruguay from "../../../public/assets/uruguay.png";
import peru from "../../../public/assets/peru.png";
import colombia from "../../../public/assets/colombia.png";
import paraguay from "../../../public/assets/paraguay.png";

function Lenguajes() {
	const router = useRouter();

	const handleLanguageChange = (lang: string) => {
		router.push(`/${lang}`);
	};
	return (
		<div className="flex flex-row flex-wrap gap-2">
			<button
				className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center p-0 bg-white rounded-full justify-end"
				onClick={() => handleLanguageChange("es-sr")}
			>
				<Image
					className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9"
					src={argentina}
					width={30}
					height={30}
					alt="argentina"
				/>
			</button>
			<button
				className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center p-0 bg-white rounded-full justify-end"
				onClick={() => handleLanguageChange("es-la")}
			>
				<Image
					src={colombia}
					width={30}
					height={30}
					alt="colombia"
					className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9"
				/>
			</button>
			<button
				className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center p-0 bg-white rounded-full justify-end"
				onClick={() => handleLanguageChange("es-sr")}
			>
				<Image
					src={uruguay}
					width={30}
					height={30}
					alt="uruguay"
					className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9"
				/>
			</button>
			<button
				className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center p-0 bg-white rounded-full justify-end"
				onClick={() => handleLanguageChange("es-la")}
			>
				<Image
					src={paraguay}
					width={30}
					height={30}
					alt="paraguay"
					className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10"
				/>
			</button>
			<button
				className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center p-0 bg-white rounded-full justify-end"
				onClick={() => handleLanguageChange("es-la")}
			>
				<Image
					src={peru}
					width={30}
					height={30}
					alt="peru"
					className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9"
				/>
			</button>
			<button
				className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center p-0 bg-white rounded-full justify-end"
				onClick={() => handleLanguageChange("es-la")}
			>
				<Image
					src={chile}
					width={30}
					height={30}
					alt="chile"
					className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9"
				/>
			</button>
		</div>
	);
}

export default Lenguajes;
