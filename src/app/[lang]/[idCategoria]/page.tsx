"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/DataProvider";
import { Carousel } from "flowbite-react";
import NavBar from "@/components/NavBar";
import CardHome from "@/components/cards/CardHome";
import ButtonNav from "@/components/home/ButtonNav";

import WhileTap from "@/components/animations/WhileTap";
import "@/styles/styles.css";

interface ComponentProps {
	params: {
		idCategoria: string;
	};
}

export default function Page({ params: { idCategoria } }: ComponentProps) {
	const { landing, empresa, language } = useDataContext();
	const router = useRouter();

	if (!landing || landing.length === 0) {
		return (
			<div className="mt-20 text-black">
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
			</div>
		);
	}

	const landingData = landing[0];

	const categoria = landingData.categorias.find(
		// @ts-ignore
		(categoriaItem) => categoriaItem.id === idCategoria
	);

	console.log(categoria);

	const productos = landingData.productos.filter(
		// @ts-ignore
		(productItem) => productItem.id_categoria === idCategoria
	);
	// @ts-ignore
	const handleCardClick = (idProducto) => {
		router.push(`/${language}/${idCategoria}/${idProducto}`);
	};

	const fixImageUrl = (url: string) => {
		if (url?.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	};

	return (
		<>
			<NavBar logo={empresa.logo} />

			<div className="mt-20 container mx-auto sm:px-6 lg:px-8 py-8 mb-32">
				{categoria?.auspiciantes ? (
					<div className="w-full  sm:h-[150px] md:h-[300px]">
						<Carousel className="w-full h-full">
							{categoria.auspiciantes.map((auspiciante: any, imgIndex: any) => (
								<div key={imgIndex} className="w-full h-full relative">
									<Image
										src={fixImageUrl(auspiciante.ruta)}
										alt={`product image ${auspiciante.id}`}
										className="w-full h-full object-cover"
										layout="fill"
									/>
								</div>
							))}
						</Carousel>
					</div>
				) : null}
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-10">
					{/*// @ts-ignore */}
					{productos.map((producto) => (
						<WhileTap key={producto.id}>
							<div className="flex justify-center" key={producto.id}>
								<CardHome
									onClick={() => handleCardClick(producto.id)}
									text={producto.titulo}
									imageCard={producto.imagen_0 || producto.imagen_1}
								/>
							</div>
						</WhileTap>
					))}
				</div>
			</div>
			<ButtonNav />
		</>
	);
}
