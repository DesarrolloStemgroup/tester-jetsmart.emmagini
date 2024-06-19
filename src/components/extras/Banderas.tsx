import { useRouter } from "next/navigation";
import Image from "next/image";
import chile from "../../../public/assets/chile.png";
import argentina from "../../../public/assets/argentina.png";
import uruguay from "../../../public/assets/uruguay.png";
import peru from "../../../public/assets/peru.png";
import colombia from "../../../public/assets/colombia.png";
import paraguay from "../../../public/assets/paraguay.png";

function Banderas() {
	const router = useRouter();

	const handleLanguageChange = (lang: string) => {
		router.push(`/${lang}`);
	};
	return (
		<div>
			<button
				className="ml-2 border-2 border-solid border-white rounded-full"
				onClick={() => handleLanguageChange("es-sr")}
			>
				<Image src={argentina} width={30} height={30} alt="argentina" />
			</button>
			<button
				className="ml-2 border-2 border-solid border-white rounded-full"
				onClick={() => handleLanguageChange("es-la")}
			>
				<Image src={colombia} width={30} height={30} alt="colombia" />
			</button>
			<button
				className="ml-2 border-2 border-solid border-white rounded-full"
				onClick={() => handleLanguageChange("es-sr")}
			>
				<Image src={uruguay} width={30} height={30} alt="uruguay" />
			</button>
			<button
				className="ml-2 border-2 border-solid border-white rounded-full"
				onClick={() => handleLanguageChange("es-la")}
			>
				<Image src={paraguay} width={30} height={30} alt="paraguay" />
			</button>
			<button
				className="ml-2 border-2 border-solid border-white rounded-full"
				onClick={() => handleLanguageChange("es-la")}
			>
				<Image src={peru} width={30} height={30} alt="peru" />
			</button>
			<button
				className="ml-2 border-2 border-solid border-white rounded-full"
				onClick={() => handleLanguageChange("es-la")}
			>
				<Image src={chile} width={30} height={30} alt="chile" />
			</button>
		</div>
	);
}

export default Banderas;
