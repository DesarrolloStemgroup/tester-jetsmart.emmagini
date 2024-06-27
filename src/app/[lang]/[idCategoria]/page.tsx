"use client";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import CardHome from "@/components/cards/CardHome";
import { useDataContext } from "@/context/DataProvider";
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

	console.log("lenguaje page categorias", language);

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

	const productos = landingData.productos.filter(
		// @ts-ignore
		(productItem) => productItem.id_categoria === idCategoria
	);
	// @ts-ignore
	const handleCardClick = (idProducto) => {
		router.push(`/${language}/${idCategoria}/${idProducto}`);
	};

	return (
		<>
			<NavBar logo={empresa.logo} />
			<div className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32">
				<div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
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
		</>
	);
}
