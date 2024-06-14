"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import CardHome from "@/components/cards/CardHome";
import { useDataContext } from "@/context/DataProvider";
import { Carousel } from "flowbite-react";
import WhileTap from "@/components/animations/WhileTap";
import logo from "../../../../public/assets/logo.png";

interface ComponentProps {
	params: {
		idCategoria: string;
		idProducto: string;
	};
}

export default function Page({
	params: { idCategoria, idProducto },
}: ComponentProps) {
	const { landing } = useDataContext();
	const router = useRouter();

	const landingData = useMemo(() => landing?.[0], [landing]);

	const product = useMemo(
		() =>
			landingData.productos.find(
				// @ts-ignore
				(productItem) => productItem.id === idProducto
			),
		[landingData]
	);

	const relatedProducts: any[] = useMemo(
		() =>
			landingData.productos.filter(
				// @ts-ignore
				(item) =>
					item.id !== idProducto &&
					(product.rel_1 === item.id ||
						product.rel_2 === item.id ||
						product.rel_3 === item.id)
			),
		[landingData]
	);

	console.log("landingData", landingData?.productos);

	console.log("productos relacionados", relatedProducts);

	function fixImageUrl(url: string) {
		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	const extractImageUrls = (): string[] => {
		const imageUrls = [];
		for (let i = 0; i <= 10; i++) {
			const imageUrl = product[`imagen_${i}`];
			if (imageUrl) {
				imageUrls.push(imageUrl);
			}
		}
		return imageUrls;
	};

	const imageUrls = extractImageUrls();

	const handleCardClick = (idProducto: string) => {
		router.push(`/${idProducto}`);
	};

	if (!landing || landing.length === 0) {
		return <div className="mt-20 text-black">Cargando...</div>;
	}

	return (
		<>
			<NavBar logo={logo} />
			<div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 mt-20 pb-20">
				<div
					className="blog-content text-black mt-6 w-full sm:w-[480px] md:w-[580px] mx-auto"
					dangerouslySetInnerHTML={{ __html: product.descripcion }}
				></div>
				<div className="w-full sm:w-[480px] md:w-[580px] h-auto relative mt-6 mx-auto mb-8">
					<div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
						<Carousel>
							{imageUrls.map((url, index) => (
								<Image
									key={url}
									src={fixImageUrl(url)}
									alt={`product image ${index}`}
									className="w-full h-auto object-cover"
									width={580}
									height={725}
									sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
								/>
							))}
						</Carousel>
					</div>
				</div>
				<div
					className="blog-content text-black mt-6 w-full sm:w-[480px] md:w-[580px] mx-auto"
					dangerouslySetInnerHTML={{ __html: product.contenido }}
				></div>
				{relatedProducts && relatedProducts.length > 0 && (
					<>
						<h2 className="mt-8">Relacionados</h2>
						<div className="flex flex-col px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32">
							<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
								{/*// @ts-ignore*/}
								{relatedProducts.map((relatedProduct, index) => (
									<WhileTap>
										key={index}
										<div className="flex justify-center">
											<CardHome
												text={relatedProduct.titulo}
												imageCard={
													fixImageUrl(relatedProduct.imagen_1) ||
													fixImageUrl(relatedProduct.imagen_0) ||
													fixImageUrl(relatedProduct.imagen) ||
													fixImageUrl(relatedProduct.image)
												}
												// @ts-ignore
												onClick={() => handleCardClick(relatedProduct.id)}
											/>
										</div>
									</WhileTap>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
