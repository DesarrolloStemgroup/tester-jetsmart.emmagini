"use client";

import { useDataContext } from "@/context/DataProvider";
import NavBar from "@/components/NavBar";
import ImageBanner from "../components/home/ImageBanner";
import Table from "@/components/home/Table";
import logo from "../../public/assets/logo.png";

export default function Home() {
	const { data, empresa } = useDataContext();

	if (!empresa && !data) {
		return <div className="mt-20 text-black">Cargando...</div>;
	}
	return (
		<main>
			<NavBar logo={logo} />
			{
				<ImageBanner
					image={empresa.header_imagen}
					welcomeText={empresa.header_1}
					title={empresa.header_2}
					subtitle={empresa.header_contenido}
					button={true}
					link={empresa.header_destino}
					buttonText={data.keytext.btn_header_mas}
				/>
			}
			<Table />
		</main>
	);
}
