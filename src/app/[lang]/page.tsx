"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useDataContext } from "@/context/DataProvider";
import NavBar from "@/components/NavBar";
import ImageBanner from "../../components/home/ImageBanner";
import Table from "@/components/home/Table";

interface ComponentProps {
	params: {
		lang: string;
	};
}

export default function Home() {
	const { data, empresa, setLanguage } = useDataContext();
	const router = useRouter();
	const { lang } = useParams();

	useEffect(() => {
		if (lang) {
			setLanguage(lang);
		}
	}, [lang]);

	if (!empresa && !data) {
		return <div className="mt-20 text-black">Cargando...</div>;
	}

	return (
		<main>
			<NavBar logo={empresa.logo} />
			{empresa.header_activo_landing === 1 && (
				<ImageBanner
					image={empresa.header_imagen}
					welcomeText={empresa.header_1}
					title={empresa.header_2}
					subtitle={empresa.header_contenido}
					button={true}
					link={empresa.header_destino}
					buttonText={data.keytext.btn_header_mas}
				/>
			)}

			<Table />
		</main>
	);
}
