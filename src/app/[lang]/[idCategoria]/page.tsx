"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/DataProvider";
import { Carousel } from "flowbite-react";
import NavBar from "@/components/NavBar";
import CardHome from "@/components/cards/CardHome";
import ButtonNav from "@/components/home/ButtonNav";

import WhileTap from "@/components/animations/WhileTap";
import "@/styles/styles.css";
import { RoundButton } from "@/components/buttons/RoundButton";

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
		(categoriaItem: any) => categoriaItem.id === idCategoria
	);

	console.log(categoria);

	const productos = landingData.productos.filter(
		(productItem: any) => productItem.id_categoria === idCategoria
	);

	const handleCardClick = (idProducto: any) => {
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
			<NavBar logo={empresa.logo} showButton={true} />

			<div className="mt-20 container mx-auto sm:px-6 lg:px-8 py-8 mb-32">
				{categoria?.auspiciantes ? (
					<div className="w-full h-[150px] md:h-[300px]">
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

				<div className="flex justify-center mt-6">
					{categoria?.url_descarga ? (
						<Link href={categoria.url_descarga} target="_blank">
							<RoundButton
								text="Descargar Revista para leer offline"
								buttonClassName="w-[280px] md:w-[344px] h-[48px] bg-blueEmmagini text-white border-2"
							/>
						</Link>
					) : null}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-6">
					{productos.map((producto: any) => (
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
