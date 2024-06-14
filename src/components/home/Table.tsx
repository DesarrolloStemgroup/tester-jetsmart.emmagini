"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CardHome from "../cards/CardHome";
import { useDataContext } from "@/context/DataProvider";
import WhileTap from "../animations/WhileTap";

function Table() {
	const { landing } = useDataContext();
	const router = useRouter();

	useEffect(() => {
		console.log(landing);
	}, [landing]);

	const categorias = landing && landing.length > 0 ? landing[0].categorias : [];

	function fixImageUrl(url: string) {
		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	const handleCardClick = (idCategoria: string) => {
		router.push(`/${idCategoria}`);
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 pb-[110px] mt-20">
			<div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
				{/*// @ts-ignore */}
				{categorias.map((categoria) => (
					<WhileTap>
						<div className="flex justify-center">
							<CardHome
								key={categoria.id}
								text={categoria.titulo}
								imageCard={
									fixImageUrl(categoria.imagen_1) ||
									fixImageUrl(categoria.imagen_0) ||
									fixImageUrl(categoria.imagen) ||
									fixImageUrl(categoria.image)
								}
								onClick={() => handleCardClick(categoria.id)}
							/>
						</div>
					</WhileTap>
				))}
			</div>
		</div>
	);
}

export default Table;
